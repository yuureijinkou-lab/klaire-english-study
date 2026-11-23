const relatedTopics = {
  structure:['agreement','questions-negative','coordination','short-agreement'],
  time:['stative-verbs','future-arrangements'],
  words:['noun-plurals','possessive-nouns','demonstratives','one-ones','reflexive-reciprocal','indefinite-choices','dummy-it','adverb-position','comparison-details','prepositions-movement'],
  clauses:['subject-clause','predicative-clause','content-clause','relative-choices','purpose-result'],
  verbs:['verb-forms','object-infinitive','phrasal-placement','passive-forms'],
  conditions:['condition-connectors','modal-deduction']
};

export const GRAMMAR_BRANCHES = [
  { id:'structure', title:'句子骨架', hint:'主语、谓语、宾语和表语', cards:['grammar-klaire-sentence-core','grammar-014','grammar-015','grammar-016','grammar-017','grammar-018','grammar-019'] },
  { id:'time', title:'时间与时态', hint:'规律、动作、结果和时间参照点', cards:['grammar-001','grammar-002','grammar-003','grammar-006','grammar-005','grammar-004','grammar-009','grammar-010','grammar-011','grammar-012','grammar-013','grammar-extra-future-perfect-progressive','grammar-042','grammar-007','grammar-008','grammar-klaire-past-reference','grammar-klaire-perfect-focus'] },
  { id:'words', title:'词类与搭配', hint:'用冠词、代词、介词和比较结构', cards:['grammar-020','grammar-021','grammar-022','grammar-023','grammar-024','grammar-025','grammar-026','grammar-klaire-time-expressions','grammar-klaire-deadlines','grammar-klaire-arrive-wait','grammar-klaire-practical-collocations'] },
  { id:'clauses', title:'从句与句子扩展', hint:'补充对象、修饰名词或交代背景', cards:['grammar-039','grammar-040','grammar-038','grammar-041'] },
  { id:'verbs', title:'动词的其他形式', hint:'被动、情态动词和非谓语', cards:['grammar-030','grammar-027','grammar-028','grammar-029','grammar-031','grammar-032','grammar-033','grammar-034','grammar-klaire-verb-pairs','grammar-klaire-participle-actions','grammar-klaire-participle-modifiers'] },
  { id:'conditions', title:'条件与假设', hint:'真实条件、虚拟条件、愿望和遗憾', cards:['grammar-035','grammar-036','grammar-037','grammar-klaire-mixed-conditions','grammar-klaire-wish','grammar-klaire-modal-perfect'] }
].map(branch=>({...branch,cards:[...branch.cards,...relatedTopics[branch.id].map(id=>`grammar-extra-${id}`)]}));

// The diagrams illustrate where the action and its reference point fall. Distances are schematic.
export const TENSE_TIMELINES = [
  { id:'habit', title:'一般现在时', short:'习惯或规律', card:'grammar-001',
    marks:['point habit-left','point habit-centre','point habit-right'],
    description:'一串点表示重复出现的规律，不是在说哪一天做了这件事。一般现在时也可表示事实或状态。',
    en:'I walk to work on weekdays.', zh:'我工作日走路上班。',
    contrast:'on weekdays 说的是平时习惯。要说眼下正在走，用 I’m walking to work now.' },
  { id:'doing', title:'现在进行时', short:'现在正在进行', card:'grammar-002',
    marks:['band around-now','reference now'],
    description:'色带穿过「现在」，表示动作正在发生，也可以表示眼下这段时间在做。',
    en:'I’m walking to work now.', zh:'我现在正走路去上班。',
    contrast:'I walk to work 表示习惯；I’m walking to work 说的是眼下这一次。' },
  { id:'past', title:'一般过去时', short:'明确的过去事件', card:'grammar-003',
    marks:['point past'],
    description:'点落在「现在」左边，说的是已经过去的一件事。',
    en:'I walked three kilometres yesterday.', zh:'我昨天走了三公里。',
    contrast:'yesterday 指已经结束的过去时间，用 walked。换成 so far today，强调到现在的结果，可以说 I’ve walked three kilometres so far today.' },
  { id:'perfect', title:'现在完成时', short:'过去的事与现在有关', card:'grammar-006',
    marks:['point past','link past-to-now','reference now'],
    description:'动作发生在过去，箭头指向「现在」，表示说话者在乎到现在为止的结果或经历。线段不表示动作一直在进行。',
    en:'I’ve walked three kilometres so far today.', zh:'今天到现在为止，我已经走了三公里。',
    contrast:'这里强调已走的距离。明确说昨天走了三公里，用 I walked three kilometres yesterday.' },
  { id:'future', title:'将来时', short:'在现在之后', card:'grammar-005',
    marks:['point future'],
    description:'点落在「现在」右边。这里用 be going to 表示已有打算，将来还可以用 will 表示预测、临时决定等。',
    en:'I’m going to walk to work tomorrow.', zh:'我打算明天走路上班。',
    contrast:'这句的 am going to 后接 walk，表示打算；I’m walking now 表示正在走。' },
  { id:'past-doing', title:'过去进行时', short:'在过去某时进行', card:'grammar-004',
    marks:['band around-past','reference past'],
    description:'过去的参照点落在动作色带中。我们只知道那个时刻动作正在进行。',
    en:'At eight yesterday, I was walking to work.', zh:'昨天八点我正在走路上班。',
    contrast:'I walked 说发生了什么；I was walking 让你看到过去某一刻正在发生什么。' },
  { id:'past-perfect', title:'过去完成时', short:'早于另一个过去时间', card:'grammar-klaire-past-reference',
    marks:['point early-past','link early-to-past','reference late-past'],
    description:'两个标记都在「现在」左边。先看右侧空心点这个过去参照，再回看更早的动作。',
    en:'The train had left when I got to the station.', zh:'我到车站时，那班火车已经开走了。',
    contrast:'「我到车站」是过去参照点，「火车开走」更早。单独说火车八点开了，用 The train left at eight.' },
  { id:'perfect-doing', title:'现在完成进行时', short:'从过去持续到现在附近', card:'grammar-klaire-perfect-focus',
    marks:['band past-through-now','reference now'],
    description:'从过去延伸到「现在」附近的色带表示过程持续了一段时间。它可能还在继续，也可能刚刚停止。',
    en:'I’ve been walking for half an hour.', zh:'我已经走了半小时了。',
    contrast:'have been walking 强调过程和时长；have walked three kilometres 强调走完的距离。' },
  { id:'past-perfect-doing', title:'过去完成进行时', short:'到过去那时已持续多久', card:'grammar-011',
    marks:['band past-before-past','reference late-past'],
    description:'站在过去的空心参照点，往前看动作已持续多久。整段示意都在「现在」左边。',
    en:'I had been waiting for half an hour when the bus came.', zh:'公交车来的时候，我已经等了半小时。',
    contrast:'was waiting 说明过去某时正在等；had been waiting 还突出到那时已经等了一段时间。' },
  { id:'future-doing', title:'将来进行时', short:'将来那时正在做', card:'grammar-012',
    marks:['band around-future','reference future'],
    description:'先把参照点移到将来。色带跨过那个点，表示届时动作正在进行。',
    en:'At this time tomorrow, I’ll be flying to London.', zh:'明天这个时候，我会正在飞往伦敦。',
    contrast:'will fly 说将要飞；will be flying 让你看到将来某一刻正在进行的过程。' },
  { id:'future-perfect', title:'将来完成时', short:'到未来那时已经完成', card:'grammar-013',
    marks:['point before-future','link before-to-future','reference future'],
    description:'把空心点放在将来的截止时间。动作在截止时间前或届时完成。图中示例的动作也在现在之后。',
    en:'By Friday, we will have finished the report.', zh:'到周五时，我们会已经完成报告。',
    contrast:'will finish 只是说将来会完成；will have finished 说明看向某个将来的参照点，届时已经完成。' },
  { id:'future-perfect-doing', title:'将来完成进行时', short:'到未来那时已经持续多久', card:'grammar-extra-future-perfect-progressive',
    marks:['band through-future','reference future'],
    description:'在将来的空心点回看过程已经持续多久。色带表示持续，重点是时长。',
    en:'By June, I will have been studying English for two years.', zh:'到六月时，我学英语就满两年了。',
    contrast:'will have finished 强调到那时的成果；will have been studying 强调到那时的学习时长。' },
  { id:'past-future', title:'过去将来时', short:'从过去向后来看的计划', card:'grammar-042',
    marks:['reference early-past','link early-to-past','point late-past'],
    description:'先站在过去的空心点，再看当时计划的「后来」。它相对于当时在未来，未必在今天之后。',
    en:'On Monday, she said she would call the next day.', zh:'她星期一说，第二天会打电话。',
    contrast:'直接说 “I will call tomorrow.”。转述过去说过的话，常用 would call 和 the next day。' }
];

const timelineSteps = {
  habit:['看 on weekdays，谈的是平时反复发生的动作。','主语 + 动词原形。he／she／it 通常加 -s。','I 是主语，walk 是动词；换成 She，写 She walks。'],
  doing:['now 提醒你看眼下正在发生的事。','主语 + am / is / are + 动词-ing。','I’m 是 I am，walking 表示动作正在进行。'],
  future:['tomorrow 把动作定位到将来。','will + 动词原形；或 am / is / are going to + 动词原形。','am going to 后的 walk 是计划要做的动作。'],
  perfect:['so far today 意思是今天到现在为止，时间范围还连着现在。','主语 + have / has + 过去分词。','I’ve 是 I have，walked 是过去分词，three kilometres 是到现在累积的距离。'],
  past:['yesterday 已经结束，动作放在那个过去时间里。','主语 + 过去式；否定与疑问常用 did + 动词原形。','walked 是过去式。说否定时写 I didn’t walk。'],
  'past-doing':['at eight yesterday 是过去的观察时点。','主语 + was / were + 动词-ing。','I 配 was；walking 表示昨天八点那会儿正在走。'],
  'past-perfect':['先圈出 got to the station，再找更早发生的事。','主语 + had + 过去分词。','had left 是先开的火车，got to 是后来到站的参照事件。'],
  'perfect-doing':['for half an hour 给出持续时长，参照点在现在附近。','主语 + have / has been + 动词-ing。','have been walking 是持续过程，句子不要求报告走完多少距离。'],
  'past-perfect-doing':['when the bus came 把参照点放在过去，for half an hour 表示当时已等多久。','主语 + had been + 动词-ing。','had been waiting 在前，the bus came 是后来的参照点。'],
  'future-doing':['at this time tomorrow 给出将来的观察点。','主语 + will be + 动词-ing。','I’ll 是 I will；be flying 表示到那时正处在飞行中。'],
  'future-perfect':['by Friday 是将来的截止，不晚于周五。','主语 + will have + 过去分词。','finished 是过去分词；这句看的是周五时报告已完成的结果。'],
  'future-perfect-doing':['by June 是未来参照点，for two years 是累计的时长。','主语 + will have been + 动词-ing。','By June 设定将来的参照时间，studying English for two years 表示到那时会累计学满两年。'],
  'past-future':['on Monday 是说话发生的时间，the next day 是相对星期一的后来。','主语 + would + 动词原形；过去已作的打算也可用 was / were going to。','said 放在过去；would call 告诉你她当时说的打算。']
};

export function renderGrammarMap({view, branchId, tenseId, showMore, personId, clauseId, cards, escape, icon}) {
  const byId = new Map(cards.map(card=>[card.id,card]));
  const selectedView=GUIDE_VIEWS.some(([id])=>id===view)?view:'overview';
  const guides={timeline:()=>renderTimeline({tenseId,showMore,byId,escape,icon}),persons:()=>renderPersonGuide({personId,byId,escape,icon}),
    clauses:()=>renderClauseGuide({clauseId,byId,escape,icon}),
    overview:()=>renderOverview({branchId,byId,escape,icon})};
  return `<section class="guide-title"><h1>语法导图</h1><p>先看整体，再选一个部分慢慢看。</p></section>
    <div class="grammar-map-switch guide-nav" role="group" aria-label="导图视图">
      ${GUIDE_VIEWS.map(([id,label])=>`<button type="button" class="btn" data-action="grammar-map-view" data-view="${id}" aria-pressed="${id===selectedView}">${label}</button>`).join('')}
    </div>${guides[selectedView]()}`;
}

function renderOverview({branchId,byId,escape,icon}) {
  const branch = GRAMMAR_BRANCHES.find(item=>item.id===branchId) || GRAMMAR_BRANCHES[0];
  const groups = new Map();
  for (const id of branch.cards) {
    const card = byId.get(id);
    if (!card) continue;
    if (!groups.has(card.category)) groups.set(card.category, []);
    groups.get(card.category).push(card);
  }
  return `<div class="grammar-map-layout grammar-overview-layout">
    <section class="panel grammar-tree" aria-label="英语语法分支">
      <div class="grammar-tree-root">英语语法</div>
      <div class="grammar-tree-branches" role="group" aria-label="选择语法分支">
        ${GRAMMAR_BRANCHES.map(item=>`<button type="button" class="grammar-tree-node" data-action="grammar-map-branch" data-branch="${item.id}" aria-pressed="${item.id===branch.id}">
          <strong>${item.title}</strong><span>${item.hint}</span>${icon('chevron')}
        </button>`).join('')}
      </div>
    </section>
    <section class="panel grammar-map-detail" aria-labelledby="grammar-branch-heading">
      <h2 id="grammar-branch-heading" tabindex="-1">${branch.title}</h2><p>${branch.hint}</p>
      ${branch.id==='time'?'<button type="button" class="btn primary" data-action="grammar-map-view" data-view="timeline">打开时态时间轴</button>':''}
      ${['structure','words'].includes(branch.id)?'<button type="button" class="btn primary" data-action="grammar-map-view" data-view="persons">看人称和动词怎么变</button>':''}
      ${branch.id==='clauses'?'<button type="button" class="btn primary" data-action="grammar-map-view" data-view="clauses">打开从句详解</button>':''}
      ${groups.size?`<div class="grammar-topic-groups">${[...groups].map(([category,links])=>`<section class="grammar-topic-group">${groups.size>1?`<h3>${escape(category)}</h3>`:''}<ul class="review-focus-list">${links.map(card=>`<li><button type="button" class="text-button" data-action="detail" data-id="${card.id}">${escape(card.title)} ${icon('chevron')}</button></li>`).join('')}</ul></section>`).join('')}</div>`:'<p>本组暂无可查看的语法卡。</p>'}
    </section></div>`;
}

function renderTimeline({tenseId,showMore,byId,escape,icon}) {
  const items = showMore ? TENSE_TIMELINES : TENSE_TIMELINES.slice(0,4);
  const selected = items.find(item=>item.id===tenseId) || items[0];
  const [clue,pattern,breakdown] = timelineSteps[selected.id];
  return `<section class="panel guide-panel timeline-intro"><h2>时态时间轴</h2><p>先找「站在哪个时间看」，再看动作是一个事件、正在进行的过程，还是已经有了结果。图上每一行都可以点开。</p></section><div class="grammar-map-layout tense-layout">
    <section class="panel tense-chart" aria-label="时态时间轴对照">
      <div class="tense-chart-scale" aria-hidden="true"><span class="tense-scale-spacer"></span><div><span>过去</span><strong>现在</strong><span>将来</span></div></div>
      <div class="tense-chart-rows" role="group" aria-label="选择时态查看例句">
      ${items.map(item=>`<button type="button" class="tense-chart-row" data-action="grammar-map-tense" data-tense="${item.id}" aria-pressed="${item.id===selected.id}">
        <span class="tense-chart-name"><strong>${item.title}</strong><small>${item.short}</small></span>
        <span class="tense-track" aria-hidden="true"><span class="tense-axis"></span>${item.marks.map(mark=>`<span class="tense-mark ${mark}"></span>`).join('')}</span>
      </button>`).join('')}</div>
      <p class="tense-legend">实心点表示事件或重复，色带表示过程，空心点表示参照时点。箭头表示与参照时点的联系。</p>
      <button type="button" class="text-button tense-more" data-action="grammar-map-more" aria-expanded="${showMore}">${showMore?'收起补充时态':`展开其他 ${TENSE_TIMELINES.length-4} 种时态`}</button>
    </section>
    <section class="panel grammar-map-detail" aria-labelledby="tense-detail-heading">
      <h2 id="tense-detail-heading" tabindex="-1">${selected.title}</h2><p>${selected.description}</p>
      <dl class="tense-steps"><dt>先看时间线索</dt><dd>${escape(clue)}</dd><dt>常见结构</dt><dd>${escape(pattern)}</dd></dl>
      <div class="tense-example"><div class="guide-example-line"><p lang="en">${escape(selected.en)}</p>${guideAudio(selected.en,{escape,icon})}</div><p>${escape(selected.zh)}</p></div>
      <dl class="tense-steps"><dt>拆开例句看</dt><dd>${escape(breakdown)}</dd><dt>容易混淆</dt><dd>${escape(selected.contrast)}</dd></dl>
      ${byId.has(selected.card)?`<button type="button" class="btn" data-action="detail" data-id="${selected.card}">看完整讲解</button>`:''}
    </section>
  </div>`;
}
import {GUIDE_VIEWS, guideAudio, renderPersonGuide} from './grammar-reference.js';
import {renderClauseGuide} from './grammar-clauses.js';

