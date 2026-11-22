export const GUIDE_VIEWS = [
  ['overview','语法总览'], ['timeline','时态时间轴'], ['persons','人称变化'], ['clauses','从句详解']
];

export const PEOPLE = [
  {id:'i', title:'我', person:'第一', number:'单数', forms:['I','me','my','mine','myself'], be:'am', was:'was', verb:'work', have:'have', ask:'do'},
  {id:'we', title:'我们', person:'第一', number:'复数', forms:['we','us','our','ours','ourselves'], be:'are', was:'were', verb:'work', have:'have', ask:'do'},
  {id:'you', title:'你', person:'第二', number:'单数', forms:['you','you','your','yours','yourself'], be:'are', was:'were', verb:'work', have:'have', ask:'do'},
  {id:'you-all', title:'你们', person:'第二', number:'复数', forms:['you','you','your','yours','yourselves'], be:'are', was:'were', verb:'work', have:'have', ask:'do'},
  {id:'he', title:'他', person:'第三', number:'单数', forms:['he','him','his','his','himself'], be:'is', was:'was', verb:'works', have:'has', ask:'does'},
  {id:'she', title:'她', person:'第三', number:'单数', forms:['she','her','her','hers','herself'], be:'is', was:'was', verb:'works', have:'has', ask:'does'},
  {id:'it', title:'它', person:'第三', number:'单数', forms:['it','it','its',null,'itself'], be:'is', was:'was', verb:'works', have:'has', ask:'does'},
  {id:'they', title:'他们／她们／它们', person:'第三', number:'复数', forms:['they','them','their','theirs','themselves'], be:'are', was:'were', verb:'work', have:'have', ask:'do'}
];

const formNames = [
  ['主格','放在主语位置，说明是谁做这个动作。'],['宾格','多用在动词或介词后，表示动作的对象。'],
  ['形容词性物主代词','后面带名词，比如 my bag。'],['名词性物主代词','单独用，替代「所属关系＋名词」，比如 mine 表示 my bag。'],
  ['反身代词','动作回到主语自己，或用来强调亲自做。']
];
const formExamples = [
  ['','She','她给我打了电话。','she 在谓语 called 前，是打电话的人。',' called me.'],
  ['I called ','her.','我给她打了电话。','her 跟在 called 后，是接电话的人。介词后也用宾格，例如 for her。'],
  ['This is ','her','这是她的围巾。','her 后面有名词 scarf，说明围巾属于谁。',' scarf.'],
  ['This scarf is ','hers.','这条围巾是她的。','hers 已经指「她的围巾」，后面不再接 scarf。'],
  ['She saw ','herself','她在镜子里看见了自己。','看到的人和被看到的人都是她，用 herself。',' in the mirror.']
];
const pronunciation = {
  I:'aɪ', me:'miː', my:'maɪ', mine:'maɪn', myself:'maɪˈself', you:'juː', your:'jɔː', yours:'jɔːz', yourself:'jɔːˈself', yourselves:'jɔːˈselvz',
  he:'hiː', him:'hɪm', his:'hɪz', himself:'hɪmˈself', she:'ʃiː', her:'hɜː', hers:'hɜːz', herself:'hɜːˈself', it:'ɪt', its:'ɪts', itself:'ɪtˈself',
  we:'wiː', us:'ʌs', our:'aʊə', ours:'aʊəz', ourselves:'aʊəˈselvz', they:'ðeɪ', them:'ðem', their:'ðeə', theirs:'ðeəz', themselves:'ðəmˈselvz',
  am:'æm', is:'ɪz', are:'ɑː', was:'wɒz', were:'wɜː', work:'wɜːk', works:'wɜːks', have:'hæv', has:'hæz', do:'duː', does:'dʌz'
};

export const PHONETIC_GROUPS = [
  {title:'单元音', tip:'发音过程中口形大致稳定。ː 表示这个音通常比较长。', rows:[
    ['iː','seat','siːt'],['ɪ','sit','sɪt'],['e','bed','bed'],['æ','cat','kæt'],['ʌ','cup','kʌp'],['ɑː','park','pɑːk'],
    ['ɒ','hot','hɒt'],['ɔː','door','dɔː'],['ʊ','book','bʊk'],['uː','food','fuːd'],['ɜː','bird','bɜːd'],['ə','about','əˈbaʊt']
  ]},
  {title:'双元音', tip:'从一个口形滑到另一个口形，中间连起来读，仍是一个音节。', rows:[
    ['eɪ','late','leɪt'],['aɪ','time','taɪm'],['ɔɪ','toy','tɔɪ'],['əʊ','home','həʊm'],['aʊ','town','taʊn'],['ɪə','here','hɪə'],
    ['eə','chair','tʃeə'],['ʊə','tour','tʊə']
  ]},
  {title:'辅音', tip:'可以成对听，例如 /p/ 与 /b/、/s/ 与 /z/。听示例词时找它在哪个位置。', rows:[
    ['p','pen','pen'],['b','bag','bæɡ'],['t','tea','tiː'],['d','day','deɪ'],['k','key','kiː'],['ɡ','go','ɡəʊ'],
    ['f','fish','fɪʃ'],['v','van','væn'],['θ','think','θɪŋk'],['ð','this','ðɪs'],['s','sun','sʌn'],['z','zoo','zuː'],
    ['ʃ','shoe','ʃuː'],['ʒ','vision','ˈvɪʒən'],['h','hat','hæt'],['tʃ','chair','tʃeə'],['dʒ','job','dʒɒb'],
    ['m','moon','muːn'],['n','nose','nəʊz'],['ŋ','sing','sɪŋ'],['l','lamp','læmp'],['r','red','red'],['j','yes','jes'],['w','water','ˈwɔːtə']
  ]}
];

export function guideAudio(text,{escape,icon,slow=false,label=text}) {
  return `<button type="button" class="sound-button guide-audio" data-action="guide-speak" data-text="${escape(text)}" data-slow="${slow}" aria-label="朗读 ${escape(label)}">${icon('speaker')}</button>`;
}

function guideWord(text, controls) {
  if (!text) return '<span class="subtle">这个位置通常改用完整说法</span>';
  return `<span class="guide-word"><strong lang="en">${text}</strong><span class="ipa">/${pronunciation[text]}/</span>${guideAudio(text,controls)}</span>`;
}

function personTable(person, {escape,icon}) {
  return `<section class="panel guide-panel">
    <h3 id="person-table-heading">人称代词对照表</h3>
    <p id="person-table-help">一行看同一个人称，往右看它在不同位置的写法。点英文听发音，点「单数」或「复数」看这一行的细讲。<span class="person-scroll-hint">屏幕较窄时可以向左滑动查看后几列。</span></p>
    <div class="person-table-scroll" role="region" aria-labelledby="person-table-heading" aria-describedby="person-table-help" tabindex="0">
      <table class="person-table"><thead><tr><th scope="col">人称</th><th scope="col">单复数</th>${formNames.map(([name])=>`<th scope="col">${name}</th>`).join('')}</tr></thead>
      <tbody>${PEOPLE.map(row=>`<tr class="${row.id===person.id?'selected':''}">
        <td>${row.person}</td><th scope="row"><button type="button" class="person-choice" data-action="grammar-person" data-person="${row.id}" aria-pressed="${row.id===person.id}" aria-controls="person-detail" aria-label="${row.person}人称${row.number}，${row.title}">${row.number}<small>${row.title}</small></button></th>
        ${row.forms.map((word,index)=>`<td>${word?`<button type="button" class="person-cell-audio" lang="en" data-action="guide-speak" data-text="${escape(word)}" data-slow="false" aria-label="朗读 ${escape(word)}，${formNames[index][0]}">${word}${icon('speaker')}</button>`:'<span title="通常没有独立形式">—</span>'}</td>`).join('')}
      </tr>`).join('')}</tbody></table>
    </div>
    <p class="subtle person-table-foot">it 的名词性物主代词通常留空。常见固定表达 <span lang="en">of its own</span> 意思是「它自己独有的」，例如 <span lang="en">The café has a style of its own.</span>（这家咖啡馆自有风格。）</p>
  </section>`;
}

export function renderPersonGuide({personId,byId,escape,icon}) {
  const person=PEOPLE.find(item=>item.id===personId)||PEOPLE[0];
  const controls={escape,icon};
  const subject=person.forms[0];
  const subjectStart=subject[0].toUpperCase()+subject.slice(1);
  const label=person.id==='they'?'他们':person.title;
  const work=person.id==='it'?'在这里能运行':'在这里工作';
  const examples=[
    [`${subjectStart} ${person.be} ready.`,`${label}准备好了。`],
    [`${subjectStart} ${person.verb} here.`,`${label}${work}。`],
    [`${person.ask==='does'?'Does':'Do'} ${subject} work here?`,`${label}${work}吗？`],
    [`${subjectStart} ${person.ask}n’t work here.`,`${label}${person.id==='it'?'在这里无法运行':'不在这里工作'}。`],
    person.id==='it'?['It has stopped.','它已经停了。']:[`${subjectStart} ${person.have} finished.`,`${label}已经做完了。`]
  ];
  const related = ['agreement','questions-negative','reflexive-reciprocal','indefinite-choices','dummy-it']
    .map(id=>byId.get(`grammar-extra-${id}`)).filter(Boolean);
  return `<div class="guide-stack">
    <section class="panel guide-panel"><h2>人称变化</h2><p><strong>第一人称</strong>是说话的人（我、我们），<strong>第二人称</strong>是听话的人（你、你们），<strong>第三人称</strong>是谈到的人或事物（他、她、它、他们等）。确定是谁之后，再看词在句子里做什么。</p></section>
    ${personTable(person, controls)}
    <div class="guide-columns" id="person-detail">
      <section class="panel guide-panel"><h3 id="person-detail-heading" tabindex="-1">${person.title}的代词怎么变</h3><dl class="guide-forms">${formNames.map(([label,tip],index)=>`<div><dt>${label}</dt><dd>${guideWord(person.forms[index],controls)}<small>${tip}</small></dd></div>`).join('')}</dl></section>
      <section class="panel guide-panel"><h3>${person.title}搭配的动词</h3><dl class="guide-forms">${[
        ['现在的 be',person.be],['过去的 be',person.was],['一般现在时肯定句',person.verb],['have 的现在形式',person.have],['疑问或否定用',person.ask]
      ].map(([label,form])=>`<div><dt>${label}</dt><dd>${guideWord(form,controls)}</dd></div>`).join('')}</dl><h3>放进句子</h3><ul class="guide-example-list">${examples.map(([en,zh])=>`<li><span><strong lang="en">${en}</strong><small>${zh}</small></span>${guideAudio(en,controls)}</li>`).join('')}</ul></section>
    </div>
    <section class="panel guide-panel"><h3>用 she 这一行看懂五种用法</h3><ol class="person-examples">${formExamples.map(([before,marked,zh,tip,after=''],index)=>`<li><div><strong>${formNames[index][0]}</strong><div lang="en">${before}<mark>${marked}</mark>${after}</div><p>${zh} ${tip}</p></div>${guideAudio(before+marked+after,controls)}</li>`).join('')}</ol></section>
    <section class="panel guide-panel"><h3>最容易弄混的地方</h3><ul class="guide-notes">
      <li><strong>he／she／it</strong> 在一般现在时肯定句里常配 <span lang="en">works、has、does</span>。普通名词单数如 <span lang="en">my brother</span> 也按这个规则。</li>
      <li><span lang="en">He works here. → Does he work here? → He doesn’t work here.</span> 加了 <span lang="en">does</span> 后，后面写 <span lang="en">work</span>。</li>
      <li><span lang="en">her bag</span> 里的 <span lang="en">her</span> 是「她的」，<span lang="en">I called her</span> 里的 <span lang="en">her</span> 是「她」作宾语。</li>
      <li><span lang="en">its colour</span> 指它的颜色。<span lang="en">it’s</span> 是 <span lang="en">it is</span> 或 <span lang="en">it has</span> 的缩写。</li>
      <li><span lang="en">you</span> 对一个人说和对一群人说都配 <span lang="en">are</span>。反身代词能区分人数，一个人用 <span lang="en">yourself</span>，多个人用 <span lang="en">yourselves</span>。</li>
      <li>不知道某个人的性别时，可以用单数意义的 <span lang="en">they</span>。动词形式仍用 <span lang="en">they are / they have</span>。例如 <span lang="en">Someone left their bag. I hope they come back for it.</span></li>
      <li>普通动词的过去式一般不随人称变。<span lang="en">be</span> 的过去式有 <span lang="en">was / were</span>。<span lang="en">If I were you</span> 是虚拟假设，日常叙述过去通常说 <span lang="en">I was</span>。</li>
      <li><span lang="en">can、will</span> 后各人称都用动词原形，比如 <span lang="en">I can work</span> 和 <span lang="en">She can work</span>。</li></ul>
      <p class="subtle">音标显示单独念词时的常见英式形式。连在句中时，有些词会读得更轻。</p></section>
    ${related.length?`<section class="panel guide-panel"><h3>相关复习卡</h3><ul class="review-focus-list">${related.map(card=>`<li><button type="button" class="text-button" data-action="detail" data-id="${card.id}">${escape(card.title)} ${icon('chevron')}</button></li>`).join('')}</ul></section>`:''}
  </div>`;
}

export function renderPhoneticGuide({escape,icon,slow}) {
  return `<div class="guide-stack"><section class="panel guide-panel"><h1>音标与发音</h1>
    <p>点任一音标卡，会朗读它下面的示例单词。先看左边的音，再在完整词的音标里找到它。</p>
    <div class="grammar-map-switch ipa-speed" role="group" aria-label="音标示例朗读速度"><button type="button" class="btn" data-action="ipa-speed" data-slow="false" aria-pressed="${!slow}">正常</button><button type="button" class="btn" data-action="ipa-speed" data-slow="true" aria-pressed="${slow}">慢速</button></div>
    <p class="subtle">/ / 夹着发音；ˈ 标在重读音节前。音标用常见英式标法。发音按钮沿用单词库的本机朗读和口音设置。</p></section>
    ${PHONETIC_GROUPS.map(group=>`<section class="panel guide-panel"><h3>${group.title}</h3><p>${group.tip}</p><div class="ipa-grid">${group.rows.map(([sound,word,ipa])=>`<button type="button" class="ipa-tile" data-action="guide-speak" data-text="${escape(word)}" data-slow="${slow}" aria-label="音标 ${escape(sound)}，朗读 ${escape(word)}">
      <strong>/${sound}/</strong>${icon('speaker')}<span lang="en">${word}</span><span class="ipa">/${ipa}/</span></button>`).join('')}</div></section>`).join('')}
    <section class="panel guide-panel"><h3>容易听混的两组</h3><ul class="guide-example-list">${[['seat / sit','先听 /iː/ 和 /ɪ/。','seat','sit'],['think / sink','先听开头 /θ/ 和 /s/。','think','sink']].map(([pair,tip,a,b])=>`<li><span><strong lang="en">${pair}</strong><small>${tip}</small></span>${guideAudio(a,{escape,icon,slow})}${guideAudio(b,{escape,icon,slow})}</li>`).join('')}</ul>
    <p class="subtle">例如 tour 在一些英式读法中用 /ʊə/，也常听到 /ɔː/。可对照 <a href="https://dictionary.cambridge.org/help/phonetics.html" target="_blank" rel="noopener noreferrer">剑桥词典发音符号说明</a>。</p></section>
  </div>`;
}
