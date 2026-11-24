/* ---------- træk ---------- */
let drag=null;
function startDrag(e){
  if(e.target.closest('button')&&e.currentTarget!==$('#grip'))return;
  if(e.button!==undefined&&e.button!==0)return;
  const r=desk.getBoundingClientRect();
  drag={dx:e.clientX-r.left-S.pos.x,dy:e.clientY-r.top-S.pos.y,r};
  card.classList.add('lift');S.pinned=true;clearTimeout(S.nTimer);
  addEventListener('pointermove',moveDrag);addEventListener('pointerup',endDrag,{once:true});addEventListener('pointercancel',endDrag,{once:true});
  e.preventDefault();
}
function moveDrag(e){if(!drag)return;S.pos.x=e.clientX-drag.r.left-drag.dx;S.pos.y=e.clientY-drag.r.top-drag.dy;fit()}
function endDrag(){drag=null;card.classList.remove('lift');S.homeSet=true;removeEventListener('pointermove',moveDrag);save()}
stage.addEventListener('pointerdown',startDrag);$('#grip').addEventListener('pointerdown',startDrag);
$('#grip').addEventListener('keydown',e=>{
  const st=e.shiftKey?64:16;const m={ArrowLeft:[-st,0],ArrowRight:[st,0],ArrowUp:[0,-st],ArrowDown:[0,st]}[e.key];
  if(m){e.preventDefault();S.pos.x+=m[0];S.pos.y+=m[1];S.homeSet=true;S.pinned=true;fit();save()}
});

