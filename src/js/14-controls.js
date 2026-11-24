/* ---------- styring ---------- */
function seg(g,fn,init){const el=$(`[data-g="${g}"]`);const set=v=>{$$(`[data-g="${g}"] .chip`).forEach(b=>b.setAttribute('aria-pressed',b.dataset.v==v));fn(v)};el.onclick=e=>{const b=e.target.closest('.chip');b&&set(b.dataset.v)};set(init)}
seg('speed',v=>S.speed=+v,60);
seg('tod',v=>{S.tod=v;app.dataset.tod=v;if(v==='evening')S.m.move=Math.min(S.m.move,40)},S.tod);
seg('theme',v=>{S.theme=v;app.dataset.theme=v;document.querySelector('meta[name=theme-color]').content=v==='dark'?'#2B2421':'#F1EADF'},S.theme);
$('#trig').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;const k=b.dataset.k;if(S.ex)return;
  if(S.nudge){say('Der venter allerede en påmindelse.');return}
  if(k!=='tense')S.m[k]=8;S.snooze[k]=0;deliver(k)};
$('#scene').onclick=e=>{const b=e.target.closest('.chip');if(!b||!b.dataset.k)return;const k=b.dataset.k;
  if(k==='space'){const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);desk.dataset.space=on?'2':'1';say(on?'Ny Space. Figuren følger med.':'Tilbage til første Space.');return}
  const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);
  if(k==='quiet'){S.quiet=on;say(on?'Møde i gang. Påmindelser venter.':'Mødet er slut.');if(!on)releasePending()}
  if(k==='fs'){S.fs=on;$('#fs').hidden=!on;$('#menubar').style.display=on?'none':'';paintPeek();say(on?'Fuldskærmsapp. Kald figuren med genvejen.':'Fuldskærm er slut.');if(!on)releasePending()}
};
$('#hotkey').onclick=hotkey;
$('#resetAll').onclick=()=>location.reload();
if(innerWidth>=720&&innerHeight>=900)$('#ctl').open=true;

app.dataset.tod=S.tod;app.dataset.theme=S.theme;
setView('calm');fit();edgeAway();paintPeek();paintPending();
/* åbn første gang som fra menubaren */
setTimeout(()=>open('user'),500);
addEventListener('resize',()=>{fit();if(!S.open)edgeAway()});
window.__S=S;
