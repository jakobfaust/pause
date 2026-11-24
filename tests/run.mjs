// Røgtest: åbner den byggede side, tjekker at den starter uden konsolfejl, og at kernen virker.
import { chromium } from 'playwright-core';
import { pathToFileURL } from 'node:url';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'index.html');
const exe = process.env.CHROME || '/usr/bin/google-chrome';
const b = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 1280, height: 960 } });
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await p.goto(pathToFileURL(file).href);
let fail = 0;
const ok = (c, m) => { if (!c) { fail++; console.log('FEJL:', m); } else console.log('ok  ', m); };
ok(errs.length === 0, 'ingen konsolfejl ' + errs.join('|'));
ok(await p.evaluate(() => document.fonts.check('16px "DM Sans"')), 'DM Sans er selvhostet og indlæst');
await p.keyboard.press('Control+Alt+Space');
ok(await p.locator('#card').evaluate((e) => !e.hasAttribute('inert')), 'genvej åbner kortet');
await p.keyboard.press('Escape');
ok(await p.locator('#card').evaluate((e) => e.hasAttribute('inert')), 'Esc lukker kortet');

// Adfærd: indstillinger kan nås fra en påmindelse uden at blive overskrevet
await p.keyboard.press('Control+Alt+Space');
await p.evaluate(() => { const S = window.__S; S.m.water = 5; });
await p.waitForFunction(() => window.__S.nudge && window.__S.view === 'nudge', null, { timeout: 4000 });
await p.click('#btnSet');
ok(await p.evaluate(() => window.__S.view === 'settings'), 'indstillinger forbliver åbne under en påmindelse');
await p.locator('[data-v=settings] [data-back]').first().click();
ok(await p.evaluate(() => window.__S.view === 'nudge'), 'tilbage fører til den ventende påmindelse');
// Udsæt påmindelse
await p.click('#nLater');
ok(await p.evaluate(() => window.__S.nudge === null && window.__S.snooze.water > window.__S.vt), 'Senere udsætter påmindelsen');
// Hoppe en øvelse over udsætter også
await p.evaluate(() => { window.__S.m.eyes = 5; window.__S.snooze.eyes = 0; });
await p.waitForFunction(() => window.__S.nudge && window.__S.nudge.kind === 'eyes', null, { timeout: 4000 });
await p.click('#nGo');
await p.click('#eSkip');
ok(await p.evaluate(() => window.__S.snooze.eyes > window.__S.vt), 'Spring over udsætter øjenpåmindelsen');
// Tast-gentagelse tæller ikke som hård skrivning
await p.evaluate(() => { window.__S.keys = []; });
await p.focus('#doc');
await p.keyboard.down('a'); await p.waitForTimeout(600); await p.keyboard.up('a');
ok(await p.evaluate(() => window.__S.keys.length <= 1), 'tast holdt nede tæller kun én gang');
// Ødelagte gemte data giver ikke NaN-placering
await p.evaluate(() => localStorage.setItem('pause-proto-v1', JSON.stringify({ pos: { x: 'a', y: null }, edge: 'x' })));
await p.reload();
ok(await p.evaluate(() => Number.isFinite(window.__S.pos.x) && window.__S.edge === 'top'), 'ødelagte gemte data ignoreres');
ok(errs.length === 0, 'stadig ingen konsolfejl ' + errs.join('|'));
await b.close();
process.exit(fail ? 1 : 0);
