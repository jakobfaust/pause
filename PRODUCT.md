# Pause

## Formål
Et lille væsen på Mac-skrivebordet, der minder dig om vand, øjne, bevægelse og spændte skuldre uden at føles som en reminder-app. Det skal være roligt, varmt og lidt fjollet, aldrig skyldfølelse.

## Brugere
Folk der sidder længe ved en skærm (designere, udviklere, kontorarbejde). Første bruger: Jakob.

## Kernemekanik
- Tre skjulte målere (vand, øjne, bevægelse) falder over tid. Ingen procenter i UI, kun sætninger og et tilstandsord (I orden, Snart, Nu).
- Figuren kommer frem fra skærmkanten med et nudge, når noget er "Nu". Uden svar trækker den sig tilbage og venter.
- Hård skrivning giver et spændings-nudge. Møde og fuldskærm gør nudges ventende (badge), ikke afbrydende.
- Øvelser på 20–45 sekunder med figuren som model.

## Faust-standard
- Projekttype: app/værktøj (Operate). Prototype som én HTML-fil; målet er en native Mac-app.
- Sprog og tone: dansk, du-form, rolig og lun. Eksempler: knap "Drak vand"; nudge "Tid til et glas vand."; tom tilstand "Alle påmindelser er slået fra."; bekræftelse "Vand fyldt op."; nulstil "Slet gemte indstillinger?"
- Hosting og deploy: privat artefakt, ingen deploy.
- Data og roller: ingen login, ingen persondata sendt noget sted. Kun indstillinger i localStorage. Kamera er kun simuleret i prototypen.
- Særlige krav: ingen tracking, ingen tredjepartsfonte (alt selvhostet).

### Afvigelser fra standarden
- Skrifter og tegninger er inlinet som data-URI for at give én fil (performance-budget gælder websites, ikke denne prototype).
- Mørk og lys tilstand følger systemet; manuel skifter findes i kontrolpanelet, ikke i selve appen.
- Pixelfiguren er pynt og står altid ved siden af tekst; den er `aria-hidden`.
