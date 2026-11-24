/* ---------- nudges ---------- */
function showNudge(){
  const n=NUDGE[S.nudge.kind];
  $('#nTitle').textContent=n.t;$('#nText').textContent=n.x;$('#nGo').textContent=n.go;
  $('#live').textContent=n.t+' '+n.x;
  setView('nudge');
}
function deliver(kind){
  if(S.nudge||S.ex)return;
  S.nudge={kind};S.lastNudge=S.vt;
  if(kind==='tense'){S.tenseUntil=performance.now()+90000}
  if(S.quiet||S.fs){S.pending=true;paintPending();say(S.quiet?'Møde i gang. Påmindelsen venter.':'Fuldskærm. Påmindelsen venter.');return}
  if(S.open&&['settings','reset','day'].includes(S.view)){S.pending=true;paintPending();return}
  open('nudge');
}
function releasePending(){
  if(S.nudge&&!S.open&&!S.quiet&&!S.fs){S.pending=false;paintPending();open('nudge')}
}
function armNudgeTimer(){
  clearTimeout(S.nTimer);
  if(S.view==='nudge'&&!S.pinned)S.nTimer=setTimeout(()=>{if(card.matches(':hover,:focus-within'))return armNudgeTimer();
    hide(true);},25000);
}
function snooze(){const k=S.nudge.kind;S.snooze[k]=S.vt+10;S.nudge=null;hide()}
function done(msg){
  S.nudge=null;S.happyUntil=performance.now()+7000;
  const d=nextDue();
  $('#sTitle').textContent='Godt gået.';
  $('#sText').textContent=(msg?msg+' ':'')+(d?`Næste påmindelse om cirka ${Math.max(1,Math.round(d.m))} min.`:'');
  setView('success');
  if(!S.open)open('user');
  if(!S.pinned){clearTimeout(S.sTimer);S.sTimer=setTimeout(()=>{if(S.view==='success'&&!card.matches(':hover,:focus-within'))hide();else S.sTimer=setTimeout(hide,4000)},5000)}
  $('#live').textContent='';setTimeout(()=>{$('#live').textContent='Godt gået. '+$('#sText').textContent},50)
}

