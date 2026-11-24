# Ejerskab

Hver fil har én ejer ad gangen. Styringsfilerne (`BOARD`, `PROTOCOL`, `MERGE_QUEUE`, `SESSIONS`, `STATE`) ejes af Orkestratoren. Ved konflikt vinder Orkestratorens version.

| Område | Filer (ejer) | Fase |
|---|---|---|
| Opsætning | `package.json`, `tools/build.mjs`, `src/index.html`, `assets/fonts/**`, `docs/**`, `CLAUDE.md`, `PRODUCT.md`, `DESIGN.md` | 1 |
| Adfærd og logik | `src/js/**` | 2 |
| Tilgængelighed | `src/styles.css`, `src/index.html` | 3 |
| Figur og rum | `tools/sprites/**`, `src/generated/**` | 4 |
| Tekst, tone og kvalitet | `src/js/data.js`, `tests/**` | 5 |
