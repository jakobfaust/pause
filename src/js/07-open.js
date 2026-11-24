/* ---------- åbn og skjul ---------- */
function open(why){
  clearTimeout(S.sTimer);
  S.open=true;S.pinned=why==='user'||S.pinned&&why!=='nudge';
  if(why==='nudge')S.pinned=false;
  if(S.nudge&&why==='nudge')showNudge();
  else if(S.view==='exercise'){}
  else if(why==='user'&&!['settings','day','success','reset'].includes(S.view))home();
  card.dataset.open='true';card.inert=false;$('#mbIcon').setAttribute('aria-expanded','true');
  fit();paintPeek();paintFigure();
  if(why==='user')requestAnimationFrame(()=>{const b=card.querySelector('[data-v]:not([hidden]) .btn');b&&b.focus({preventScroll:true})});
  armNudgeTimer();
}
function hide(keep){
  if(!S.open)return;
  if(S.ex)cancelEx();
  clearTimeout(S.nTimer);clearTimeout(S.sTimer);
  edgeAway();
  S.open=false;S.pinned=false;
  if(S.nudge){if(keep===true){S.pending=true}else{S.snooze[S.nudge.kind]=S.vt+10;S.nudge=null}}
  card.dataset.open='false';card.inert=true;$('#mbIcon').setAttribute('aria-expanded','false');
  if(document.activeElement&&card.contains(document.activeElement))document.activeElement.blur();
  paintPeek();paintPending();
}
/* tilbage til udgangsvisningen: en ventende påmindelse går forud for hvile */
function home(){if(S.nudge)showNudge();else setView('calm')}
function toggle(){S.open?hide():open('user')}

