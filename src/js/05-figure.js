/* ---------- figur og rum ---------- */
function mood(){
  const now=performance.now();
  if(now<S.happyUntil)return 'happy';
  if(S.view==='exercise')return 'neutral';
  if(now<S.tenseUntil||(S.nudge&&S.nudge.kind==='tense'))return 'tense';
  if(Math.min(S.m.water,S.m.eyes,S.m.move)<20)return 'tired';
  return 'neutral';
}
function paintFigure(){
  const m=mood();
  pf.dataset.mood=m;pfm.dataset.mood=m==='tired'?'tired':m;
  pf.dataset.anim=S.view==='exercise'&&S.ex?S.ex.def.anim:'';
  stage.dataset.dry=S.m.water<30?'1':'0';
}

