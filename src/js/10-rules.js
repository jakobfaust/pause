/* ---------- tid og regler ---------- */
let last=performance.now();
function tick(){
  const now=performance.now(),dt=Math.min(1.5,(now-last)/1000);last=now; /* sovende fane eller computer tæller ikke som tid */
  const dv=dt*S.speed/60; /* virtuelle minutter */
  S.vt+=dv;
  if(S.pending&&!S.nudge){S.pending=false;paintPending()}
  if(!S.ex){for(const k of ['water','eyes','move'])S.m[k]=Math.max(0,S.m[k]-RATE[k]*dv)}
  /* intens skrivning */
  S.keys=S.keys.filter(t=>now-t<15000);
  if(S.on.tense&&!S.nudge&&!S.ex&&S.keys.length>=45&&now-S.lastTenseNudge>90000&&S.vt>=S.snooze.tense){S.lastTenseNudge=now;S.keys=[];deliver('tense')}
  /* meter-nudges */
  if(!S.nudge&&!S.ex&&S.vt-S.lastNudge>=2){
    let c=null;for(const k of ['water','eyes','move']){if(S.on[k]&&S.m[k]<15&&S.vt>=S.snooze[k]&&(!c||S.m[k]<S.m[c]))c=k}
    if(c)deliver(c);
  }
  if(S.ex)tickEx();
  if(S.open&&S.view==='day'&&Math.floor(now/1000)!==tick.s){tick.s=Math.floor(now/1000);renderRows()}
  if(S.open&&S.view==='calm'&&Math.floor(now/2000)!==tick.c){tick.c=Math.floor(now/2000);setView('calm')}
  paintFigure();
}
setInterval(tick,250);
function clock(){const d=new Date();$('#clock').textContent=['søn','man','tir','ons','tor','fre','lør'][d.getDay()]+' '+String(d.getHours()).padStart(2,'0')+'.'+String(d.getMinutes()).padStart(2,'0')}
clock();setInterval(clock,10000);

