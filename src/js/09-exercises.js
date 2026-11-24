/* ---------- øvelser ---------- */
function pick(kind){
  const pool=EX.filter(e=>kind==='move'?['neck','reach','walk'].includes(e.id):kind==='tense'?['shrug','breath'].includes(e.id):true);
  const c=pool.filter(e=>EX.indexOf(e)!==S.exLast);const e=c[Math.floor(Math.random()*c.length)]||pool[0];
  S.exLast=EX.indexOf(e);return e;
}
function startEx(def,from){
  clearTimeout(S.nTimer);clearTimeout(S.sTimer);
  S.nudge=null;S.ex={def,from,t0:performance.now(),dur:def.dur};
  $('#eName').textContent=def.name;setView('exercise');tickEx();
  if(!S.open)open('user');
}
function cancelEx(){S.ex=null;S.happyUntil=0;paintFigure()}
function tickEx(){
  if(!S.ex)return;
  const e=S.ex,t=(performance.now()-e.t0)/1000,left=e.dur-t,f=clamp(t/e.dur,0,1);
  $('#eTime').textContent=mmss(left);
  $('#eBar').style.width=(f*100)+'%';$('#eProg').setAttribute('aria-valuenow',Math.round(f*100));
  const si=Math.min(e.def.steps.length-1,Math.floor(f*e.def.steps.length));
  const txt=e.def.steps[si];if($('#eStep').textContent!==txt)$('#eStep').textContent=txt;
  if(left<=0)finishEx(true);
}
function finishEx(full){
  if(!S.ex)return;const def=S.ex.def;S.ex=null;
  if(def.effect==='eyes')S.m.eyes=100;
  if(def.effect==='move'){S.m.move=100;S.m.eyes=Math.max(S.m.eyes,70)}
  if(def.effect==='tense'){S.tenseUntil=0;S.keys=[]}
  done(full?'Øvelsen er klaret.':'Tak for pausen.');
}

