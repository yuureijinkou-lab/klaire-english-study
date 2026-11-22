// Each example is independent of the editable examples and notes in saved cards.
const core = [
  ['她通常工作日坐公交上班。','usually 和 on weekdays 都在讲平时。换成 We 作主语，takes 变成 take。',[
    ['She','主语，第三人称单数'],['usually','频率副词，放在实义动词前'],['takes the bus','谓语和宾语，take 随主语加 -s'],['on weekdays.','时间，说明是哪几天的习惯']]],
  ['他们正在门外等出租车。','are waiting 表示说话时正在等。They wait for a taxi every morning 则描述每天的习惯。',[
    ['They','主语，复数'],['are waiting','are + waiting，表示正在发生'],['for a taxi','wait for 接等待的对象'],['outside.','地点，说明在哪里等']]],
  ['我们昨晚没收到确认邮件。','last night 已经结束，选一般过去时。didn’t 已经交代过去，receive 后面不再加 -ed。',[
    ['We','主语'],['didn’t receive','否定谓语，didn’t + 动词原形'],['the confirmation email','宾语，没收到的东西'],['last night.','已结束的过去时间']]],
  ['电话响的时候，我正在做饭。','电话响前，做饭已经在进行。两件事同在过去，was cooking 交代背景，rang 交代中途发生的事。',[
    ['I','主语'],['was cooking','过去某一刻正在做饭'],['when the phone rang.','时间从句，rang 是 ring 的过去式']]],
  ['我打算明天给酒店打电话。','打算已经有了，用 am going to call。如果刚听到需要确认，现场说 I’ll call the hotel now 更像当下的决定。',[
    ['I','主语，和 am 搭配'],['am going to call','将来安排，going to 后接原形 call'],['the hotel','宾语，联系的对象'],['tomorrow.','将来的时间']]],
  ['我把房卡弄丢了，现在进不了房间。','用 have lost 把丢卡和现在进不了门连起来。交代昨晚几点丢的，可以用 I lost it last night。',[
    ['I','主语'],['have lost','have + 过去分词 lost，强调对现在的影响'],['my room key,','第一分句的宾语'],['so I can’t get in.','结果，can’t 说明眼下进不去']]],
  ['我去过那里，但我上次去是五月。','同一句可以切换时态。前半句回答「去没去过」，后半句交代已经结束的过去时间。',[
    ['I’ve been there,','现在完成时，告诉对方有这个经历'],['but','转折，接下来补充具体时间'],['I last went','一般过去时，went 说明那次发生的事'],['in May.','那一次是在五月']]],
  ['自从三月份搬到这里，我们一直住在这里。','把 since I moved here 看成一条起跑线。换成 for six months，就是从起点到现在的长度。',[
    ['We','主语'],['have lived here','现在完成时，居住延续至今'],['since','引出起点'],['we moved here in March.','过去发生的搬家是起点']]],
  ['我打开邮箱时，酒店已经取消了预订。','先找 opened，它把视线放在过去。取消比打开邮件更早，所以用 had cancelled。',[
    ['When I opened my email,','过去的参照事件'],['the hotel','主句主语'],['had already cancelled','较早的动作，had + 过去分词'],['the reservation.','被取消的预订']]],
  ['我已经找了这家店半个小时。','想强调找了多久，选 have been looking。要说已经找到了，可以说 I’ve found the shop。',[
    ['I','主语'],['have been looking','have been + -ing，突出持续的过程'],['for this shop','look for 接寻找的目标'],['for half an hour.','这个 for 接一段时间']]],
  ['前台终于开门时，我们已经等了二十分钟。','把「开门」当作过去的参照点。等候在它之前已经持续二十分钟，重点在等待的过程和时长。',[
    ['We','主句主语'],['had been waiting','过去完成进行时，回看此前的过程'],['for twenty minutes','已经持续多久'],['when the desk finally opened.','过去的参照时点']]],
  ['明天这个时候，我会正在飞往大阪。','at this time tomorrow 是观察点。飞行跨过这个点，届时人会在飞机上。',[
    ['At this time tomorrow,','将来的观察时点'],['I','主语'],['will be flying','will be + -ing，届时动作在进行'],['to Osaka.','飞行的目的地']]],
  ['到星期五，我们就已经付清账单了。','从星期五往前看，付款已经有了结果。by Friday 包含星期五这个期限，before Friday 则须在星期五之前。',[
    ['By Friday,','将来的截止点'],['we','主语'],['will have paid','will have + 过去分词 paid'],['the bill.','宾语，付清的账单']]],
  ['你的票在包里。','这里的 are 随复数 tickets 变化。问票是否在包里时，直接用 Are your tickets in your bag?。',[
    ['Your tickets','主语，中心词 tickets 是复数'],['are','be 动词，与复数主语一致'],['in your bag.','地点，说明票在哪里']]],
  ['车站附近有两家咖啡馆。','句子在介绍某处有什么。书面表达中 two cafés 配 are；介绍一家用 There is a café。',[
    ['There','引出存在，用来开头'],['are','be 动词，和后面的复数搭配'],['two cafés','存在的事物，注意数量'],['near the station.','存在的地点']]],
  ['她确认预订了吗？','原句是 She has confirmed the booking。has 已是助动词，把它提前就能问。简短回答 Yes, she has。',[
    ['Has','完成时助动词，被提到句首'],['she','主语，has 与她搭配'],['confirmed','过去分词，保留完成时形式'],['the booking?','宾语，确认的是预订']]],
  ['谁给你发了这张照片？','who 本身是发照片的人，所以后面直接用 sent。Who did you send the photo to? 里的 who 是收照片的人。',[
    ['Who','疑问词作主语，问谁做的'],['sent','谓语，send 的过去式'],['you','间接宾语，收到的人'],['this photo?','直接宾语，发出的东西']]],
  ['请不要把包留在这里。','在公共场合提醒对方时常加 please。指令的主语 you 通常省略，否定用 Don’t + 原形。',[
    ['Please','礼貌用语'],['don’t leave','否定祈使，don’t + 原形 leave'],['your bag','宾语'],['here.','地点']]],
  ['你没有拿错票，对吧？','前半句有 didn’t，后半句就用肯定的 did 提问。回答 Yes, I did 表示拿错了，No, I didn’t 表示没拿错。',[
    ['You','陈述部分的主语'],['didn’t take','过去时否定谓语'],['the wrong ticket,','宾语，话题是拿错票'],['did you?','尾问，用肯定的 did 呼应']]],
  ['我叫了一辆出租车。那辆出租车五分钟后到了。','第一次只是指出叫了一辆，用 a。第二句双方已知道是刚才那一辆，用 the 指回它。',[
    ['I called','第一句的主语和谓语'],['a taxi.','首次引入的一辆出租车'],['The taxi','第二句主语，指刚叫的那辆'],['arrived five minutes later.','第二句谓语和时间']]],
  ['在订酒店之前，我想请教一点建议。','advice 通常当不可数名词用。要数具体几条建议，用 two pieces of advice。',[
    ['I’d like','礼貌表达，I would like'],['some advice','宾语，some 修饰不可数名词 advice'],['before I book a hotel.','时间从句，说明什么时候想得到建议']]],
  ['您想来点水吗？','这是主动提供，问句可以用 some。如果是询问还有没有水，常说 Is there any water?。',[
    ['Would','情态动词，放在问句句首'],['you','主语'],['like','动词原形，和 would 搭配表示礼貌'],['some water?','宾语，这里是在主动提供水']]],
  ['她把钥匙给了我。我自己开了门。','第一句的 She 作主语，me 是接受者，her 后跟名词。第二句的 myself 强调开门的是我本人。',[
    ['She gave me','谁做什么给谁，me 是间接宾语'],['her keys.','her 修饰 keys，表示她的钥匙'],['I opened the door','第二句主谓宾'],['myself.','反身代词，强调亲自做']]],
  ['周五七点在入口碰面吧。','先分清三个问题。on Friday 回答哪天，at seven 回答具体几点，at the entrance 回答碰面地点。',[
    ['Let’s meet','提议一起见面'],['at the entrance','地点，一个具体会合点'],['at seven','具体钟点'],['on Friday.','星期几']]],
  ['她的英语讲得比我流利。','比较的是说英语的方式，用副词 fluently；这个词的比较级用 more。I do 里的 do 代替 speak English。',[
    ['She speaks English','主语、谓语和宾语'],['more fluently','副词比较级，修饰 speaks'],['than I do.','比较对象，另一个说英语的人']]],
  ['这个箱子太重了，没法搬。','too heavy 表示超过了能搬的程度。要表达搬得动，可以说 light enough to carry，enough 放在形容词后。',[
    ['The box','主语'],['is','系动词，连接主语与描述'],['too heavy','超过可承受的程度'],['to carry.','说明什么动作做不了']]],
  ['明天我就能开车接你。','will 后用 be able to，不能把 will 和 can 连在一起。说眼下能接你，可以用 I can pick you up now。',[
    ['I','主语'],['will be able to','将来具备能力或条件'],['pick you up','要做的动作，代词 you 放在中间'],['tomorrow.','将来时间']]],
  ['你不用付现金。','don’t have to 表示可以自行选择，不需要付现金。You mustn’t pay in cash 则表示不允许用现金。',[
    ['You','主语'],['don’t have to','没有必要做的事'],['pay','动词原形，接在 have to 后'],['in cash.','付款方式']]],
  ['灯亮着，所以她可能在家。','might 表示有可能。看到灯亮只能判断她也许在家；更有把握的判断可以用 must。',[
    ['The lights are on,','第一个分句，提供线索'],['so','引出根据这个线索作出的判断'],['she','第二分句的主语'],['might be at home.','用 might + 原形 be 表示推测']]],
  ['这扇门每天晚上九点锁上。','关心门每天怎样处理，用被动。已知是值班人员锁门时，可以说 Someone locks the door at nine。',[
    ['The door','主语，承受动作的东西'],['is locked','一般现在时的被动，is + 过去分词'],['at nine','动作发生的时刻'],['every evening.','频率，表示每天发生']]],
  ['我昨天请人修了手机。','句子关注安排手机被维修。想强调我亲自动手，就用 I repaired my phone。',[
    ['I','主语，安排维修的人'],['had','使役动词 have 的过去式'],['my phone repaired','my phone 承受 repaired 这个动作'],['yesterday.','明确的过去时间']]],
  ['我早点出门，好赶上第一班公交车。','to catch 回答「为什么早点出门」。出门的人和要赶公交的人都是 I。',[
    ['I','主语'],['left','leave 的过去式'],['early','说明出门时间早'],['to catch the first bus.','不定式短语，说明出门的目的']]],
  ['我期待下周见你。','look forward to 中的 to 是介词，接名词或 -ing。想表达「我想见你」，可用 I want to see you。',[
    ['I’m looking forward to','固定搭配，to 是介词'],['seeing you','-ing 短语，是期待的内容'],['next week.','见面的时间']]],
  ['我以前开车上班，现在已经习惯坐火车了。','used to drive 表示过去的习惯；am used to taking 表示现在已经适应。第二个 to 后用 -ing。',[
    ['I used to drive to work,','过去经常开车去上班'],['but','连接过去和现在的反差'],['now I’m used to','现在已经习惯'],['taking the train.','to 是介词，后接 taking']]],
  ['你现在订位，我们就能坐窗边。','这是将来有可能实现的情况。主句可以用 will，也可以用 can 等情态动词；if 从句用现在时 book。',[
    ['If you book now,','条件从句，用现在时说将来可能发生的事'],['we','主句的主语'],['can sit','结果，can + sit'],['by the window.','坐的位置']]],
  ['如果我有更多时间，我就会坐火车去。','说的是对现在或未来的设想。had 在这里表示假设距离，句子没在交代哪天有过空。',[
    ['If I had more time,','假设条件，had 是过去式'],['I','主句主语'],['would take','假设的结果，would + 原形'],['the train.','交通工具']]],
  ['如果我们早点出门，就赶上那班火车了。','既然是在回想过去，条件用 had left，过去的假设结果用 would have caught。现实中没早点出门，也没赶上车。',[
    ['If we had left earlier,','过去的假设条件'],['we','主句的主语'],['would have caught','设想中的过去结果'],['the train.','本来能赶上的火车']]],
  ['尽管房间很小，我们还是喜欢它，因为它很安静。','先拿出主干 we liked it。although 给出一个不妨碍结果的情况，because 解释喜欢的原因。',[
    ['Although the room was small,','让步从句，承认房间小'],['we liked it','主句，表达主要事实'],['because it was quiet.','原因从句，交代为什么喜欢']]],
  ['住在楼上的那位女士是我们的邻居。','who lives upstairs 贴着 the woman，帮你找出说的是哪位女士。who 在从句里作主语，所以不能随意删去。',[
    ['The woman','主句主语的中心词'],['who lives upstairs','定语从句，修饰 woman'],['is','主句的系动词'],['our neighbour.','主句表语，说明她的身份']]],
  ['你能告诉我早餐几点开始吗？','直接问是 When does breakfast start?。嵌进 tell me 后，用 when breakfast starts，主语 breakfast 在 starts 前。',[
    ['Could you tell me','主句，礼貌地提出请求'],['when','从句开头，问时间'],['breakfast','从句主语'],['starts?','从句谓语，和 breakfast 一致']]],
  ['她问我是否需要帮助。','原话可以是 Do you need help?。转述时用 if，引出是否；you 随说话视角改成 I，常见回移把 need 改成 needed。',[
    ['She asked me','转述部分，谁问了谁'],['if','引出简答是或否的问题'],['I needed help.','转述内容，使用陈述语序']]],
  ['他早上说，晚一点会给我打电话。','把自己放在他说话的那一刻，later 是相对那一刻的以后。原话可能是 I’ll call you later。',[
    ['He said','过去发生的报告'],['in the morning','说话发生的时间'],['he would call me','说话时看来还没发生的电话'],['later.','相对当时往后的时间']]]
];

const personal = {
  'time-expressions':['我通常工作日七点出门，但是今天早上晚出门了。','见到 this morning、last Friday、next week 这类常见时间表达，直接用作时间状语。具体钟点仍说 at seven。',[
    ['I usually leave','第一分句的习惯'],['at seven on weekdays,','at 配钟点，on 配工作日'],['but I left late','第二分句的一次过去事件'],['this morning.','this 已限定早上，前面不用 in']]],
  deadlines:['请最迟六点归还钥匙，我会一直待到七点。','归还钥匙是要完成的一件事，配 by。留下可以持续，配 until。before six 则要求发生在六点之前。',[
    ['Please return the key','祈使句，提醒归还'],['by six.','不迟于六点，六点还可以'],['I’ll stay','继续做的动作'],['until seven.','持续到七点']]],
  'arrive-wait':['我到了车站，然后等下一班火车。','arrive at the station 和 get to the station 都自然。说到一个城市，常用 arrive in。等候的对象放在 wait for 后。',[
    ['I arrived','第一分句主语和过去式'],['at the station','at 表示一个具体到达点'],['and waited','并列的第二个过去动作'],['for the next train.','等待的对象，不能漏掉 for']]],
  'past-reference':['我到前台时，酒店还没找到我的预订。','先把参照点放在 got to，再看那之前没有发生什么。hadn’t found 是否定的过去完成时。只谈单独的过去事件通常用 didn’t find。',[
    ['The hotel','主句主语'],['hadn’t found','到过去那一刻仍未找到'],['my booking','宾语'],['when I got to the desk.','过去的参照事件']]],
  'perfect-focus':['我已经写了三封邮件，整个上午都在写。','前半句给完成数量，后半句交代持续的过程。两种形式都可联系到现在，选择取决于你想强调什么。',[
    ['I’ve written three emails,','现在完成时，三封是已完成的数量'],['and','连接两条信息'],['I’ve been writing','现在完成进行时，强调过程'],['all morning.','活动持续的时段']]],
  'mixed-conditions':['如果我昨晚睡得早一点，今天就不会这么累了。','条件放在昨晚，结果放在今天。和第三条件句比较，wouldn’t be tired now 是相对于现在的结果。',[
    ['If I had gone to bed earlier,','对过去的假设，had + 过去分词'],['I','主句主语'],['wouldn’t be so tired','现在设想的状态，would + 原形 be'],['today.','结果的时间']]],
  wish:['真希望我昨天记得带护照。','昨天已经过去，用 wish + had done 表达遗憾。要说现在没有足够时间，可以说 I wish I had more time。',[
    ['I wish','引出与实际不同的愿望'],['I had remembered','从句，假设过去记得'],['to bring my passport','remember to do，记得去做'],['yesterday.','想改变的时间在过去']]],
  'verb-pairs':['我们在去车站的路上停下来买咖啡。','stopped to buy 表示停下别的事，为了买咖啡。stopped buying coffee 表示不再买咖啡这个行为。',[
    ['We','主语'],['stopped','谓语，先暂停正在做的事'],['to buy coffee','不定式，说明停下来的目的'],['on the way to the station.','在哪段路上发生']]],
  'participle-modifiers':['昨天下的订单已经准备好取货了。','placed yesterday 修饰 orders，可还原为 that were placed yesterday。订单是被提交的，因此用过去分词 placed。',[
    ['The orders','主语中心词'],['placed yesterday','过去分词作定语，说明是哪些订单'],['are','主句谓语，跟复数 orders 搭配'],['ready for collection.','表语，说明订单可以取了']]],
  'modal-perfect':['我本来应该在出门前查看时间表。','should have checked 用来反思过去应该做却没做的事。could have checked 可表示过去本来有机会，would have checked 常用于假设结果。',[
    ['I','主语'],['should have checked','情态动词 + have + 过去分词，反思过去'],['the timetable','宾语，查的内容'],['before I left.','过去的时间参照']]],
  'sentence-core':['我预订的房间在楼上，但我昨晚睡在楼下。','先找到两个主干 The room was upstairs 和 I slept downstairs。that I booked 紧跟 room，解释是哪间房。',[
    ['The room','第一句主语的中心词'],['that I booked','修饰 room 的定语从句'],['was upstairs,','第一句的系动词和表语'],['but I slept downstairs last night.','but 连接的第二个完整分句']]],
  'practical-collocations':['我可以把预约改到星期五吗？','reschedule an appointment 意思是改一个已经约好的时间。要新预约可用 make an appointment。to Friday 给新的日期。',[
    ['Could I','礼貌请求'],['reschedule','动词原形，表示改期'],['my appointment','宾语，已存在的预约'],['to Friday?','指定改到哪天']]]
};

const supplemental = {
  'future-perfect-progressive':['到十二月，我们学英语就满一年了。','先站在未来的十二月，再回头算学习持续了多久。想说到那时学完了两本书，可以用 will have finished two books。',[
    ['By December,','将来的参照时点'],['we','主语'],['will have been studying English','回看持续过程，will have been + -ing'],['for a year.','到那时累计的时间']]],
  agreement:['我的一位朋友在车站附近工作。','先找整个主语的中心词 one。of my friends 说明是哪一群人中的一个，离动词近的 friends 不能决定动词形式。',[
    ['One','主语中心，表示一位'],['of my friends','限定 one 的范围'],['works','谓语，单数主语配 works'],['near the station.','工作地点']]],
  'questions-negative':['你收到确认邮件了吗？','先把否定句 You didn’t get a confirmation email 改成一般疑问句，再用 didn’t 提前表示带有预期的确认。didn’t 后用动词原形 get。',[
    ['Didn’t','助动词加 not 的缩写，放在疑问句前'],['you','主语'],['get','实义动词原形'],['a confirmation email?','宾语，确认邮件']]],
  coordination:['商店关门了，所以我们第二天又去了一次。','前半句给原因，so 后面给结果。重写成 because 时，可以说 We went back the next day because the shop was closed。',[
    ['The shop was closed,','完整分句，提供原因'],['so','并列连接词，引出结果'],['we went back','另一个完整分句的主语和谓语'],['the next day.','再次去的时间']]],
  'short-agreement':['我没见过她。我也没见过。','have 属于现在完成时。上一句有 haven’t，回应时用 neither 再把 have 放在 I 前面，见她这部分省略。',[
    ['I haven’t met her.','对过去到现在的经历作否定'],['Neither','回应否定，表示「我也一样」'],['have I.','保留完成时的助动词，主语放在后面']]],
  'noun-plurals':['这列火车上有两个孩子和三家人。','children 是不规则复数。family 的 y 前是辅音字母，变复数时把 y 换成 -ies。',[
    ['There are','表示存在，后面列出多人'],['two children','child 的复数是 children'],['and three families','family 的复数是 families'],['on the train.','这些人所在的位置']]],
  'possessive-nouns':['客人们的包在门旁。','guests 已是规则复数，撇号放在 s 后面。只有一位客人时，写 the guest’s bags。',[
    ['The guests’ bags','整个短语是主语，guests’ 说明归属'],['are','与中心词 bags 一致'],['by the door.','位置，在门旁']]],
  demonstratives:['那边那些位子有人坐吗？','those 指远一些的多个座位。问近处的一个位子，可以用 Is this seat taken?。',[
    ['Are','在问句中提前的 be'],['those seats','复数主语，those 指那些'],['taken?','说明座位是否已被占用']]],
  'one-ones':['这把伞太大了，我想要一把小一点的。','a smaller one 中 one 指同类里的另一把伞。如果我决定拿刚才那把，要说 I’ll take it。',[
    ['This umbrella is too big.','第一句指出具体的伞和问题'],['I’d like','第二句礼貌地说明想要什么'],['a smaller one.','one 替代可数单数 umbrella，避免重复']]],
  'reflexive-reciprocal':['我们互相拍了照片。','each other 的动作指向对方。说 We took photos of ourselves，意思是拍我们自己，关注的是照片里的对象。',[
    ['We','主语，包含不止一个人'],['took photos','做的动作，拍照'],['of each other.','each other 作 of 的宾语，表示彼此']]],
  'indefinite-choices':['两个日期都不方便。两个房间都空着。','neither of 指两者都不，正式语境常搭配单数。both of 指两者都，搭配复数。',[
    ['Neither of the dates','第一句主语，两者都不'],['works for me.','单数谓语表示对我不方便'],['Both of the rooms','第二句主语，两者都'],['are free.','复数谓语加表语，表示房间空着']]],
  'dummy-it':['用手机买票很方便。','it 暂时占住主语位置。真正讨论的内容是 to buy tickets on your phone，也可以把 Buying tickets on your phone 放在句首。',[
    ['It','形式主语，先占住句首位置'],['is easy','系动词加表语，说明方便'],['to buy tickets','真正被评价的动作'],['on your phone.','说明使用的方式']]],
  'adverb-position':['我们通常早餐后查看邮箱。','usually 放在实义动词 check 前。如果谓语是 be，通常放在 be 后，例如 We are usually busy。',[
    ['We','主语'],['usually','频率副词，说明多常做'],['check our emails','谓语和宾语'],['after breakfast.','时间短语']]],
  'comparison-details':['这趟火车没有公交车那么便宜。','not as…as 用形容词原级。也可以说 The bus is cheaper than this train，把比较方向掉过来。',[
    ['This train','主语，被比较的交通工具'],['isn’t','系动词的否定'],['as cheap as','形容词原级放在两个 as 之间'],['the bus.','比较对象']]],
  'prepositions-movement':['我们走进了屋里，那里很暖和。','into the room 突出从外面到里面。单说位置可以用 We were in the room。',[
    ['We walked','第一分句主语和谓语'],['into the room,','移动终点，进入屋里'],['where it was warm.','补充屋里的情况']]],
  'stative-verbs':['我觉得这间房太吵了。我正在考虑换房。','think 表示看法时常用一般现在时。think about 表示正在考虑一件事时，可用现在进行时。',[
    ['I think','第一句，用一般现在时表达观点'],['this room is too noisy.','从句，说明观点内容'],['I’m thinking about','第二句，用进行时描述正在考虑'],['changing rooms.','about 后接 -ing，说明考虑的内容']]],
  'future-arrangements':['我约了周二见经理。火车八点发车。','第一个动作是已经约好的个人安排，用现在进行时。第二句是按表发车，用一般现在时。',[
    ['I’m meeting','现在进行时，表示已落实的安排'],['the manager on Tuesday.','会面对象和将来时间'],['The train','第二句主语'],['leaves at eight.','一般现在时，说明时刻表']]],
  'verb-forms':['她上周给我们写了邮件，今天又写了一封。','write 的过去式是 wrote，过去分词是 written。看见 has，就要选 written。',[
    ['She wrote to us','一般过去时，选过去式 wrote'],['last week,','明确的过去时间'],['and she has written','现在完成时，has 后用 written'],['another email today.','到今天已经写的另一封邮件']]],
  'object-infinitive':['前台请我们出示护照。','ask 后可用「人 + to do」，us 既是 asked 的宾语，也是后面出示护照的人。对比 let us in，let 后若接动词用原形。',[
    ['The receptionist','主语，发出请求的人'],['asked','过去式，表示请求'],['us','宾语，收到请求的人'],['to show our passports.','不定式，说明被请做什么']]],
  'phrasal-placement':['能请你把音乐调小一点吗？','turn down 是可分的短语动词。代词 it 要放在 turn 和 down 之间。如果用名词，两种位置 turn down the music、turn the music down 都可以。',[
    ['Could you','礼貌请求'],['turn it down,','it 指音乐音量，放在动词和 down 中间'],['please?','用礼貌用语收尾']]],
  'passive-forms':['我们的房间正在打扫，等打扫完了我们就可以进去。','is being cleaned 突出正在打扫。has been cleaned 把打扫当作已经完成的条件。两者末尾都是过去分词 cleaned。',[
    ['Our room is being cleaned,','进行时被动，房间正在被打扫'],['and we can go in','并列分句，说明我们可以进去'],['once it has been cleaned.','时间从句，用完成时被动强调达到完成状态']]],
  'subject-clause':['她说的话让我吃惊。','先找主句谓语 surprised。问「什么让我吃惊」，答案是整段 What she said。what 在这段里面又是 said 的宾语。',[
    ['What she said','整段作主语，what 指她说的内容'],['surprised','主句谓语，表示使……吃惊'],['me.','主句宾语，受到影响的人']]],
  'predicative-clause':['问题是我们没有预订。','先看主干 The problem is…，再问问题具体是什么。that 后面的整段填在系动词后，是表语。',[
    ['The problem','主句主语'],['is','系动词，连接问题与内容'],['that we don’t have a reservation.','表语从句，说明问题的内容']]],
  'content-clause':['火车取消的消息让大家很意外。','that 后的 the train was cancelled 自己就是完整句子，交代 news 的具体内容。对比 the news that surprised us，里面的 that 是从句主语并指代 news。',[
    ['The news','主句的主语中心词'],['that the train was cancelled','同位语从句，展开消息的内容'],['surprised','主句谓语'],['everyone.','主句宾语']]],
  'relative-choices':['我们想预订的那家酒店今天关门。','booked 需要宾语，that 指 hotel，所以可说 the hotel we’d booked。换成 the hotel where we stayed，where 表示「在那里」。',[
    ['The hotel','主句的主语中心词'],['that we’d booked','限定性定语从句，that 在从句中作宾语'],['is closed','主句的谓语和表语'],['today.','时间，说明关门的日期']]],
  'purpose-result':['我把地址写下来，好让你能找到酒店。','so that 后写做这件事的目的，两边主语可以不同。so tired that I fell asleep 中 that 后写实际结果，so 修饰 tired。',[
    ['I wrote down','主句的主语和谓语'],['the address','宾语，写下的内容'],['so that you could find the hotel.','目的从句，动作主体是 you']]],
  'condition-connectors':['除非下雨，否则我们会步行去车站。','unless it rains 可以理解成 if it doesn’t rain。只想表达「即使下雨也会走」时，可以用 even if it rains。',[
    ['We’ll walk','主句，用 will 表示将来'],['to the station','走向的目的地'],['unless it rains.','例外条件，下雨时计划改变']]],
  'modal-deduction':['她的外套还在这儿。她不可能已经走了。','can’t have left 是根据眼前的线索推断过去没发生离开。must have left 表达相反的高把握判断，might have left 则保留可能。',[
    ['Her coat is still here.','第一句提供现在可见的线索'],['She','第二句主语'],['can’t have left.','can’t + have + 过去分词，作过去的否定推测']]]
};

function example([zh,reason,parts]) {
  return {zh,reason,parts,en:parts.map(([text])=>text).join(' ')};
}

export const GRAMMAR_BREAKDOWNS = Object.fromEntries([
  ...core.map((row,index)=>[`grammar-${String(index+1).padStart(3,'0')}`,example(row)]),
  ...Object.entries(personal).map(([id,row])=>[`grammar-klaire-${id}`,example(row)]),
  ...Object.entries(supplemental).map(([id,row])=>[`grammar-extra-${id}`,example(row)])
]);
