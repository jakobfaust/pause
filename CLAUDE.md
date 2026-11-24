# Pause – instrukser til Claude

Interaktiv browserprototype af Pause, en Mac-tamagotchi der i al hemmelighed minder dig om at passe på dig selv under skrivebordsarbejde. Prototypen er reference for den senere native app.

## Læs først
1. `PRODUCT.md` (formål, tone, Faust-standard og afvigelser)
2. `DESIGN.md` (farver, typografi, figur, bevægelse)
3. `docs/orch/BOARD.md` (status og næste skridt)

## Regler
- Dansk, du-form, korte konkrete tekster. Knapper er verber. Ingen emoji som UI.
- Faust-standarden gælder (hårde krav kan ikke lempes). Afvigelser står i `PRODUCT.md`.
- Aldrig deploy, betaling, mail til rigtige modtagere eller sletning af data/nøgler uden Jakobs eksplicitte ja.
- Aldrig hemmeligheder i repoet. Kør `secret-scan.sh` før hver push.
- Intet til `main` og intet offentligt uden Jakobs ja. Arbejd på grene (`pau/<område>-<opgave>`).
- Ingen tal/procenter på målere i UI. Figuren er pynt, aldrig eneste bærer af information.

## Kommandoer
- `npm run build` bygger `dist/index.html` (én selvstændig fil)
- `npm run lint` bygger og linter
- `npm test` kører røgtest i Chrome (`CHROME=/sti/til/chrome` hvis ikke `/usr/bin/google-chrome`)
- `npm run check` kører alt
- `python3 tools/sprites/assets.py` genererer `src/generated/assets.js` (pixelfigur, rum, ikon)

## Struktur
- `src/index.html`, `src/styles.css` – markup og stil
- `src/js/NN-*.js` – kode i sektioner, sammensat i rækkefølge til ét script af `tools/build.mjs`
- `tools/sprites/` – generator til figur og rum
- `assets/fonts/` – selvhostede WOFF2 (DM Sans, Instrument Serif)
- `docs/orch/` – BOARD, PLAN, DECISIONS, HANDOVER (resten ligger i `arkiv/`)
