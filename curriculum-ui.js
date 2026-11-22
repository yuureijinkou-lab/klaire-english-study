import {BOOKS, REFERENCE_URL, lessonKey} from './curriculum.js';

export const COURSE_PAGES = {
  'course-text':'新概念课文',
  'course-words':'新概念单词',
  'course-phrases-1':'新概念一册逐课短语',
  'course-phrases-2':'新概念二册逐课短语',
  sources:'资料来源'
};

export function courseSourcePage() {
  const link=(url,label)=>`<a href="${url.replace(/&/g,'&amp;')}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  return `<section class="page-heading"><div><h1>资料来源</h1><p>教材版次和参考入口核对于 2026-11-18。</p></div></section>
  <section class="panel course-panel"><h2>新概念英语智慧版</h2>
  <ul>${Object.entries(BOOKS).map(([num,b])=>`<li>${link(b.url,`${b.name} · ${b.title}`)}，${b.count}课，ISBN ${b.isbn}${num==='2'?` · ${link('https://space.zjgsu.edu.cn/mspace/searchDetailLocal/mc7975ac9ecdc879e1526fbd3adcd5f81','课数书目核对')}`:''}</li>`).join('')}</ul>
  <p>一册单数课为对话或短文，双数课以图片练习为主。课号按上述版本设置，导入时请填写你手上资料的版本。</p>
  <p>${link('https://www.fltrp.com/ebook/jcjyyjzx/2023_jcjyjxzy/files/basic-html/page62.html','外研社配套数字资源说明')}介绍了智慧版在「外研 U 学」上的课文听读和单词练习。请按书上说明激活。</p>
  <p>${link('https://2u4u.fltrp.com/c/2026-03-25/541260.shtml','外研社 2026 年研讨会报道')}仍以智慧版介绍数字学习功能。</p>
  <p>${link(REFERENCE_URL,'在线英语听力室 · 新概念英语专题')}是你提供的第三方听读参考。该页未标明内容对应智慧版。</p></section>
  <section class="panel course-panel"><h2>Klaire 的学习资料</h2><ul>
  <li>手写生词本来自你给的两张照片。中文释义、音标和例句为整理内容。</li>
  <li>一、二册常用短语是按学习水平挑选的表达，例句为独立编写。常用库与逐课库分别显示。</li>
  <li>时态与语法包含独立编写的中文讲解和例句，规则参考 ${link('https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2','British Council 基础语法')}和${link('https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2','进阶语法')}。</li>
  <li>逐课资料由你按使用的教材版本导入，收录进度按本机记录计算。</li></ul></section>`;
}

export function courseHeading(page, entries, lessons, book, selected, esc) {
  const isText=page==='course-text';
  const showBook=page==='course-text'||page==='course-words';
  const info=BOOKS[book];
  const filled = new Set(entries.map(e=>e.lessonNumber));
  if(isText) {
    for(let lesson=1;lesson<=info.count;lesson++) {
      const record=lessons[lessonKey(book,lesson)];
      if(record?.text||record?.translation)filled.add(lesson);
    }
  }
  const options=Array.from({length:info.count},(_,i)=>{
    const lesson=i+1, title=lessons[lessonKey(book,lesson)]?.title;
    return `<option value="${lesson}"${selected===lesson?' selected':''}>第${lesson}课${title?` · ${esc(title)}`:''}${filled.has(lesson)?'（已收录）':''}</option>`;
  }).join('');
  return `<section class="page-heading course-page-heading"><div><h1>${COURSE_PAGES[page]}</h1><p>${info.name} · ${info.title} · ${info.count}课</p></div>
  <button class="btn" data-action="course-import">批量导入</button></section>
  <div class="course-controls panel">
    ${showBook?`<label>册别<select id="course-book"><option value="1"${book===1?' selected':''}>一册</option><option value="2"${book===2?' selected':''}>二册</option></select></label>`:''}
    <label>课号<select id="course-lesson">${isText?'':`<option value="0"${selected===0?' selected':''}>本册已收录的全部条目</option>`}${options}</select></label>
    ${isText?`<div class="button-row course-step"><button class="btn" data-action="course-step" data-step="-1"${selected===1?' disabled':''}>上一课</button><button class="btn" data-action="course-step" data-step="1"${selected===info.count?' disabled':''}>下一课</button></div>`:''}
    <span>已收录 ${filled.size} / ${info.count} 课${isText?'':` · ${entries.length} 条`}</span>
  </div>`;
}

export function courseLessonText(book, lesson, record, esc) {
  return `<section class="panel course-panel"><div class="section-title"><h2>第${lesson}课${record?.title?` · ${esc(record.title)}`:''}</h2><button class="btn" data-action="course-edit">${record?'编辑课文':'添加课文'}</button></div>
  ${record?.text?`<div class="course-text" lang="en">${esc(record.text)}</div>`:''}
  ${record?.translation?`<details><summary>中文参考</summary><div class="course-text">${esc(record.translation)}</div></details>`:''}
  ${!record?.text&&!record?.translation?`<p>${book===1&&lesson%2===0?'本课为图片练习，可添加学习笔记或配套文本。':'本课尚未收录课文。可添加你手头的课文或笔记。'}</p>`:''}
  ${record?.source?`<p class="subtle">资料版本或来源：${esc(record.source)}</p>`:''}</section>`;
}
