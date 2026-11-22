import {guideAudio} from './grammar-reference.js';

export const CLAUSE_GROUPS = [
  {id:'noun', title:'名词性从句', clue:'整段话占了一个名词位置。', items:[
    {title:'主语从句', role:'整段作主语，说的是「哪件事」。', pattern:'That + 句子 + 主句谓语；也常用 It + 谓语 + that 从句。',
      en:'That the shop is closed is clear.', part:'That the shop is closed', zh:'商店已经关门，这一点很清楚。',
      analysis:'前半段整体作主语，后面的 is clear 是主句谓语和表语。日常更常说 It is clear that the shop is closed。',
      trap:'从句里面有 is，主句也需要自己的谓语 is。',card:'grammar-extra-subject-clause'},
    {title:'宾语从句', role:'作动词的宾语，说明知道、问或想的是什么。', pattern:'动词 + (that) / if / whether / 疑问词 + 从句。',
      en:'Could you tell me where the station is?', part:'where the station is', zh:'你能告诉我车站在哪里吗？',
      analysis:'主句在问 Could you tell me。where the station is 是 tell 的内容。从句内部是 the station 在前，is 在后。',
      trap:'从句用陈述语序。直接问 Where is the station?，放进宾语从句后写 where the station is。',card:'grammar-040'},
    {title:'表语从句', role:'放在系动词后，说明主语具体是什么。', pattern:'主语 + be + that / whether / 疑问词 + 从句。',
      en:'The problem is that we have missed the last train.', part:'that we have missed the last train', zh:'问题是我们错过了末班火车。',
      analysis:'The problem is 是主句的开头。从句接在 is 后，解释「问题」的内容。',trap:'这里的 that 只连接两部分，从句里已有主语 we 和谓语 have missed。',card:'grammar-extra-predicative-clause'},
    {title:'同位语从句', role:'解释抽象名词的具体内容。', pattern:'the idea / news / fact / hope + that + 完整句子。',
      en:'The news that the shop would close surprised us.', part:'that the shop would close', zh:'商店将要关闭的消息让我们很惊讶。',
      analysis:'主干是 The news surprised us。从句说明消息的内容是「商店将关闭」；that 后的小句本身完整。',
      trap:'The news that we heard 中 heard 缺宾语，that 指 news，属于定语从句。两种从句都可能紧跟名词，要看从句的作用。',card:'grammar-extra-content-clause'}
  ]},
  {id:'relative', title:'定语从句', clue:'贴在名词后，说明是哪个人、哪件东西，或补充一条信息。', items:[
    {title:'限定性定语从句', role:'用来确定是「哪一个」，通常不用逗号。', pattern:'名词 + who / which / that / whose / where / when + 从句。',
      en:'The bag that I bought yesterday is on the table.', part:'that I bought yesterday', zh:'我昨天买的那个包放在桌上。',
      analysis:'主干是 The bag is on the table。that 指 bag，在从句里作 bought 的宾语。',
      trap:'在限定性从句里，that 作宾语时常可省略。作主语时一般要保留，如 the man who lives next door。', card:'grammar-039'},
    {title:'非限定性定语从句', role:'给已经明确的人或物加一条补充信息。', pattern:'名词 + 逗号 + who / which / whose 等 + 从句 + 逗号。',
      en:'My sister, who lives in London, is coming tomorrow.', part:'who lives in London', zh:'我姐姐住在伦敦，她明天要来。',
      analysis:'去掉两边逗号之间的内容，仍有 My sister is coming tomorrow。从句补充她住哪里。',
      trap:'有逗号的这类从句一般不用 that，关系词也不能省掉。',card:'grammar-extra-relative-choices'}
  ]},
  {id:'adverb', title:'状语从句', clue:'给整个动作补充时间、条件、原因等背景。', items:[
    {title:'时间状语从句', role:'说明主句动作什么时候发生。', pattern:'when / while / before / after / until / as soon as + 从句。',
      en:'I’ll call you when I get home.', part:'when I get home', zh:'我到家时会给你打电话。',
      analysis:'主句是 I’ll call you。when 从句说明打电话的时间，主句说将来，从句通常用一般现在时表示将来。',
      trap:'这句用 when I get home。问「我什么时候会到家」的宾语从句可以用 I don’t know when I’ll get home。',card:'grammar-038'},
    {title:'条件状语从句', role:'说明什么条件下才发生主句的事。', pattern:'if / unless + 从句；unless 通常相当于 if … not。',
      en:'If it rains tomorrow, we’ll stay at home.', part:'If it rains tomorrow', zh:'如果明天下雨，我们就待在家。',
      analysis:'if 从句是条件，we’ll stay at home 是结果。这个条件是未来真实可能发生的。',
      trap:'一般的真实将来条件用 if it rains。想象现在或过去相反的事实时，再换相应的虚拟条件句。',card:'grammar-035'},
    {title:'原因状语从句', role:'回答主句的事情为什么发生。', pattern:'because / since / as + 从句。',
      en:'We took a taxi because it was late.', part:'because it was late', zh:'因为很晚了，我们坐了出租车。',
      analysis:'We took a taxi 是结果，because it was late 是原因。because 后接有主语和谓语的从句。',
      trap:'because of 后接名词等，如 because of the rain。在同一个主从连接中通常不用 because … so …。',card:'grammar-038'},
    {title:'让步状语从句', role:'承认一个情况，同时主句结果仍成立。', pattern:'although / though / even though + 从句。',
      en:'Although it was raining, we went out.', part:'Although it was raining', zh:'虽然下雨，我们还是出门了。',
      analysis:'下雨让人以为不会出门，但 we went out 才是主句的事实。',
      trap:'用了 although，主句开头通常不再加 but。',card:'grammar-038'},
    {title:'目的状语从句', role:'说明做这件事的目的。', pattern:'so that / in order that + 从句，常搭配 can / could。',
      en:'Please speak slowly so that I can follow you.', part:'so that I can follow you', zh:'请说慢一点，好让我能跟上。',
      analysis:'说话人希望达到「我能听懂」这个目的。两部分的主语可以不同。',
      trap:'so that 这里讲目的。to do 也能表达目的，主语通常由主句决定，如 I left early to catch the train。',card:'grammar-extra-purpose-result'},
    {title:'结果状语从句', role:'说明程度太强或情况特殊，最后发生了什么。', pattern:'so + 形容词／副词 + that 从句；such + 名词短语 + that 从句。',
      en:'The room was so cold that I put on my coat.', part:'that I put on my coat', zh:'房间冷得我穿上了外套。',
      analysis:'so cold 表示程度，that 后面写实际结果「我穿上了外套」。',
      trap:'so cold 直接修饰形容词，such a cold room 带名词 room。',card:'grammar-026'},
    {title:'地点状语从句', role:'说明动作在哪里发生。', pattern:'where / wherever + 从句。',
      en:'Sit where you can see the screen.', part:'where you can see the screen', zh:'坐到你能看见屏幕的地方。',
      analysis:'Sit 是动作，where 从句给这个动作补上地点。',
      trap:'在 the place where we met 中，where 从句跟着名词 place，修饰这个名词，是定语从句。'},
    {title:'方式状语从句', role:'说明动作怎么做或看起来像什么。', pattern:'as / as if / as though + 从句。',
      en:'Fold the paper as I showed you.', part:'as I showed you', zh:'按我示范的方法折纸。',
      analysis:'Fold the paper 是主句，后面的 as 从句说明折纸的方法。',
      trap:'as 不只表示「按照」，也能表示「当……时」或「因为」。先判断从句与主句的关系。'},
    {title:'比较从句', role:'跟在比较结构后，交代比较对象。', pattern:'比较级 + than + 从句；as + 原级 + as + 从句。',
      en:'She cooks better than I do.', part:'than I do', zh:'她做饭比我好。',
      analysis:'better 已经说明有比较。than I do 补上比较对象，do 代替重复的 cook。',
      trap:'避免 more better。部分比较句会省略重复成分，但保留 I do 有助于看清两个动作。',card:'grammar-025'}
  ]}
];

export function renderClauseGuide({clauseId,byId,escape,icon}) {
  const group=CLAUSE_GROUPS.find(item=>item.id===clauseId)||CLAUSE_GROUPS[0];
  const controls={escape,icon};
  return `<div class="guide-stack"><section class="panel guide-panel"><h2>从句详解</h2>
    <p>从句里通常有自己的主语和谓语，但整体在大句子里只做一件事。先把主句找出来，再看从句给它补了什么。</p>
    <div class="clause-picker" role="group" aria-label="选择从句大类">${CLAUSE_GROUPS.map(item=>`<button type="button" class="grammar-tree-node" data-action="grammar-clause" data-clause="${item.id}" aria-pressed="${group.id===item.id}"><strong>${item.title}</strong><span>${item.clue}</span></button>`).join('')}</div>
    <p class="subtle">先看作用。同样是 where，放在 tell me 后可能是宾语从句，修饰 place 时是定语从句，修饰 sit 时通常是地点状语。</p></section>
    <section class="panel guide-panel clause-panel"><h3>${group.title} · ${group.items.length} 种用法</h3>
      <div class="guide-stack">${group.items.map((item,index)=>{
        const pos=item.en.indexOf(item.part);
        const marked=pos<0?escape(item.en):`${escape(item.en.slice(0,pos))}<mark>${escape(item.part)}</mark>${escape(item.en.slice(pos+item.part.length))}`;
        return `<details class="clause-detail" ${index===0?'open':''}><summary>${item.title}<small>${item.role}</small></summary>
          <div class="clause-body"><p><strong>常见结构</strong> ${item.pattern}</p>
            <div class="tense-example"><div class="guide-example-line"><p lang="en">${marked}</p>${guideAudio(item.en,controls)}</div><p>${item.zh}</p></div>
            <p><strong>拆句看</strong> ${item.analysis}</p><p><strong>易混点</strong> ${item.trap}</p>
            ${byId.has(item.card)?`<button type="button" class="btn" data-action="detail" data-id="${item.card}">打开对应复习卡</button>`:''}
          </div></details>`;
      }).join('')}</div>
    </section></div>`;
}
