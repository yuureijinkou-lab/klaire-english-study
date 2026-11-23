import { cloneStudyData, studyUuid } from './compat.js';
import { validateState } from './core.js?v=20261123-vocabulary';

const copy = value => cloneStudyData(value);
const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);
const parseState = raw => validateState(typeof raw === 'string' ? JSON.parse(raw) : raw);
export class JournalRepository {
  constructor(storage,userId) {
    this.storage=storage;this.prefix=`klaire.study/${encodeURIComponent(userId)}/`;
    this.writer=studyUuid();
    this.frame=null;this.baseRevision=0;
    this.viewPayload=null;
    const raw=storage.getItem(this.prefix+'cache');
    if(raw){const cache=JSON.parse(raw);this.viewPayload=parseState(cache.state);this.frame=cache.frame;this.baseRevision=cache.revision;}
  }
  keys(part) {
    const keys=[];for(let i=0;i<this.storage.length;i++){const key=this.storage.key(i);if(key?.startsWith(this.prefix+part))keys.push(key);}return keys;
  }
  loadRaw(){const raw=this.storage.getItem(this.prefix+'cache');return raw?JSON.stringify(parseState(JSON.parse(raw).state)):null;}
  previousRaw(){return this.storage.getItem(this.prefix+'previous');}
  beforeUpgradeRaw(){return this.storage.getItem(this.prefix+'upgrade');}
  save(state) {
    const data=parseState(state),id=studyUuid();
    const parent=this.frame;
    const draft={id,parent,writer:this.writer,revision:this.base({parent,revision:this.baseRevision}),payload:data,at:Date.now()};
    // Each tab owns an immutable draft. Never replace another tab's pending edit.
    this.storage.setItem(this.prefix+'draft/'+id,JSON.stringify(draft));
    this.frame=id;
    this.viewPayload=data;
    this.storage.setItem(this.prefix+'cache',JSON.stringify({state:data,frame:id,revision:this.baseRevision}));
    // Only compact this writer's own causal ancestors, after the newer full
    // snapshot is durable. Small lineage links keep stale-tab forks and upload
    // receipts meaningful without storing a full backup for every click.
    let ancestor=parent;
    while(ancestor){const raw=this.storage.getItem(this.prefix+'draft/'+ancestor);if(!raw)break;
      const old=JSON.parse(raw);if(old.writer!==this.writer)break;
      this.storage.setItem(this.prefix+'link/'+old.id,JSON.stringify({id:old.id,parent:old.parent,revision:old.revision}));
      this.storage.removeItem(this.prefix+'draft/'+old.id);ancestor=old.parent;
    }
  }
  upgradeWithBackup(state,raw){if(!this.beforeUpgradeRaw())this.storage.setItem(this.prefix+'upgrade',raw);this.save(state);}
  replaceWithBackup(state,raw){this.storage.setItem(this.prefix+'previous',raw);this.save(state);}
  drafts(){return this.keys('draft/').map(key=>{const d=JSON.parse(this.storage.getItem(key));d.payload=parseState(d.payload);if(!d.id||!Number.isSafeInteger(d.revision))throw Error('本机草稿异常，请先导出备份。');return d;});}
  leaves(){const drafts=this.drafts(),parents=new Set();for(const d of drafts){let parent=d.parent;const seen=new Set();while(parent&&!seen.has(parent)){
    seen.add(parent);parents.add(parent);const raw=this.storage.getItem(this.prefix+'draft/'+parent)||this.storage.getItem(this.prefix+'link/'+parent);parent=raw?JSON.parse(raw).parent:null;
  }}return drafts.filter(d=>!parents.has(d.id));}
  base(draft) {
    let current=draft,visited=new Set();
    while(current?.parent){if(visited.has(current.id))throw Error('草稿关系异常');visited.add(current.id);
      const ack=this.storage.getItem(this.prefix+'ack/'+current.parent);if(ack!==null)return Number(ack);
      const raw=this.storage.getItem(this.prefix+'draft/'+current.parent)||this.storage.getItem(this.prefix+'link/'+current.parent);if(!raw)break;current=JSON.parse(raw);}
    return draft.revision;
  }
  acknowledge(drafts,head) {
    // Write receipts before deleting only the exact drafts captured for this upload.
    for(const draft of drafts)this.storage.setItem(this.prefix+'ack/'+draft.id,String(head.revision));
    for(const draft of drafts)this.storage.removeItem(this.prefix+'draft/'+draft.id);
    this.baseRevision=head.revision;
    this.storage.setItem(this.prefix+'baseline',JSON.stringify(head));
  }
  adopt(head) {
    const payload=parseState(head.payload);
    this.storage.setItem(this.prefix+'cache',JSON.stringify({state:payload,frame:null,revision:head.revision}));
    this.storage.setItem(this.prefix+'baseline',JSON.stringify({...head,payload}));
    this.frame=null;this.baseRevision=head.revision;
    this.viewPayload=payload;
  }
}

export class SnapshotSync {
  constructor(repository,transport,{apply=()=>true,notify=()=>{},active=()=>true}={}) {
    this.repo=repository;this.transport=transport;this.apply=apply;this.notify=notify;this.active=active;
    this.status='idle';this.conflict=null;this.busy=false;
  }
  setStatus(status,error=null){this.status=status;this.error=error;this.notify(this);}
  async read(){const head=await this.transport.read();if(head){if(!Number.isSafeInteger(head.revision)||head.revision<1)throw Error('云端版本号异常');head.payload=parseState(head.payload);}return head;}
  async run() {
    if(this.busy||!this.active())return;this.busy=true;this.setStatus('syncing');
    try {
      const head=await this.read();if(!this.active())return;
      const drafts=this.repo.drafts(),leaves=this.repo.leaves();
      if(leaves.length){
        const leaf=leaves[0];
        if(leaves.some(d=>!same(d.payload,leaf.payload))||((head?.revision??0)!==this.repo.base(leaf)&&!same(head?.payload,leaf.payload))){
          this.conflict={head,leaves};this.setStatus('conflict');return;
        }
        if(!same(this.repo.viewPayload,leaf.payload)){
          if(!this.apply(copy(leaf.payload))){this.setStatus('deferred');return;}
          this.repo.viewPayload=copy(leaf.payload);this.repo.frame=leaf.id;
        }
        let saved=head;
        if(!same(head?.payload,leaf.payload))saved=await this.transport.write(head?.revision??0,leaf.payload);
        if(!this.active())return;
        if(!saved){this.conflict={head:await this.read(),leaves:this.repo.leaves()};this.setStatus('conflict');return;}
        saved.payload=parseState(saved.payload);this.repo.acknowledge(drafts,saved);
        this.conflict=null;this.setStatus(this.repo.leaves().length?'pending':'saved');return;
      }
      if(head){
        if(!same(this.repo.viewPayload,head.payload)){
          if(!this.apply(copy(head.payload))){this.setStatus('deferred');return;}
          // apply may only replace the view when no user draft/editor is active.
          this.repo.adopt(head);
        }else this.repo.adopt(head);
      }
      this.conflict=null;this.setStatus(head?'saved':'empty');
    }catch(error){this.setStatus('error',error);}finally{this.busy=false;}
  }
  async resolve(choice,shown,draftId) {
    if(this.busy||!this.active()||!shown)return;this.busy=true;this.setStatus('syncing');
    try {
      const head=await this.read();if(!this.active())return;
      const drafts=this.repo.drafts(),leaves=this.repo.leaves();
      if((head?.revision??0)!==(shown.head?.revision??0)||!same(leaves.map(d=>d.id).sort(),shown.leaves.map(d=>d.id).sort())){
        this.conflict={head,leaves};this.setStatus('conflict');return;
      }
      const unchanged=()=>same(this.repo.leaves().map(d=>d.id).sort(),leaves.map(d=>d.id).sort());
      const local=leaves.find(d=>d.id===draftId)||leaves[0];
      const chosen=choice==='cloud'?head?.payload:local?.payload;
      if(!chosen)throw Error('此版本不存在');
      // Archive every losing local alternative before acknowledging it.
      for(const draft of leaves){if(!this.active())return;await this.transport.archive?.(draft.payload);if(!this.active())return;if(!unchanged()){this.setStatus('pending');return;}}
      if(!this.active())return;
      let saved=head;
      if(choice!=='cloud')saved=await this.transport.write(head?.revision??0,chosen);
      if(!this.active())return;
      if(!unchanged()){this.setStatus('pending');return;}
      if(!saved){this.conflict={head:await this.read(),leaves};this.setStatus('conflict');return;}
      if(!this.apply(copy(saved.payload))){this.setStatus('deferred');return;}
      this.repo.acknowledge(drafts,saved);this.repo.adopt(saved);this.conflict=null;this.setStatus('saved');
    }catch(error){this.setStatus('error',error);}finally{this.busy=false;}
  }
}
