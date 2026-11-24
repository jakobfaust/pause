# Overlevering – Pause (prototype)

Dato: 2026-11-24. Gren: `pau/opsaetning` (intet er på `main`, intet er deployet).

## Hvad der er
- Interaktiv prototype, bygget til én HTML-fil: `npm run build` giver `dist/index.html` (ca. 180 kB, fonte og tegninger inlinet, ingen eksterne requests).
- Publiceret som privat artefakt "Pause – interaktiv prototype".
- `npm run check` kører lint, build og 17 røgtests i Chrome (adfærd, fokus, ventende nudges, snooze, korrupte gemte data).

## Deploy
Ingen. Prototypen er et privat artefakt. Skal den på et domæne, så er det en ny beslutning for Jakob.

## Gennemgang gjort
- Adfærd: sovende fane tæller ikke som tid, nudge kaprer ikke Indstillinger/Din dag, afbrudt øvelse udsætter, ventende badge ryddes, tast holdt nede tæller én gang, gemte data valideres.
- Tilgængelighed: fokusstyring ved visningsskift og skjul, "Din dag" mister ikke fokus, kontrast tjekket i lys og mørk, 44 px trykflader, ventende nudge i ikonets navn, live-region for succes og kamera.
- Figur: trætte øjne tegnet om.
- Tekst: to formuleringer rettet ("Slip skuldrene.", "bliv et par centimeter højere"), "Færdig" og "Gå tilbage".
- Uafhængig reviewer (separat agent) testede den byggede side; 10 af 15 fund rettet.

## Åbne punkter
- Ikke rettet fra review: kassen om at gemt position kan overskrives af en midlertidigt lille skærm; kontakternes kant er hævet til ca. 3:1, men ikke målt med værktøj.
- Flere skærme er ikke modelleret i prototypen (kun beskrevet i konceptet).
- Ikke testet i Safari eller på rigtige enheder.
- Impeccable-detektoren advarer om cremefarvet baggrund: bevidst (brandpaletten).
- Faust-standardens desktop-afsnit (menulinje, popovers, genveje) er kun et forslag.
- Det trætte humør og figurens identitet: figuren er stadig generisk; webcam-avatar er fremtidigt arbejde.
