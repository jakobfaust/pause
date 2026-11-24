/* ---------- visning ---------- */
function setView(v){
  S.view=v;card.dataset.view=v;
  $$('[data-v]').forEach(el=>{if(el.closest('.body'))el.hidden=el.dataset.v!==v});
  if(v==='calm'){const d=nextDue();$('#cText').textContent=d?`Næste: ${LABEL[d.k].toLowerCase()} om cirka ${Math.max(1,Math.round(d.m))} min.`:'Alle påmindelser er slået fra.'}
  if(v==='day')renderRows();
  paintFigure();fit();
  /* hvis fokus lå på noget, der nu er skjult, flyttes det til den nye visnings overskrift */
  const a=document.activeElement;
  if(S.open&&a&&a!==document.body&&card.contains(a)&&a.closest('[data-v]')&&a.closest('[data-v]').hidden){
    const h=card.querySelector('[data-v]:not([hidden]) h2');
    if(h){h.tabIndex=-1;h.focus({preventScroll:true})}
  }
}
function renderRows(){
  const rows=[['water','Vand','Drak vand',()=>{S.m.water=100;done('Vand fyldt op.')}],['eyes','Øjne','Kig væk',()=>startEx(EX.find(e=>e.id==='eyes'))],['move','Bevægelse','Start øvelse',()=>startEx(pick('move'))]];
  $('#rows').innerHTML=rows.map(r=>{const [c,t]=state(r[0]);return `<div class="row"><div class="top"><b>${r[1]}</b><span class="tag ${c}">${t}</span></div><button class="btn sec small act" data-act="${r[0]}">${r[2]}</button><span class="s">${S.on[r[0]]?sentence(r[0]):'Slået fra.'}</span></div>`}).join('')+
   `<div class="row"><div class="top"><b>Fokus</b></div><span class="s">${performance.now()<S.tenseUntil?'Du er i dybt flow. Husk skuldrene.':'Roligt tempo.'}</span></div>`;
  $$('#rows [data-act]').forEach(b=>b.onclick=()=>rows.find(r=>r[0]===b.dataset.act)[3]());
}
function fit(){
  const W=desk.clientWidth,H=desk.clientHeight,w=card.offsetWidth,h=card.offsetHeight;
  if(!S.pos)S.pos={x:W-w-12,y:38};
  S.pos.x=clamp(S.pos.x,8,Math.max(8,W-w-8));S.pos.y=clamp(S.pos.y,34,Math.max(34,H-h-8));
  card.style.left=S.pos.x+'px';card.style.top=S.pos.y+'px';
}
function edgeAway(){
  const W=desk.clientWidth,H=desk.clientHeight,w=card.offsetWidth,h=card.offsetHeight;
  const cx=S.pos.x+w/2,cy=S.pos.y+h/2;
  const dL=cx,dR=W-cx,dB=H-cy;
  const e=!S.homeSet?'top':dL<=dR&&dL<=dB?'left':dR<=dB?'right':'bottom';
  S.edge=e;
  let a,o;
  if(e==='top'){a='translateY(-24px) scale(.96)';o='top right'}
  if(e==='left'){a=`translateX(${-(S.pos.x+w+30)}px) scale(.96)`;o='left center'}
  if(e==='right'){a=`translateX(${W-S.pos.x+30}px) scale(.96)`;o='right center'}
  if(e==='bottom'){a=`translateY(${H-S.pos.y+30}px) scale(.96)`;o='center bottom'}
  card.style.setProperty('--away',a);card.style.setProperty('--origin',o);
  /* peek-fane ved kanten */
  peek.dataset.edge=e;
  peek.style.top=peek.style.left=peek.style.right=peek.style.bottom='';
  if(e==='left'||e==='right')peek.style.top=clamp(cy-30,40,H-70)+'px';
  if(e==='bottom')peek.style.left=clamp(cx-26,8,W-60)+'px';
}
function paintPeek(){peek.classList.toggle('show',!S.open&&!S.fs)}
function paintPending(){
  app.dataset.pending=S.pending?'1':'0';
  $('#mbIcon').setAttribute('aria-label',S.pending?'Pause-figuren. En påmindelse venter.':'Pause-figuren, åbn eller skjul');
  peek.setAttribute('aria-label',S.pending?'Åbn Pause-figuren. En påmindelse venter.':'Åbn Pause-figuren');
}

