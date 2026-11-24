# Plan: native proof of concept (Mac)

Mål: bevise de svære dele af Pause som rigtig Mac-app, ikke bygge hele produktet. Resten er allerede vist i prototypen.

## Skal kunne
1. Menulinjeikon (monokromt skabelon-ikon); klik åbner og skjuler figuren.
2. Gennemsigtigt, rammeløst panel der glider ind fra ikonet og ud mod nærmeste kant.
3. Stjæler aldrig tastaturfokus fra den app, du arbejder i.
4. Kan trækkes; position huskes pr. skærm og klampes til en synlig skærm.
5. Følger med mellem Spaces og kan komme frem over fuldskærmsapps.
6. Genvej Control+Option+Mellemrum; Esc skjuler.
7. Én måler (vand) og én øvelse (skuldre) med figuren fra prototypen.
8. Respekterer "Reducer bevægelse".

## Teknik
SwiftUI plus AppKit: NSStatusItem, ikke-aktiverende NSPanel på flydende niveau, collectionBehavior canJoinAllSpaces + fullScreenAuxiliary. Genvej via KeyboardShortcuts. Figuren genbruges som pixel-sprites fra `tools/sprites/`.

## Trin
1. Tomt Xcode-projekt, menulinjeikon og panel der åbner og lukker.
2. Glid ind og ud, træk og position pr. skærm.
3. Spaces, fuldskærm og genvej (mest usikre; test tidligt).
4. Figur, vandmåler, nudge og øvelse.
5. Test på rigtig Mac: to skærme, fuldskærm, mørk tilstand, reduceret bevægelse.

## Færdig når
Alle otte punkter virker på din Mac, og du har prøvet den en hel arbejdsdag.

## Før start
Kræver Xcode på en Mac (denne session kan ikke køre Xcode). Beslut: eget repo (fx `jakobfaust/pause-mac`) eller en mappe i dette repo.
