const personalCards = [
  {
    key: 'time-expressions', book: '一册基础', category: '介词', title: '时间介词与无介词的时间表达',
    prompt: '区分钟点、星期和时间段，留意 this、last、next、every。',
    explanation: '具体钟点用 at，星期或日期用 on，泛指早上、下午等时段用 in。this morning 和 last Saturday 本身就能作时间状语。',
    structures: 'at 8 p.m. / at 20:00\non weekdays / on Friday / on Saturday afternoon\nin the afternoon / in November\nthis morning / last Saturday / next week / every day',
    examples: [
      ['The gym closes at 8 p.m. on weekdays.', '工作日晚八点健身房关门。'],
      ['I went to the gym on Saturday afternoon.', '我星期六下午去了健身房。'],
      ['This morning, I booked a table for Friday.', '今天早上我订了周五的餐位。'],
      ['I did not get home until 8 p.m. last Saturday.', '上周六我晚上八点才到家。']
    ],
    mistakes: 'in weekdays → on weekdays；in Friday → on Friday；in this morning → this morning。12小时制写 at 3 p.m.，24小时制写 at 15:00。',
    comparison: 'in the afternoon 是泛指下午；on Saturday afternoon 指星期六的下午；last Saturday afternoon 已由 last 定位。周末也可说 on weekends（常见美式）或 at weekends（常见英式）。'
  },
  {
    key: 'deadlines', book: '两册共有', category: '介词', title: 'before、by 和 until',
    prompt: '区分提前、截止和持续到某个时间。',
    explanation: 'before 表示早于某个时间；by 表示最迟在某时完成；until 表示一个状态或动作持续到某时。not until 表示到了那个时间才发生。',
    structures: 'before Friday：在周五之前\nby Friday：最迟周五\nuntil Friday：一直到周五\nnot … until 8 p.m.：到了晚上八点才……',
    examples: [
      ['Please confirm your booking by Friday.', '请最迟在周五确认预订。'],
      ['I will be in Kyoto until Friday.', '我会在京都待到周五。'],
      ['I did not get to the gym until eight.', '我直到八点才到健身房。']
    ],
    mistakes: '想说「最迟八点到」，用 arrive by eight。想说「一直等到八点」，用 wait until eight。',
    comparison: 'before eight 不包括刚好八点；by eight 可以是刚好八点。'
  },
  {
    key: 'arrive-wait', book: '一册基础', category: '介词', title: '到达与等候：arrive、get to、wait for',
    prompt: '回顾车站、城市和交通场景里的介词搭配。',
    explanation: 'arrive at 把地点看作一个具体的点，arrive in 常用于城市或国家。口语里 get to 可配多数普通地点。wait for 表示等某人或某物。',
    structures: 'arrive at the station / arrive in Tokyo\nget to the hotel / get home\nwait for the next train / wait until six',
    examples: [
      ['We arrived at the station and waited for the next train.', '我们到了车站，等下一班火车。'],
      ['What time will you get to the hotel?', '你几点到酒店？'],
      ['I arrived in Osaka this morning.', '我今天早上到了大阪。']
    ],
    mistakes: 'arrive in station → arrive at the station；wait next train → wait for the next train。get home 中 home 表示方向，前面省略 to。',
    comparison: 'wait for the train 表示等什么；wait until six 表示等到几点。'
  },
  {
    key: 'past-reference', book: '二册进阶', category: '时态对比', title: '过去完成时：先找过去的参照点',
    prompt: '先找叙事站在哪个时间，再看是否需要向前回溯。',
    explanation: '只叙述过去发生的事，通常用一般过去时。过去完成时要有一个过去参照点，表示动作在那个时点之前已发生或尚未发生。参照点可在句中，也可由上下文给出。',
    structures: '单独过去事件：I forgot my wallet.\n过去参照点 → 更早的事：When I arrived, I realized I had left it at home.\n否定：had not / hadn’t + 过去分词',
    examples: [
      ['I forgot my wallet yesterday.', '我昨天忘了带钱包。'],
      ['When we arrived at the hotel, we realized we had not booked a room.', '到酒店时，我们才发现之前没有订房。'],
      ['I got to the station and called my sister.', '我到车站后给姐姐打了电话。']
    ],
    mistakes: 'had not book → had not booked。连续动作已经按先后顺序叙述时，不必因为其中一件先发生就一律使用过去完成时。',
    comparison: '事没做到但仍与现在有关，可以用现在完成时：I haven’t booked a room yet. 回看过去某一刻之前，则用 had not booked。'
  },
  {
    key: 'perfect-focus', book: '二册进阶', category: '时态对比', title: '现在完成时与现在完成进行时',
    prompt: '比较已经完成多少、持续多久、眼下有什么结果。',
    explanation: '现在完成时可突出完成的结果、次数或持续的状态。现在完成进行时多突出持续过程，过程可能仍在继续，也可能刚停止。know 等状态动词通常用完成时。',
    structures: 'have/has + 过去分词：结果、次数、持续状态\nhave/has been + doing：持续的过程',
    examples: [
      ['I have sent three emails this morning.', '今天上午到现在，我已经发了三封邮件。'],
      ['I have been waiting here for half an hour.', '我在这儿已经等了半小时。'],
      ['I have known Mia for three years.', '我认识米娅三年了。']
    ],
    mistakes: 'I have been knowing her → I have known her。for 和 since 可以与两种结构搭配，要看动词和想表达的重点。',
    comparison: 'I have read the report 强调读完；I have been reading the report 强调读的过程，未说明是否读完。'
  },
  {
    key: 'mixed-conditions', book: '二册进阶', category: '条件与从句', title: '混合条件句：过去原因与现在结果',
    prompt: '先分别标出 if 部分和结果部分的时间。',
    explanation: '条件句的两部分可以谈不同时间。最常见的是过去没有做成某事，导致现在的情况不同。判断时先说清现实中实际发生了什么。',
    structures: '过去条件：if + had + 过去分词\n现在结果：would / could + 动词原形\n反过来：现在或长期状态的假设 + would have + 过去分词',
    examples: [
      ['If I had booked earlier, I would have a room now.', '如果我之前早点订，现在就有房了。'],
      ['If I were more organized, I would not have missed the appointment yesterday.', '如果我一向更有条理，昨天就不会错过预约。']
    ],
    mistakes: '第一句的 would have a room 中 have 是「拥有」。would have booked 则是对过去结果的假设。',
    comparison: '过去原因、过去结果：If I had left earlier, I would have caught the train. 过去原因、现在结果：If I had left earlier, I would be there now.'
  },
  {
    key: 'wish', book: '二册进阶', category: '条件与从句', title: 'wish 和 if only：现在的愿望与过去的遗憾',
    prompt: '区分对现状不满意和对过去感到遗憾。',
    explanation: 'wish 或 if only 后的过去式常用来表达对现在情况的假设。想改变已经发生的事，用过去完成时。if only 往往比 wish 更强烈。',
    structures: 'wish / if only + 过去式：现在情况不如愿\nwish / if only + had + 过去分词：过去的事想重来',
    examples: [
      ['I wish we had more time in Kyoto.', '真希望我们在京都能有更多时间。'],
      ['If only I had checked the train times.', '要是我当时查过列车时刻就好了。']
    ],
    mistakes: '第一句中的 had 是「有」的过去式，指现在的愿望。had checked 才是过去完成时，回看过去。',
    comparison: 'I hope I can change rooms 仍有实现的可能；I wish I could change rooms 表达希望情况不同。'
  },
  {
    key: 'verb-pairs', book: '二册进阶', category: '非谓语与动词搭配', title: 'stop、remember、forget、try 后的 to do 与 doing',
    prompt: '用动作先后与目的区分四组常见搭配。',
    explanation: 'stop 后看是停止原动作，还是停下来做另一件事。remember 和 forget 后，doing 回看经历，to do 指需要做的事。try doing 是试一个办法，try to do 是努力做到。',
    structures: 'stop doing：停止在做的事 ｜ stop to do：停下来去做另一件事\nremember doing：记得做过 ｜ remember to do：记得去做\nforget doing：忘了做过 ｜ forget to do：忘了去做\ntry doing：试试这个办法 ｜ try to do：努力尝试做到',
    examples: [
      ['She stopped talking when the meeting started.', '会议开始时，她停止了说话。'],
      ['We stopped to check the map.', '我们停下来查看地图。'],
      ['I remember locking the door, but I forgot to turn off the light.', '我记得锁了门，却忘了关灯。'],
      ['Remember to keep the receipt.', '记得保留收据。'],
      ['I tried to open the suitcase. Then I tried using another key.', '我努力想打开行李箱，后来试了试用另一把钥匙。']
    ],
    mistakes: 'decide 后常用 to do，如 decide to leave；be used to doing 里的 to 是介词。不要把这些搭配套成同一个规则。',
    comparison: 'I will never forget meeting her. 表示那次见面忘不了；I forgot to meet her. 表示忘了赴约。'
  },
  {
    key: 'participle-modifiers', book: '二册进阶', category: '非谓语与动词搭配', title: '分词作定语：从定语从句看主动与被动',
    prompt: '从被修饰的名词出发，看它发出动作还是承受动作。',
    explanation: '很多表示主动或正在发生的定语可用 -ing 短语。带被动含义的定语常用过去分词短语。可先把名词后的部分还原成定语从句核对意思。',
    structures: 'the woman waiting outside ≈ the woman who is waiting outside\nthe room booked online ≈ the room that was booked online',
    examples: [
      ['The passengers waiting outside can board now.', '在外面等候的乘客现在可以上车了。'],
      ['The items ordered yesterday have arrived.', '昨天订的商品已经到了。']
    ],
    mistakes: '先确认分词修饰哪个名词。现在分词的名字不等于动作一定发生在现在；不能机械缩减任何定语从句。',
    comparison: 'the employee checking your booking 主动执行核对；the booking checked by the employee 是被核对的预订。'
  },
  {
    key: 'modal-perfect', book: '二册进阶', category: '情态动词', title: 'should / could / would have done',
    prompt: '区分对过去的建议、可能性和假设结果。',
    explanation: 'should have done 常表示当时本应该做；could have done 可以表示本来有机会，也可以根据上下文表示对过去的推测；would have done 常表示假设条件下会发生的过去结果。',
    structures: 'should / could / would + have + 过去分词',
    examples: [
      ['I should have called before going to the shop.', '去店里之前我本该打个电话。'],
      ['We could have taken the bus, but we decided to walk.', '我们本可以坐公交，但决定走路。'],
      ['I would have changed rooms if another one had been available.', '如果当时有别的空房，我就换房了。']
    ],
    mistakes: 'should have went → should have gone。过去结果需要从语境判断，could have left 也可能指「也许已经离开」。',
    comparison: 'should have 是回看当时该怎么做；would have 是想象条件改变后会发生什么。'
  },
  {
    key: 'sentence-core', book: '两册共有', category: '句型', title: '句子主干：先找到谁做什么',
    prompt: '先拆出主句，再确认从句和时间地点成分。',
    explanation: '先找主语和主句的谓语，再看动词是否需要宾语、表语或补语。介词短语常说明时间地点；定语从句修饰名词；宾语从句补充动作涉及的内容。',
    structures: '主谓：The train arrived.\n主系表：The room is quiet.\n主谓宾：I changed rooms.\n主谓双宾：She gave me a receipt.\n主谓宾补：I found the room noisy.',
    examples: [
      ['The train that I wanted to catch had already left when I got to the station.', '我到车站时，想赶的那班火车已经走了。'],
      ['Could you tell me where the nearest station is?', '请问你能告诉我最近的车站在哪里吗？']
    ],
    mistakes: '第一个例句的主干是 The train had already left。that I wanted to catch 修饰 train；when I got to the station 提供过去的时间参照。主句需要自己的谓语。',
    comparison: '第二句中 tell me 后接疑问词引导的宾语从句，where 是地点成分。从句用 the nearest station is 的陈述语序。'
  },
  {
    key: 'practical-collocations', book: '两册共有', category: '生活搭配', title: '预约、酒店和购物的常用搭配',
    prompt: '复习预约改期、换房和退货时可以直接用的表达。',
    explanation: '记住动词和名词放在一起的搭配，再替换具体的时间、房间和商品。礼貌请求常用 Could you…? 或 I’d like to…。',
    structures: 'make / reschedule an appointment：预约／改期\nbook a room / change rooms：订房／换房\nreturn an item：退货\none 替代一个可数名词，ones 替代复数',
    examples: [
      ['Something has come up. Could we reschedule my appointment?', '临时有点事。可以改一下我的预约时间吗？'],
      ['I can smell smoke in my room. Could I change rooms?', '我在房里闻到了烟味。可以换房吗？'],
      ['I’d like to return this jacket. Do you have a smaller one?', '我想退这件夹克。你们有小一点的吗？'],
      ['How long does it take to get to the hotel by bus?', '坐公交到酒店需要多久？']
    ],
    mistakes: 'I can smell smoke 是自己闻到了烟味；The room smells like smoke 是房间闻起来有烟味。',
    comparison: 'a smaller one 指一件更小的夹克；smaller ones 指多件更小的同类商品。'
  }
];

export const KLAIRE_REVIEW_ENTRIES = personalCards.map(({key,examples,...card})=>({
  id:`grammar-klaire-${key}`, module:'grammar', kind:'grammar', ...card,
  examples:examples.map(([en,zh])=>({en,zh})), notes:'', favorite:false, needsCheck:false, deletedAt:0,
  source:'根据 Klaire 的复习重点整理', sourceNote:'讲解和例句为独立编写，供一、二册学完后复习。'
}));

export const KLAIRE_REVIEW_TOPICS = [
  {id:'prepositions', title:'时间与地点介词', priority:true,
    summary:'钟点、星期、相对时间，及到车站、等车等情景。',
    ids:['grammar-klaire-time-expressions','grammar-klaire-deadlines','grammar-klaire-arrive-wait','grammar-024']},
  {id:'tense', title:'时态与时间逻辑', priority:true,
    summary:'先找时间参照点，区分一般过去、过去完成和现在完成。',
    ids:['grammar-klaire-past-reference','grammar-007','grammar-klaire-perfect-focus','grammar-009','grammar-010','grammar-008']},
  {id:'conditions', title:'条件句与虚拟语气', priority:true,
    summary:'从真实条件复习到现在、过去和混合假设。',
    ids:['grammar-035','grammar-036','grammar-037','grammar-klaire-mixed-conditions','grammar-klaire-wish','grammar-klaire-modal-perfect']},
  {id:'verbs', title:'非谓语与动词搭配', priority:true,
    summary:'对照 to do 和 doing，再复习分词作定语。',
    ids:['grammar-klaire-verb-pairs','grammar-034','grammar-klaire-participle-modifiers','grammar-032','grammar-033','grammar-klaire-modal-perfect']},
  {id:'sentences', title:'复杂句与主干', priority:false,
    summary:'先找主谓，再拆从句、比较和主谓一致。',
    ids:['grammar-klaire-sentence-core','grammar-039','grammar-040','grammar-038','grammar-014','grammar-025']},
  {id:'situations', title:'日常场景与搭配', priority:false,
    summary:'预约、换房、退货，配合例句朗读练习听说。',
    ids:['grammar-klaire-practical-collocations','grammar-021','grammar-027']}
];
