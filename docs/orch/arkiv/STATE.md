# Tilstand (til genstart af Orkestratoren)

Opdateres ved hver port og ved hver større ændring. En ny Orkestrator læser kun denne fil, `PLAN.md` og `SESSIONS.md`, før den tager over.

- Sidst opdateret (UTC): 
- Aktuel fase: 
- Aktive sessioner: se `SESSIONS.md`
- Åbne beslutninger hos brugeren: 
- Næste handlinger: 
- Sidst verificeret (hvad og hvornår, UTC): 
- Kendte risici: 

## Genstartsprompt (til ny Orkestrator-session)
Skrives af den gamle Orkestrator ved hver port og sendes som første besked til den nye (se `references/orchestration.md`, "Overdragelse til ny Orkestrator"). Skabelon, som udfyldes:

> Du er ny Orkestrator for Pause. Læs `docs/orch/STATE.md`, `PLAN.md` og `SESSIONS.md` og web-new-skillens `references/orchestration.md`. Verificér tilstanden med `get_session`. Skriv `meta/project.orchestratorTakenOver` (tidspunkt i UTC fra uret) i portalen for at melde, at du har overtaget; send også en besked til den gamle Orkestrator (id: ___). Fortsæt derefter fra "Næste handlinger" i `STATE.md`. Læs ikke mere, end du skal.
