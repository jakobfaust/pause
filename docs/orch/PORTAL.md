# Projektportal: Pause

- Link: (udfyldes ved publicering)
- Artifact-slug: (udfyldes ved publicering)

## Skema
- `meta/project` kan have `orchestratorTakenOver` (UTC-tidspunkt, når en ny Orkestrator har overtaget).
- `meta/project`: `headline`, `summary`, `updatedAt`, `nextStep`, `phases`, `timeZone`, `locale`.
- `sessions/<id>`: `name`, `sessionId`, `status`, `summary`, `branch`, `model`, `parent`, `order`, `updatedAt`, `attention`, `archiveProposed`, `archived`.
- `tasks/<id>`: `title`, `detail`, `source`, `kind`, `done`, `urgent`, `createdAt`, `link`; beslutningsopgaver har `response: approve` og `recommended`, og svaret står i `outcome` (`approved`, `rejected`, `answered`) og `answer`.
- `questions/<id>`: `text`, `context`, `options` (`{id,label,why,recommended}`, to til fire, én anbefalet), `session`, `createdAt`, `status`, `answer` eller `closedReason`, `choice`, `chosenOption`, `resolvedBy`, `resolvedByName`, `resolvedAt`.
- `usage/<id>`: `session`, `task`, `phase`, `model`, `inputTokens`, `outputTokens`, `totalTokens`, `open`, `cacheReadTokens`, `cacheWriteTokens`, `contextTokens`, `turns`, `cost`, `costCurrency`, `measured`, `source`, `startedAt`, `endedAt`, `recordedAt`.

## Regler
- Sessioner skriver status ved start og afslutning. Alt, der kræver brugeren, lægges som opgave eller spørgsmål.
- Orkestratoren læser svar, afkrydsninger og arkiveringer ved hver kørsel.
- Tidspunkter er UTC med Z fra uret.
- Forbrug skrives kun, når værktøjerne oplyser det. Er det ikke oplyst, skrives `measured: false`.
