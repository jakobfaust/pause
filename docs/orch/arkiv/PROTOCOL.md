# Protokol: Pause

Præfiks for alle sessioner: `PAU: `. Valg: modelpolitik laveste egnede, feedbackniveau stille, tidszone Europe/Copenhagen.

## Melding
- Meld dig kun ved FÆRDIG, BLOKERET eller SPØRGSMÅL. Ingen mellemstatus.
- Afslut med en kort statusblok (højst ca. otte linjer): resultat, ændringer (branch, filer), lint og build, pushet, hvad der kræver brugeren eller Orkestratoren, forslag ARKIVER eller BLIV ÅBEN og hvorfor.
- Send beskeden til Orkestratoren med `send_message` (`@parent` for børn).

## Spørgsmål
Spørg kun, når beslutningen er brugerens: uigenkaldeligt, brand, penge, jura eller reelt uklart. Ved hver port overdrager Orkestratoren selv til en ny Orkestrator (`create_session` med genstartsprompten i `STATE.md`), venter på at den melder sig og arkiverer så sig selv; støttesessioner startes friske pr. port eller gruppe; sessioner i en gruppe melder én gang for gruppen; kun nødvendige felter hentes. Orkestratoren læser brugerens svar og afkrydsninger i portalen ved hver port og efter hver afsluttet session, og straks når brugeren skriver "tjek portalen". Skriv hvert spørgsmål som ét portalpunkt med en kort baggrund og to til fire svarmuligheder, hvor én er anbefalet, og hver har en kort begrundelse. Brug `response: approve` på opgaver, der skal godkendes eller afvises. Afgør resten selv og skriv det i én linje.

## Arbejde
- Læs kun det, din brief peger på. Søg før du læser. Begræns lange udskrifter.
- Skriv kun i filer, du ejer (se `OWNERSHIP.md`).
- Eget branch pr. opgave: `pause/<område>-<opgave>` med bindestreg, ikke skråstreg.
- Aldrig deploy. Aldrig push til `main`. Kun Git og merge flytter noget til `main`, og kun efter brugerens ja skrevet direkte i dens egen chat.
- Efter to-tre forsøg uden fremskridt: meld BLOKERET med det, du har set.
- Ingen hemmeligheder i repoet. Kør `scripts/secret-scan.sh` før push (Git og merge kører den altid).

## Tidspunkter
UTC med Z, taget fra uret: `date -u +%Y-%m-%dT%H:%M:%SZ`. Aldrig skrevet i hånden og aldrig afrundet.

## Dokumentation
Hent dokumentation fra officielle kilder med de værktøjer, du har. Gæt aldrig et API.

## Portal
Skriv til portalen ved ændring (start og afslutning), ikke på timer. Alt, der kræver brugeren, lægges som opgave eller spørgsmål. Se `PORTAL.md`.
