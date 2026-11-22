export const BASIC_WORD_GROUPS = [
  {name:'月份', note:'月份首字母大写。说「在某个月」用 in，比如 in March。说具体日期用 on，比如 on 5 March。'},
  {name:'四季', note:'四季名称通常小写。「在春天」可以说 in spring；秋天的英式常用词是 autumn。'},
  {name:'数字', note:'先看 0–20 和整十。21、42、99 的十位和个位用连字符。点读对比 fifteen 与 fifty 的重音。40 写 forty，和 four 的拼写不同。'}
];

const months = [
  ['January','ˈdʒænjuəri'],['February','ˈfebruəri'],['March','mɑːtʃ'],['April','ˈeɪprəl'],
  ['May','meɪ'],['June','dʒuːn'],['July','dʒuˈlaɪ'],['August','ˈɔːɡəst'],
  ['September','sepˈtembə'],['October','ɒkˈtəʊbə'],['November','nəʊˈvembə'],['December','dɪˈsembə']
];
const seasons = [
  ['spring','sprɪŋ','春天','Flowers bloom in spring.','花在春天开放。'],
  ['summer','ˈsʌmə','夏天','We often swim in summer.','我们夏天经常游泳。'],
  ['autumn','ˈɔːtəm','秋天','Leaves change colour in autumn.','树叶在秋天变色。'],
  ['winter','ˈwɪntə','冬天','It gets dark early in winter.','冬天天黑得早。']
];
const numbers = [
  [0,'zero','ˈzɪərəʊ','零'],[1,'one','wʌn','一'],[2,'two','tuː','二'],[3,'three','θriː','三'],[4,'four','fɔː','四'],
  [5,'five','faɪv','五'],[6,'six','sɪks','六'],[7,'seven','ˈsevən','七'],[8,'eight','eɪt','八'],[9,'nine','naɪn','九'],
  [10,'ten','ten','十'],[11,'eleven','ɪˈlevən','十一'],[12,'twelve','twelv','十二'],[13,'thirteen','ˌθɜːˈtiːn','十三'],
  [14,'fourteen','ˌfɔːˈtiːn','十四'],[15,'fifteen','ˌfɪfˈtiːn','十五'],[16,'sixteen','ˌsɪkˈstiːn','十六'],
  [17,'seventeen','ˌsevənˈtiːn','十七'],[18,'eighteen','ˌeɪˈtiːn','十八'],[19,'nineteen','ˌnaɪnˈtiːn','十九'],
  [20,'twenty','ˈtwenti','二十'],[21,'twenty-one','ˌtwenti ˈwʌn','二十一'],[30,'thirty','ˈθɜːti','三十'],[40,'forty','ˈfɔːti','四十'],
  [42,'forty-two','ˌfɔːti ˈtuː','四十二'],[50,'fifty','ˈfɪfti','五十'],[60,'sixty','ˈsɪksti','六十'],[70,'seventy','ˈsevənti','七十'],
  [80,'eighty','ˈeɪti','八十'],[90,'ninety','ˈnaɪnti','九十'],[99,'ninety-nine','ˌnaɪnti ˈnaɪn','九十九'],
  [100,'one hundred','wʌn ˈhʌndrəd','一百'],[1000,'one thousand','wʌn ˈθaʊzənd','一千']
];

function word(id, en, ipa, zh, scene, example, exampleZh) {
  return {id:`basic-${id}`,module:'words',kind:'word',en,ipa,zh,scene,example,exampleZh,
    pos:scene==='数字'?'基数词':'名词',notes:'',source:'基础词汇 · 原创整理',sourceNote:'英式参考音标。',
    favorite:false,needsCheck:false,deletedAt:0};
}

export const BASIC_WORDS = [
  ...months.map(([en,ipa],index)=>word(`month-${index+1}`,en,ipa,`${index+1}月`,'月份',`The course starts in ${en}.`,`课程在${index+1}月开始。`)),
  ...seasons.map(([en,ipa,zh,example,exampleZh])=>word(`season-${en}`,en,ipa,zh,'四季',example,exampleZh)),
  ...numbers.map(([n,en,ipa,zh])=>word(`number-${n}`,en,ipa,`${zh}（${n.toLocaleString('en-US')}）`,'数字',
    n===0?'The score is zero.':n===1?'I have one ticket.':`The museum sold ${en} tickets.`,
    n===0?'分数是零。':n===1?'我有一张票。':`博物馆卖了${n.toLocaleString('en-US')}张票。`))
];
