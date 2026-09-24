import { defineConfig } from 'vite';
import { readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './scripts/sync-rodoslovnaya.mjs';

const site = dirname(fileURLToPath(import.meta.url));
const root = resolve(site, 'rodoslovnaya');

function htmlInputs(dir, prefix = '') {
  const inputs = {};
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.html') || name.startsWith('_')) continue;
    const key = `${prefix}${name.replace(/\.html$/, '')}`.replace(/\//g, '-');
    inputs[key] = resolve(dir, name);
  }
  return inputs;
}

export default defineConfig({
  root,
  build: {
    outDir: resolve(root, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        ...htmlInputs(root),
        ...htmlInputs(resolve(root, 'ru'), 'ru-'),
      },
    },
  },
});
