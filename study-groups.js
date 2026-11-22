export const STUDY_WORD_GROUPS = [
  {
    id:'train', name:'出行搭配', title:'错过火车',
    note:'一起记 miss the train、get to the station 和 catch the next train。',
    contrasts:[
      {title:'什么时候用过去完成时？', card:'grammar-klaire-past-reference', examples:[
        ['The train left at eight.','火车八点开了。','说发生在八点的事，用一般过去时 left。'],
        ['The train had already left when I got to the station.','我到车站时，火车已经开走了。','先找过去的参照点 got to the station。开车发生得更早，用 had left。'],
        ['I missed the train, so I caught the next one.','我错过了这班火车，就赶了下一班。','按顺序叙述两件事，missed 和 caught 都用一般过去时。one 指下一班火车。']
      ]},
      {title:'by eight 和 until eight', card:'grammar-klaire-deadlines', examples:[
        ['We need to get to the station by eight.','我们最迟八点要到车站。','by 给出到达的最晚时间。'],
        ['I’ll wait at the station until eight.','我会在车站一直等到八点。','until 给出等待持续到什么时候。']
      ]}
    ],
    words:[
      ['miss','mɪs','动词','错过（列车、航班等）','I missed the eight o’clock train.','我错过了八点那班火车。',[
        ['miss the train','错过火车'],['miss a flight','错过航班']]],
      ['catch','kætʃ','动词','赶上，搭乘（交通工具）','I caught the next train to Osaka.','我赶上了下一班去大阪的火车。',[
        ['catch the next train','赶上下一班火车'],['catch the last bus','赶上末班公交车']]],
      ['leave','liːv','动词','离开，动身','We’ll leave for the station at seven.','我们七点动身去车站。',[
        ['leave the hotel','离开酒店'],['leave for the station','动身去车站'],['leave from platform six','从六号站台发车']]],
      ['get','ɡet','动词','到达（出行用法）','What time did you get to the station?','你几点到的车站？',[
        ['get to the station','到车站'],['get there','到那里'],['get home','到家']]],
      ['arrive','əˈraɪv','动词','到达','We arrived at the station just before eight.','我们快到八点时到了车站。',[
        ['arrive at the station','到达车站'],['arrive in Tokyo','到达东京'],['arrive on time','准时到达']]],
      ['wait','weɪt','动词','等候','I’m waiting for a taxi outside the station.','我正在车站外等出租车。',[
        ['wait for a taxi','等出租车'],['wait at the station','在车站等'],['wait until eight','等到八点']]],
      ['platform','ˈplæt.fɔːm','名词','站台','Is this the right platform for the train to Kyoto?','去京都的火车是在这个站台吗？',[
        ['on platform six','在六号站台'],['change platforms','换站台']]]
    ]
  },
  {
    id:'appointment', name:'预约搭配', title:'预约与改期',
    note:'一起记 make an appointment、reschedule it 和 confirm the time。',
    contrasts:[
      {title:'新预约、改时间和取消', card:'grammar-klaire-practical-collocations', examples:[
        ['I’d like to make an appointment.','我想预约。','make an appointment 指新约一个时间。'],
        ['Could I reschedule my appointment for Friday?','我能把预约改到周五吗？','已经约好了，现在想把它改到周五，用 reschedule。'],
        ['I need to cancel my appointment.','我得取消预约。','cancel 表示取消已有的预约。']
      ]},
      {title:'周五几点，介词怎么选？', card:'grammar-klaire-time-expressions', examples:[
        ['Could we meet at 3 p.m. on Friday?','我们可以周五下午三点见吗？','at 接具体钟点，on 接星期。'],
        ['Are you free next Friday?','你下周五有空吗？','next Friday 整体作时间表达，直接放在句末。'],
        ['Could you confirm the time by Thursday?','你能最迟周四确认时间吗？','by Thursday 说的是确认的截止时间。']
      ]}
    ],
    words:[
      ['book','bʊk','动词','预订（房间、桌位、票等）','I booked a room for Friday night.','我订了一间周五晚上的房间。',[
        ['book a room','订房'],['book a table','订餐位'],['book a ticket','订票']]],
      ['appointment','əˈpɔɪnt.mənt','名词','预约，约定的见面','I have a dentist’s appointment on Friday.','我约了周五看牙医。',[
        ['make an appointment','预约'],['have an appointment','有预约'],['a dentist’s appointment','看牙医的预约']]],
      ['reschedule','ˌriːˈʃedʒ.uːl','动词','改期，另约时间','Could we reschedule the meeting for next week?','我们可以把会议改到下周吗？',[
        ['reschedule an appointment','把预约改期'],['reschedule a meeting','改会议时间']]],
      ['cancel','ˈkæn.səl','动词','取消','I need to cancel my booking.','我需要取消我的预订。',[
        ['cancel a booking','取消预订'],['cancel an appointment','取消预约']]],
      ['confirm','kənˈfɜːm','动词','确认','Could you confirm the time by email?','你能用邮件确认一下时间吗？',[
        ['confirm the time','确认时间'],['confirm a booking','确认预订']]],
      ['available','əˈveɪ.lə.bəl','形容词','有空的，可用的','I’m available after three on Friday.','我周五三点以后有空。',[
        ['available on Friday','周五有空'],['an available room','一间可用的房间'],['the next available slot','下一个空档']]],
      ['slot','slɒt','名词','空档，时段（预约用法）','Do you have a slot on Friday afternoon?','你们周五下午还有空档吗？',[
        ['a time slot','一个时段'],['the next available slot','下一个可预约的时段']]]
    ]
  }
];

export const STUDY_WORDS = STUDY_WORD_GROUPS.flatMap(group=>group.words.map(([en,ipa,pos,zh,example,exampleZh,pairs])=>({
  id:`usage-word-${en}`, module:'words', kind:'word', en, ipa, pos, zh, scene:group.name, example, exampleZh,
  source:'实用英语 · 场景搭配', sourceNote:pairs.map(([phrase,meaning])=>`${phrase}｜${meaning}`).join('\n'),
  notes:'', favorite:false, needsCheck:false, deletedAt:0
})));
