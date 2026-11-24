/* ---------- tegninger ---------- */
$('#mbSvg').innerHTML=ICON;
$('#room').innerHTML=ROOM;
function portrait(cls,crop){
  const ms=['neutral','happy','tense','tired'];
  const mk=l=>ms.map(m=>`<g class="M m-${m}">${SPR[m][l]}${l==='head'?`<g class="blink">${SPR[m].blink}</g>`:''}</g>`).join('');
  return `<svg class="${cls}" data-mood="neutral" data-anim="" viewBox="${crop||'0 0 64 64'}" aria-hidden="true"><g class="bob"><g class="Lbody">${mk('body')}</g><g class="Lhead">${mk('head')}</g></g></svg>`;
}
$('#pfHost').outerHTML=portrait('pf');
$('#peekFace').innerHTML=portrait('pfm','12 6 40 34').replace('<svg ','<svg width="44" height="37" style="display:block;shape-rendering:crispEdges" ');
const pf=$('.pf'),pfm=$('.pfm');
const css=document.createElement('style');
css.textContent='.pfm .M{display:none}.pfm[data-mood="neutral"] .m-neutral,.pfm[data-mood="happy"] .m-happy,.pfm[data-mood="tense"] .m-tense,.pfm[data-mood="tired"] .m-tired{display:inline}.pfm .blink{display:none}';
document.head.appendChild(css);

