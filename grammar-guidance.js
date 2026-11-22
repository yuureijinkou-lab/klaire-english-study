import { EXPANDED_GUIDANCE } from './grammar-expansion.js';

// Index zero is grammar-001. The existing card IDs are stable in saved notes and review history.
const basicGuides = [
  '先分清是在说平时，还是在说眼下。She walks to work every day. 中 every day 表示习惯，She 是第三人称单数，所以用 walks。',
  '先找动作正在发生的时间，再补上 be。I am waiting 里 am 说明主语是 I，waiting 是正在做的动作。',
  '找已经结束的过去时间。yesterday、last week 等常给出这个时间。否定句里 did 表示过去，后面的动词用原形。',
  '先找过去的观察时点。was doing 表示那个时点事情正在发生，另一件事可以用一般过去时写。',
  '先看打算是什么时候作出的。已有计划可用 be going to，眼下才作决定常用 will；will 也常用于承诺和预测。',
  '先看过去的事和现在有什么联系。结果、经历、延续到现在的状态都能用 have / has + 过去分词。',
  '明确说昨天做了，用一般过去时。强调到现在为止做了什么，用现在完成时。先判断时间范围有没有结束。',
  'for 后面回答「多久」，since 后面回答「从何时」。for three years 是三年的长度，since 2023 是起点。',
  '找一个过去参照点，再看另一个动作是否更早。只说一件过去的事，通常用一般过去时就够了。',
  '想突出做了多久或刚才一直在做什么，考虑完成进行时。完成了多少本书或多少封邮件，通常看完成时。',
  '先把视线移到过去，再向更早看持续过程。had been doing 表示过去参照点前已经在做了一段时间。',
  '把视线移到明天某个时点。问自己「到那时，动作是不是正在进行？」如果是，用 will be doing。',
  '先找将来的截止时间，再看动作是否届时已经完成。by Friday 常是截止点，will have done 表示到那时的结果。',
  '主语决定 be 的形式。I 配 am，he / she / it 和普通单数配 is，you / we / they 和普通复数配 are。',
  '描述一个地方有某物，用 there is / are。说某人拥有某物，用 have / has。先找句子想表达的是哪一种。',
  '把已有的 be、助动词或情态动词放到主语前。如果句里没有这些，普通动词常用 do、does 或 did 帮忙。',
  '先问缺的是人、物、时间、地点还是原因。Who called you? 中 who 本身就是主语，不加 did。',
  '指令常省略 you，直接以动词原形开头。否定指令用 don’t，邀请一起做用 let’s。',
  '先看前半句是肯定还是否定，再用对应的助动词和代词。You’re ready, aren’t you? 的尾巴确认是否准备好了。',
  '先判断这个名词是否特指。a 或 an 表示某一个，the 指双方知道的那个；a 和 an 按首音而非首字母选择。',
  '先数名词能否按个数直接数。many 接可数复数，much 接不可数名词；a few 和 a little 表示仍有一些。',
  '肯定陈述常用 some，否定和一般疑问常用 any。主动提供或礼貌请求时，问句也常用 some。',
  '先找位置。句子做主语用 I，动词后用 me；my 后有名词，mine 单独用；myself 常指回自己。',
  '点状时间用 at，日历上的某一天用 on，较长时间用 in。遇到 this morning 和 last Saturday，通常直接说。',
  '修饰名词多用形容词，修饰动作多用副词。比较两者用 -er 或 more；说同类中最高再用最高级。',
  'too 指超过可接受程度，enough 指达到需要的程度。so 后接形容词或副词，such 后接名词短语。',
  'can 可说现在的能力，could 可说过去的一般能力或作礼貌请求。未来或其他结构中，可用 will be able to 等。',
  'mustn’t 是禁止，don’t have to 是没有必要。判断听话人是完全不能做，还是可以自行决定。',
  '先看是在建议还是猜测。should 常用来建议；may / might 表示可能；must 在推测中语气较强。',
  '先问谁受到这个动作。把承受者放到句首，用 be + 过去分词，根据时间改变 be。做动作的人可以用 by 引出。',
  'have / get something done 表示让别人处理某物。I had my hair cut 说的是有人给我剪了头发。',
  'to do 可以解释做某事的目的，也能跟在 want、decide 等动词后。先看它在补充哪个动作。',
  '介词后通常用动词 -ing。look forward to 里的 to 是介词，所以后面用 seeing 或名词。',
  'used to do 指以前常做；be used to doing 指现在或某时已习惯；get used to doing 强调逐渐适应。',
  '常识规律可用 if + 一般现在时、主句也用一般现在时。现实中可能发生的将来条件，主句常用 will。',
  '是在想象现在或未来的另一种情况时，用 if + 过去式，结果常用 would + 原形。这里的过去式表达假设。',
  '事情已经过去，想象当时不同会怎样。条件用 had done，过去结果用 would have done。',
  '把从句拿出来，问它对主句补充了什么：何时、为什么、有什么阻碍，还是结果。再选择对应连接词。',
  '先找被修饰的名词。who 常指人，which 常指物。关系词在从句里还可能作主语或宾语。',
  '先找主句的动词，如 tell 或 know。后面的疑问词从句讲内容，主语通常在谓语前，如 where the station is。',
  '直接引语保留原话；转述时先看是谁说给谁、时间有没有换。代词、时间词和时态根据这个视角调整。',
  '站在过去某一刻往后看。She said she would call 里的 would 表示她当时提到的未来。'
];

const personalGuides = {
  'time-expressions':'先定位时间是钟点、某天还是时段。last Friday 已由 last 标明时间，通常不再加 on。',
  deadlines:'先想你是在给截止时间，还是描述一直持续。by eight 是最迟八点完成，until eight 是一直到八点。',
  'arrive-wait':'把车站当成一个具体地点，用 arrive at。等候后如果接人或事物，补上 for，比如 wait for the next train。',
  'past-reference':'把两个动作写在时间线上：更早的动作 ← 过去参照点。只有一个独立过去事件时不必额外套过去完成时。',
  'perfect-focus':'问自己是在强调完成量还是持续过程。three emails 突出成果，for half an hour 可让人注意过程。',
  'mixed-conditions':'分别标清条件和结果的时间。If I had booked earlier 是过去条件；I would have a room now 是现在结果。',
  wish:'先判断想改变的是现在，还是已经发生的过去。wish I had time 是希望现在有时间；wish I had called 是后悔过去没打电话。',
  'verb-pairs':'看两个动作的先后和目的。remember locking 指记得做过，remember to lock 指记得去做。',
  'participle-modifiers':'把名词短语还原成从句。people waiting 是人主动等；items ordered 是商品被订购。',
  'modal-perfect':'三种形式都回看过去。should 多谈本该，could 多谈有机会或可能，would 多谈假设结果。',
  'sentence-core':'遇到长句，先找一个能独立成立的主干。找到 The train had left 后，再逐块对照哪段修饰火车，哪段说明时间。',
  'practical-collocations':'先按场景取整块表达。预约改期用 reschedule an appointment，酒店换房用 change rooms。'
};

export function guidanceForCard(id) {
  const numbered = /^grammar-(\d{3})$/.exec(id);
  if (numbered) return basicGuides[Number(numbered[1])-1];
  if(id==='grammar-extra-future-perfect-progressive')return '先找未来的参照时间，再看某个过程到那时已经持续多久。重点是时长，不是完结后的成果。';
  if (Object.prototype.hasOwnProperty.call(EXPANDED_GUIDANCE,id)) return EXPANDED_GUIDANCE[id];
  const personal = /^grammar-klaire-(.+)$/.exec(id);
  return personal ? personalGuides[personal[1]] : undefined;
}

export const ADVANCED_TIMELINE_CARD = {
  id:'grammar-extra-future-perfect-progressive',module:'grammar',kind:'grammar',book:'二册进阶',category:'时态',
  title:'将来完成进行时',prompt:'到了未来某个时间，动作已经持续了多久？',
  explanation:'以将来某个时点为参照，回看一个到那时持续了一段时间的动作。常用在等待、工作、学习等可以持续的活动上。',
  structures:'主语 + will have been + 动词-ing\n常用线索：by + 将来时间，for + 持续时长',
  examples:[{en:'By June, I will have been studying English for two years.',zh:'到六月，我学英语就满两年了。'},{en:'At six, we will have been waiting for an hour.',zh:'到六点，我们就已经等了一个小时。'}],
  mistakes:'will have been 后还要接 -ing。know 这类状态动词通常用将来完成时，如 will have known。',
  comparison:'will have finished 强调到那时已经完成；will have been working 强调到那时已经工作了一段时间。',
  notes:'',source:'语法导图 · 进阶拓展',sourceNote:'用于补全时态对照。例句为原创。',favorite:false,needsCheck:false,deletedAt:0
};

