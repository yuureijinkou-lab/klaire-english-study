// Independently written explanations and examples; book labels indicate study level,
// not an official lesson mapping. Stable IDs must not be renumbered.
const grammarRows = [
['一般现在时','时态','两册共有','怎样表达习惯和通常成立的事实？第三人称怎样变化？','表达习惯、规律和较稳定的状态。he/she/it 后实义动词通常加 -s 或 -es。','肯定：主语 + 动词原形／第三人称单数\n否定：主语 + do/does not + 动词原形\n疑问：Do/Does + 主语 + 动词原形？','She walks to work every day.','她每天步行上班。','Does she work on Sundays?','她星期天上班吗？','用了 does 后，主要动词恢复原形：Does she work?，不能写 works。','一般现在时讲习惯；现在进行时讲此刻或当前阶段正在发生的事。'],
['现在进行时','时态','两册共有','现在正在做的事情如何表达？','表达此刻或当前阶段正在进行的动作，也可表达已安排的近期计划。','肯定：主语 + am/is/are + 动词-ing\n否定：主语 + am/is/are not + 动词-ing\n疑问：Am/Is/Are + 主语 + 动词-ing？','I am waiting for the bus.','我正在等公交车。','Are you staying here tonight?','你今晚住这里吗？','不能漏掉 be；know、believe 等状态动词通常不用进行时。','I work here 表示工作地点；I am working here this week 表示这周的临时安排。'],
['一般过去时','时态','两册共有','已结束的过去动作怎样表达？否定句怎样变？','表达过去某个已结束时间内的动作或状态。规则动词通常加 -ed，不规则形式需单独记忆。','肯定：主语 + 过去式；be 用 was/were\n否定：did not + 动词原形；was/were not\n疑问：Did + 主语 + 动词原形？／Was/Were ...？','We visited the museum yesterday.','我们昨天参观了博物馆。','Did you see the new shop?','你看到那家新店了吗？','did 后用原形，不能写 Did you went?。','明确的过去时间如 yesterday 通常搭配一般过去时，不搭配现在完成时。'],
['过去进行时','时态','两册共有','过去某一时刻正在做什么，用什么结构？','描述过去某时正在进行的动作，常用于叙事背景；可与突然发生的一般过去时动作连用。','肯定：主语 + was/were + 动词-ing\n否定：主语 + was/were not + 动词-ing\n疑问：Was/Were + 主语 + 动词-ing？','I was cooking when the phone rang.','电话响时我正在做饭。','Were they waiting outside at six?','六点时他们正在外面等吗？','不是所有 when 从句都用一般过去时，要根据事件是否正在进行判断。','was cooking 强调当时进行中；cooked 叙述过去发生并作为整体看待的事情。'],
['将来表达：will 与 be going to','时态','两册共有','临时决定和事先打算分别怎样说？','will 常用于临时决定、意愿或预测；be going to 常用于已有打算，或根据眼前迹象作预测。','will + 动词原形；否定 will not；疑问 Will ...？\nam/is/are going to + 动词原形；否定在 be 后加 not；疑问 be 提前','The phone is ringing. I will answer it.','电话响了。我来接。','We are going to visit our aunt tomorrow.','我们打算明天去看姑姑。','will 后不能接 to；going to 前要有适当的 be。','安排已落实时也常用现在进行时：We are meeting at six.'],
['现在完成时','时态','两册共有','过去发生的事与现在有关，怎样表达？','表达过去经历、已经完成且影响现在的动作，或延续至今的状态。不强调已结束的具体过去时间。','肯定：主语 + have/has + 过去分词\n否定：have/has not + 过去分词\n疑问：Have/Has + 主语 + 过去分词？','I have lost my key, so I cannot get in.','我把钥匙弄丢了，所以现在进不去。','Have you ever visited Beijing?','你去过北京吗？','不能把过去式一律当成过去分词：go-went-gone。','I lost it yesterday 说明过去时间；I have lost it 关注现在的结果。'],
['现在完成时与一般过去时','时态对比','两册共有','I have seen it 和 I saw it yesterday 有何区别？','现在完成时把过去与现在联系起来；一般过去时把事情放在已结束的过去时间中。','经历／当前结果：have/has + 过去分词\n已结束时间：过去式\n追问具体何时常用：When did ...？','I have read that book.','我读过那本书。','I read it last month.','我上个月读的。','不要写 I have read it last month。英美口语在 just/already 等用法上存在差异。','先谈经历 Have you been there?，再问细节 When did you go?。'],
['for、since 与持续时间','时态对比','两册共有','for two years 与 since 2024 分别表示什么？','for 后接一段时间；since 后接起点。延续至今通常用现在完成时；for 也能用于其他时态。','for + 时长；since + 起点／过去时从句\n延续至今：have/has + 过去分词 + for/since','She has lived here for two years.','她已经在这里住了两年。','I have known him since I was a child.','我从小就认识他。','短暂动作不能直接表示一直持续：已买三天用 have had ... for three days。','have been here 表示一直在这里；have been to 表示去过；have gone to 表示去了尚未回来。'],
['过去完成时','时态','二册进阶','两个过去事件中，如何说明更早发生的那个？','以过去某时为参照，说明此前已发生或完成的事情，常用于交代过去事件的原因和顺序。','肯定：主语 + had + 过去分词\n否定：had not + 过去分词\n疑问：Had + 主语 + 过去分词？','The train had left when we arrived.','我们到达时，火车已经开走了。','Had you finished before she called?','她打电话之前你已经完成了吗？','仅仅“很久以前”并不需要过去完成时，要有过去的参照点。','had left 早于 arrived；一般过去时可按时间顺序叙述连续事件。'],
['现在完成进行时','时态','二册进阶','怎样强调从过去持续到现在的活动过程？','强调活动持续了一段时间，可能仍在进行，也可能刚结束而仍有可见影响。','肯定：have/has been + 动词-ing\n否定：have/has not been + 动词-ing\n疑问：Have/Has + 主语 + been + 动词-ing？','I have been studying for two hours.','我已经学习两个小时了。','Has it been raining all morning?','整个上午一直在下雨吗？','know 等状态动词通常用完成时：I have known her for years。','have written three emails 强调完成数量；have been writing emails 强调过程。'],
['过去完成进行时','时态','二册进阶','过去某事发生之前一直在做什么，怎样表达？','强调某个过去参照点之前持续进行的活动，常解释当时的状态或结果。','肯定：had been + 动词-ing\n否定：had not been + 动词-ing\n疑问：Had + 主语 + been + 动词-ing？','He was tired because he had been running.','他很累，因为之前一直在跑步。','Had you been waiting long when I arrived?','我到的时候，你已经等很久了吗？','参照点在过去，用 had；参照点在现在，用 have/has。','had repaired 强调修好了；had been repairing 强调此前一直在修。'],
['将来进行时','时态','二册进阶','怎样描述将来某一时刻正在进行的动作？','把视角放到未来某个时间，描述那时正在进行的事情。','肯定：will be + 动词-ing\n否定：will not be + 动词-ing\n疑问：Will + 主语 + be + 动词-ing？','At eight tomorrow, I will be travelling to work.','明天八点我会正在上班路上。','Will you be working this evening?','你今晚会在工作吗？','will 后用 be 原形，不用 is/are。','will travel 是整体计划或预测；will be travelling 突出未来时刻的进行过程。'],
['将来完成时','时态','二册进阶','怎样表达在未来某个时间之前已经完成？','以未来某点为参照，表达在此之前完成的事情；常与 by、by the time 连用。','肯定：will have + 过去分词\n否定：will not have + 过去分词\n疑问：Will + 主语 + have + 过去分词？','We will have finished by Friday.','到星期五我们就会完成。','Will she have arrived by noon?','到中午她会已经到了吗？','by 表示不迟于该时点，不能把它简单等同于表示持续的 until。','将来进行时看那时正在做什么；将来完成时看那时之前已经完成什么。'],
['be 动词与主谓一致','句型','一册基础','I、you、he 分别配什么 be？','be 可表达身份、状态或位置。主语人称和单复数决定 be 的形式。','现在：I am；he/she/it is；you/we/they are\n过去：I/he/she/it was；you/we/they were\n否定：be + not；疑问：be 提到主语前','They are at home.','他们在家。','Was she busy yesterday?','她昨天忙吗？','be 作主要动词时不加 do：Are you tired?，不是 Do you are tired?。','一般现在时的实义动词问句用 do/does；be 问句直接把 be 提前。'],
['there be 与 have','句型','一册基础','“那里有”和“某人拥有”怎样区分？','there be 表示某处存在某物；have 表示某人或某物拥有。','There is + 单数／不可数名词；There are + 复数\n否定：There is not ...；疑问：Is there ...？\n主语 + have/has + 宾语','There is a bank near the station.','车站附近有一家银行。','My sister has a new bicycle.','我姐姐有一辆新自行车。','不能写 There has a bank。规范书面语要保持 be 与其后名词的数一致。','“我家有三口人”可说 There are three people in my family。'],
['一般疑问句与简短回答','句型','两册共有','怎样把陈述句变为是非问句？','有 be、情态动词或助动词时将它提前；一般现在或过去的实义动词用 do/does/did。','Be/助动词/情态动词 + 主语 + 其余部分？\nYes, 主语 + 对应助动词；No, 主语 + 对应助动词 + not','Do you like tea? Yes, I do.','你喜欢茶吗？是的，我喜欢。','Can she swim? No, she cannot.','她会游泳吗？不，她不会。','问句用了 do/does/did，主要动词要用原形；简答要与提问的助动词对应。','否定问句按实际事实回答；是否存在／是否做过比逐字翻译中文更重要。'],
['特殊疑问句与主语提问','句型','两册共有','Who called you? 为什么不用 did？','提问时间、地点、方式等通常用疑问词加一般疑问句；疑问词本身作主语时通常保持陈述语序。','Where/When/Why/How + 助动词 + 主语 + 动词？\nWho/What 作主语：Who/What + 动词？','Where did you buy this bag?','你在哪里买的这个包？','Who called you last night?','昨晚谁给你打了电话？','Who did you call? 的 who 是宾语；Who called you? 的 who 是主语。','How many 接可数复数；How much 接不可数名词或询问价格。'],
['祈使句与 let us','句型','一册基础','怎样提出指令、请求和共同建议？','祈使句通常省略主语 you，以动词原形开头。please 可使请求较礼貌；Let us/Let’s 提出共同建议。','肯定：动词原形 ...\n否定：Do not/Don’t + 动词原形\n建议：Let’s + 动词原形；Let’s not + 动词原形','Please close the window.','请关窗。','Let’s not be late.','我们别迟到了。','否定祈使句不是 Not open，而是 Do not open。','命令、礼貌请求、建议的语气不同；正式请求可改用 Could you ...？'],
['反意疑问句','句型','两册共有','句末的 isn’t it、do you 怎样选择？','常用于确认信息。通常前面肯定后面否定，前面否定后面肯定；助动词和人称要呼应。','肯定陈述，否定助动词 + 代词？\n否定陈述，肯定助动词 + 代词？\nI am ... 的常见尾问：aren’t I？','You live nearby, don’t you?','你住在附近，是吗？','She has not left, has she?','她还没离开，对吗？','never、hardly 等带否定意义，尾问通常用肯定式。','语调上升常表示真在询问，下降常表示期待对方确认；回答按事实。'],
['冠词 a、an、the 与零冠词','名词与限定词','两册共有','首次提及、特指和泛指时分别怎样用冠词？','a/an 泛指一个可数单数；the 指双方能识别的特定对象；泛指复数和不可数名词常不用冠词。','a/an + 可数单数；an 用于元音音素前\nthe + 可数或不可数名词\n泛指：复数／不可数名词','I saw a dog. The dog was very small.','我看见一只狗。那只狗很小。','Water is important.','水很重要。','a/an 看读音，不看字母：an hour；a university。可数单数通常不能裸用。','go to school 表示上学；go to the school 通常指去某所学校这个地点。'],
['可数、不可数与数量表达','名词与限定词','两册共有','many、much、a few、a little 怎样选？','可数名词可有复数；不可数名词通常不能直接加数词，要借助计量单位。','many/(a) few + 可数复数\nmuch/(a) little + 不可数\na lot of + 两者；a piece of + 不可数','We need a little milk and a few eggs.','我们需要一点牛奶和几个鸡蛋。','There is not much information here.','这里的信息不多。','information、advice、furniture 通常不可数；不能写 an advice。','a few/a little 表示有一些；few/little 往往强调几乎没有。'],
['some、any、no 与复合代词','名词与限定词','两册共有','问句中什么时候也用 some？','some 常用于肯定句；any 常用于否定和疑问句。期待同意的请求或邀请可用 some；any 也可表示任意。','some/any + 名词\nsomeone/anything/nothing 作主语通常接单数\nno + 名词；not ... any','Would you like some tea?','你想喝点茶吗？','I did not see anyone outside.','我没看到外面有人。','标准英语中避免双重否定：I did not see anyone，不是 did not see nobody。','something interesting 中形容词放在复合不定代词后。'],
['人称、物主与反身代词','代词','一册基础','my 与 mine、me 与 myself 怎样区分？','主格作主语，宾格作宾语；形容词性物主代词后接名词，名词性物主代词独立使用；反身代词指回主语。','I/me/my/mine/myself\nhe/him/his/his/himself；she/her/her/hers/herself\nwe/us/our/ours/ourselves','This is my pen. That one is yours.','这是我的笔。那支是你的。','He cut himself while cooking.','他做饭时割伤了自己。','不能把 myself 当作普通主语替代 I；物主代词不加撇号：yours。','by myself 表示独自／靠自己；enjoy myself 表示玩得愉快。'],
['时间和地点介词','介词','两册共有','at、on、in 用于时间和地点时怎样判断？','时间：at 常指时刻，on 常指具体日期，in 常指较大时段。地点：at 看作点，on 表面，in 内部或区域。','at six / at night；on Monday / on Monday morning\nin May / in 2026 / in the morning\nat the station；on the wall；in the room','The meeting starts at nine on Monday.','会议在星期一九点开始。','There is a picture on the wall.','墙上有一张画。','this/next/last/every 前通常不再加时间介词：next Monday。','in two hours 表示两小时后；for two hours 表示持续两小时。'],
['形容词、副词与比较等级','比较与修饰','两册共有','形容词和副词怎样修饰？比较级怎样形成？','形容词修饰名词或作表语；副词常修饰动作。比较两者用比较级，某范围最高用最高级。','短词：-er/-est；长词：more/most\n比较级 + than；the + 最高级\nas + 原级 + as；not as ... as','This road is wider than that one.','这条路比那条宽。','She speaks more slowly than I do.','她说得比我慢。','不能同时用 more 和 -er：不能写 more easier；good/well 的比较级是 better。','系动词后常接形容词：It looks good；修饰 speak 用 clearly 等副词。'],
['too、enough 与 so/such','比较与修饰','两册共有','too heavy 与 heavy enough 的语序和意思？','too 表示超过合适程度；enough 表示足够。so 修饰形容词／副词，such 修饰名词词组，可接 that 表结果。','too + 形容词 + to do\n形容词 + enough + to do；enough + 名词\nso + 形容词 + that；such + (a/an) + 形容词 + 名词 + that','The bag is too heavy for me to carry.','这个包太重，我提不动。','It was such a cold day that we stayed home.','那天很冷，所以我们待在家。','enough 的位置不同：warm enough，但 enough time。','too 通常带负面结果；very 只加强程度，不自动表示做不到。'],
['can、could 与 be able to','情态动词','两册共有','能力和礼貌请求怎样表达？','can 表示能力、许可或可能；could 可表示过去一般能力或较委婉请求。be able to 可用于更多时态。','can/could + 动词原形；否定 cannot/could not\nCan/Could + 主语 + 动词原形？\nwill be able to；have been able to','Could you open the door, please?','请你开一下门好吗？','She will be able to join us tomorrow.','她明天就能参加了。','情态动词后不加 to，也不加第三人称 -s。','过去某次成功做成某事常用 was/were able to 或 managed to。'],
['must、have to 与 need','情态动词','两册共有','must not 和 do not have to 是同一个意思吗？','must/have to 表示必须；must not 表示禁止；do not have to/need not 表示没有必要。过去义务通常用 had to。','must + 原形；have/has to + 原形\nmust not + 原形＝禁止\ndo not have to／need not + 原形＝不必','You must not park here.','你禁止在这里停车。','We do not have to leave yet.','我们还不必离开。','need not 后不用 to；普通动词 need 的否定为 do not need to。','must not take it＝不准拿；do not have to take it＝可以不拿。'],
['should、may、might 与推测','情态动词','二册进阶','建议、可能和有把握的推测怎样表达？','should 常表示建议或预期；may/might 表示可能；must 可表示有依据的强推测；不可能常用 cannot。','should/may/might/must + 动词原形\n对过去推测：情态动词 + have + 过去分词\nshould have done 可表示本应做却没做','You should take a break.','你应该休息一下。','She may have missed the bus.','她可能没赶上公交车。','must not 通常表示禁止；表示“不可能”常用 cannot。','must have done 是对过去的推测；had to do 是过去的义务。'],
['被动语态','语态','两册共有','不知道或不强调动作执行者时，句子怎样组织？','以动作承受者为主语。根据时间改变 be，后面的过去分词保持不变；by 引出执行者。','肯定：主语 + be + 过去分词\n否定：be + not + 过去分词；疑问：Be + 主语 + 过去分词？\nis made；was made；will be made；has been made；is being made','The room is cleaned every morning.','这个房间每天早晨打扫。','The bridge was built last year.','这座桥是去年建的。','不是所有动词都能变被动；happen、arrive 等不及物动词通常不能直接变被动。','主动强调谁做：They repaired it；被动强调承受者：It was repaired。'],
['使役结构：have/get something done','非谓语与动词搭配','二册进阶','“请人修车”怎样区别于“自己修车”？','have/get + 宾语 + 过去分词，常表示安排他人做事；也可描述遭遇。','have/get + 事物 + 过去分词\n依时态改变 have/get\nhave someone do；get someone to do','I had my bike repaired yesterday.','我昨天请人修了自行车。','She is getting her hair cut.','她正在理发。','had my bike repaired 不是过去完成时；此处 had 是使役动词。','I repaired it＝我修的；I had it repaired＝我安排别人修的。'],
['不定式：目的与动词搭配','非谓语与动词搭配','两册共有','to do 怎样表示目的？哪些动词后接它？','to + 原形可表示目的，也可接在 want、decide、hope 等动词后；否定通常为 not to do。','目的：to/in order to + 原形\nwant/decide/hope + to do\nask/tell + 人 + to do；ask/tell + 人 + not to do','I went out to buy some bread.','我出去买面包。','She asked me not to wait.','她叫我不要等。','情态动词后不用 to；let/make + 人 + 原形，但 be made to do 要保留 to。','stop to do＝停下原来的事去做另一件；stop doing＝停止正在做的事。'],
['动名词与介词后的 -ing','非谓语与动词搭配','二册进阶','为什么 enjoy 后用 doing，look forward to 后也用 doing？','动名词可作主语或宾语；enjoy、avoid、finish 等后常接 -ing。介词后的动词通常也用 -ing。','enjoy/finish/avoid + 动词-ing\n介词 + 动词-ing\nlook forward to / be used to + 动词-ing','I enjoy reading on the train.','我喜欢在火车上读书。','We are looking forward to seeing you.','我们期待见到你。','look forward to 中 to 是介词，不是不定式标记。','remember doing＝记得做过；remember to do＝记得要去做。'],
['used to 与 be/get used to','非谓语与动词搭配','二册进阶','“过去常常”和“习惯于”怎样区分？','used to 描述过去的习惯或状态，通常暗示现在不同；be used to 表示习惯，get used to 强调逐渐适应。','used to + 动词原形；否定 did not use to\nDid + 主语 + use to ...？\nbe/get used to + 名词／动词-ing','I used to live near the sea.','我以前住在海边。','I am used to getting up early.','我习惯早起。','did 后用 use，不是 used；be used to 后若接动词用 -ing。','be used to do 还可能是被动：“被用来做”，要看上下文。'],
['零条件句与第一条件句','条件与从句','两册共有','事实规律与真实将来条件分别怎样表达？','零条件句说通常成立的结果；第一条件句讨论未来可能实现的条件及其结果。','规律：If + 一般现在时，一般现在时\n将来：If + 一般现在时，will/can + 原形\n主句也可用祈使句','If water freezes, it becomes ice.','水结冰时会变成冰。','If it rains tomorrow, we will stay home.','如果明天下雨，我们就待在家。','表示普通将来条件时，if 从句通常不用 will。','when 偏向认为会发生；if 保留是否发生的不确定性。'],
['第二条件句','条件与从句','二册进阶','假设现在不真实或将来可能性较低，怎样说？','用过去式表达与现实的距离，不一定指过去时间。主句常用 would/could/might + 原形。','If + 一般过去时，would + 动词原形\n假设 be 常用 were（正式语体）\nIf I were you, I would ...','If I had more time, I would learn Italian.','如果我有更多时间，我会学意大利语。','If I were you, I would ask for help.','如果我是你，我会寻求帮助。','通常不在 if 从句中用 would 来表示普通假设条件。','第一条件句更现实可行；第二条件句更假想，不代表事情发生在过去。'],
['第三条件句','条件与从句','二册进阶','对已经无法改变的过去作假设，怎样说？','表达过去条件未实现时的假想结果，常用于遗憾或反事实推理。','If + had + 过去分词，would have + 过去分词\n结果也可用 could/might have + 过去分词\n否定：had not／would not have','If we had left earlier, we would have caught the train.','如果我们早点出发，就赶上火车了。','I would have called if I had had your number.','如果当时有你的号码，我就会打电话了。','would have 后接过去分词；had had 中第一个 had 是助动词。','第二条件句假设现在／将来；第三条件句假设过去。'],
['时间、原因、让步与结果从句','条件与从句','两册共有','when、because、although、so 分别连接什么关系？','用从句说明时间、原因或让步。表达未来时间时，when、until、as soon as 等从句通常用现在时表将来。','时间：when/while/until/as soon as\n原因：because；让步：although/though\n结果：so；时间将来：when + 现在时，主句将来时','I will call you when I arrive.','我到了就给你打电话。','Although it was late, we kept working.','虽然很晚了，我们仍继续工作。','标准句中避免 although ... but 和 because ... so 同时成对使用。','while 常强调两件事同时进行；until 表示持续到某点才结束或改变。'],
['定语从句：who、which、that','条件与从句','二册进阶','怎样用一个从句说明“哪一个人／物”？','定语从句修饰前面的名词；who 常指人，which 常指物，that 可用于限定性从句指人或物。','名词 + who/which/that + 从句\n关系词作宾语时，限定性从句中常可省略\n非限定性从句用逗号，通常不用 that','The woman who lives next door is a teacher.','住在隔壁的女士是一名教师。','This is the book that I told you about.','这就是我跟你说过的那本书。','关系词作主语时不能省略，也不要重复主语：不能写 who she lives。','限定性从句识别是哪一个；非限定性从句补充信息，前后通常有逗号。'],
['宾语从句与间接疑问句','条件与从句','两册共有','Could you tell me where ... 后为什么不倒装？','宾语从句作动词的宾语。间接疑问句使用陈述语序；是非疑问常用 if/whether 引导。','陈述：I think (that) + 主语 + 谓语\n特殊疑问：疑问词 + 主语 + 谓语\n是非疑问：if/whether + 主语 + 谓语','Could you tell me where the station is?','你能告诉我车站在哪里吗？','I do not know whether he is at home.','我不知道他是否在家。','不能保留直接问句语序：不是 where is the station（作为从句时）。','直接问 Where is he?；间接问 Do you know where he is?。'],
['直接引语与间接引语','条件与从句','两册共有','转述别人的话时，人称、时态、时间词怎样处理？','转述要根据说话者和参照时间调整人称、时态及时间地点词。主句为过去时，时态常后移；仍成立的事实可不后移。','say (that) + 从句；tell + 人 + 从句\nam/is → was；will → would；have done → had done（常见后移）\n命令：tell/ask + 人 + (not) to do','She said that she was tired.','她说她累了。','He told me not to wait.','他叫我不要等。','tell 通常需要人作宾语；say to someone。不要机械替换 today/tomorrow，要看转述时的日期。','“地球围绕太阳转”等仍成立的事实，转述时可以保持一般现在时。'],
['过去将来时与 would','时态','二册进阶','站在过去看“将会发生”，怎样表达？','从过去某个时间点看将来的动作，常出现于间接引语。would 还可用于礼貌、假设和过去习惯，需结合语境。','肯定：would + 动词原形；was/were going to + 原形\n否定：would not + 原形\n疑问：Would + 主语 + 原形？','She said she would call the next day.','她说她第二天会打电话。','We were going to leave, but it started raining.','我们本打算离开，但下雨了。','would 后不用 to；过去将来不等于该动作后来一定发生。','will 立足现在看未来；would 可立足过去看未来。']
];

export const GRAMMAR_ENTRIES = grammarRows.map((r,i)=>{
  const [title,category,book,prompt,explanation,structures,en,zh,en2,zh2,mistakes,comparison]=r;
  return {id:`grammar-${String(i+1).padStart(3,'0')}`,module:'grammar',kind:'grammar',title,category,book,prompt,explanation,structures,
    examples:[{en,zh},{en:en2,zh:zh2}],mistakes,comparison,notes:'',source:'一、二册重点语法 · 独立整理',
    sourceNote:'册别为复习难度分组，不代表官方逐课目录。规则参考 British Council LearnEnglish A1–B2；例句独立编写。',favorite:false,needsCheck:false,deletedAt:0};
});

const phraseRows = `
Excuse me.|ɪkˈskjuːz miː|打扰一下；劳驾。|礼貌与交流|用于引起注意、询问或借过。|Excuse me. Is this seat free?|打扰一下，这个座位空着吗？
Pardon?|ˈpɑːdən|请再说一遍？|礼貌与交流|没听清时使用；完整礼貌表达可用 I beg your pardon?。|Pardon? Could you say that again?|没听清，你能再说一遍吗？
Nice to meet you.|naɪs tə miːt juː|很高兴认识你。|礼貌与交流|初次见面时使用。|Nice to meet you. My name is Amy.|很高兴认识你。我叫艾米。
How are you?|haʊ ɑː juː|你好吗？|礼貌与交流|用于询问近况，常见回应是 Fine, thanks.。|How are you today, Mr Green?|格林先生，您今天好吗？
Thank you very much.|θæŋk juː ˈveri mʌtʃ|非常感谢。|礼貌与交流|表达较强的感谢。|Thank you very much for your help.|非常感谢你的帮助。
You are welcome.|juː ɑː ˈwelkəm|不客气。|礼貌与交流|回应感谢。|You are welcome. I am happy to help.|不客气，我很乐意帮忙。
Here you are.|hɪə juː ɑː|给你。|礼貌与交流|递交物品时使用。|Here you are. This is your ticket.|给你，这是你的票。
Come in.|kʌm ɪn|请进。|礼貌与交流|邀请对方进入。|Come in and take a seat.|请进，坐吧。
sit down|sɪt daʊn|坐下|动作与日常|祈使句中可在前后加 please。|Please sit down next to me.|请坐在我旁边。
stand up|stænd ʌp|站起来|动作与日常|stand 是不规则动词，过去式 stood。|Everyone stood up when the teacher arrived.|老师来时，大家站了起来。
turn on|tɜːn ɒn|打开（电器等）|动作与日常|可分短语；代词放中间：turn it on。|Please turn on the light.|请开灯。
turn off|tɜːn ɒf|关掉（电器等）|动作与日常|代词放中间：turn it off。|Turn off the radio before you leave.|离开前关掉收音机。
put on|pʊt ɒn|穿上；戴上|动作与日常|强调动作；代词用 put it/them on。|Put on your coat. It is cold outside.|穿上外套，外面很冷。
take off|teɪk ɒf|脱下；（飞机）起飞|动作与日常|脱下衣物时可分；起飞时不带宾语。|Please take off your wet shoes.|请脱掉湿鞋。
put ... on ...|pʊt ɒn|把……放在……上|动作与日常|put + 物品 + on + 位置，与“穿上”依上下文区分。|Put the book on the desk.|把书放在书桌上。
give ... to ...|ɡɪv tə|把……给……|礼貌与交流|give + 物品 + to + 人；也可 give + 人 + 物品。|Please give this letter to Anna.|请把这封信交给安娜。
show ... to ...|ʃəʊ tə|把……给……看|礼貌与交流|show + 物品 + to + 人。|Show your ticket to the driver.|把票给司机看。
look at|lʊk æt|看……|动作与日常|强调看的动作，at 后接对象。|Look at the map on the wall.|看看墙上的地图。
look for|lʊk fə|寻找|动作与日常|表示寻找的过程，找到通常用 find。|I am looking for my keys.|我正在找钥匙。
look after|lʊk ˈɑːftə|照顾；照看|动作与日常|不可把宾语插到 look 和 after 中间。|Could you look after my cat?|你能照看我的猫吗？
wait for|weɪt fə|等候……|动作与日常|wait 后有等候对象时通常加 for。|We are waiting for the next bus.|我们在等下一班公交车。
listen to|ˈlɪsən tə|听……|动作与日常|强调有意识地听；hear 强调听到。|She listens to the radio every morning.|她每天早晨听收音机。
get up|ɡet ʌp|起床；起来|动作与日常|过去式 got up。|I get up at seven on weekdays.|我工作日七点起床。
go to bed|ɡəʊ tə bed|上床睡觉|动作与日常|表示睡觉时 bed 前通常不加 the。|I usually go to bed before eleven.|我通常十一点前上床睡觉。
go to work|ɡəʊ tə wɜːk|去上班|动作与日常|work 在此不加冠词。|He goes to work by bus.|他坐公交车上班。
come home|kʌm həʊm|回家（朝说话者所在方向）|动作与日常|home 在此作副词，前面不用 to。|What time do you come home?|你几点回家？
by bus|baɪ bʌs|乘公交车|出行与位置|by + 交通工具单数，通常不加冠词。|We went there by bus.|我们坐公交车去了那里。
on foot|ɒn fʊt|步行|出行与位置|固定表达，不说 by foot。|The shop is close. Let us go on foot.|商店很近，我们步行去吧。
get on|ɡet ɒn|上（公交、火车等）|出行与位置|小汽车上车常用 get in。|We got on the bus at the station.|我们在车站上了公交车。
get off|ɡet ɒf|下（公交、火车等）|出行与位置|小汽车下车常用 get out of。|Get off at the next stop.|下一站下车。
in front of|ɪn frʌnt əv|在……前面|出行与位置|通常指物体外部的前方。|There is a tree in front of the house.|房子前面有一棵树。
next to|nekst tə|紧挨着；在……旁边|出行与位置|强调相邻位置。|The bank is next to the hotel.|银行紧挨着旅馆。
on the left|ɒn ðə left|在左边|出行与位置|可加 of ... 表示在某物左侧。|The post office is on the left.|邮局在左边。
on the right|ɒn ðə raɪt|在右边|出行与位置|right 也有“正确”的意思，依语境判断。|You will see a park on the right.|你会看到右边有座公园。
at the moment|æt ðə ˈməʊmənt|此刻；现在|时间与频率|常与现在进行时连用。|She is busy at the moment.|她这会儿正忙。
at once|æt wʌns|立刻；马上|时间与频率|强调立即行动，也可表示同时，需看语境。|Please come to the office at once.|请立即到办公室来。
just now|dʒʌst naʊ|刚才|时间与频率|表示刚才时通常与一般过去时连用。|I saw him just now.|我刚才见到他了。
the day before yesterday|ðə deɪ bɪˈfɔː ˈjestədeɪ|前天|时间与频率|明确已结束的过去时间。|We arrived the day before yesterday.|我们前天到的。
the day after tomorrow|ðə deɪ ˈɑːftə təˈmɒrəʊ|后天|时间与频率|表示从今天算起的后一天。|I will visit her the day after tomorrow.|我后天去看她。
every other day|ˈevri ˈʌðə deɪ|每隔一天|时间与频率|隔一天一次，而不是每天。|I water these plants every other day.|我每隔一天给这些植物浇水。
all the time|ɔːl ðə taɪm|一直；总是|时间与频率|可指持续或频繁发生，依据语境。|He talks about football all the time.|他总是谈论足球。
How much ...?|haʊ mʌtʃ|多少……？／多少钱？|购物与数量|问价格，或问不可数名词的量。|How much is this bag?|这个包多少钱？
How many ...?|haʊ ˈmeni|多少……？|购物与数量|后接可数名词复数。|How many apples do you need?|你需要几个苹果？
a piece of|ə piːs əv|一张／一块／一条……|购物与数量|后接不可数名词，如 paper、cake、advice。|Could I have a piece of paper?|可以给我一张纸吗？
a bottle of|ə ˈbɒtəl əv|一瓶……|购物与数量|数多瓶时把 bottle 变复数。|I bought two bottles of water.|我买了两瓶水。
a pair of|ə peər əv|一双／一副……|购物与数量|常用于 shoes、trousers、glasses 等。|She needs a new pair of shoes.|她需要一双新鞋。
plenty of|ˈplenti əv|充足的；大量的|购物与数量|可接可数复数或不可数名词。|We have plenty of time.|我们有充足的时间。
not ... at all|nɒt æt ɔːl|一点也不……|礼貌与交流|not 与 at all 夹住被否定部分。|I am not tired at all.|我一点也不累。
be afraid of|bi əˈfreɪd əv|害怕……|状态与搭配|of 后接名词或 -ing，be 随主语和时态变化。|She is afraid of dogs.|她怕狗。
be sure|bi ʃʊə|确信；肯定|状态与搭配|be sure (that) + 从句；be sure of/about + 名词。|I am sure he is at home.|我确信他在家。
be late for|bi leɪt fə|……迟到|状态与搭配|for 后接活动或场合。|Do not be late for school.|上学不要迟到。
be absent from|bi ˈæbsənt frəm|缺席；不在……|状态与搭配|from 后接工作、学校或活动。|He was absent from work yesterday.|他昨天没来上班。
have a cold|hæv ə kəʊld|感冒|状态与搭配|cold 作一次感冒讲时用 a。|I have a cold and a sore throat.|我感冒了，嗓子也疼。
have a look|hæv ə lʊk|看一看|动作与日常|指定看什么时用 have a look at ...。|May I have a look at your photos?|我能看看你的照片吗？
take a photograph|teɪk ə ˈfəʊtəɡrɑːf|拍照|动作与日常|也可说 take a photo；给……拍照用 of。|Could you take a photograph of us?|你能给我们拍张照吗？
make a noise|meɪk ə nɔɪz|弄出声响|动作与日常|noise 此处可指某种声响；make noise 也常见。|Please do not make a noise.|请不要弄出声响。
make an appointment|meɪk ən əˈpɔɪntmənt|预约|礼貌与交流|与某人预约可加 with + 人。|I would like to make an appointment with the dentist.|我想预约看牙医。
want ... to ...|wɒnt tə|想让……做……|句型与请求|want + 人 + to + 动词原形。|I want you to read this letter.|我想让你读读这封信。
would like|wʊd laɪk|想要|句型与请求|would like + 名词，或 would like to + 原形；比 want 委婉。|I would like to speak to the manager.|我想与经理谈谈。
had better|hæd ˈbetə|最好……|句型与请求|后接原形；否定为 had better not + 原形，常带劝告意味。|You had better take an umbrella.|你最好带把伞。
`;
export const NCE1_PHRASES = phraseRows.trim().split('\n').map((line,i)=>{
  const [en,ipa,zh,scene,usage,example,exampleZh]=line.split('|');
  return {id:`nce1-phrase-${String(i+1).padStart(3,'0')}`,module:'nce1',kind:'phrase',en,ipa,zh,scene,example,exampleZh,pos:'固定表达',
    source:'新概念一册重点表达 · 独立整理',sourceNote:`用法：${usage} 音标为英式宽式标音，连读随语境变化；未标注课号，请结合自己的教材核对。`,notes:'',favorite:false,needsCheck:false,deletedAt:0};
});
