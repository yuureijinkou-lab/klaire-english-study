import {activeEntries, makeQueue} from './core.js';
import {KLAIRE_REVIEW_TOPICS} from './klaire-review.js';

const topicsById = new Map(KLAIRE_REVIEW_TOPICS.map(topic=>[topic.id,topic]));
const focusIds = new Set(KLAIRE_REVIEW_TOPICS.flatMap(topic=>topic.ids));

export function focusTopicForCard(id, preferredId) {
  if (!focusIds.has(id)) return undefined;
  const preferred = topicsById.get(preferredId);
  return preferred?.ids.includes(id) ? preferred : KLAIRE_REVIEW_TOPICS.find(topic=>topic.ids.includes(id));
}

export function lastFocusTopic(state) {
  const saved = topicsById.get(state.settings.lastFocusTopic);
  if (saved) return saved;
  // Older backups can still resume from the last reviewed focus card.
  let last;
  for (const activity of state.activities) {
    if (activity.type==='review'&&focusIds.has(activity.itemId)&&(!last||activity.at>=last.at)) last=activity;
  }
  return last ? focusTopicForCard(last.itemId) : undefined;
}

export function makeHomeReviewPlan(state, now=Date.now()) {
  const standardQueue = makeQueue(state,{now});
  const due = standardQueue.filter(id=>state.progress[id]);
  const newCards = standardQueue.filter(id=>!state.progress[id]);
  const focusDue = due.filter(id=>focusIds.has(id));
  const otherDue = due.filter(id=>!focusIds.has(id));
  const last = lastFocusTopic(state);
  const preferredIds = [...(last?.ids||[]),...focusIds];
  // Keep room for vocabulary and other modules within the existing daily allowance.
  const maxNewFocus = Math.ceil(newCards.length / 2);
  const newFocus = maxNewFocus
    ? makeQueue(state,{module:'grammar',ids:preferredIds,onlyNew:true,now}).slice(0,maxNewFocus)
    : [];
  const fresh = [...new Set([...newFocus,...newCards])].slice(0,newCards.length);
  const dueIds = [...focusDue,...otherDue];
  return {ids:[...dueIds,...fresh], dueIds, focusDueCount:focusDue.length, newCount:fresh.length};
}

export function nextScheduledReview(state, now=Date.now()) {
  let next;
  for (const entry of activeEntries(state)) {
    const dueAt = state.progress[entry.id]?.dueAt;
    if (!entry.needsCheck && dueAt > now && (next===undefined || dueAt < next)) next=dueAt;
  }
  return next;
}

export function recentlyStuck(state) {
  const latestById = new Map();
  for (const activity of state.activities) {
    if (activity.type!=='review') continue;
    const previous = latestById.get(activity.itemId);
    if (!previous||activity.at>=previous.at) latestById.set(activity.itemId,activity);
  }
  return activeEntries(state).filter(entry=>!entry.needsCheck).flatMap(entry=>{
    const last=latestById.get(entry.id);
    return last&&['forgot','vague'].includes(last.rating) ? [{entry,rating:last.rating,at:last.at}] : [];
  }).sort((a,b)=>b.at-a.at);
}

export const REVIEW_SCENES = [
  { id:'appointment', title:'预约改期', tip:'Would Friday afternoon work for you? 是在问周五下午方不方便。你也可以把 Friday afternoon 换成具体时间。', lines:[
    {role:'你', en:'Something has come up. Could I reschedule my appointment?', zh:'临时有点事。我可以改一下预约时间吗？'},
    {role:'前台', en:'Of course. Would Friday afternoon work for you?', zh:'可以。周五下午您方便吗？'},
    {role:'你', en:'Yes. Could we make it three p.m.?', zh:'方便。可以约下午三点吗？'}
  ]},
  { id:'hotel', title:'酒店换房', tip:'smells like smoke 描述闻起来有烟味。Could I change rooms? 用来请求换房。', lines:[
    {role:'你', en:'My room smells like smoke. Could I change rooms?', zh:'我的房间闻起来有烟味。可以给我换一间吗？'},
    {role:'前台', en:'Let me check if we have another room available.', zh:'我帮您看看还有没有别的空房。'},
    {role:'你', en:'Thanks. A quiet room would be great.', zh:'谢谢。有安静一点的房间就太好了。'}
  ]},
  { id:'shopping', title:'购物退货', tip:'return this jacket 是退这件夹克。想确认能否退款，可以接着问 Could I get a refund?', lines:[
    {role:'你', en:'I’d like to return this jacket. It’s too small.', zh:'我想退这件夹克。它太小了。'},
    {role:'店员', en:'Sure. May I see your receipt?', zh:'好的。我可以看一下您的收据吗？'},
    {role:'你', en:'Here it is. Could I get a refund, please?', zh:'给您。能帮我办理退款吗？'}
  ]},
  { id:'check-in', title:'酒店入住', tip:'a reservation under the name Li 表示用李这个姓预订的房间。前台常会问预订人姓名。', lines:[
    {role:'你', en:'Hi, I have a reservation under the name Li.', zh:'你好，我用李这个姓订了房间。'},
    {role:'前台', en:'Welcome. Could I see your passport, please?', zh:'欢迎入住。可以看一下您的护照吗？'},
    {role:'你', en:'Of course. What time is breakfast served?', zh:'当然。早餐几点开始供应？'},
    {role:'前台', en:'From seven to ten, on the ground floor.', zh:'从七点到十点，在一楼。'}
  ]},
  { id:'train', title:'车站问路', tip:'问车在哪个站台发车，用 leave from。问怎么走过去，用 How do I get there?', lines:[
    {role:'你', en:'Excuse me, which platform does the train to Brighton leave from?', zh:'打扰一下，去布莱顿的火车从哪个站台发车？'},
    {role:'工作人员', en:'Platform six. It leaves in ten minutes.', zh:'六号站台。十分钟后发车。'},
    {role:'你', en:'Thanks. How do I get there?', zh:'谢谢。我怎么过去？'},
    {role:'工作人员', en:'Go straight ahead and take the stairs on your left.', zh:'一直往前走，再走左边的楼梯。'}
  ]},
  { id:'restaurant', title:'餐厅点餐与结账', tip:'I’d like… 可以用来礼貌点餐。在英式英语中，结账常问 Could we have the bill, please?', lines:[
    {role:'店员', en:'Are you ready to order?', zh:'您准备好点餐了吗？'},
    {role:'你', en:'Yes, I’d like the soup and a glass of water, please.', zh:'是的，我想要这份汤和一杯水，谢谢。'},
    {role:'你（餐后）', en:'Excuse me, could we have the bill, please?', zh:'打扰一下，可以结账了吗？'},
    {role:'店员', en:'Of course. Would you like to pay by card?', zh:'当然。您想刷卡吗？'}
  ]},
  { id:'exchange', title:'店内换尺码', tip:'换货可以说 exchange it for a larger size，想先试穿就问 Could I try it on?', lines:[
    {role:'你', en:'I bought this shirt yesterday, but it’s too small.', zh:'这件衬衫是我昨天买的，但它太小了。'},
    {role:'店员', en:'Would you like to exchange it for a larger size?', zh:'您想换大一号吗？'},
    {role:'你', en:'Yes, please. Could I try it on first?', zh:'是的，谢谢。可以先试穿吗？'},
    {role:'店员', en:'Of course. The fitting room is at the back.', zh:'当然。试衣间在店里后面。'}
  ]}
];
