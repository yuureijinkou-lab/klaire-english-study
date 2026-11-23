import { JournalRepository, SnapshotSync } from './cloud-core.js?v=20261124';
import { createState, prepareState, validateState, exportObject } from './core.js?v=20261124';
import { SEED_ENTRIES } from './data.js?v=20261124';
export const CLOUD_URL='https://xuzekwjaymklaeftcwnj.supabase.co';
export const CLOUD_KEY='sb_publishable_b1Dl8JMQNDBhP5rgR5RhPg_5PakLs1Y';
const ACTIVE_KEY='klaire.study.active-account';
const labels={idle:'等待同步',syncing:'正在检查云端…',saved:'已保存到云端',pending:'本机已保存，等待上传',empty:'云端还没有记录，可上传本机记录',deferred:'云端有更新，结束编辑或复习后载入',conflict:'发现不同版本，请保留备份后选择',error:'暂未同步成功，本机草稿会保留'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const summary=s=>`${s.entries.filter(e=>!e.deletedAt).length} 条内容 · ${s.activities.length} 次练习 · ${Object.keys(s.lessons).length} 课资料`;

export function createCloud(host) {
  let account=null,session=null,engine=null,repo=null,client=null,generation=0,timer=null,message='',authBusy=false;
  let pendingSession=null;
  const authFeedback={login:null,password:null};
  const guest=host.guestRepository;
  const active=()=>!!account&&session?.user?.id===account.id;
  const publish=()=>{
    const status=document.querySelector('[data-cloud-status]');
    if(status)status.textContent=message||(!account?'当前使用本机记录，清除浏览器数据会丢失。':!active()?'正在使用账号的本机副本；请登录后继续同步。':labels[engine?.status]||'等待同步');
    const name=document.querySelector('[data-cloud-account]');if(name)name.textContent=account?account.email:'尚未登录';
    document.querySelectorAll('[data-cloud-member]').forEach(el=>{el.hidden=!account;});
    document.querySelectorAll('[data-cloud-guest]').forEach(el=>{el.hidden=!!account&&active();});
    document.querySelectorAll('[data-cloud-connected]').forEach(el=>{el.disabled=!active();});
    document.querySelectorAll('[data-cloud-auth-submit]').forEach(el=>{
      el.disabled=authBusy||!client||(el.hasAttribute('data-cloud-connected')&&!active());
    });
    document.querySelectorAll('[data-cloud-auth-feedback]').forEach(el=>{
      const feedback=authFeedback[el.dataset.cloudAuthFeedback];
      el.textContent=feedback?.text||'';
      el.toggleAttribute('data-error',!!feedback?.error);
    });
    if(pendingSession&&host.safeToLeave())schedule(0);
  };
  function transport(id,epoch) {
    const token=session?.access_token;
    const check=()=>{if(epoch!==generation||!active()||account.id!==id)throw Error('账号已经改变，请重新操作。');};
    async function request(path,{method='GET',body,prefer}={}) {
      check();if(!token)throw Error('请重新登录');
      // Bind every request to the session that created this transport. The shared
      // auth client's token may change in another tab while a request is pending.
      const response=await fetch(CLOUD_URL+'/rest/v1/'+path,{method,headers:{apikey:CLOUD_KEY,Authorization:'Bearer '+token,'Content-Type':'application/json',...(prefer?{Prefer:prefer}:{})},...(body?{body:JSON.stringify(body)}:{})});
      check();if(!response.ok)throw Error('云端请求失败 '+response.status);
      return response.status===204?null:response.json();
    }
    const owner='user_id=eq.'+encodeURIComponent(id);
    return {
      async read(){return (await request('english_study_states?select=revision,payload,updated_at&'+owner+'&limit=1'))?.[0]??null;},
      async write(revision,payload){return (await request('rpc/save_english_study',{method:'POST',body:{expected_revision:revision,new_payload:payload}}))?.[0]??null;},
      async archive(payload){await request('english_study_versions',{method:'POST',body:{user_id:id,payload},prefer:'return=minimal'});},
      async history(){return request('english_study_versions?select=id,revision,created_at&'+owner+'&order=created_at.desc&limit=20');},
      async version(idOfVersion){const rows=await request('english_study_versions?select=payload&'+owner+'&id=eq.'+encodeURIComponent(idOfVersion)+'&limit=1');return validateState(rows?.[0]?.payload);}
    };
  }
  function switchAccount(user) {
    if(!host.safeToLeave()){pendingSession=user;message='账号切换已等待：请先完成当前编辑或复习，并确认修改已保存。';publish();return false;}
    generation++;engine=null;pendingSession=null;message='';
    authFeedback.login=null;
    authFeedback.password=null;
    if(user){
      try {
        const nextRepo=new JournalRepository(localStorage,user.id),raw=nextRepo.loadRaw();
        const nextState=raw?prepareState(JSON.parse(raw),SEED_ENTRIES).state:createState(SEED_ENTRIES);
        const nextAccount={id:user.id,email:user.email||'已登录账号'};
        localStorage.setItem(ACTIVE_KEY,JSON.stringify(nextAccount));account=nextAccount;repo=nextRepo;
        host.replace(repo,nextState);
      }catch{message='账号的本机记录无法读取。原记录已保留，请下载备份后检查浏览器存储。';publish();return false;}
    }else{
      try{const raw=guest.loadRaw(),next=raw?prepareState(JSON.parse(raw),SEED_ENTRIES).state:createState(SEED_ENTRIES);
        localStorage.removeItem(ACTIVE_KEY);account=null;repo=null;host.replace(guest,next);
      }catch{message='本机记录格式异常，已停止切换。请保留当前备份。';publish();return false;}
    }
    host.render();publish();return true;
  }
  function connect(user) {
    if(account?.id!==user.id&&!switchAccount(user))return;
    const epoch=generation,id=user.id;
    engine=new SnapshotSync(repo,transport(id,epoch),{
      active:()=>epoch===generation&&active(),
      apply:payload=>{if(!host.canReplace())return false;host.receive(prepareState(payload,SEED_ENTRIES).state);return true;},
      notify:()=>{message='';publish();}
    });
    publish();schedule(0);
  }
  function schedule(delay=900){clearTimeout(timer);timer=setTimeout(()=>{if(pendingSession&&host.safeToLeave())connect(pendingSession);else engine?.run();},delay);}
  function acceptSession(next) {
    // Invalidate synchronously, before any pending read can start a write with
    // a different account's newly refreshed credentials.
    generation++;session=next;engine=null;pendingSession=null;message='';publish();
    const epoch=generation;
    setTimeout(()=>{if(epoch===generation&&next?.user)connect(next.user);},0);
  }
  async function initialize() {
    try{const cached=JSON.parse(localStorage.getItem(ACTIVE_KEY)||'null');if(cached?.id)switchAccount(cached);}catch{}
    if(!window.supabase?.createClient){message='云端组件未加载，本机学习和备份仍可使用。';publish();return;}
    try{
      client=window.supabase.createClient(CLOUD_URL,CLOUD_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
      publish();
      let authEvents=0;
      client.auth.onAuthStateChange((event,next)=>{
        authEvents++;if(event==='INITIAL_SESSION'&&!next)return;
        // Never await Supabase calls inside its auth lock callback.
        acceptSession(next);
      });
      const atStart=authEvents;const result=await client.auth.getSession();
      if(authEvents===atStart)acceptSession(result.data?.session??null);
      if(result.error){message='登录暂未恢复，请联网后重试；账号本机副本已保留。';publish();}
    }catch{message='暂时无法连接云端。请保留本机备份，联网后重试。';publish();}
  }
  function panel(){return `<section class="panel backup-panel cloud-panel"><div class="panel-heading"><div><h2>账号与云端保存</h2><p>登录后可在不同设备上同步学习记录。</p></div></div><div class="cloud-content"><strong data-cloud-account>${esc(account?.email||'尚未登录')}</strong><p data-cloud-status role="status" aria-live="polite"></p>
    <form method="post" id="cloud-login" class="cloud-auth-form" data-cloud-guest ${active()?'hidden':''}>
      <label class="cloud-auth-field" for="cloud-email">邮箱
        <input id="cloud-email" type="email" name="email" required autocomplete="username">
      </label>
      <label class="cloud-auth-field" for="cloud-password">密码
        <input id="cloud-password" type="password" name="password" required autocomplete="current-password">
      </label>
      <div class="cloud-auth-actions">
        <button class="btn primary" type="submit" data-cloud-auth-submit>用密码登录</button>
        <button class="btn" type="submit" formnovalidate data-email-login data-cloud-auth-submit>发送登录邮件</button>
      </div>
      <p class="cloud-auth-note">首次设置密码或忘记密码时，只填邮箱就可以发送登录邮件。</p>
      <p class="cloud-auth-feedback" data-cloud-auth-feedback="login" role="status" aria-atomic="true"></p>
    </form>
    <form method="post" id="cloud-password-set" class="cloud-auth-form" data-cloud-member hidden>
      <label class="cloud-auth-field" for="cloud-new-password">新密码
        <input id="cloud-new-password" type="password" name="password" required minlength="8" autocomplete="new-password" data-cloud-connected>
      </label>
      <div class="cloud-auth-actions"><button class="btn" type="submit" data-cloud-connected data-cloud-auth-submit>设置或更改密码</button></div>
      <p class="cloud-auth-feedback" data-cloud-auth-feedback="password" role="status" aria-atomic="true"></p>
    </form>
    <div class="button-row" data-cloud-member ${!account?'hidden':''}><button class="btn" type="button" data-action="cloud-sync" data-cloud-connected>立即同步</button><button class="btn" type="button" data-action="cloud-upload" data-cloud-connected>上传本机记录</button><button class="btn" type="button" data-action="cloud-conflict" data-cloud-connected>查看不同版本</button><button class="btn" type="button" data-action="cloud-history" data-cloud-connected>云端历史备份</button><button class="text-button" type="button" data-action="cloud-logout">退出账号</button></div><p class="fine-print">只有显示「已保存到云端」的内容才能在清理缓存后找回。离线草稿和本机副本仍需要导出备份。不同版本会让你选择，覆盖前保留副本。</p></div></section>`;}
  async function login(form) {
    if (authBusy || !client) return;
    const email = String(new FormData(form).get('email') || '').trim();
    authBusy = true;
    authFeedback.login = {text:'正在发送登录邮件…'};
    publish();
    try {
      const {error}=await client.auth.signInWithOtp({email,options:{emailRedirectTo:new URL('./',location.href).href}});
      if (error) throw error;
      authFeedback.login = {text:'登录邮件已发送。请打开邮件里的链接。'};
    } catch (error) {
      authFeedback.login = {error:true,text:error?.status===429
        ? '邮件发送过于频繁，请稍后重试。'
        : '登录邮件未发送成功。请检查邮箱或网络后重试。'};
    } finally {
      authBusy = false;
      publish();
    }
  }
  async function password(form) {
    if (authBusy || !client) return;
    const setting = form.id === 'cloud-password-set';
    if (setting && !active()) return;
    const feedbackKey = setting ? 'password' : 'login';
    const accountId = account?.id;
    const fields = new FormData(form);
    const password = String(fields.get('password') || '');
    const email = String(fields.get('email') || '').trim();
    form.elements.namedItem('password').value = '';
    authBusy = true;
    authFeedback[feedbackKey] = {text:setting ? '正在保存密码…' : '正在登录…'};
    publish();
    try {
      const result = setting
        ? await client.auth.updateUser({password})
        : await client.auth.signInWithPassword({email, password});
      if (result.error) throw result.error;
      if (setting && account?.id===accountId) {
        authFeedback.password = {text:'密码已保存。下次可以用同一邮箱和密码登录。'};
      } else if (!setting) {
        authFeedback.login = null;
      }
    } catch (error) {
      if (account?.id===accountId) {
        authFeedback[feedbackKey] = {error:true,text:setting
          ? '设置密码失败。请用邮件链接重新登录，或试一个更长的密码。'
          : '密码登录失败。请核对密码，或点「发送登录邮件」。'};
      }
    } finally {
      authBusy = false;
      publish();
    }
  }
  async function action(name,id) {
    try{
      if(name==='cloud-sync'){if(pendingSession){connect(pendingSession);return;}schedule(0);}
      if(name==='cloud-logout'){
        if(!host.safeToLeave()){host.toast('当前修改尚未保存，请先下载完整备份。');return;}
        const raw=repo?.loadRaw();if(raw)host.download(raw,'Klaire-退出前备份.json');
        const result=await client?.auth.signOut({scope:'local'});if(result?.error)throw result.error;
        session=null;switchAccount(null);
      }
      if(name==='cloud-upload'){
        if(!active())return;
        const raw=guest.loadRaw();if(!raw){host.toast('没有可上传的本机学习记录。');return;}
        const payload=prepareState(JSON.parse(raw),SEED_ENTRIES).state,epoch=generation;
        host.confirm('上传这份本机记录？',`<p>${esc(summary(payload))}</p><p>上传前会下载当前账号副本。如果云端已有不同记录，会先显示不同版本供你选择。</p>`,'备份并上传',()=>{
          if(epoch!==generation||!active())return;host.backup();repo.save(payload);host.receive(payload);schedule(0);
        });
      }
      if(name==='cloud-conflict'){
        const shown=engine?.conflict;if(!shown){host.toast('当前没有需要选择的不同版本。');return;}
        const epoch=generation;
        const cloud=shown.head?`云端第 ${shown.head.revision} 版：${summary(shown.head.payload)}`:'云端暂无记录';
        host.modal(`<h2 id="dialog-title">选择要继续使用的记录</h2><p>${esc(cloud)}</p><div class="button-row">${shown.head?'<button class="btn" data-action="cloud-choose" data-id="cloud">使用云端版</button>':''}<button class="btn" data-action="cloud-download" data-id="cloud">下载云端备份</button></div>${shown.leaves.map(d=>`<p>本机草稿 ${esc(new Date(d.at).toLocaleString('zh-CN'))}：${esc(summary(d.payload))}</p><div class="button-row"><button class="btn" data-action="cloud-choose" data-id="${esc(d.id)}">使用这份草稿</button><button class="btn" data-action="cloud-download" data-id="${esc(d.id)}">下载这份草稿</button></div>`).join('')}<p class="fine-print">选择前会下载当前页面备份，并在云端保留两边的记录。若远端又有变化，会重新请你选择。</p>`);
        conflictView={shown,epoch};
      }
      if(name==='cloud-download'){
        const shown=conflictView?.shown;if(!shown)return;const payload=id==='cloud'?shown.head?.payload:shown.leaves.find(d=>d.id===id)?.payload;
        if(payload)host.download(JSON.stringify(exportObject(payload),null,2),'Klaire-不同版本备份.json');
      }
      if(name==='cloud-choose'){
        if(!conflictView||conflictView.epoch!==generation)return;const {shown}=conflictView;host.backup();host.close();
        await engine.resolve(id==='cloud'?'cloud':'local',shown,id);host.render();publish();
      }
      if(name==='cloud-history'){
        if(!active())return;const epoch=generation,rows=await transport(account.id,epoch).history();if(epoch!==generation)return;
        host.modal(`<h2 id="dialog-title">云端历史备份</h2><p>最近 20 份副本。下载后可以用「从备份恢复」查看和恢复。</p>${rows.length?rows.map(r=>`<p>${esc(new Date(r.created_at).toLocaleString('zh-CN'))} · ${r.revision?'第 '+r.revision+' 版':'冲突保留副本'} <button class="text-button" data-action="cloud-version" data-id="${esc(r.id)}">下载备份</button></p>`).join(''):'<p>还没有历史备份。</p>'}`);
      }
      if(name==='cloud-version'){
        if(!active())return;const epoch=generation,payload=await transport(account.id,epoch).version(id);if(epoch!==generation)return;
        host.download(JSON.stringify(exportObject(payload),null,2),'Klaire-云端历史备份.json');
      }
    }catch{host.toast('操作未完成，记录没有被删除。请保留完整备份后重试。');}
  }
  let conflictView=null;
  window.addEventListener('online',()=>schedule(0));
  window.addEventListener('focus',()=>schedule(0));
  window.addEventListener('storage',event=>{if(event.key?.startsWith('klaire.study/'))schedule(300);});
  setInterval(()=>{if(active()&&!document.hidden)schedule(0);},20000);
  return {initialize,panel,publish,action,login,password,schedule,get account(){return account;},get generation(){return generation;},
    changed(){if(engine){engine.setStatus('pending');schedule();}},isAccount:()=>!!account};
}
