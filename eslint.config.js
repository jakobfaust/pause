import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules', 'dist/index.html', 'src/generated'] },
  js.configs.recommended,
  { files: ['dist/bundle.js'], languageOptions: { sourceType: 'script', globals: globals.browser }, rules: { 'no-empty': 'off', 'no-unused-vars': 'warn' } },
  { files: ['tools/**/*.mjs', 'tests/**/*.mjs', 'eslint.config.js'], languageOptions: { globals: { ...globals.node, ...globals.browser } } },
];
