/* ---------- hjælpere ---------- */
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const mmss=s=>{s=Math.max(0,Math.ceil(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
function say(t){const el=$('#status');el.textContent=t;el.classList.add('on');clearTimeout(say.t);say.t=setTimeout(()=>el.classList.remove('on'),2600)}
function minUntilDue(k){return Math.max(0,(S.m[k]-15)/RATE[k])}
function nextDue(){let b=null;for(const k of ['water','eyes','move']){if(!S.on[k])continue;const m=minUntilDue(k);if(!b||m<b.m)b={k,m}}return b}
function state(k){const v=S.m[k];return v>=50?['ok','I orden']:v>=25?['soon','Snart']:['now','Nu']}
const SENT={
 water:[['Du har drukket for nylig.','Om lidt er det tid til et glas.','Tid til et glas vand.']],
 eyes:[['Øjnene har det fint.','Snart en pause for øjnene.','Kig væk fra skærmen et øjeblik.']],
 move:[['Du har bevæget dig for nylig.','Snart tid til at rejse dig.','Rejs dig, og stræk ud.']]
};
function sentence(k){const v=S.m[k];return SENT[k][0][v>=50?0:v>=25?1:2]}

