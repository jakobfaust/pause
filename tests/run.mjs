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
await b.close();
process.exit(fail ? 1 : 0);
