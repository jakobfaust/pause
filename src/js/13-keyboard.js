/* ---------- tastatur ---------- */
document.addEventListener('keydown',e=>{
  if(e.ctrlKey&&e.altKey&&e.code==='Space'){e.preventDefault();hotkey()}
  else if(e.key==='Escape'&&S.open){e.preventDefault();if(S.view==='reset')setView('settings');else hide()}
});
$('#doc').addEventListener('keydown',e=>{if(!e.repeat&&(e.key.length===1||e.key==='Backspace'))S.keys.push(performance.now())});
function hotkey(){if(S.nudge&&!S.open){S.pending=false;paintPending();open('nudge')}else toggle()}

