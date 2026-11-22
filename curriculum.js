export const BOOKS = {
  1: {name:'一册', title:'英语初阶', count:144, isbn:'978-7-5213-3670-2', url:'https://www.fltrp.com/c/2022-10-20/514394.shtml'},
  2: {name:'二册', title:'实践与进步', count:96, isbn:'978-7-5213-3671-9', url:'https://www.fltrp.com/c/2022-10-20/514397.shtml'}
};
export const LESSON_MODULES = ['course-words','course-phrases'];
export const REFERENCE_URL = 'https://m.tingroom.com/?mid=3&aid=39438';

export function lessonKey(book, lesson) {
  if (![1,2].includes(book) || !Number.isInteger(lesson) || lesson < 1 || lesson > BOOKS[book].count) {
    throw new Error('课号超出范围。一册为第1–144课，二册为第1–96课。');
  }
  return `${book}-${lesson}`;
}

export function lessonFields(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('课文格式不正确。');
  const limits = {title:300, text:15000, translation:15000, source:300};
  return Object.fromEntries(Object.entries(limits).map(([key, max]) => {
    const text = value[key] ?? '';
    if (typeof text !== 'string' || text.length > max) throw new Error(`课文的 ${key} 字段格式不正确或过长。`);
    return [key, text.trim()];
  }));
}

export function validateLessons(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length > 240) throw new Error('备份的课文目录格式不正确。');
  return Object.fromEntries(Object.entries(input).map(([key, value]) => {
    const [book, lesson] = key.split('-').map(Number);
    if (lessonKey(book,lesson) !== key) throw new Error('备份中的课号格式不正确。');
    return [key, lessonFields(value)];
  }));
}

export function parseEntryLines(text) {
  return text.split(/\r?\n/).map(line=>line.trim()).filter(Boolean).map((line, index) => {
    const [en, zh, ipa, example, extra] = line.split(/[｜|\t]/).map(x=>x.trim());
    if (!en || !zh || extra !== undefined) throw new Error(`第 ${index+1} 行请填写「英文｜中文」，也可加音标和例句。`);
    return {en,zh,ipa:ipa||'',example:example||''};
  });
}

// Plain text is convenient for pasting notes or importing a local UTF-8 file.
export function parseLessonText(text, book, source = '') {
  const records = [];
  const sections = {'[课文]':'text','[中文]':'translation','[单词]':'words','[短语]':'phrases'};
  const lines = text.replace(/^\uFEFF/,'').split(/\r\n|\n|\r/);
  let current;
  let section = 'text';
  for (let index=0; index<lines.length; index++) {
    const line = lines[index];
    const normalized = line.trim().normalize('NFKC');
    const heading = normalized.match(/^(?:第\s*(\d{1,3})\s*课|Lesson\s+(\d{1,3})(?=$|\s|[:.·—-]))\s*[:.·—-]?\s*(.*)$/i);
    if (heading) {
      const lesson = Number(heading[1] ?? heading[2]);
      lessonKey(book,lesson);
      current = {book,lesson,title:heading[3],source,text:[],translation:[],words:[],phrases:[]};
      records.push(current);
      section = 'text';
    } else if (current) {
      if (Object.prototype.hasOwnProperty.call(sections,normalized)) section = sections[normalized];
      else current[section].push(line);
    } else if (normalized) {
      throw new Error(`第${index+1}行请先写课号，例如「第1课 我的课名」或「Lesson 1 My lesson」。`);
    }
  }
  if (!records.length) throw new Error('请粘贴课文，或选择包含课号的 TXT 文件。');
  return records.map(record=>{
    const text = record.text.join('\n').trim();
    const translation = record.translation.join('\n').trim();
    const words = parseEntryLines(record.words.join('\n'));
    const phrases = parseEntryLines(record.phrases.join('\n'));
    if (!text && !translation && !words.length && !phrases.length) throw new Error(`第${record.lesson}课没有可导入的内容。`);
    return {...record,text,translation,words,phrases};
  });
}

function importEntry(row, module, bookNumber, lessonNumber, source, id) {
  if (!row || typeof row !== 'object' || Array.isArray(row)) throw new Error('单词或短语格式不正确。');
  const values = {};
  for (const [key,max] of Object.entries({en:500,zh:1000,ipa:500,pos:100,example:2000,exampleZh:2000,notes:8000})) {
    const value = row[key] ?? '';
    if (typeof value !== 'string' || value.length > max) throw new Error(`词条的 ${key} 字段格式不正确或过长。`);
    values[key] = value.trim();
  }
  if (!values.en || !values.zh) throw new Error('逐课词条必须填写英文和中文。');
  values.ipa = values.ipa.replace(/^\/+|\/+$/g,'');
  return {id, module, kind:module==='course-words'?'word':'phrase', bookNumber, lessonNumber, ...values,
    source:source||'个人导入', scene:`${BOOKS[bookNumber].name} · 第${lessonNumber}课`, sourceNote:'', favorite:false, needsCheck:false, deletedAt:0};
}

// Return a preview without mutating the current state. Only missing material is added.
export function planLessonImport(state, records, newId) {
  if (!Array.isArray(records) || !records.length || records.length > 240) throw new Error('请选择包含 1–240 课的教材资料文件。');
  const lessons = {...state.lessons};
  const entries = [];
  const seenLessons = new Set();
  const entryKey = e => `${e.module}:${e.bookNumber}:${e.lessonNumber}:${e.en.normalize('NFKC').toLowerCase().replace(/\s+/g,' ')}`;
  const seenEntries = new Set(state.entries.filter(e=>LESSON_MODULES.includes(e.module)).map(entryKey));
  let updatedLessons = 0;
  let skipped = 0;
  for (const row of records) {
    if (!row || typeof row !== 'object' || Array.isArray(row)) throw new Error('有一课的格式不正确。');
    const key = lessonKey(row.book,row.lesson);
    if (seenLessons.has(key)) throw new Error(`资料里 ${BOOKS[row.book].name} 第${row.lesson}课重复。`);
    seenLessons.add(key);
    const fields = lessonFields(row);
    const previous = lessons[key];
    const combined = {...previous};
    for (const [field,value] of Object.entries(fields)) {
      if (value && !previous?.[field]) combined[field] = value;
      else if (value && previous[field] !== value) skipped++;
    }
    if (Object.keys(combined).some(field=>combined[field]!==previous?.[field])) {
      lessons[key] = lessonFields(combined);
      updatedLessons++;
    }
    for (const [field,module] of [['words','course-words'],['phrases','course-phrases']]) {
      const list = row[field] ?? [];
      if (!Array.isArray(list) || list.length > 500) throw new Error(`第${row.lesson}课的${field==='words'?'单词':'短语'}需要是最多500条的列表。`);
      for (const item of list) {
        const entry = importEntry(item,module,row.book,row.lesson,fields.source,newId());
        const signature = entryKey(entry);
        if (seenEntries.has(signature)) { skipped++; continue; }
        seenEntries.add(signature);
        entries.push(entry);
        if (entries.length + state.entries.length > 20000) throw new Error('导入后词条超过20000条，请减少导入内容。');
      }
    }
  }
  return {lessons, entries, updatedLessons, skipped};
}
