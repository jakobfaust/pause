// Bygger src/ til én selvstændig HTML-fil (dist/index.html): CSS, JS, fonte og tegninger inlinet.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const r = (p) => readFileSync(join(root, p), 'utf8');
const b64 = (p) => readFileSync(join(root, p)).toString('base64');

export function assemble() {
  const parts = readdirSync(join(root, 'src/js')).filter((f) => f.endsWith('.js')).sort();
  const assets = r('src/generated/assets.js').replace(/export const /g, 'const ');
  const script = `(()=>{\n${assets}\n${parts.map((f) => r('src/js/' + f)).join('\n')}\n})();`;
  const css = r('src/styles.css')
    .replace('__FONT_DMSANS__', `data:font/woff2;base64,${b64('assets/fonts/dm-sans-latin-wght-normal.woff2')}`)
    .replace('__FONT_SERIF__', `data:font/woff2;base64,${b64('assets/fonts/instrument-serif-latin-400-normal.woff2')}`);
  return { script, css };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { script, css } = assemble();
  const min = process.argv.includes('--min') ? transformSync(script, { minify: true }).code : script;
  const html = r('src/index.html').replace('/*STYLES*/', () => css).replace('/*SCRIPT*/', () => min);
  mkdirSync(join(root, 'dist'), { recursive: true });
  writeFileSync(join(root, 'dist/index.html'), html);
  writeFileSync(join(root, 'dist/bundle.js'), script);
  console.log('dist/index.html', (html.length / 1024).toFixed(0), 'kB');
}
