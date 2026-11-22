import {LESSON_MODULES, lessonKey, validateLessons} from './curriculum.js';

export const SCHEMA_VERSION = 3;
export const STORAGE_KEY = 'english-garden.v1';
export const PREVIOUS_KEY = 'english-garden.before-restore.v1';
export const UPGRADE_KEY = 'english-garden.before-upgrade.v1';
export const MODULES = ['words', 'daily', 'travel', 'nce1', 'grammar', 'nce2', ...LESSON_MODULES];
export const kindFor = module => module==='grammar'?'grammar':['words','course-words'].includes(module)?'word':'phrase';
export const DAY = 86400000;
export const INTERVALS = [1, 3, 7, 14, 30];
export const DEFAULT_SETTINGS = { newPerDay: 10, accent: 'en-GB', direction: 'en-zh', voiceURI: '', lastFocusTopic: '' };

export function createState(entries) {
  return { schemaVersion: SCHEMA_VERSION, entries: structuredClone(entries).map(e=>({...e,kind:e.kind||kindFor(e.module)})), lessons:{}, progress: {}, activities: [], settings: { ...DEFAULT_SETTINGS } };
}
// Stable IDs preserve edits and soft deletions. Missing built-ins alone are appended.
export function prepareState(input, seeds) {
  const state = validateState(input);
  const ids = new Set(state.entries.map(e=>e.id));
  const additions = createState(seeds).entries.filter(e=>!ids.has(e.id));
  state.entries.push(...additions);
  if(state.entries.length>20000)throw new Error('补充内置内容后超过20000条，无法恢复。当前记录未改变。');
  return { state, addedCount:additions.length, fromVersion:input.schemaVersion,
    changed:input.schemaVersion!==SCHEMA_VERSION||additions.length>0 };
}
export function localDay(at = Date.now()) {
  const d = new Date(at);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
export function activeEntries(state, module) {
  return state.entries.filter(e => !e.deletedAt && (!module || e.module === module));
}
export function isDue(state, entry, now = Date.now()) {
  const p = state.progress[entry.id];
  return !entry.deletedAt && !entry.needsCheck && !!p && p.dueAt <= now;
}
export function schedule(previous, rating, now = Date.now()) {
  if (!['forgot', 'vague', 'remembered'].includes(rating)) throw new Error('无效的记忆评价');
  const p = previous || { stage: -1, reviewCount: 0, lapses: 0 };
  const stage = rating === 'forgot' ? -1 : rating === 'remembered' ? Math.min(p.stage + 1, 4) : p.stage;
  const interval = rating === 'forgot' ? 600000 : rating === 'vague' ? DAY : INTERVALS[stage] * DAY;
  return { stage, dueAt: now + interval, lastReviewedAt: now, reviewCount: p.reviewCount + 1, lapses: p.lapses + (rating === 'forgot' ? 1 : 0) };
}
export function recordReview(state, itemId, rating, now = Date.now()) {
  const entry = state.entries.find(e => e.id === itemId);
  if (!entry || entry.deletedAt || entry.needsCheck) throw new Error('这条内容还不能复习');
  const isNew = !state.progress[itemId];
  state.progress[itemId] = schedule(state.progress[itemId], rating, now);
  state.activities.push({ itemId, at: now, type: 'review', rating, isNew });
}
export function recordSpelling(state, itemId, correct, now = Date.now()) {
  const e=state.entries.find(e=>e.id===itemId);
  if(!e||e.module!=='words'||e.deletedAt||e.needsCheck)throw new Error('只有已核对的单词可以练习拼写');
  state.activities.push({ itemId, at: now, type: 'spelling', correct: !!correct });
}
export function checkSpelling(input, answer) {
  return input.trim().toLocaleLowerCase('en') === answer.trim().toLocaleLowerCase('en');
}
export function makeQueue(state, { module, ids, now = Date.now(), onlyNew = false, onlyDue = false } = {}) {
  const active = activeEntries(state, module).filter(e=>!e.needsCheck);
  let entries = active;
  if (ids) {
    const byId = new Map(active.map(entry=>[entry.id,entry]));
    entries = [...new Set(ids)].map(id=>byId.get(id)).filter(Boolean);
  }
  const due = entries.filter(e => isDue(state, e, now)).sort((a, b) => state.progress[a.id].dueAt - state.progress[b.id].dueAt);
  const learnedToday = state.activities.filter(a => a.type === 'review' && a.isNew && localDay(a.at) === localDay(now)).length;
  const allowance = Math.max(0, state.settings.newPerDay - learnedToday);
  const candidates=entries.filter(e=>!state.progress[e.id]);
  // Rotate the first module after the most recent new item, including across sessions.
  const last=[...state.activities].reverse().find(a=>a.type==='review'&&a.isNew);
  const lastModule=state.entries.find(e=>e.id===last?.itemId)?.module;
  const start=(MODULES.indexOf(lastModule)+1)%MODULES.length;
  const order=[...MODULES.slice(start),...MODULES.slice(0,start)];
  const buckets=order.map(m=>candidates.filter(e=>e.module===m));
  const fresh=[];
  while(fresh.length<allowance&&buckets.some(b=>b.length))for(const b of buckets){if(b.length&&fresh.length<allowance)fresh.push(b.shift());}
  return (onlyNew ? fresh : onlyDue ? due : [...due, ...fresh]).map(e => e.id);
}
export function stats(state, now = Date.now()) {
  const entries = activeEntries(state);
  const today = state.activities.filter(a => localDay(a.at) === localDay(now));
  const studied = entries.filter(e => state.progress[e.id]).length;
  const days = new Set(state.activities.map(a => localDay(a.at)));
  let cursor = new Date(now);
  if (!days.has(localDay(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(localDay(cursor))) { streak++; cursor.setDate(cursor.getDate() - 1); }
  return { total: entries.length, studied, due: entries.filter(e => isDue(state, e, now)).length,
    pending: entries.filter(e => e.needsCheck).length,
    reviewedToday: new Set(today.filter(a => a.type === 'review').map(a => a.itemId)).size,
    spellingToday: today.filter(a => a.type === 'spelling').length, streak };
}

// The export format is deliberately independent of browser storage and future cloud providers.
export function exportObject(state, now = Date.now()) {
  return { app: 'little-english-garden', exportedAt: new Date(now).toISOString(), ...structuredClone(state) };
}
export function validateState(input) {
  const fail = message => { throw new Error(message); };
  const plain = x => x !== null && typeof x === 'object' && !Array.isArray(x);
  const str = (x, max = 4000) => typeof x === 'string' && x.length <= max;
  const time = x => Number.isSafeInteger(x) && x >= 0 && x <= 8640000000000000;
  const safeId = x => typeof x === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/.test(x) && !['__proto__', 'constructor', 'prototype'].includes(x);
  if (!plain(input) || ![1,2,3].includes(input.schemaVersion)) fail('备份版本不支持，目前支持第1至3版备份。');
  if (!Array.isArray(input.entries) || input.entries.length > 20000) fail('备份中的词表不完整或过大。');
  if (!plain(input.progress) || !Array.isArray(input.activities) || input.activities.length > 200000) fail('备份中的学习记录不完整或过大。');
  const ids = new Set();
  const entries = input.entries.map(e => {
    if (!plain(e) || !safeId(e.id) || ids.has(e.id) || !MODULES.includes(e.module)) fail('词条编号重复或模块不正确。');
    const grammar=e.module==='grammar';
    const kind=input.schemaVersion===1?(e.module==='words'?'word':'phrase'):e.kind;
    if((input.schemaVersion===1&&!['words','daily','travel'].includes(e.module))||kind!==kindFor(e.module))fail('内容类型与模块不匹配。');
    const lessonEntry=LESSON_MODULES.includes(e.module);
    if(lessonEntry)lessonKey(e.bookNumber,e.lessonNumber);
    const fields=grammar?['title','category','book','prompt','explanation','structures','mistakes','comparison','notes','source','sourceNote']:['en','zh','ipa','pos','example','exampleZh','scene','notes','source','sourceNote'];
    for (const key of fields) {
      if (!str(e[key], key === 'notes' ? 8000 : 4000)) fail('词条格式不正确，未改动当前数据。');
    }
    if (typeof e.favorite !== 'boolean' || typeof e.needsCheck !== 'boolean' || !time(e.deletedAt)) fail('词条内容不完整。');
    if(grammar){
      if(!e.title.trim()||!e.prompt.trim()||!e.explanation.trim()||!['一册基础','二册进阶','两册共有'].includes(e.book)||!e.category.trim()||!Array.isArray(e.examples)||e.examples.length<1||e.examples.length>12)fail('语法卡内容不完整。');
      for(const x of e.examples)if(!plain(x)||!str(x.en,2000)||!str(x.zh,2000)||!x.en.trim()||!x.zh.trim())fail('语法例句格式不正确。');
    }else if(!e.en.trim()||!e.zh.trim())fail('英文和中文不能为空。');
    ids.add(e.id);
    return { ...Object.fromEntries(['id','module',...fields,'favorite','needsCheck','deletedAt'].map(k => [k, e[k]])),kind,
      ...(grammar?{examples:e.examples.map(x=>({en:x.en,zh:x.zh}))}:{}),
      ...(lessonEntry?{bookNumber:e.bookNumber,lessonNumber:e.lessonNumber}:{}) };
  });
  const progress = {};
  const entryById=new Map(entries.map(e=>[e.id,e]));
  for (const [id, p] of Object.entries(input.progress)) {
    if (!ids.has(id) || !plain(p) || !Number.isInteger(p.stage) || p.stage < -1 || p.stage > 4 || !time(p.dueAt) || !time(p.lastReviewedAt) || !Number.isSafeInteger(p.reviewCount) || p.reviewCount < 1 || !Number.isSafeInteger(p.lapses) || p.lapses < 0 || p.lapses > p.reviewCount) fail('复习记录格式不正确。');
    progress[id] = { stage: p.stage, dueAt: p.dueAt, lastReviewedAt: p.lastReviewedAt, reviewCount: p.reviewCount, lapses: p.lapses };
  }
  const activities = input.activities.map(a => {
    if (!plain(a) || !ids.has(a.itemId) || !time(a.at) || !['review','spelling'].includes(a.type)) fail('学习历史格式不正确。');
    if (a.type === 'review') {
      if (!['forgot','vague','remembered'].includes(a.rating) || typeof a.isNew !== 'boolean') fail('记忆评价格式不正确。');
      return { itemId: a.itemId, at: a.at, type: a.type, rating: a.rating, isNew: a.isNew };
    }
    // A personal word may now live in another non-grammar library after an edit.
    if (typeof a.correct !== 'boolean'||entryById.get(a.itemId).kind==='grammar') fail('拼写记录格式不正确。');
    return { itemId: a.itemId, at: a.at, type: a.type, correct: a.correct };
  });
  const s = input.settings;
  if (!plain(s) || ![5,10,20,30].includes(s.newPerDay) || !['en-GB','en-US'].includes(s.accent) || !['en-zh','zh-en'].includes(s.direction) || !str(s.voiceURI, 1000)) fail('学习设置格式不正确。');
  const lessons=validateLessons(input.schemaVersion===3?input.lessons:{});
  const lastFocusTopic=str(s.lastFocusTopic,40)&&/^[a-z-]+$/.test(s.lastFocusTopic)?s.lastFocusTopic:DEFAULT_SETTINGS.lastFocusTopic;
  return { schemaVersion: SCHEMA_VERSION, entries, lessons, progress, activities, settings: { newPerDay:s.newPerDay, accent:s.accent, direction:s.direction, voiceURI:s.voiceURI, lastFocusTopic } };
}
