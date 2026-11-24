/* ---------- tilstand ---------- */
const S={view:'calm',open:false,pinned:false,m:{water:78,eyes:62,move:70},speed:60,vt:0,
  nudge:null,pending:false,snooze:{water:0,eyes:0,move:0,tense:0},lastNudge:-99,
  on:{water:true,eyes:true,move:true,tense:true},pos:null,edge:'top',ex:null,exLast:-1,
  happyUntil:0,tenseUntil:0,keys:[],lastTenseNudge:-1e9,quiet:false,fs:false,tod:'day',theme:'light',nTimer:0,sTimer:0};
const hr=new Date().getHours();
S.tod=hr<11?'morning':hr<17?'day':'evening';
S.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
try{const j=JSON.parse(localStorage.getItem(STORE)||'null');if(j){
  if(j.pos&&Number.isFinite(j.pos.x)&&Number.isFinite(j.pos.y)){S.pos={x:j.pos.x,y:j.pos.y};S.homeSet=true}
  if(['top','left','right','bottom'].includes(j.edge))S.edge=j.edge;
  if(j.on)for(const k of Object.keys(S.on))if(typeof j.on[k]==='boolean')S.on[k]=j.on[k]}}catch{}
const save=()=>{try{localStorage.setItem(STORE,JSON.stringify({pos:S.pos,edge:S.edge,on:S.on}))}catch{}};

