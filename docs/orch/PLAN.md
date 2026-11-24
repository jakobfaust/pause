# Plan: Pause

Opsat 2026-11-24 med web-new 2026-11-14.6. Formål: Interaktiv prototype af en Mac-tamagotchi, der i al hemmelighed er en selvpleje-reminder til skrivebordsarbejde. Skal være solid reference for den native app og kunne vises frem.

## Valg
- Modelpolitik: laveste egnede
- Feedbackniveau: stille
- Tidszone: Europe/Copenhagen

## Faser og porte
1. Opsætning og skelet
2. Adfærd og logik
3. Tilgængelighed
4. Figur og rum
5. Tekst, tone og kvalitet
6. Aflevering

Hver fase afsluttes med en port: lint og build grønne, stikprøver af børnenes påstande, og brugerens ja, hvis noget skal til `main`.

## Områder, model og fase
| Område | Model | Fase | Begrundelse |
|---|---|---|---|
| Opsætning | Sonnet | 1 | Mekanisk opsætning, build og selvhostede fonte |
| Adfærd og logik | Sonnet | 2 | Kanttilfælde og tilstandsmaskine |
| Tilgængelighed | Sonnet | 3 | Roller, tastatur, kontrast |
| Figur og rum | Opus | 4 | Pixelkunst kræver øjemål og omtanke |
| Tekst, tone og kvalitet | Sonnet | 5 | Copy, tilstande og uafhængig critique |

## Prisoverslag (relativt)
Udfyldes af Orkestratoren før go: antal sessioner pr. modelniveau og fase. Ingen opfundne tal.
