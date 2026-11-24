/* ---------- data ---------- */
const EX=[
 {id:'shrug',name:'Skuldre op og ned',dur:30,anim:'shrug',effect:'tense',steps:['Løft skuldrene op mod ørerne.','Hold dem der i tre sekunder.','Slip dem helt ned, og pust ud.']},
 {id:'neck',name:'Nakken side til side',dur:40,anim:'tilt',effect:'move',steps:['Træk venstre øre mod skulderen.','Hold, og pust roligt.','Skift til højre side.']},
 {id:'eyes',name:'Kig langt væk',dur:20,anim:'away',effect:'eyes',steps:['Find noget langt væk, helst ude ad vinduet.','Bliv ved med at se på det.','Blink et par gange, og kom tilbage.']},
 {id:'reach',name:'Ræk op og stræk',dur:30,anim:'reach',effect:'move',steps:['Rejs dig, og stræk begge arme op.','Hold, og bliv et par centimeter højere.','Slip armene langsomt ned.']},
 {id:'breath',name:'Tre dybe vejrtrækninger',dur:30,anim:'deep',effect:'tense',steps:['Træk vejret dybt ind gennem næsen.','Hold et øjeblik.','Pust langsomt ud gennem munden.']},
 {id:'walk',name:'Gå en lille tur',dur:45,anim:'walk',effect:'move',steps:['Rejs dig op.','Gå hen til vinduet eller køkkenet.','Tag et glas vand med tilbage.']}
];
const NUDGE={
 water:{t:'Tid til et glas vand.',x:'Koppen er tom. Tag et glas, så er du klar til næste stykke.',go:'Drak vand'},
 eyes:{t:'Kig væk et øjeblik.',x:'Find noget langt væk, og se på det i 20 sekunder.',go:'Start 20 sekunder'},
 move:{t:'Tid til at rejse dig.',x:'Dine ben har siddet længe. Et kort stræk hjælper mere, end du tror.',go:'Vis mig en øvelse'},
 tense:{t:'Slip skuldrene.',x:'Du har skrevet hårdt et stykke tid. Lad dem falde ned, og pust ud.',go:'Skuldrene ned'}
};
const RATE={water:100/90,eyes:100/20,move:100/60}; /* point pr. virtuelt minut */
const LABEL={water:'Vand',eyes:'Øjne',move:'Bevægelse'};
const STORE='pause-proto-v1';

