import { cloneStudyData, studyUuid, prepareStudyDialog } from './compat.js';
import { SEED_ENTRIES } from './data.js';
import { SCHEMA_VERSION, STORAGE_KEY, DAY, NEW_PER_DAY_OPTIONS, kindFor, createState, prepareState, validateState, exportObject, activeEntries, isDue, schedule, recordReview, recordSpelling, checkSpelling, makeQueue, stats } from './core.js';
import { BOOKS, LESSON_MODULES, lessonKey, lessonFields, parseEntryLines, parseLessonText, planLessonImport } from './curriculum.js';
import { COURSE_PAGES, courseSourcePage, courseHeading, courseLessonText } from './curriculum-ui.js';
import { KLAIRE_REVIEW_TOPICS } from './klaire-review.js';
import { REVIEW_SCENES, focusTopicForCard, lastFocusTopic, makeHomeReviewPlan, nextScheduledReview, recentlyStuck } from './review-dashboard.js';
import { GRAMMAR_BRANCHES, TENSE_TIMELINES, renderGrammarMap } from './grammar-map.js';
import { GUIDE_VIEWS, PEOPLE, guideAudio, phonemeAudioUrl, renderPhoneticGuide } from './grammar-reference.js';
import { CLAUSE_GROUPS } from './grammar-clauses.js';
import { guidanceForCard } from './grammar-guidance.js';
import { GRAMMAR_BREAKDOWNS } from './grammar-breakdowns.js';
import { BASIC_WORD_GROUPS } from './basic-words.js';
import { STUDY_WORD_GROUPS } from './study-groups.js';
import { BrowserRepository } from './repository.js';
import { createCloud } from './cloud.js';

const $ = s => document.querySelector(s);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const svgPaths = {
  list:'<path d="M9 6h12M9 12h12M9 18h12M3 6h1m-1 6h1m-1 6h1"/>',
  letters:'<path d="m2 18 5-12 5 12M4 14h6m10 4v-5a3 3 0 0 0-6-1m6 3h-3.5a1.5 1.5 0 0 0 0 3H20"/>',
  syntax:'<rect x="9" y="3" width="6" height="5" rx="1"/><path d="M12 8v4m-7 4v-4h14v4"/><rect x="2" y="16" width="6" height="5" rx="1"/><rect x="16" y="16" width="6" height="5" rx="1"/>',
  sprout:'<path d="M12 21v-9M12 16C3 16 3 6 3 6s10-1 9 10ZM12 12C12 3 21 3 21 3s2 9-9 9Z"/>',
  home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><path d="M9 21v-8h6v8"/>',
  book:'<path d="M12 5c-3-2-7-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-3-1-7-1-10 1Zm0 0v15"/>',
  chat:'<path d="M21 11a8 8 0 0 1-8 8H8l-5 3 1-6a8 8 0 1 1 17-5Z"/><path d="M8 10h8m-8 4h5"/>',
  plane:'<path d="m22 2-7 20-4-9-9-4 20-7ZM11 13 22 2"/>',
  settings:'<path d="M4 6h16M4 12h16M4 18h16M8 3v6m8 0v6M9 15v6"/>',
  arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
  chevron:'<path d="m9 5 7 7-7 7"/>',
  back:'<path d="M20 12H4m6-6-6 6 6 6"/>',
  speaker:'<path d="M11 4 6 8H3v8h3l5 4V4Zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  plus:'<path d="M12 4v16M4 12h16"/>',
  edit:'<path d="m15 4 5 5M4 20l5-1L21 7a3.5 3.5 0 0 0-5-5L4 14Z"/>',
  check:'<path d="m5 12 4 4L20 5"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  upload:'<path d="M12 16V4m-5 5 5-5 5 5M4 16v5h16v-5"/>',
  shield:'<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z"/><path d="m8 12 3 3 5-6"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
  trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
  keyboard:'<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M6 9h1m3 0h1m3 0h1m3 0h1M6 13h1m3 0h1m3 0h1m3 0h1M8 16h8"/>',
  flame:'<path d="M12 2c2 6 7 7 7 13a7 7 0 0 1-14 0c0-3 2-6 4-8 0 3 1 4 2 4 2-3 2-6 1-9Z"/>',
  refresh:'<path d="M20 10a8 8 0 0 0-14-5L3 8m0-5v5h5M4 14a8 8 0 0 0 14 5l3-3m0 5v-5h-5"/>',
  leaf:'<path d="M4 20C-2 4 11 3 21 3c0 10-1 23-17 17Zm0 0L16 8"/>',
  flag:'<path d="M5 22V3c6-4 8 4 15 0v11c-7 4-9-4-15 0"/>',
  eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'
};
const icon = (name, cls='') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${svgPaths[name] || svgPaths.book}</svg>`;
const modules = {
  words:{title:'我的手写生词本', subtitle:'手写生词、基础词汇和场景搭配。', eyebrow:'个人词表', icon:'letters', short:'单词', description:'手写生词和基础词汇'},
  daily:{title:'日常短语', subtitle:'日常交流常用表达，支持备注和复习。', eyebrow:'日常表达', icon:'chat', short:'日常', description:'问候、购物与日常交流'},
  travel:{title:'旅游短语', subtitle:'按旅行场景整理的常用表达。', eyebrow:'旅行表达', icon:'plane', short:'旅游', description:'机场、交通、酒店与餐厅'},
  nce1:{title:'新概念一册常用短语',subtitle:'按一册学习水平整理的常用搭配和句型。',eyebrow:'常用精选',icon:'chat',short:'一册常用',description:'固定搭配与常用句型'},
  nce2:{title:'新概念二册常用短语',subtitle:'按二册学习水平整理的常用搭配和句型。',eyebrow:'常用精选',icon:'chat',short:'二册常用',description:'动词搭配、叙事和常用句型'},
  grammar:{title:'时态与语法',subtitle:'一、二册重点知识。先看讲解，再翻卡复习。',eyebrow:'语法复习',icon:'syntax',short:'语法',description:'一册基础、二册进阶与两册共有知识'},
  'course-words':{title:'新概念单词',icon:'letters',short:'单词'},
  'course-phrases':{title:'新概念逐课短语',icon:'chat',short:'短语'}
};
const libraryModules=Object.entries(modules).filter(([key])=>!LESSON_MODULES.includes(key));
const commonModules=['nce1','nce2'];
const phraseModules=['daily','travel',...commonModules];
const sections=[
  ['home','home','首页'],
  ['words','letters','单词'],
  ['phrases','chat','短语'],
  ['grammar','syntax','语法','时态与语法'],
  ['course','book','教材','新概念教材'],
  ['settings','settings','设置','备份与设置']
];
const pageNames={
  home:'首页', course:'新概念教材', phrases:'短语', settings:'备份与设置',
  focus:'我的复习重点', stuck:'最近卡住的', situations:'场景复习',
  'grammar-map':'语法导图', pronunciation:'音标与发音'
};
const pageName=page=>pageNames[page]||COURSE_PAGES[page]||modules[page]?.title;
const subpageParents={
  focus:'home', stuck:'home', situations:'phrases', 'grammar-map':'grammar', pronunciation:'words',
  daily:'phrases', travel:'phrases', nce1:'phrases', nce2:'phrases',
  'course-text':'course', 'course-words':'course','course-phrases-1':'course','course-phrases-2':'course',sources:'course'
};
let storageOK = true;
let corruptRaw = null;
let upgradeRaw = null;
let state;
// Accessing localStorage itself can throw in a restricted browser.
let repository;
let cloud;
let accountContext = 0;
try {
  repository = new BrowserRepository(window.localStorage);
  const raw = repository.loadRaw();
  if (raw) {
    try { const prepared=prepareState(JSON.parse(raw),SEED_ENTRIES);state=prepared.state;
      if(prepared.changed){try{repository.upgradeWithBackup(state,raw);}catch{upgradeRaw=raw;storageOK=false;}}
    }
    catch { corruptRaw = raw; state = createState(SEED_ENTRIES); storageOK = false; }
  } else { state = createState(SEED_ENTRIES); repository.save(state); }
} catch { state = createState(SEED_ENTRIES); storageOK = false; }
const ui = { page:'home', filter:'all', book:'all', category:'all', search:'', limit:24, session:null, courseBook:1, courseLesson:1,
  grammarView:'overview', grammarBranch:'structure', grammarTense:'habit', grammarMore:false, grammarPerson:'i', grammarClause:'noun', libraryFiltersOpen:false, ipaSlow:false };
const sceneView = {id:REVIEW_SCENES[0].id, bilingual:true};
const openLibraryGroups = {grammar:new Set(),words:new Set()};
const usesLibraryIndex = page => Object.prototype.hasOwnProperty.call(openLibraryGroups,page);
const defaultListLimit = page => page==='words'?240:page==='grammar'?96:24;
const returnViews = [];
let pendingRestore = null;
let confirmAction = null;
let toastTimer;
let undoAction = null;
let voices = [];
let phonemePlayer;
const entryTitle=e=>e?.kind==='grammar'?e.title:e?.en||'';
const entryMeaning=e=>e?.kind==='grammar'?e.explanation:e?.zh||'';
const lines=text=>esc(text).replace(/\n/g,'<br>');
const phraseUsage=e=>e.module==='nce1'&&e.sourceNote?`<p class="phrase-usage">${esc(e.sourceNote.split(' 音标为')[0])}</p>`:'';
function renderWordCollocations(entry) {
  if(!entry.id.startsWith('usage-word-'))return '';
  const pairs=entry.sourceNote.split('\n').map(line=>line.split('｜')).filter(([phrase,meaning])=>phrase&&meaning);
  if(!pairs.length)return '';
  return `<section class="word-collocations"><h3>常用搭配</h3><ul>${pairs.map(([phrase,meaning])=>
    `<li><div><strong lang="en">${esc(phrase)}</strong><span>${esc(meaning)}</span></div>${guideAudio(phrase,{escape:esc,icon})}</li>`).join('')}</ul></section>`;
}
const recallOptions=[
  {id:'forgot', label:'忘了', interval:'10 分钟后', shortcut:'1'},
  {id:'vague', label:'有点模糊', interval:'1 天后', shortcut:'2'},
  {id:'remembered', label:'记住了', shortcut:'3'}
];
const reviewDate = new Intl.DateTimeFormat('zh-CN',{month:'long',day:'numeric',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
const reviewTime = at => `<time datetime="${new Date(at).toISOString()}">${reviewDate.format(at)}</time>`;

function commit(change) {
  const next = cloneStudyData(state);
  change(next);
  state = next;
  if (corruptRaw !== null) { storageOK = false; toast('原来的记录格式异常。本次修改仅暂存，请先下载备份。'); return; }
  try { if(upgradeRaw!==null){repository.upgradeWithBackup(state,upgradeRaw);upgradeRaw=null;}else repository.save(state); storageOK = true; }
  catch { storageOK = false; toast('浏览器未能保存。修改暂存在当前页面，请立即下载备份。'); }
  if (storageOK) cloud?.changed();
}
function toast(message, undo) {
  clearTimeout(toastTimer); undoAction = undo || null;
  $('#toast').innerHTML = `${esc(message)}${undo ? '<button data-action="undo">撤销</button>' : ''}`;
  $('#toast').hidden = false;
  toastTimer = setTimeout(() => { $('#toast').hidden = true; undoAction = null; }, 8500);
}
function dateText(at) {
  return new Date(at).toLocaleDateString('zh-CN', { month:'long', day:'numeric' });
}
function statusOf(e) {
  if (e.needsCheck) return '<span class="tag pending">待核对</span>';
  if (!state.progress[e.id]) return '<span class="tag new">未学</span>';
  if (isDue(state,e)) return '<span class="tag due">待复习</span>';
  return `<span class="tag learned">${dateText(state.progress[e.id].dueAt)}复习</span>`;
}
const entryCategory=entry=>entry.category||entry.scene||'';
const categoryLabel=(module,category)=>module==='words'&&category==='新概念一册 · 我的生词'?'手写生词':category||'未分类';
function scopeControls(module) {
  const categories=[...new Set(activeEntries(state,module).map(entryCategory))].filter(c=>c||module==='words').sort();
  return `<div class="scope-controls">${module==='grammar'?`<label for="scope-book">册别<select id="scope-book" data-scope="book">${['all','一册基础','二册进阶','两册共有'].map(b=>`<option value="${b}" ${ui.book===b?'selected':''}>${b==='all'?'全部册别':b}</option>`).join('')}</select></label>`:''}<label for="scope-category">分类<select id="scope-category" data-scope="category"><option value="all">全部分类</option>${categories.map(c=>`<option value="${esc(c)}" ${ui.category===c?'selected':''}>${esc(categoryLabel(module,c))}</option>`).join('')}</select></label></div>`;
}
function libraryStatusFilters(module,pending) {
  const options=[['all','全部状态'],['new','未学'],['due','待复习'],['learned','已学习'],['favorite','收藏']];
  if(module==='words'||pending)options.push(['pending','待核对']);
  return `<div class="filter-bar" role="group" aria-label="按学习状态筛选">${options.map(([key,label])=>
    `<button type="button" class="filter ${ui.filter===key?'active':''}" data-action="filter" data-filter="${key}" aria-pressed="${ui.filter===key}">${key==='favorite'?icon('star'):''}${label}${key==='pending'?` <span>${pending}</span>`:''}</button>`).join('')}</div>`;
}
function wordGroupIntro(category) {
  const selected=wordTopics.find(group=>group.name===category);
  if(!selected)return '';
  return `<div class="word-group-intro"><p>${esc(selected.note)}</p>
    ${selected?.id?`<button type="button" class="text-button" data-action="open-study-scene" data-scene="${selected.id}">看「${esc(selected.title)}」用法对照 ${icon('chevron')}</button>`:''}
  </div>`;
}
const wordTopics=[...BASIC_WORD_GROUPS,...STUDY_WORD_GROUPS];
function moduleLinks(links) {
  return `<div class="course-links">${links.map(([page,title,description,ic])=>`<button type="button" class="course-link" data-nav="${page}">${icon(ic)}<span><strong>${title}</strong><small>${description}</small></span>${icon('chevron')}</button>`).join('')}</div>`;
}
const lessonPhraseLinks=[
  ['course-phrases-1','一册逐课短语','按课号查找','chat'],
  ['course-phrases-2','二册逐课短语','按课号查找','chat']
];
function referenceFeatureContent(ic,title,description) {
  return `<span class="reference-feature-icon">${icon(ic)}</span><span class="reference-feature-copy"><strong>${title}</strong><span>${description}</span></span>${icon('chevron','reference-feature-chevron')}`;
}
const librarySections=[
  ['words','我的手写生词本','手写生词、常用搭配与音标','个单词与词组',['words']],
  ['phrases','短语','日常、旅游与新概念常用短语','条常用短语',phraseModules],
  ['grammar','时态与语法','导图、时态时间轴与语法卡','个知识点',['grammar']]
];
function linkSection(title, links, description='') {
  return `<section class="catalog-section"><h2>${title}</h2>${description?`<p>${description}</p>`:''}${moduleLinks(links)}</section>`;
}
function renderPhraseHub() {
  const links=phraseModules.map(key=>[key,modules[key].title,`${activeEntries(state,key).length} 条 · ${modules[key].description}`,modules[key].icon]);
  return `<section class="page-heading"><h1>短语</h1></section><div class="catalog">
    ${linkSection('日常与旅行',[...links.slice(0,2),['situations','场景复习','出行、预约、酒店等常用对话','chat']])}
    ${linkSection('新概念常用短语',links.slice(2),'适合集中复习的常用搭配和句型。')}
    ${linkSection('教材逐课短语',lessonPhraseLinks,'按课号查找已收录的短语。')}
  </div>`;
}
function renderCourseHub() {
  return `<section class="page-heading"><div><h1>新概念教材</h1><p>一册 ${BOOKS[1].count} 课 · 二册 ${BOOKS[2].count} 课</p></div><button class="btn" data-nav="sources">资料来源</button></section>
    <div class="catalog">${linkSection('课文与单词',[
      ['course-text','课文','选课阅读，下方查看本课单词和短语','book'],
      ['course-words','逐课单词','按册浏览，也可筛选到一课','letters']
    ])}${linkSection('逐课短语',lessonPhraseLinks)}</div>`;
}
function courseScope(requestedModule) {
  const page=ui.page;
  const book=page.endsWith('-2')?2:page.endsWith('-1')?1:ui.courseBook;
  const module=(page==='course-text'&&requestedModule!=='course-phrases')||page==='course-words'?'course-words':'course-phrases';
  const lesson=ui.courseLesson || (page==='course-text'?1:0);
  const entries=activeEntries(state,module).filter(e=>e.bookNumber===book);
  return {page,book,module,lesson,entries,selected:entries.filter(e=>!lesson||e.lessonNumber===lesson)};
}
function matchesCourseSearch(e) {
  const query=ui.search.trim().toLowerCase();
  return [e.en,e.zh,e.notes].some(value=>value.toLowerCase().includes(query));
}
function renderCourse() {
  const scope=courseScope();
  const {page,book,lesson,entries}=scope;
  const isText=page==='course-text';
  const record=lesson?state.lessons[lessonKey(book,lesson)]:null;
  return courseHeading(page,entries,state.lessons,book,lesson,esc)
    +(isText?courseLessonText(book,lesson,record,esc):'')
    +renderCourseEntries(scope)
    +(isText?renderCourseEntries(courseScope('course-phrases')):'');
}
function courseEntriesAreSearchable({page,module}) {
  return page!=='course-text'||module==='course-words';
}
function renderCourseEntries(scope) {
  const {module,lesson,selected}=scope;
  const label=module==='course-words'?'单词':'短语';
  const searchable=courseEntriesAreSearchable(scope);
  const visible=searchable?selected.filter(matchesCourseSearch):selected;
  return `<section class="panel course-panel"><div class="section-title"><h2>${lesson?`第${lesson}课${label}`:`本册${label}`} <span class="subtle">${selected.length} 条</span></h2><div class="button-row">${visible.length?`<button class="btn primary" data-action="course-review" data-module="${module}">复习${label}</button>`:''}<button class="btn" data-action="course-add" data-module="${module}">${lesson?'添加'+label:'按课添加'}</button></div></div>
    ${!selected.length?`<p>此范围尚未收录${label}。可以按课粘贴，或使用「批量导入」。</p>`:''}
    ${searchable&&selected.length?`<form id="course-search-form" class="course-search"><label>搜索${label}<input name="query" type="search" value="${esc(ui.search)}" placeholder="输入英文或中文"></label><button class="btn" type="submit">搜索</button></form>`:''}
    ${selected.length&&!visible.length?'<p>没有找到匹配词条。</p>':''}
    <div class="entry-grid phrases">${visible.slice(0,ui.limit).map(entryCard).join('')}</div>
    ${visible.length>ui.limit?`<button class="btn course-more" data-action="course-more">再看 ${Math.min(24,visible.length-ui.limit)} 条</button>`:''}</section>`;
}
function libraryIndexRow(e) {
  const id=esc(e.id), title=esc(entryTitle(e));
  const isWord=e.module==='words';
  return `<li class="library-index-row${isWord?' word-row':''}">
    <button type="button" class="library-index-row-open" data-action="detail" data-id="${id}">
      <span class="library-index-row-name"><strong${isWord?' lang="en"':''}>${title}</strong><small>${esc(isWord?e.zh:e.book)}</small></span>${statusOf(e)}${icon('chevron')}
    </button>
    ${isWord?`<button type="button" class="icon-button" data-action="speak" data-id="${id}" aria-label="朗读 ${title}" title="朗读">${icon('speaker')}</button>`:''}
    <button type="button" class="icon-button favorite ${e.favorite?'selected':''}" data-action="favorite" data-id="${id}" aria-pressed="${e.favorite}" aria-label="${e.favorite?'取消收藏':'收藏'} ${title}" title="收藏">${icon('star')}</button>
    <button type="button" class="icon-button" data-action="edit" data-id="${id}" aria-label="编辑与备注 ${title}" title="编辑与备注">${icon('edit')}</button>
  </li>`;
}

function isLibraryFiltered() {
  return Boolean(ui.search.trim()||ui.book!=='all'||ui.category!=='all'||ui.filter!=='all');
}

function renderLibraryIndex(module,entries,limit) {
  const groups=new Map();
  for(const card of entries){
    const category=entryCategory(card);
    if(!groups.has(category))groups.set(category,[]);
    groups.get(category).push(card);
  }
  let remaining=limit;
  const expandMatches=isLibraryFiltered();
  return `<div class="library-index">${[...groups].map(([category,cards])=>{
    const visible=cards.slice(0,remaining);
    remaining-=visible.length;
    if(!visible.length)return '';
    return `<details class="panel library-index-group" data-index-group="${esc(category)}" ${expandMatches||openLibraryGroups[module].has(category)?'open':''}>
      <summary><strong>${esc(categoryLabel(module,category))}</strong><span>${visible.length<cards.length?`${visible.length} / `:''}${cards.length} 条</span></summary>
      ${module==='words'?wordGroupIntro(category):''}
      <ul>${visible.map(libraryIndexRow).join('')}</ul>
    </details>`;
  }).join('')}</div>`;
}

function renderGrammarBreakdown(example) {
  const audio=guideAudio(example.en,{escape:esc,icon,label:'拆句例句'});
  return `<section class="grammar-breakdown">
    <h3>逐句拆解</h3>
    <div class="breakdown-example"><div><p lang="en">${esc(example.en)}</p><p>${esc(example.zh)}</p></div>${audio}</div>
    <dl>${example.parts.map(([part,role])=>`<div><dt lang="en">${esc(part)}</dt><dd>${esc(role)}</dd></div>`).join('')}</dl>
    <p class="breakdown-reason"><strong>为什么这样说</strong> ${esc(example.reason)}</p>
  </section>`;
}
function grammarExplanation(e) {
  const guide=guidanceForCard(e.id);
  const example=Object.prototype.hasOwnProperty.call(GRAMMAR_BREAKDOWNS,e.id)?GRAMMAR_BREAKDOWNS[e.id]:null;
  return `<div class="grammar-explanation">
    ${guide?`<section class="grammar-start"><h3>先怎么看</h3><p>${esc(guide)}</p></section>`:''}
    <section><h3>用法</h3><p>${lines(e.explanation)}</p></section>
    <section><h3>句型结构</h3><p class="structure-box">${lines(e.structures)||'未填写'}</p></section>
    ${example?renderGrammarBreakdown(example):''}
    <details class="grammar-more-examples" ${example?'':'open'}><summary>双语例句 · ${e.examples.length} 句</summary>${e.examples.map((x,i)=>`<div class="grammar-example"><div><p lang="en">${esc(x.en)}</p><p>${esc(x.zh)}</p></div><div class="audio-buttons"><button type="button" class="sound-button" data-action="speak" data-id="${esc(e.id)}" data-example="${i}" aria-label="朗读例句 ${i+1}">${icon('speaker')}</button><button type="button" class="slow-button" data-action="speak-slow" data-id="${esc(e.id)}" data-example="${i}" aria-label="慢速朗读例句 ${i+1}">慢速</button></div></div>`).join('')}</details>
    ${e.mistakes?`<section class="mistake-box"><h3>易错点</h3><p>${lines(e.mistakes)}</p></section>`:''}
    ${e.comparison?`<section><h3>对比记忆</h3><p>${lines(e.comparison)}</p></section>`:''}
    ${e.notes?`<section class="flash-note"><h3>我的备注</h3><p>${lines(e.notes)}</p></section>`:''}</div>`;
}
function practiceHeader(session,label) {
  return `<section class="practice-top"><button type="button" class="text-button muted" data-action="leave-session">${icon('back')} 返回${pageName(session.backPage)}</button><span>${label} <strong>${session.index+1}</strong> / ${session.ids.length}</span></section>
    <div class="practice-progress"><progress value="${session.index}" max="${session.ids.length}" aria-label="本次练习进度"></progress></div>`;
}

function reviewRatings(entry) {
  const now=Date.now();
  const days=Math.round((schedule(state.progress[entry.id],'remembered',now).dueAt-now)/DAY);
  return `<section class="review-ratings" aria-labelledby="review-rating-title">
    <h2 id="review-rating-title" class="rating-title" tabindex="-1">选择记忆情况</h2>
    <div class="rating-buttons">${recallOptions.map(option=>`<button type="button" class="rating ${option.id}" data-action="rate" data-rating="${option.id}" aria-keyshortcuts="${option.shortcut}"><strong>${option.label}</strong><span>${option.interval||`${days} 天后`}复习</span><kbd>${option.shortcut}</kbd></button>`).join('')}</div>
  </section>`;
}

function renderGrammarPractice(e,s) {
  return `${practiceHeader(s,'语法翻卡')}
    <div class="practice-wrap grammar-practice">
      <div class="practice-label">${esc(e.book)} · ${esc(e.category)} · ${state.progress[e.id]?'复习内容':'新内容'}</div>
      <article class="flashcard grammar-flashcard ${s.flipped?'revealed':''}"><span class="eyebrow">${s.flipped?'讲解':'回忆知识点'}</span>
        <h1 id="review-card-heading" tabindex="-1">${esc(e.title)}</h1><p class="grammar-recall">${esc(e.prompt)}</p>
        ${s.flipped?`<button type="button" class="text-button rating-jump" data-action="jump-rating">跳到记忆评价 ${icon('arrow')}</button>${grammarExplanation(e)}`:'<button type="button" class="btn primary reveal-button" data-action="flip">查看讲解 <kbd>空格</kbd></button>'}
      </article>${s.flipped?reviewRatings(e):''}
    </div>`;
}

function currentFocusTopic() {
  return lastFocusTopic(state)||KLAIRE_REVIEW_TOPICS[0];
}

function renderReviewFocus() {
  const topic=currentFocusTopic();
  const available=new Map(activeEntries(state,'grammar').map(card=>[card.id,card]));
  const cards=topic.ids.map(id=>available.get(id)).filter(Boolean);
  const reviewed=cards.filter(card=>state.progress[card.id]).length;
  const due=cards.filter(card=>isDue(state,card)).length;
  return `<section class="page-heading"><div><h1>我的复习重点</h1><p>当前主题 ${topic.title}。可切换主题或直接查看讲解。</p></div></section>
    <div class="review-focus-layout">
      <div class="review-focus-topics" role="group" aria-label="复习主题">
        ${KLAIRE_REVIEW_TOPICS.map(group=>`<button type="button" class="review-focus-topic" data-action="focus-select" data-topic="${group.id}" aria-pressed="${group.id===topic.id}">
          <span><strong>${group.title}</strong>${group.priority?'<small class="review-focus-priority">优先</small>':''}</span>
          <span class="subtle">${group.summary}</span>
        </button>`).join('')}
      </div>
      <section class="panel review-focus-panel" aria-labelledby="review-focus-heading">
        <div class="section-title"><h2 id="review-focus-heading">${topic.title}</h2>${cards.length?'<button class="btn primary" data-action="focus-review">翻卡复习本组</button>':''}</div>
        <p class="subtle">已翻卡 ${reviewed} / ${cards.length} · ${due} 张到期</p>
        <p class="subtle">翻卡记录用于安排下次复习。能否独立运用，要看实际表达。</p>
        ${topic.id==='tense'?'<button type="button" class="btn" data-action="open-grammar-view" data-view="timeline">按时间轴看时态</button>':''}
        ${cards.length?`<ul class="review-focus-list">${cards.map(card=>`<li><button class="text-button" data-action="detail" data-id="${card.id}">${esc(card.title)} ${icon('chevron')}</button>${state.progress[card.id]?statusOf(card):'<span class="tag new">未翻卡</span>'}</li>`).join('')}</ul>`:'<p>本组暂无可查看的卡片。</p>'}
        ${topic.id==='situations'?'<div class="button-row"><button class="btn" data-nav="situations">按场景复习</button><button class="btn" data-nav="daily">日常短语</button><button class="btn" data-nav="travel">旅游短语</button></div>':''}
      </section>
    </div>`;
}

function renderStuckList(rows, now) {
  if (!rows.length) return '<p class="subtle">标成「忘了」或「有点模糊」的卡会出现在这里。</p>';
  return `<ul class="review-focus-list stuck-list">${rows.map(({entry,rating})=>{
    const dueAt=state.progress[entry.id]?.dueAt;
    return `<li><button class="text-button" data-action="detail" data-id="${entry.id}">${esc(entryTitle(entry))} ${icon('chevron')}</button>
      <div class="stuck-rating"><span class="tag ${rating==='forgot'?'due':'pending'}">${rating==='forgot'?'忘了':'有点模糊'}</span>
        ${now===undefined||dueAt===undefined?'':`<span class="stuck-schedule">${dueAt<=now?'已到期':reviewTime(dueAt)}</span>`}</div></li>`;
  }).join('')}</ul>`;
}

function renderStuckPage() {
  const rows=recentlyStuck(state);
  const now=Date.now();
  const due=rows.filter(row=>isDue(state,row.entry,now));
  const waiting=rows.filter(row=>!isDue(state,row.entry,now));
  return `<section class="page-heading library-heading"><div><h1>最近卡住的</h1><p>${rows.length} 张 · ${due.length} 张已到期</p></div>
    ${due.length?'<button type="button" class="btn primary" data-action="stuck-review">复习这组到期卡</button>':''}</section>
    <section class="panel review-focus-panel">${renderStuckList([...due,...waiting].slice(0,ui.limit),now)}
      ${rows.length>ui.limit?'<button class="btn course-more" data-action="stuck-more">查看更多</button>':''}</section>`;
}

function renderReviewScenes() {
  const scene=REVIEW_SCENES.find(item=>item.id===sceneView.id)||REVIEW_SCENES[0];
  const study=STUDY_WORD_GROUPS.find(group=>group.id===scene.id);
  return `<section class="page-heading"><div><h1>场景复习</h1><p>选一段对话，可以逐句听，也可以连起来听。</p></div></section>
    <div class="panel scene-tools">
      <label>场景<select id="scene-picker">${REVIEW_SCENES.map(item=>`<option value="${item.id}" ${item.id===scene.id?'selected':''}>${item.title}</option>`).join('')}</select></label>
      <div class="button-row" role="group" aria-label="显示语言">
        <button type="button" class="btn" data-action="scene-language" data-value="bilingual" aria-pressed="${sceneView.bilingual}">中英对照</button>
        <button type="button" class="btn" data-action="scene-language" data-value="english" aria-pressed="${!sceneView.bilingual}">只看英文</button>
      </div>
    </div>
    <section class="panel review-scene">
      <div class="section-title"><h2>${scene.title}</h2><button type="button" class="btn" data-action="scene-speak" data-scene="${scene.id}" data-index="all">${icon('speaker')} 播放整段</button></div>
      <ul>${scene.lines.map((line,index)=>`<li><div class="review-scene-text">
        <span class="review-scene-role">${esc(line.role)}</span><p lang="en">${esc(line.en)}</p>${sceneView.bilingual?`<p class="subtle">${esc(line.zh)}</p>`:''}</div>
        <div class="review-scene-audio"><button class="sound-button" data-action="scene-speak" data-scene="${scene.id}" data-index="${index}" aria-label="朗读第 ${index+1} 句">${icon('speaker')}</button>
          <button class="slow-button" data-action="scene-speak" data-scene="${scene.id}" data-index="${index}" data-slow="true" aria-label="慢速朗读第 ${index+1} 句">慢速</button></div></li>`).join('')}</ul>
      ${sceneView.bilingual?`<aside class="scene-tip"><strong>常用说法</strong><p>${esc(scene.tip)}</p></aside>`:''}
    </section>
    ${sceneView.bilingual&&study?renderSceneStudy(study):''}`;
}

function studyWords(group) {
  return activeEntries(state,'words').filter(entry=>(entry.category||entry.scene)===group.name);
}

function renderSceneStudy(group) {
  const words=studyWords(group);
  const available=new Set(activeEntries(state,'grammar').map(entry=>entry.id));
  return `<section class="panel scene-study">
    <h2>${esc(group.title)} · 词汇和用法</h2>
    ${words.length?`<div class="scene-study-words">
      <div class="section-title"><h3>${esc(group.name)}</h3><button type="button" class="btn" data-action="study-words-review" data-scene="${group.id}">翻卡复习本组单词</button></div>
      <div class="button-row" aria-label="${esc(group.name)}词卡">${words.map(entry=>`<button type="button" class="btn" data-action="detail" data-id="${esc(entry.id)}" lang="en">${esc(entry.en)}</button>`).join('')}</div>
    </div>`:''}
    <div class="scene-study-contrasts">${group.contrasts.map(({title,card,examples},index)=>`<details ${index===0?'open':''}>
      <summary>${esc(title)}</summary>
      <ul>${examples.map(([en,zh,why])=>`<li><div><strong lang="en">${esc(en)}</strong><span>${esc(zh)}</span><p>${esc(why)}</p></div>${guideAudio(en,{escape:esc,icon})}</li>`).join('')}</ul>
      ${available.has(card)?`<button type="button" class="text-button" data-action="detail" data-id="${card}">查看相关语法卡 ${icon('chevron')}</button>`:''}
    </details>`).join('')}</div>
  </section>`;
}

function render() {
  const s = stats(state);
  const page = ui.page;
  const current = page === 'practice' ? (ui.session?.backPage || 'home') : page;
  const currentSection=subpageParents[current]||current;
  const nav = mobile => sections.map(([key,ic,label,fullLabel])=>{
    const selected=currentSection===key;
    return `<button type="button" class="nav-item ${selected?'active':''}" data-nav="${key}" ${selected?'aria-current="true"':''}>${icon(ic)}<span>${mobile?label:fullLabel||label}</span></button>`;
  }).join('');
  let content;
  if(page==='home') content=renderHome(s);
  else if(page==='focus') content=renderReviewFocus();
  else if(page==='stuck') content=renderStuckPage();
  else if(page==='situations') content=renderReviewScenes();
  else if(page==='grammar-map') content=renderGrammarMap({view:ui.grammarView,branchId:ui.grammarBranch,tenseId:ui.grammarTense,showMore:ui.grammarMore,
    personId:ui.grammarPerson,clauseId:ui.grammarClause,cards:activeEntries(state,'grammar'),escape:esc,icon});
  else if(page==='pronunciation') content=renderPhoneticGuide({escape:esc,icon,slow:ui.ipaSlow});
  else if(page==='course') content=renderCourseHub();
  else if(page==='sources') content=courseSourcePage();
  else if(Object.prototype.hasOwnProperty.call(COURSE_PAGES,page)) content=renderCourse();
  else if(page==='phrases') content=renderPhraseHub();
  else if(modules[page]) content=renderLibrary(page);
  else if(page==='practice') content=renderPractice();
  else content=renderSettings(s);
  const parent=parentPage(page);
  $('#app').innerHTML = `
    <aside class="sidebar"><button class="brand" data-nav="home"><span class="brand-mark">${icon('book')}</span><span>Klaire</span></button>
      <nav aria-label="主导航">${nav(false)}</nav>
      <div class="local-label"><span class="status-dot ${!storageOK?'bad':''}"></span>${storageOK?'记录保存在本机':'请备份当前记录'}</div>
    </aside>
    <div class="workspace"><header class="topbar"><span class="mobile-brand">${icon('book')} Klaire</span><span class="breadcrumb">${pageName(current)}</span>
      <div class="topbar-right"><span class="local-chip">${icon('shield')} 本地版</span></div></header>
    <main id="main" tabindex="-1">
      ${!storageOK ? `<div class="storage-warning" role="alert">${icon('info')}<div><strong>${corruptRaw!==null?'检测到原来的记录格式异常，已保留原文。':'当前修改尚未可靠保存。'}</strong><p>${corruptRaw!==null?'当前展示初始词表；请先下载原始记录和当前备份，再恢复有效备份。':'请不要关闭页面，先下载备份。可能是浏览器禁止保存或存储空间不足。'}</p></div><button class="btn small" data-action="export">下载当前备份</button>${corruptRaw!==null?'<button class="btn small" data-action="export-raw">下载原始记录</button>':''}</div>`:''}
      ${parent?`<div class="page-back"><button type="button" class="text-button" data-action="back-to-parent">${icon('back')} 返回${pageName(parent)}</button></div>`:''}
      ${content}
    </main><footer class="page-footer"><span>学习记录保存在当前浏览器</span><span>Klaire · 本地版 3.10.0</span></footer></div>
    <nav class="mobile-nav" aria-label="手机导航">${nav(true)}</nav>`;
  cloud?.publish();
}

function renderHome(s) {
  const now = Date.now();
  const plan = makeHomeReviewPlan(state,now);
  const next = plan.dueIds.length ? undefined : nextScheduledReview(state,now);
  const last = lastFocusTopic(state);
  const stuck = recentlyStuck(state);
  const recent = [...state.activities].reverse().find(a=>state.entries.some(e=>e.id===a.itemId&&!e.deletedAt));
  const recentEntry = recent && state.entries.find(e=>e.id===recent.itemId);
  return `<section class="hero task-panel"><div class="hero-copy"><h1>今日复习</h1>
      <p><strong>${plan.dueIds.length}</strong> 张已到期${plan.focusDueCount?`，其中 ${plan.focusDueCount} 张是个人重点`:''} · <strong>${plan.newCount}</strong> 张可学新卡</p>
      ${next===undefined?'':`<p class="next-review">下一张卡到期于 ${reviewTime(next)}</p>`}</div>
      <div class="home-review-actions">
        ${plan.ids.length?`<button type="button" class="btn primary large" data-action="start-review">开始复习 ${icon('arrow')}</button>`:'<a class="btn" href="#home-modules-title">浏览学习模块</a>'}
        ${plan.dueIds.length&&plan.newCount?'<button type="button" class="btn" data-action="start-review" data-only-due="true">只复习到期卡</button>':''}
      </div></section>
    <section class="stats-grid" aria-label="学习概况">
      ${[[s.studied,'已学习','book',`共 ${s.total} 条`],[s.reviewedToday,'今日已复习','check',''],[s.spellingToday,'今日拼写','keyboard','']].map(([n,label,ic,small])=>`<div class="stat"><div class="stat-icon ${ic}">${icon(ic)}</div><div><div class="stat-label">${label}</div><strong>${n}</strong>${small?`<small>${small}</small>`:''}</div></div>`).join('')}
    </section>
    <div class="home-content">
      <div class="home-review-hub">
        ${moduleLinks([['focus','我的复习重点',last?`继续上次主题 · ${last.title}`:'从时间与地点介词开始','flag']])}
        <section class="panel review-focus-panel home-stuck" aria-labelledby="home-stuck-title">
          <div class="section-title"><h2 id="home-stuck-title">最近卡住的</h2>${stuck.length?`<button class="text-button" data-nav="stuck">查看全部 ${stuck.length} 张 ${icon('arrow')}</button>`:''}</div>
          ${renderStuckList(stuck.slice(0,3))}
        </section>
      </div>
      <section class="home-modules" aria-labelledby="home-modules-title"><div class="section-title"><h2 id="home-modules-title">学习模块</h2></div><div class="collection-grid">
        ${librarySections.map(([key,title,description,unit,group])=>{
          const entries=group.flatMap(module=>activeEntries(state,module));
          const learned=entries.filter(e=>state.progress[e.id]).length,due=entries.filter(e=>isDue(state,e)).length;
          const section=sections.find(([id])=>id===key);
          return `<button type="button" class="collection ${key}" data-nav="${key}"><div class="collection-top"><span class="collection-icon">${icon(section[1])}</span></div><h3>${title}</h3><p>${description}</p><div class="collection-count"><strong>${entries.length}</strong> ${unit} ${icon('arrow')}</div><progress value="${learned}" max="${entries.length||1}" aria-label="${title}已学习${learned}条"></progress><div class="collection-bottom"><span>已学习 ${learned} / ${entries.length}</span><span>${due} 条待复习</span></div></button>`;
        }).join('')}
      </div></section>
      <section class="home-course-entry collection-grid" aria-label="新概念教材"><button type="button" class="collection textbook-card" data-nav="course">
        <div class="collection-top"><span class="collection-icon">${icon('book')}</span></div><h3>新概念教材</h3><p>课文、逐课单词和短语</p>
        <div class="collection-count">${icon('chevron')}</div><div class="textbook-card-rule" aria-hidden="true"></div><div class="collection-bottom"><span>一册 · ${BOOKS[1].count} 课</span><span>二册 · ${BOOKS[2].count} 课</span></div>
      </button></section>
      <div><button type="button" class="text-button" data-nav="settings">${icon('settings')} 备份与设置</button></div>
    </div>
    ${recentEntry?`<section class="panel home-recent"><h2>最近学习</h2><button class="last-entry" data-action="detail" data-id="${recentEntry.id}">${esc(entryTitle(recentEntry))} ${icon('arrow')}</button></section>`:''}`;
}

function filteredEntries() {
  const query = ui.search.trim().toLocaleLowerCase();
  return activeEntries(state,ui.page).filter(e=>{
    const p=state.progress[e.id];
    const status=ui.filter==='all'||(ui.filter==='new'&&!p&&!e.needsCheck)||(ui.filter==='due'&&isDue(state,e))||(ui.filter==='learned'&&p)||(ui.filter==='favorite'&&e.favorite)||(ui.filter==='pending'&&e.needsCheck);
    const scope=(ui.book==='all'||e.book===ui.book)&&(ui.category==='all'||entryCategory(e)===ui.category);
    if(!status||!scope)return false;
    if(!query)return true;
    const breakdown=e.kind==='grammar'?GRAMMAR_BREAKDOWNS[e.id]:null;
    return [entryTitle(e),entryMeaning(e),e.notes,e.scene,e.sourceNote,e.prompt,e.structures,e.mistakes,e.comparison,
      e.example,e.exampleZh,categoryLabel(e.module,entryCategory(e)),
      breakdown?.en,breakdown?.zh,breakdown?.reason,...(breakdown?.parts||[]).map(([,role])=>role),...(e.examples||[]).flatMap(x=>[x.en,x.zh])
    ].some(s=>(s||'').toLocaleLowerCase().includes(query));
  });
}
function renderLibraryIndexControls(module,pending) {
  const isWords=module==='words';
  const activeFilters=[ui.book,ui.category,ui.filter].filter(value=>value!=='all').length;
  return `<section class="panel library-index-controls" aria-labelledby="library-heading">
    <div class="library-index-heading">
      <span class="reference-feature-icon">${icon(isWords?'letters':'list')}</span>
      <div><h2 id="library-heading">${isWords?'词条':'语法目录'}</h2><span id="result-summary" aria-live="polite">${resultSummary()}</span></div>
    </div>
    <div class="library-index-actions" role="group" aria-label="${isWords?'词条操作':'语法目录操作'}">
      <button type="button" class="btn primary" data-action="start-review" data-module="${module}" aria-label="复习当前范围">${icon('refresh')} 复习</button>
      ${isWords?`<button type="button" class="btn" data-action="start-spelling" aria-label="拼写练习">${icon('keyboard')} 拼写</button>`:''}
      <button type="button" class="btn" data-action="add" aria-label="新增${isWords?'单词':'语法卡'}">${icon('plus')} 新增</button>
    </div>
    <div class="library-index-search">
      <label class="search-box">${icon('search')}<input id="library-search" type="search" placeholder="${isWords?'搜索单词、搭配或备注':'搜索知识点、例句或备注'}" value="${esc(ui.search)}" aria-label="${isWords?'搜索单词':'搜索语法知识点'}"></label>
      <button type="button" class="btn" id="library-filter-toggle" data-action="library-filter-toggle" aria-expanded="${ui.libraryFiltersOpen}" aria-controls="library-index-filters">${icon('settings')} 筛选${activeFilters?` <span>${activeFilters}</span>`:''}</button>
    </div>
    <div id="library-index-filters" class="library-index-filters" ${ui.libraryFiltersOpen?'':'hidden'}>
      ${scopeControls(module)}
      ${libraryStatusFilters(module,pending)}
      ${ui.filter==='pending'?'<p class="subtle">核对并保存后即可加入复习。</p>':''}
      ${activeFilters?'<button type="button" class="text-button" data-action="clear-library-filters">清除筛选</button>':''}
    </div>
  </section>`;
}
function renderLibrary(module) {
  const m=modules[module], entries=activeEntries(state,module), pending=entries.filter(e=>e.needsCheck).length;
  const isGrammar=module==='grammar', isWords=module==='words';
  return `<section class="page-heading library-heading"><div><h1>${m.title}<span class="count-badge">${entries.length}</span></h1>${isGrammar?'':`<p>${m.subtitle}</p>`}</div>
    ${commonModules.includes(module)?`<button type="button" class="text-button" data-nav="course-phrases-${module==='nce1'?1:2}">查看本册逐课短语 ${icon('chevron')}</button>`:''}</section>
    ${isGrammar?`<section class="reference-block" aria-label="语法查阅">
      <button type="button" class="reference-feature" data-action="open-grammar-view" data-view="overview">${referenceFeatureContent('syntax','语法导图','按主题查看语法知识点')}</button>
      <div class="grammar-shortcuts" role="group" aria-label="语法查阅入口">${GUIDE_VIEWS.filter(([id])=>id!=='overview').map(([id,label])=>`<button type="button" class="btn" data-action="open-grammar-view" data-view="${id}">${label}</button>`).join('')}</div>
    </section>`:''}
    ${isWords?`<section class="reference-block" aria-label="发音查阅"><button type="button" class="reference-feature" data-nav="pronunciation">${referenceFeatureContent('speaker','音标与发音','44 个英式音标 · 单听发音和例词')}</button></section>`:''}
    ${usesLibraryIndex(module)?renderLibraryIndexControls(module,pending):`<section class="panel library-controls" aria-labelledby="library-heading">
      <h2 id="library-heading">短语列表</h2>
      <div class="library-tools"><label class="search-box">${icon('search')}<input id="library-search" type="search" placeholder="搜索英文、中文或备注" value="${esc(ui.search)}" aria-label="搜索学习内容"></label><button type="button" class="btn" data-action="add">${icon('plus')} 新增短语</button></div>
      ${scopeControls(module)}
      ${libraryStatusFilters(module,pending)}
      <div class="library-actions"><div class="results-meta"><span id="result-summary" aria-live="polite">${resultSummary()}</span>${ui.filter==='pending'?'<span>核对并保存后即可加入复习</span>':''}</div>
        <div class="button-row"><button type="button" class="btn primary" data-action="start-review" data-module="${module}">${icon('refresh')} 复习当前范围</button></div>
      </div>
    </section>`}
    <div id="library-results">${libraryResults()}</div>
    ${isWords?`<section class="panel library-index-group word-course-entry" aria-label="教材词表">
      <button type="button" data-nav="course-words"><strong>新概念教材单词</strong><span>按课查找</span></button>
    </section>`:''}`;
}
function resultSummary() {
  const n=filteredEntries().length;
  if(usesLibraryIndex(ui.page)&&n<=ui.limit)return `${n} 条`;
  return `${ui.search?'搜索结果':'当前显示'} ${Math.min(ui.limit,n)} / ${n} 条`;
}
function libraryResults() {
  const entries=filteredEntries();
  if(!entries.length) return `<div class="empty-state">${icon(ui.filter==='due'?'check':'search')}<h2>${ui.filter==='due'?'暂时没有到期的内容':'这里还没有匹配的内容'}</h2><p>${ui.filter==='due'?'可以切换“未学”开始积累，或者稍后再来。':'试试其他关键词或筛选，也可以新增自己的内容。'}</p><button class="btn" data-action="clear-filter">查看全部</button></div>`;
  const list=usesLibraryIndex(ui.page)?renderLibraryIndex(ui.page,entries,ui.limit):`<div class="entry-grid phrases">${entries.slice(0,ui.limit).map(entryCard).join('')}</div>`;
  return list+(entries.length>ui.limit?`<div class="load-more"><button class="btn" data-action="load-more">再看 ${Math.min(24,entries.length-ui.limit)} 条 ${icon('chevron')}</button></div>`:'');
}
function renderLibraryResults() {if($('#library-results')){$('#library-results').innerHTML=libraryResults();$('#result-summary').textContent=resultSummary();}}
function entryCard(e) {
  return `<article class="entry-card ${e.needsCheck?'needs-check':''}"><div class="entry-top"><span>${statusOf(e)} ${e.lessonNumber?`<span class="tag">第${e.lessonNumber}课</span>`:''}</span><button class="icon-button favorite ${e.favorite?'selected':''}" data-action="favorite" data-id="${e.id}" aria-pressed="${e.favorite}" aria-label="${e.favorite?'取消收藏':'收藏'} ${esc(e.en)}">${icon('star')}</button></div>
    <button class="entry-title" data-action="detail" data-id="${e.id}">${esc(e.en)}</button><div class="ipa">/${esc(e.ipa)||'待补充'}/ <small>${esc(e.pos)}</small></div><p class="entry-meaning">${esc(e.zh)}</p>${phraseUsage(e)}<div class="entry-example"><p lang="en">${esc(e.example)}</p><span>${esc(e.exampleZh)}</span></div>
    ${e.notes?`<div class="note-preview">${icon('edit')}<span>${esc(e.notes)}</span></div>`:''}${e.needsCheck?`<p class="check-preview">${icon('flag')} ${esc(e.sourceNote)}</p>`:''}
    <div class="entry-footer"><div class="audio-buttons"><button class="sound-button" data-action="speak" data-id="${e.id}" aria-label="朗读 ${esc(e.en)}">${icon('speaker')}</button><button class="slow-button" data-action="speak-slow" data-id="${e.id}" aria-label="慢速朗读 ${esc(e.en)}">慢速</button></div><button class="text-button muted" data-action="edit" data-id="${e.id}">${icon('edit')} 备注 / 编辑</button></div></article>`;
}

function startReview(module, scopedIds, onlyDue=false) {
  const homePlan=ui.page==='home'&&!module&&!scopedIds?makeHomeReviewPlan(state):null;
  const ids=homePlan?(onlyDue?homePlan.dueIds:homePlan.ids)
    : makeQueue(state,{module,onlyDue,ids:scopedIds??(module&&ui.page===module?filteredEntries().map(e=>e.id):undefined)});
  if(!ids.length&&onlyDue){
    render();
    toast('这里目前没有已到期的卡片。');
    return;
  }
  if(!ids.length&&ui.page==='focus'){
    openModal('<h2 id="dialog-title">本组暂时没有待复习卡片</h2><p>卡片还未到期，或今日的新内容额度已经用完。你仍可以打开卡片查看讲解。</p><button class="btn primary" data-action="close-dialog">返回复习重点</button>');
    return;
  }
  if(!ids.length) {openModal(`<div class="modal-icon">${icon('check')}</div><h2 id="dialog-title">当前没有可学习的内容</h2><p>当前没有到期内容，或今天的新内容额度已用完。你可以在设置中调整每日新内容数量，也可以做单词拼写练习。</p><p class="subtle">“待核对”的词条需要先确认，才会加入学习。</p><button class="btn primary" data-action="close-dialog">知道了</button>`);return;}
  const focusTopic=ui.page==='focus'?currentFocusTopic().id:'';
  ui.session={mode:'review',ids,index:0,flipped:false,done:false,results:[],direction:state.settings.direction,backPage:ui.page,backScroll:window.scrollY,focusTopic};ui.page='practice';showPage();
}
function startSpelling() {
  const entries=filteredEntries().filter(e=>!e.needsCheck);
  for(let i=entries.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[entries[i],entries[j]]=[entries[j],entries[i]];}
  if(!entries.length){toast('当前筛选范围没有可拼写的单词，可以换一个分类或学习状态。');return;}
  ui.session={mode:'spelling',ids:entries.slice(0,10).map(e=>e.id),index:0,done:false,results:[],answered:false,input:'',backPage:ui.page,backScroll:window.scrollY};ui.page='practice';showPage();$('#spelling-input')?.focus();
}
function renderCompletion(session) {
  const isReview=session.mode==='review';
  const groupOptions=isReview?recallOptions:[
    {id:'wrong',label:'拼写有误'},
    {id:'correct',label:'拼写正确'}
  ];
  const groups=groupOptions.map(option=>({...option,results:session.results.filter(result=>
    option.id===(isReview?result.rating:result.correct?'correct':'wrong'))}));
  const byId=new Map(state.entries.map(entry=>[entry.id,entry]));
  return `<div class="practice-wrap"><section class="panel review-completion">
    <div class="section-title"><div><h1 id="completion-heading" tabindex="-1">${isReview?'本次复习结果':'本次拼写结果'}</h1><p>完成 ${session.results.length} ${isReview?'张卡':'次拼写'}</p></div>
      <button type="button" class="btn primary" data-action="end-session">返回${pageName(session.backPage)}</button></div>
    <dl class="result-counts ${isReview?'':'spelling-counts'}">${groups.map(group=>`<div class="${group.id}"><dt>${group.label}</dt><dd>${group.results.length}</dd></div>`).join('')}</dl>
    ${groups.filter(group=>group.results.length).map(group=>`<details class="review-result-group" ${['remembered','correct'].includes(group.id)?'':'open'}>
      <summary>${group.label} · ${group.results.length} ${isReview?'张':'条'}</summary>
      <ul class="review-focus-list">${group.results.map(result=>{
        const dueAt=isReview?state.progress[result.id]?.dueAt:undefined;
        return `<li><button type="button" class="text-button" data-action="detail" data-id="${result.id}">${esc(entryTitle(byId.get(result.id)))} ${icon('chevron')}</button>${dueAt===undefined?'':`<small class="result-time">${reviewTime(dueAt)}复习</small>`}</li>`;
      }).join('')}</ul></details>`).join('')}
    ${storageOK?'':'<p class="subtle">本次记录暂存于页面，请下载备份。</p>'}
  </section></div>`;
}

function renderPractice() {
  const s=ui.session;
  if(!s) return '';
  if(s.done)return renderCompletion(s);
  const e=state.entries.find(e=>e.id===s.ids[s.index]);
  if(e.kind==='grammar')return renderGrammarPractice(e,s);
  const reverse=s.direction==='zh-en';
  return `${practiceHeader(s,s.mode==='review'?'翻卡复习':'单词拼写')}
    <div class="practice-wrap"><div class="practice-label">${icon(modules[e.module].icon)} ${modules[e.module].title}<span>·</span>${s.mode==='review'?(state.progress[e.id]?'复习内容':'新内容'):'看中文，写英文'}</div>
      ${s.mode==='review'?`<div class="direction-switch" role="group" aria-label="回忆方向"><button data-action="direction" data-value="en-zh" class="${!reverse?'active':''}" aria-pressed="${!reverse}">看英文想中文</button><button data-action="direction" data-value="zh-en" class="${reverse?'active':''}" aria-pressed="${reverse}">看中文想英文</button></div>`:''}
      <article class="flashcard ${s.flipped||s.answered?'revealed':''}"><span class="eyebrow">${s.mode==='spelling'?'单词拼写':s.flipped?'答案':'回忆'}</span><h1 id="review-card-heading" tabindex="-1" class="flash-term ${reverse||s.mode==='spelling'?'chinese':''}" lang="${reverse||s.mode==='spelling'?'zh-CN':'en'}">${esc(s.mode==='spelling'||reverse?e.zh:e.en)}</h1>
      ${s.mode==='review'&&!reverse?`<p class="flash-ipa">/${esc(e.ipa)||'待补充'}/</p>`:''}
      ${s.mode==='review'?`<div class="flash-sounds"><button class="btn round" data-action="speak" data-id="${e.id}" aria-label="听当前内容的发音">${icon('speaker')}</button><button class="text-button muted" data-action="speak-slow" data-id="${e.id}">慢速${reverse&&!s.flipped?'提示':''}</button></div>${s.flipped?`<div class="flash-answer"><h2>${esc(reverse?e.en:e.zh)}</h2>${reverse?`<p class="ipa">/${esc(e.ipa)||'待补充'}/</p>`:''}<p class="example-en" lang="en">${esc(e.example)}</p><p class="example-zh">${esc(e.exampleZh)}</p>${phraseUsage(e)}${renderWordCollocations(e)}${e.notes?`<div class="flash-note">${icon('edit')} ${esc(e.notes)}</div>`:''}</div>`:`<p class="recall-hint">回忆后点击“查看答案”。</p><button class="btn primary reveal-button" data-action="flip">${icon('eye')} 查看答案 <kbd>空格</kbd></button>`}`:
      `<form id="spelling-form" class="spelling-form"><label class="sr-only" for="spelling-input">输入英文拼写</label><input id="spelling-input" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="在这里写下英文…" maxlength="500" value="${esc(s.input)}" ${s.answered?'disabled':''} required>${s.answered?`<div class="spelling-result ${s.correct?'correct':'incorrect'}" role="status">${icon(s.correct?'check':'refresh')} ${s.correct?'拼写正确。':'拼写错误，正确答案如下。'}</div><h2 class="spelling-answer" lang="en">${esc(e.en)}</h2><p class="ipa">/${esc(e.ipa)||'待补充'}/</p><div class="flash-sounds"><button type="button" class="btn round" data-action="speak" data-id="${e.id}" aria-label="朗读正确拼写">${icon('speaker')}</button><button type="button" class="text-button muted" data-action="speak-slow" data-id="${e.id}">慢速</button></div><p class="example-en" lang="en">${esc(e.example)}</p><p class="example-zh">${esc(e.exampleZh)}</p><button type="button" class="btn primary" data-action="next-spelling">${s.index+1===s.ids.length?'查看本次结果':'下一个'} ${icon('arrow')}</button>`:`<button type="submit" class="btn primary">检查拼写 ${icon('check')}</button><button type="button" class="text-button muted" data-action="skip-spelling">不知道，看看答案</button>`}</form>`}
      </article>
      ${s.mode==='review'&&s.flipped?reviewRatings(e):''}
      ${s.mode==='spelling'?'<p class="practice-footnote">从当前筛选范围随机抽取最多 10 个单词，拼写成绩单独统计。</p>':''}
    </div>`;
}
function revealCard() {
  const session=ui.session;
  if(session?.mode!=='review'||session.done||session.flipped)return;
  session.flipped=true;
  render();
  $('#review-card-heading')?.focus({preventScroll:true});
}

function rate(rating) {
  const session=ui.session;
  if(!session||session.mode!=='review'||!session.flipped||session.done)return;
  const id=session.ids[session.index];
  const topic=focusTopicForCard(id,session.focusTopic||lastFocusTopic(state)?.id);
  commit(next=>{
    recordReview(next,id,rating);
    if(topic)next.settings.lastFocusTopic=topic.id;
  });
  session.results.push({id,rating});
  session.index++;
  session.flipped=false;
  session.done=session.index>=session.ids.length;
  showPage();
  $(session.done?'#completion-heading':'#review-card-heading')?.focus({preventScroll:true});
}
function answerSpelling(skip=false) {
  const s=ui.session;if(!s||s.mode!=='spelling'||s.answered||s.done)return;
  const e=state.entries.find(e=>e.id===s.ids[s.index]);
  s.input=$('#spelling-input')?.value||'';
  if(!skip&&!s.input.trim()){toast('先写下你想到的拼写，或者选择看看答案。');return;}
  s.correct=!skip&&checkSpelling(s.input,e.en);s.answered=true;
  commit(next=>recordSpelling(next,e.id,s.correct));s.results.push({id:e.id,correct:s.correct});render();
  $('[data-action="next-spelling"]')?.focus();
}

function renderSettings(s) {
  const matching=voices.filter(v=>v.lang.toLowerCase()===state.settings.accent.toLowerCase());
  const trash=state.entries.filter(e=>e.deletedAt);
  let previous=false,upgrade=false;try{previous=!!repository.previousRaw();upgrade=!!repository.beforeUpgradeRaw();}catch{}
  return `<section class="page-heading library-heading"><div><h1>备份与设置</h1></div></section>
    ${cloud?.panel() || ''}
    <section class="panel backup-panel"><div class="panel-heading">${icon('download')}<div><h2>学习记录备份</h2><p>换设备或清理浏览器前，请先下载一份。</p></div></div>
      <div class="backup-content"><div><div class="backup-summary"><span><strong>${s.total}</strong> 条学习内容</span><span><strong>${state.activities.length}</strong> 次练习记录</span></div>
      <p>备份包含课文、词条、笔记、收藏、进度和设置。恢复会先显示备份内容供你确认。</p>
      <div class="button-row"><button type="button" class="btn primary" data-action="export">${icon('download')} 下载完整备份</button><button type="button" class="btn" data-action="import">${icon('upload')} 从备份恢复</button></div>
      ${upgrade||previous?`<div class="button-row backup-history">${upgrade?'<button type="button" class="text-button" data-action="export-upgrade">下载升级前的副本</button>':''}${previous?'<button type="button" class="text-button" data-action="export-previous">下载上次恢复前的副本</button>':''}</div>`:''}</div>
      <div class="backup-aside">${icon('shield')}<strong>存在当前浏览器</strong><p>更换设备时，可以把备份导入新设备。</p></div></div>
    </section>
    <div class="settings-grid"><section class="panel settings-panel"><div class="panel-heading">${icon('sprout')}<div><h2>学习偏好</h2><p>设置每日新内容数量和回忆方向。</p></div></div>
      <label class="setting-row"><span><strong>每天学习的新内容</strong><small>各学习模块共用每日额度。到期复习不受此限制。</small></span><select data-setting="newPerDay">${NEW_PER_DAY_OPTIONS.map(option=>`<option value="${option}" ${state.settings.newPerDay===option?'selected':''}>${option==='unlimited'?'无限制':`${option} 条 / 天`}</option>`).join('')}</select></label>
      <label class="setting-row"><span><strong>默认回忆方向</strong><small>单词、短语可切换；语法采用知识点回忆。</small></span><select data-setting="direction"><option value="en-zh" ${state.settings.direction==='en-zh'?'selected':''}>看英文想中文</option><option value="zh-en" ${state.settings.direction==='zh-en'?'selected':''}>看中文想英文</option></select></label>
      <div class="setting-note">${icon('info')}“记住了”按1、3、7、14、30天递进；“模糊”次日复习，“忘了”10分钟后复习并重置间隔。</div>
    </section><section class="panel settings-panel"><div class="panel-heading">${icon('speaker')}<div><h2>发音与口音</h2><p>音标统一显示英式；朗读可以切换。</p></div></div>
      <label class="setting-row"><span><strong>朗读口音</strong><small>只使用设备提供的本机英语声音。</small></span><select data-setting="accent"><option value="en-GB" ${state.settings.accent==='en-GB'?'selected':''}>英式英语</option><option value="en-US" ${state.settings.accent==='en-US'?'selected':''}>美式英语</option></select></label>
      <label class="voice-label" for="voice-select">本机声音</label><select id="voice-select" data-setting="voiceURI" ${!matching.length?'disabled':''}>${matching.length?`<option value="">自动选择本机声音</option>${matching.map(v=>`<option value="${esc(v.voiceURI)}" ${v.voiceURI===state.settings.voiceURI?'selected':''}>${esc(v.name)}</option>`).join('')}`:'<option>未找到对应口音的本机声音</option>'}</select>
      <div class="voice-test"><button class="btn small" data-action="test-voice">${icon('speaker')} 试听一句</button><span class="subtle">This is an English pronunciation test.</span></div><p class="fine-print">若没有声音，请先在系统设置中安装对应英语语音包，再重开浏览器。此版本不使用网络声音，不自动换成其他口音，也不调用付费朗读服务。</p>
    </section></div>
    <div class="settings-grid"><section class="panel info-panel"><h2>${icon('trash')} 回收站 <span class="count-badge">${trash.length}</span></h2><p>删除的内容先保留在这里，不参与学习；恢复后保留原有进度。</p>${trash.length?`<div class="trash-list">${trash.map(e=>`<div><span>${esc(entryTitle(e))}<small>${modules[e.module].title}</small></span><button class="text-button" data-action="restore-entry" data-id="${e.id}">${icon('refresh')} 恢复</button></div>`).join('')}</div>`:'<div class="empty-small">回收站为空。</div>'}</section><section class="panel info-panel"><h2>${icon('book')} 使用小贴士</h2><ul class="tips-list"><li>使用本地启动入口，保持 <strong>http://localhost:4173</strong> 和同一个浏览器。更换网址或浏览器后，需要导入备份。</li><li>请勿使用无痕模式保存长期学习记录；清除浏览器数据会影响本机记录。</li><li>照片转录、中文释义和音标是整理稿，请逐步核对；你新增的音标需要自己填写。</li><li>手机正式网址和 Supabase 接入留给下一阶段。本地启动只开放给这台电脑。</li></ul></section></div>`;
}

function openModal(html, wide=false) {
  if($('#dialog').open)$('#dialog').close();
  confirmAction=null;$('#dialog').className=wide?'wide':'';
  $('#dialog').innerHTML=`<button class="dialog-close icon-button" data-action="close-dialog" aria-label="关闭">${icon('close')}</button>${html}`;
  $('#dialog').showModal();
}
function showConfirm(title,body,label,callback) {
  openModal(`<h2 id="dialog-title">${esc(title)}</h2><div class="confirm-body">${body}</div><div class="dialog-actions"><button class="btn" data-action="close-dialog">取消</button><button class="btn primary" data-action="confirm">${esc(label)}</button></div>`);
  confirmAction=callback;
}
function findEntry(id) {return state.entries.find(e=>e.id===id);}
function detail(id) {
  const e=findEntry(id);if(!e)return;
  if(e.kind==='grammar'){
    openModal(`<div class="grammar-labels"><span>${esc(e.book)}</span><span>${esc(e.category)}</span>${statusOf(e)}</div><h2 id="dialog-title">${esc(e.title)}</h2><p class="grammar-prompt">${esc(e.prompt)}</p>${grammarExplanation(e)}<p class="fine-print">${esc(e.source)}。${esc(e.sourceNote)}</p><div class="dialog-actions"><button class="btn" data-action="close-dialog">关闭</button><button class="btn primary" data-action="edit" data-id="${e.id}">编辑与备注</button></div>`,true);return;
  }
  const collocations=renderWordCollocations(e);
  openModal(`<span class="eyebrow">${modules[e.module].eyebrow}</span><h2 id="dialog-title" class="detail-term" lang="en">${esc(e.en)}</h2><div class="detail-line"><span class="ipa">/${esc(e.ipa)||'待补充'}/</span><span>${esc(e.pos)}</span>${statusOf(e)}</div><div class="button-row"><button class="btn small" data-action="speak" data-id="${e.id}">${icon('speaker')} 朗读</button><button class="btn small" data-action="speak-slow" data-id="${e.id}">慢速</button></div><h3 class="detail-meaning">${esc(e.zh)}</h3><div class="detail-example"><p lang="en">${esc(e.example)}</p><p>${esc(e.exampleZh)}</p></div>${collocations}<dl class="detail-notes"><dt>使用场景</dt><dd>${esc(e.scene)||'未填写'}</dd><dt>我的备注</dt><dd>${esc(e.notes)||'还没有备注，可以记下自己的联想或易错点。'}</dd><dt>资料来源</dt><dd>${esc(e.source)}${e.sourceNote&&!collocations?`<p class="${e.needsCheck?'warning-text':''}">${esc(e.sourceNote)}</p>`:''}</dd></dl><div class="dialog-actions"><button class="btn" data-action="close-dialog">关闭</button><button class="btn primary" data-action="edit" data-id="${e.id}">${icon('edit')} ${e.needsCheck?'核对并编辑':'编辑与备注'}</button></div>`,true);
}
function editEntry(id) {
  const existing=id&&findEntry(id);
  if(existing?.kind==='grammar'||(!existing&&ui.page==='grammar')){editGrammar(existing);return;}
  const e=existing||{module:modules[ui.page]?ui.page:'words',en:'',zh:'',ipa:'',pos:'',example:'',exampleZh:'',scene:'',notes:'',source:'我自己添加',sourceNote:'',needsCheck:false};
  const field=(name,label,max=4000,placeholder='')=>`<label>${label}<input name="${name}" value="${esc(e[name])}" maxlength="${max}" ${['en','zh'].includes(name)?'required':''} placeholder="${esc(placeholder)}"></label>`;
  const moduleField=LESSON_MODULES.includes(e.module)
    ? `<p>${BOOKS[e.bookNumber].name} · 第${e.lessonNumber}课 <input type="hidden" name="module" value="${e.module}"></p>`
    : `<label>所属模块<select name="module">${libraryModules.filter(([k])=>k!=='grammar').map(([k,m])=>`<option value="${k}" ${e.module===k?'selected':''}>${m.title}</option>`).join('')}</select></label>`;
  openModal(`<span class="eyebrow">词条编辑</span><h2 id="dialog-title">${existing?'编辑词条':'添加一条新内容'}</h2><form id="entry-form" data-id="${id||''}"><div class="form-grid">${moduleField}${field('pos','词性 / 类型',100,'例如：名词、动词短语')}${field('en','英文（必填）',500)}${field('zh','中文含义（必填）',1000)}${field('ipa','英式音标',500,'可不加两边的 /')}${field('scene','使用场景',500,'例如：购物 · 询价')}</div>${field('example','英文例句',2000)}${field('exampleZh','例句中文',2000)}<label>我的备注<textarea name="notes" maxlength="8000" rows="3" placeholder="记下易错点、联想，或自己的例句…">${esc(e.notes)}</textarea></label>${commonModules.includes(e.module)?`<label>用法与整理说明<textarea name="sourceNote" maxlength="4000" rows="3">${esc(e.sourceNote)}</textarea></label>`:''}${e.sourceNote&&!commonModules.includes(e.module)?`<div class="source-check"><strong>整理时的说明</strong><p>${esc(e.sourceNote)}</p></div>`:''}<label class="checkbox-row"><input type="checkbox" name="verified" ${e.needsCheck?'':'checked'}>我已核对这条内容，可加入学习</label><p class="fine-print">新增内容不会自动生成音标。音标或例句暂时留空也能保存，以后可以补充。</p><div class="dialog-actions">${existing?`<button type="button" class="text-button danger push-left" data-action="delete" data-id="${e.id}">${icon('trash')} 移到回收站</button>`:''}<button type="button" class="btn" data-action="close-dialog">取消</button><button type="submit" class="btn primary">${icon('check')} 保存</button></div></form>`,true);
  $('#dialog input[name="en"]')?.focus();
}
function saveEntry(form) {
  const f=new FormData(form),id=form.dataset.id;
  const en=f.get('en').trim(),zh=f.get('zh').trim();
  if(!en||!zh){toast('英文和中文含义都需要填写。');return;}
  const newId=id||`user-${studyUuid()}`;
  commit(next=>{
    let e=next.entries.find(e=>e.id===id);
    if(!e){e={id:newId,source:'我自己添加',sourceNote:'',favorite:false,deletedAt:0};next.entries.push(e);}
    for(const key of ['module','en','zh','ipa','pos','example','exampleZh','scene','notes'])e[key]=String(f.get(key)||'').trim();
    if(f.has('sourceNote'))e.sourceNote=String(f.get('sourceNote')).trim();
    e.kind=kindFor(e.module);e.ipa=e.ipa.replace(/^\/+|\/+$/g,'').trim();e.needsCheck=!f.has('verified');
  });
  $('#dialog').close();render();toast('已保存这条内容。');
}
function editGrammar(existing) {
  const e=existing||{title:'',category:'句型',book:'一册基础',prompt:'',explanation:'',structures:'',examples:[{en:'',zh:''}],mistakes:'',comparison:'',notes:''};
  const field=(key,label,required=false)=>`<label>${label}<textarea name="${key}" rows="${['explanation','structures'].includes(key)?3:2}" maxlength="${key==='notes'?8000:4000}" ${required?'required':''}>${esc(e[key])}</textarea></label>`;
  openModal(`<span class="eyebrow">语法卡编辑</span><h2 id="dialog-title">${existing?'编辑语法卡':'新增语法卡'}</h2><form id="grammar-form" data-id="${existing?.id||''}"><div class="form-grid"><label>知识点名称（必填）<input name="title" value="${esc(e.title)}" maxlength="300" required></label><label>分类（必填）<input name="category" value="${esc(e.category)}" maxlength="100" required></label><label>册别<select name="book">${['一册基础','二册进阶','两册共有'].map(b=>`<option ${e.book===b?'selected':''}>${b}</option>`).join('')}</select></label></div>${field('prompt','翻卡正面的回忆问题（必填）',true)}${field('explanation','中文用法讲解（必填）',true)}${field('structures','句型结构（可分行）')}<fieldset class="examples-editor"><legend>双语例句（至少一组，两行一组）</legend><p class="fine-print">一行英文，下一行中文。多组之间空一行，最多12组。每组英文可单独朗读。</p><textarea name="examples" aria-label="双语例句" rows="8" maxlength="48000" required>${esc(e.examples.map(x=>`${x.en}\n${x.zh}`).join('\n\n'))}</textarea></fieldset>${field('mistakes','易错点')}${field('comparison','对比记忆')}${field('notes','我的备注')}<div class="dialog-actions">${existing?`<button type="button" class="text-button danger push-left" data-action="delete" data-id="${e.id}">移到回收站</button>`:''}<button type="button" class="btn" data-action="close-dialog">取消</button><button class="btn primary" type="submit">保存</button></div></form>`,true);
  $('#dialog input[name="title"]')?.focus();
}
function saveGrammar(form) {
  const f=new FormData(form),id=form.dataset.id;
  const exampleLines=String(f.get('examples')).split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  if(exampleLines.length<2||exampleLines.length%2||exampleLines.length>24||exampleLines.some(x=>x.length>2000)){toast('例句请按一行英文、一行中文填写，至少一组，最多12组，每行不超过2000字。');return;}
  const e={...(id?findEntry(id):{id:`user-${studyUuid()}`,source:'我自己添加',sourceNote:'',favorite:false,deletedAt:0}),module:'grammar',kind:'grammar',needsCheck:false};
  for(const key of ['title','category','book','prompt','explanation','structures','mistakes','comparison','notes'])e[key]=String(f.get(key)||'').trim();
  e.examples=exampleLines.filter((_,i)=>i%2===0).map((en,i)=>({en,zh:exampleLines[i*2+1]}));
  try{const probe=cloneStudyData(state);const i=probe.entries.findIndex(x=>x.id===e.id);if(i<0)probe.entries.push(e);else probe.entries[i]=e;validateState(probe);}catch(err){toast(err.message);return;}
  commit(next=>{const i=next.entries.findIndex(x=>x.id===e.id);if(i<0)next.entries.push(e);else next.entries[i]=e;});
  $('#dialog').close();render();toast('语法卡已保存。');
}
function parentPage(page) {
  return subpageParents[page]?(returnViews[returnViews.length - 1]?.view.page||subpageParents[page]):null;
}

function showPage(scroll=0) {
  render();
  $('#main').focus({preventScroll:true});
  window.scrollTo(0,scroll);
}

function returnToView(index) {
  const {view,scroll}=returnViews[index];
  returnViews.length=index;
  Object.assign(ui,view);
  showPage(scroll);
}

function backToParent() {
  const parent=parentPage(ui.page);
  if(!parent)return;
  if(returnViews.length)returnToView(returnViews.length-1);
  else navigate(parent);
}

function navigate(page,force=false) {
  const isSubpage=Object.prototype.hasOwnProperty.call(subpageParents,page);
  if(!isSubpage&&!sections.some(([key])=>key===page))return;
  if(page===ui.page)return;
  if(ui.page==='practice'&&ui.session&&!ui.session.done&&!force){showConfirm('先结束这次练习吗？','<p>已经完成的答案都已记录。未完成的内容可以下次继续学习。</p>','结束并返回',()=>navigate(page,true));return;}
  if(ui.page==='practice'&&page===ui.session?.backPage){
    const scroll=ui.session.backScroll;
    Object.assign(ui,{page,session:null});
    showPage(scroll);
    return;
  }
  if(isSubpage){
    const backIndex=returnViews.findIndex(item=>item.view.page===page);
    if(backIndex>=0){returnToView(backIndex);return;}
    if(ui.page!=='practice')returnViews.push({view:{...ui},scroll:window.scrollY});
  }else returnViews.length=0;
  Object.assign(ui,{page,session:null,courseLesson:page==='course-text'?1:0,search:'',filter:'all',book:'all',category:'all',libraryFiltersOpen:false,limit:defaultListLimit(page)});
  showPage();
}

function editCourseText() {
  const {book,lesson}=courseScope();
  const record=state.lessons[lessonKey(book,lesson)]||{};
  openModal(`<h2 id="dialog-title">${BOOKS[book].name} 第${lesson}课 · 课文</h2>
    <form id="lesson-form" data-book="${book}" data-lesson="${lesson}">
    <label>课名<input name="title" maxlength="300" value="${esc(record.title)}"></label>
    <label>英文课文或笔记<textarea name="text" rows="8" maxlength="15000">${esc(record.text)}</textarea></label>
    <label>中文参考<textarea name="translation" rows="4" maxlength="15000">${esc(record.translation)}</textarea></label>
    <label>资料版本或来源<input name="source" maxlength="300" value="${esc(record.source)}" placeholder="例如：外研社智慧版纸质教材"></label>
    <div class="dialog-actions"><button class="btn primary" type="submit">保存课文</button></div></form>`,true);
}

function addCourseEntries(requestedModule) {
  const {book,lesson,module}=courseScope(requestedModule);
  const type=module==='course-words'?'words':'phrases';
  const label=type==='words'?'单词':'短语';
  const options=Array.from({length:BOOKS[book].count},(_,i)=>`<option value="${i+1}"${lesson===i+1?' selected':''}>第${i+1}课</option>`).join('');
  openModal(`<h2 id="dialog-title">添加${BOOKS[book].name}${label}</h2><form id="course-add-form" data-book="${book}" data-type="${type}"><label>课号<select name="lesson">${options}</select></label>
    <label>${label}列表<textarea name="items" rows="9" maxlength="100000" required placeholder="英文｜中文｜音标｜例句"></textarea></label>
    <p class="subtle">每行一条。英文和中文必填，音标和例句可留空；也可从表格复制多行。</p>
    <label>资料版本或来源<input name="source" maxlength="300" placeholder="例如：外研社智慧版纸质教材"></label>
    <div class="dialog-actions"><button class="btn primary" type="submit">预览新增内容</button></div></form>`,true);
}

function previewCourseImport(records) {
  try {
    const plan=planLessonImport(state,records,()=>`user-${studyUuid()}`);
    if(!plan.updatedLessons&&!plan.entries.length){toast('没有可新增的内容，已有资料已保留。');return;}
    const current=state;
    const wordCount=plan.entries.filter(e=>e.kind==='word').length;
    showConfirm('导入教材资料',`<p>新增或补充 ${plan.updatedLessons} 课资料、${wordCount} 条单词、${plan.entries.length-wordCount} 条短语。</p><p>已有记录保留。跳过 ${plan.skipped} 个重复或冲突项目。</p>`,'确认导入',()=>{
      if(state!==current){toast('学习数据已有更新，请重新预览导入。');return;}
      commit(next=>{next.lessons=plan.lessons;next.entries.push(...plan.entries);});
      if(ui.page==='course-text'){
        const firstReadable=records.find(row=>row.text?.trim()||row.translation?.trim());
        if(firstReadable){ui.courseBook=firstReadable.book;ui.courseLesson=firstReadable.lesson;ui.search='';ui.limit=24;}
      }
      render();
      if(storageOK)toast('教材资料已保存。');
    });
  } catch(error) {toast(error.message);}
}

function courseImportDialog() {
  const {book}=courseScope();
  openModal(`<h2 id="dialog-title">批量导入教材资料</h2><p>粘贴多课内容或选择 TXT 文件。确认后可直接在课文页阅读。</p>
    <form id="course-import-form">
      <div class="form-grid"><label>册别<select name="book"><option value="1" ${book===1?'selected':''}>一册</option><option value="2" ${book===2?'selected':''}>二册</option></select></label>
      <label>资料版本或来源<input name="source" maxlength="300" placeholder="例如：我的课本笔记"></label></div>
      <label>课文及词条<textarea name="content" rows="9" maxlength="1048576" aria-describedby="course-import-help" placeholder="第1课 我的课名&#10;在这里粘贴课文…&#10;&#10;第2课 我的课名&#10;在这里粘贴下一课…"></textarea></label>
      <p id="course-import-help" class="subtle">每课另起一行写「第1课」或「Lesson 1」，后面可加课名。需要分栏时，可加 [中文]、[单词] 或 [短语]。词条每行写「英文｜中文」。</p>
      <div class="dialog-actions"><button class="btn" type="button" data-action="course-template">下载 TXT 示例</button><button class="btn" type="button" data-action="course-choose">选择 TXT 或 JSON</button><button class="btn primary" type="submit">预览粘贴内容</button></div>
    </form>`,true);
}

async function readCourseFile(file) {
  if(!file)return;
  try {
    if(file.size>10*1024*1024)throw new Error('教材文件超过10MB，请分批导入。');
    const form=$('#course-import-form');
    if(!form)return;
    const values=new FormData(form);
    const text=(await file.text()).replace(/^\uFEFF/,'');
    if(form!==$('#course-import-form'))return;
    const lessons=/\.json$/i.test(file.name)
      ? JSON.parse(text)?.lessons
      : parseLessonText(text,Number(values.get('book')),String(values.get('source')||''));
    previewCourseImport(lessons);
  } catch(error) {toast(error instanceof SyntaxError?'文件不是有效的 JSON，请参考下载的格式示例。':error.message);}
}

function closeOpenDialog() {
  if($('#dialog').open)$('#dialog').close();
}
function download(text,filename,type='application/json') {
  const url=URL.createObjectURL(new Blob([text],{type}));
  const a=document.createElement('a');a.href=url;a.download=filename;a.hidden=true;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
}
function stamp() {return new Date().toISOString().replace(/[:.]/g,'-');}
function exportBackup() {download(JSON.stringify(exportObject(state),null,2),`Klaire-完整备份-${stamp()}.json`);toast('备份已交给浏览器下载，请在“下载”中确认文件已保存。');}
async function inspectBackup(file) {
  if(!file)return;
  if(file.size>10*1024*1024){toast('备份超过10MB，本版本暂不支持。当前数据没有改变。');return;}
  try {
    const context=accountContext;
    const raw=await file.text();
    if (context!==accountContext) return;
    const parsed=JSON.parse(raw),prepared=prepareState(parsed,SEED_ENTRIES);pendingRestore=prepared.state;
    const s=stats(pendingRestore);
    showConfirm('恢复这份学习备份？',`<div class="import-preview"><strong>备份原有 ${parsed.entries.length} 条（含回收站），将补充 ${prepared.addedCount} 条内置内容</strong><p>第${prepared.fromVersion}版备份 → 第${SCHEMA_VERSION}版。恢复后 ${s.total} 条有效词条 · ${s.studied} 条已学习 · ${Object.keys(pendingRestore.lessons).length} 课个人资料。</p><p>${pendingRestore.activities.length} 次练习记录，${pendingRestore.entries.filter(e=>e.deletedAt).length} 条回收站内容。</p><p>备份导出时间：${parsed.exportedAt&&!Number.isNaN(Date.parse(parsed.exportedAt))?esc(new Date(parsed.exportedAt).toLocaleString('zh-CN')):'未提供'}</p></div><p>恢复将<strong>替换当前记录</strong>，不自动合并。继续时会先下载当前副本，并在本机保留一份恢复前副本，便于找回。</p>`,'先备份，再恢复',performRestore);
  }catch(e){pendingRestore=null;openModal(`<div class="modal-icon">${icon('info')}</div><h2 id="dialog-title">这份备份暂时无法恢复</h2><p>${esc(e instanceof SyntaxError?'文件不是有效的 JSON 学习备份。':e.message)}</p><p>当前词表和学习记录没有改变。请使用本网页“下载完整备份”产生的文件。</p><button class="btn primary" data-action="close-dialog">知道了</button>`);}
}
function performRestore() {
  if(!pendingRestore)return;
  const old=corruptRaw!==null?corruptRaw:JSON.stringify(exportObject(state),null,2);
  download(old,`Klaire-恢复前副本-${stamp()}.json`);
  try {
    if(upgradeRaw!==null){repository.upgradeWithBackup(state,upgradeRaw);upgradeRaw=null;}
    repository.replaceWithBackup(pendingRestore,old);
    state=pendingRestore;pendingRestore=null;corruptRaw=null;storageOK=true;$('#dialog').close();navigate('home',true);toast('备份已恢复。恢复前的副本也保留在“备份与设置”中。');
    cloud?.changed();
  }catch{pendingRestore=null;$('#dialog').close();toast('浏览器无法保存恢复数据，恢复已停止，原记录未替换。请保留下载的副本。');}
}

function updateVoices() {
  const availableVoices=window.speechSynthesis?.getVoices?.() || [];
  voices=Array.from(availableVoices).filter(v=>v.localService&&/^en[-_]/i.test(v.lang));
  if(ui.page==='settings'&&!$('#dialog').open)render();
}
function stopPhoneme() {
  phonemePlayer?.pause();
  phonemePlayer=undefined;
}

function playPhoneme(sound) {
  const url=phonemeAudioUrl(sound);
  if(!url)return;
  window.speechSynthesis?.cancel();
  stopPhoneme();
  const player=new Audio(url);
  phonemePlayer=player;
  player.play().catch(()=>{
    if(phonemePlayer===player)toast('音标发音播放失败，请刷新页面后再试。');
  });
}

function speak(text,slow=false) {
  stopPhoneme();
  if(!('speechSynthesis' in window)){toast('当前浏览器不支持朗读，请换用支持朗读的浏览器。');return;}
  updateVoices();
  const matching=voices.filter(v=>v.lang.toLowerCase()===state.settings.accent.toLowerCase());
  const voice=matching.find(v=>v.voiceURI===state.settings.voiceURI)||matching[0];
  if(!voice){openModal(`<div class="modal-icon">${icon('speaker')}</div><h2 id="dialog-title">还没有对应的本机声音</h2><p>没有找到${state.settings.accent==='en-GB'?'英式':'美式'}英语本机声音。请在电脑或手机的系统语音设置中安装相应英语语音包，重新打开浏览器后再试。</p><p>也可以在“备份与设置”切换到已经安装的另一种口音。本网页不会自动使用网络朗读。</p><button class="btn primary" data-action="close-dialog">知道了</button>`);return;}
  speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.voice=voice;utterance.lang=voice.lang;utterance.rate=slow?0.72:0.95;
  utterance.onerror=e=>{if(!['canceled','interrupted'].includes(e.error))toast('这次发音没有播放成功，请检查系统英语语音包。');};
  speechSynthesis.speak(utterance);
}

document.addEventListener('click',event=>{
  const b=event.target.closest('[data-action], [data-nav]');if(!b||b.disabled)return;
  if(b.dataset.nav){navigate(b.dataset.nav);return;}
  const action=b.dataset.action,id=b.dataset.id;
  if (action?.startsWith('cloud-')) { void cloud.action(action,id); return; }
  if(action==='close-dialog')$('#dialog').close();
  else if(action==='back-to-parent')backToParent();
  else if(action==='open-grammar-view'&&GUIDE_VIEWS.some(([id])=>id===b.dataset.view)){
    ui.grammarView=b.dataset.view;
    navigate('grammar-map');
  }
  else if(action==='grammar-map-view'&&GUIDE_VIEWS.some(([id])=>id===b.dataset.view)){
    ui.grammarView=b.dataset.view;
    render();
    $('.grammar-map-switch [aria-pressed="true"]')?.focus();
  }
  else if(action==='grammar-map-branch'&&GRAMMAR_BRANCHES.some(branch=>branch.id===b.dataset.branch)){
    ui.grammarBranch=b.dataset.branch;
    render();
    if(window.matchMedia?.('(max-width: 1110px)')?.matches)$('#grammar-branch-heading')?.focus();
    else $('.grammar-tree-node[aria-pressed="true"]')?.focus({preventScroll:true});
  }
  else if(action==='grammar-map-tense'&&TENSE_TIMELINES.some(tense=>tense.id===b.dataset.tense)){
    ui.grammarTense=b.dataset.tense;
    render();
    if(window.matchMedia?.('(max-width: 1110px)')?.matches)$('#tense-detail-heading')?.focus();
    else $('.tense-chart-row[aria-pressed="true"]')?.focus({preventScroll:true});
  }
  else if(action==='grammar-map-more'){
    ui.grammarMore=!ui.grammarMore;
    render();
    $('.tense-more')?.focus({preventScroll:true});
  }
  else if(action==='grammar-person'&&PEOPLE.some(person=>person.id===b.dataset.person)){
    ui.grammarPerson=b.dataset.person;
    render();
    $('#person-detail-heading')?.focus();
  }
  else if(action==='grammar-clause'&&CLAUSE_GROUPS.some(group=>group.id===b.dataset.clause)){
    ui.grammarClause=b.dataset.clause;
    render();
    $('.clause-picker [aria-pressed="true"]')?.focus({preventScroll:true});
  }
  else if(action==='ipa-speed'){
    ui.ipaSlow=b.dataset.slow==='true';
    render();
    $('.ipa-speed [aria-pressed="true"]')?.focus({preventScroll:true});
  }
  else if(action==='phoneme-speak')playPhoneme(b.dataset.sound);
  else if(action==='guide-speak'&&b.dataset.text)speak(b.dataset.text,b.dataset.slow==='true');
  else if(action==='open-study-scene'&&ui.page==='words'&&STUDY_WORD_GROUPS.some(group=>group.id===b.dataset.scene)){
    sceneView.id=b.dataset.scene;
    sceneView.bilingual=true;
    navigate('situations');
  }
  else if(action==='focus-select'){
    const topic=KLAIRE_REVIEW_TOPICS.find(group=>group.id===b.dataset.topic);
    if(!topic)return;
    if(state.settings.lastFocusTopic!==topic.id)commit(next=>{next.settings.lastFocusTopic=topic.id;});
    render();
    $('[data-action="focus-select"][aria-pressed="true"]')?.focus({preventScroll:true});
  }
  else if(action==='focus-review')startReview('grammar',currentFocusTopic().ids);
  else if(action==='stuck-review'&&ui.page==='stuck')startReview(undefined,recentlyStuck(state).map(row=>row.entry.id),true);
  else if(action==='stuck-more'){ui.limit+=24;render();}
  else if(action==='study-words-review'&&ui.page==='situations'){
    const group=STUDY_WORD_GROUPS.find(item=>item.id===b.dataset.scene);
    if(group)startReview('words',studyWords(group).map(entry=>entry.id));
  }
  else if(action==='scene-language'&&ui.page==='situations'){
    sceneView.bilingual=b.dataset.value==='bilingual';
    render();
    $('.scene-tools [aria-pressed="true"]')?.focus({preventScroll:true});
  }
  else if(action==='scene-speak'){
    const scene=REVIEW_SCENES.find(item=>item.id===b.dataset.scene);
    const text=b.dataset.index==='all'?scene?.lines.map(line=>line.en).join(' '):scene?.lines[Number(b.dataset.index)]?.en;
    if(text)speak(text,b.dataset.slow==='true');
  }
  else if(action==='confirm'){const fn=confirmAction;confirmAction=null;$('#dialog').close();fn?.();}
  else if(action==='undo'){const fn=undoAction;undoAction=null;$('#toast').hidden=true;fn?.();}
  else if(action==='library-filter-toggle'&&usesLibraryIndex(ui.page)){
    ui.libraryFiltersOpen=!ui.libraryFiltersOpen;
    b.setAttribute('aria-expanded',String(ui.libraryFiltersOpen));
    $('#library-index-filters').hidden=!ui.libraryFiltersOpen;
  }
  else if(action==='clear-library-filters'&&usesLibraryIndex(ui.page)){
    Object.assign(ui,{filter:'all',book:'all',category:'all',limit:defaultListLimit(ui.page)});
    render();
    $('#library-filter-toggle')?.focus({preventScroll:true});
  }
  else if(action==='filter'){
    ui.filter=b.dataset.filter;ui.limit=defaultListLimit(ui.page);render();
    $('.filter[aria-pressed="true"]')?.focus({preventScroll:true});
  }
  else if(action==='clear-filter'){ui.search='';ui.filter='all';ui.book='all';ui.category='all';ui.limit=defaultListLimit(ui.page);render();}
  else if(action==='load-more'){ui.limit+=24;renderLibraryResults();}
  else if(action==='favorite'){commit(next=>{const e=next.entries.find(e=>e.id===id);e.favorite=!e.favorite;});render();}
  else if(action==='detail')detail(id);
  else if(action==='edit')editEntry(id);
  else if(action==='add')editEntry();
  else if(action==='course-edit')editCourseText();
  else if(action==='course-add')addCourseEntries(b.dataset.module);
  else if(action==='course-step'){
    const {book,lesson}=courseScope();
    ui.courseLesson=Math.min(BOOKS[book].count,Math.max(1,lesson+Number(b.dataset.step)));
    ui.search='';ui.limit=24;render();$('#course-lesson')?.focus();
  }
  else if(action==='course-more'){ui.limit+=24;render();}
  else if(action==='course-review'){
    const scope=courseScope(b.dataset.module);
    const selection=courseEntriesAreSearchable(scope)?scope.selected.filter(matchesCourseSearch):scope.selected;
    startReview(scope.module,selection.map(e=>e.id));
  }
  else if(action==='course-import')courseImportDialog();
  else if(action==='course-template')download('\uFEFF第1课 个人练习示例\r\nOur class meets in the library on Mondays.\r\n\r\n[中文]\r\n我们班每周一在图书馆见面。\r\n\r\n[单词]\r\nlibrary｜图书馆\r\n\r\n[短语]\r\non Mondays｜每周一\r\n\r\n第2课 个人练习示例\r\nWe bring our notebooks to class.\r\n','Klaire-课文导入示例.txt','text/plain;charset=utf-8');
  else if(action==='course-choose'){$('#course-file').value='';$('#course-file').click();}
  else if(action==='delete')showConfirm('把这条内容移到回收站？',`<p><strong>${esc(entryTitle(findEntry(id)))}</strong> 将暂时退出学习，原有笔记和进度保留。你可以在设置的回收站里恢复。</p>`,'移到回收站',()=>{commit(next=>{next.entries.find(e=>e.id===id).deletedAt=Date.now();});$('#dialog').close();render();toast('已移到回收站。',()=>restoreEntry(id));});
  else if(action==='restore-entry')restoreEntry(id);
  else if(action==='speak'||action==='speak-slow'){const e=findEntry(id);speak(e?.kind==='grammar'?e.examples[Number(b.dataset.example)||0]?.en||'':e?.en||'',action==='speak-slow');}
  else if(action==='test-voice')speak('This is an English pronunciation test.');
  else if(action==='start-review')startReview(b.dataset.module,undefined,b.dataset.onlyDue==='true');
  else if(action==='start-spelling'&&ui.page==='words')startSpelling();
  else if(action==='flip')revealCard();
  else if(action==='jump-rating')$('#review-rating-title')?.focus();
  else if(action==='rate')rate(b.dataset.rating);
  else if(action==='direction'){if(ui.session){ui.session.direction=b.dataset.value;ui.session.flipped=false;render();}}
  else if(action==='skip-spelling')answerSpelling(true);
  else if(action==='next-spelling'){const s=ui.session;if(s?.answered){s.index++;s.answered=false;s.input='';s.done=s.index>=s.ids.length;showPage();$(s.done?'#completion-heading':'#spelling-input')?.focus();}}
  else if(action==='end-session')navigate(ui.session?.backPage||'home',true);
  else if(action==='leave-session')navigate(ui.session?.backPage||'home');
  else if(action==='export')exportBackup();
  else if(action==='export-raw'&&corruptRaw!==null)download(corruptRaw,`Klaire-原始异常记录-${stamp()}.txt`,'text/plain');
  else if(action==='export-previous'){try{const raw=repository.previousRaw();if(raw)download(raw,`Klaire-上次恢复前副本-${stamp()}.json`);}catch{toast('无法读取副本。');}}
  else if(action==='export-upgrade'){try{const raw=repository.beforeUpgradeRaw();if(raw)download(raw,`Klaire-升级前副本-${stamp()}.json`);}catch{toast('无法读取升级前副本。');}}
  else if(action==='import'){$('#backup-file').value='';$('#backup-file').click();}
});
function restoreEntry(id){commit(next=>{const e=next.entries.find(e=>e.id===id);if(e)e.deletedAt=0;});render();toast('内容已恢复，原来的学习进度也在。');}
document.addEventListener('input',event=>{
  if(event.target.id==='library-search'){ui.search=event.target.value;ui.limit=defaultListLimit(ui.page);renderLibraryResults();}
});
document.addEventListener('toggle',event=>{
  const group=event.target.dataset?.indexGroup;
  if(group===undefined||!event.target.isConnected||!usesLibraryIndex(ui.page)||isLibraryFiltered())return;
  const openGroups=openLibraryGroups[ui.page];
  if(event.target.open)openGroups.add(group);
  else openGroups.delete(group);
},true);
document.addEventListener('change',event=>{
  const el=event.target;
  if(el.id==='scene-picker'&&REVIEW_SCENES.some(scene=>scene.id===el.value)){
    sceneView.id=el.value;
    window.speechSynthesis?.cancel();
    render();
    $('#scene-picker')?.focus({preventScroll:true});
    return;
  }
  if(el.dataset.scope){ui[el.dataset.scope]=el.value;ui.limit=defaultListLimit(ui.page);render();$('#'+el.id)?.focus({preventScroll:true});}
  if(el.dataset.setting){
    const setting=el.dataset.setting;
    const value=setting==='newPerDay'?NEW_PER_DAY_OPTIONS.find(option=>String(option)===el.value):el.value;
    if(value!==undefined){
      commit(next=>{
        next.settings[setting]=value;
        if(setting==='accent')next.settings.voiceURI='';
      });
      render();
    }
  }
  if(el.id==='backup-file')inspectBackup(el.files[0]);
  if(el.id==='course-file')readCourseFile(el.files[0]);
  if(el.id==='course-book'||el.id==='course-lesson'){
    if(el.id==='course-book'){ui.courseBook=Number(el.value);ui.courseLesson=ui.page==='course-text'?1:0;}
    else ui.courseLesson=Number(el.value);
    ui.search='';ui.limit=24;render();document.getElementById(el.id)?.focus();
  }
});
document.addEventListener('submit',event=>{
  if (['cloud-login','cloud-password-set'].includes(event.target.id)) {
    event.preventDefault();
    const form = event.target;
    if (form.id === 'cloud-login' && event.submitter?.hasAttribute('data-email-login')) {
      if (form.elements.namedItem('email').reportValidity()) void cloud.login(form);
    } else {
      void cloud.password(form);
    }
    return;
  }
  if(event.target.id==='entry-form'){event.preventDefault();saveEntry(event.target);}
  else if(event.target.id==='grammar-form'){event.preventDefault();saveGrammar(event.target);}
  else if(event.target.id==='spelling-form'){event.preventDefault();answerSpelling();}
  else if(event.target.id==='course-import-form'){
    event.preventDefault();
    const values=new FormData(event.target);
    try {
      previewCourseImport(parseLessonText(String(values.get('content')||''),Number(values.get('book')),String(values.get('source')||'')));
    } catch(error) {toast(error.message);}
  }
  else if(['course-search-form','course-add-form','lesson-form'].includes(event.target.id)){
    event.preventDefault();
    const form=event.target, values=Object.fromEntries(new FormData(form));
    try {
      if(form.id==='course-search-form'){ui.search=values.query;ui.limit=24;render();return;}
      const book=Number(form.dataset.book);
      if(form.id==='course-add-form'){
        previewCourseImport([{book,lesson:Number(values.lesson),source:values.source,[form.dataset.type]:parseEntryLines(values.items)}]);
        return;
      }
      const key=lessonKey(book,Number(form.dataset.lesson));
      const record=lessonFields(values);
      commit(next=>{next.lessons[key]=record;});
      closeOpenDialog();render();if(storageOK)toast('课文已保存。');
    } catch(error) {toast(error.message);}
  }
});
document.addEventListener('keydown',event=>{
  if(event.repeat||$('#dialog').open||event.ctrlKey||event.metaKey||event.altKey||event.target.isContentEditable||['INPUT','SELECT','TEXTAREA'].includes(event.target.tagName))return;
  const s=ui.session;if(ui.page!=='practice'||!s||s.done||s.mode!=='review')return;
  if(event.code==='Space'&&!s.flipped&&!['BUTTON','A','SUMMARY'].includes(event.target.tagName)){event.preventDefault();revealCard();}
  const option=recallOptions.find(item=>item.shortcut===event.key);
  if(s.flipped&&option){event.preventDefault();rate(option.id);}
});
window.addEventListener('storage',event=>{
  if (cloud?.isAccount()) return;
  if(event.key!==STORAGE_KEY)return;
  if(!event.newValue){storageOK=false;render();toast('另一个页面清除了记录。当前内容还在，请下载备份。');return;}
  try{const prepared=prepareState(JSON.parse(event.newValue),SEED_ENTRIES);state=prepared.state;upgradeRaw=null;storageOK=true;if(prepared.changed){try{repository.upgradeWithBackup(state,event.newValue);}catch{upgradeRaw=event.newValue;storageOK=false;}}corruptRaw=null;if($('#dialog').open)$('#dialog').close();ui.session=null;if(ui.page==='practice'){ui.page='home';returnViews.length=0;}render();toast('已同步同一浏览器内另一个标签页的修改。');}
  catch{storageOK=false;toast('另一个标签页的记录格式异常，请先备份当前页面。');}
});
window.addEventListener('beforeunload',event=>{if(!storageOK){event.preventDefault();event.returnValue='';}});
const canSwitchAccount=()=>storageOK&&corruptRaw===null&&!$('#dialog').open&&(!ui.session||ui.session.done);
cloud=createCloud({
  guestRepository:repository,
  safeToLeave:canSwitchAccount,
  canReplace:canSwitchAccount,
  replace(nextRepository,nextState){
    accountContext++;
    closeOpenDialog();
    pendingRestore=null;
    confirmAction=null;
    undoAction=null;
    ui.session=null;
    if(ui.page==='practice')ui.page='home';
    returnViews.length=0;
    repository=nextRepository;
    state=nextState;
    corruptRaw=null;
    upgradeRaw=null;
  },
  receive(nextState){state=nextState;render();},
  render,toast,download,backup:exportBackup,confirm:showConfirm,modal:openModal,close:closeOpenDialog
});
prepareStudyDialog($('#dialog'));
$('#dialog').addEventListener('close',()=>cloud.schedule());
render();
void cloud.initialize();
window.speechSynthesis?.addEventListener?.('voiceschanged',updateVoices);
updateVoices();
setInterval(()=>{if(ui.page==='home'&&!$('#dialog').open)render();},60000);
