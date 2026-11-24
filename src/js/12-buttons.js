/* ---------- knapper ---------- */
$('#mbIcon').onclick=()=>{if(!S.open&&S.pending&&S.nudge){S.pending=false;paintPending();open('nudge')}else toggle()};
peek.onclick=()=>{if(S.nudge){S.pending=false;paintPending();open('nudge')}else open('user')};
$('#btnHide').onclick=()=>hide();
$('#btnSet').onclick=()=>{S.nudge&&0;if(S.ex)cancelEx();setView('settings');open('user')};
$$('[data-back]').forEach(b=>b.onclick=()=>setView('calm'));
$('#nGo').onclick=()=>{const k=S.nudge.kind;
  if(k==='water'){S.m.water=100;done('Vand fyldt op.')}
  else if(k==='eyes')startEx(EX.find(e=>e.id==='eyes'));
  else if(k==='move')startEx(pick('move'));
  else startEx(EX.find(e=>e.id==='shrug'));};
$('#nLater').onclick=snooze;
$('#cEx').onclick=()=>startEx(pick('any'));
$('#cDay').onclick=()=>setView('day');
$('#sDay').onclick=()=>{clearTimeout(S.sTimer);S.pinned=true;setView('day')};
$('#sHide').onclick=()=>hide();
$('#eDone').onclick=()=>finishEx(false);
$('#eSkip').onclick=()=>{cancelEx();S.pinned?setView('calm'):hide();if(S.pinned)setView('calm')};
$$('.tg').forEach(b=>b.onclick=()=>{const k=b.dataset.k;S.on[k]=!S.on[k];b.setAttribute('aria-checked',S.on[k]);save()});
$$('.tg').forEach(b=>b.setAttribute('aria-checked',S.on[b.dataset.k]));
$('#resetPos').onclick=()=>{S.pos=null;S.homeSet=false;S.edge='top';fit();save();say('Placeringen er nulstillet.')};
$('#toReset').onclick=()=>setView('reset');
$('#rCancel').onclick=()=>setView('settings');
$('#rDo').onclick=()=>{try{localStorage.removeItem(STORE)}catch{}S.pos=null;S.homeSet=false;Object.assign(S.on,{water:true,eyes:true,move:true,tense:true});$$('.tg').forEach(b=>b.setAttribute('aria-checked','true'));fit();setView('calm');say('Dine data er nulstillet.')};
$('#camTry').onclick=()=>{
  const m=$('#camMsg'),b=$('#camTry');b.disabled=true;m.className='msg';m.innerHTML='<span class="spin"></span>Beder om adgang til kameraet …';
  setTimeout(()=>{m.className='msg err';m.textContent='Adgang afvist. Åbn Systemindstillinger, vælg Anonymitet og sikkerhed, og tillad kameraet for Pause. Der er ikke gemt noget.';b.disabled=false;b.textContent='Prøv igen'},1400)};

