import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rmSync, existsSync } from 'node:fs';

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = process.argv[2] === 'com' ? 'com' : 'bel';
const env = { ...process.env, SITE: target, NEXT_PUBLIC_SITE: target };
const node = process.execPath;
const nextBin = resolve(site, 'node_modules/next/dist/bin/next');

function run(args) {
  const r = spawnSync(node, args, { cwd: site, env, stdio: 'inherit' });
  if (r.status) process.exit(r.status ?? 1);
}

run([resolve(site, 'scripts/gen-sitemap.mjs')]);
run([resolve(site, 'scripts/write-legacy-redirects.mjs')]);
run([nextBin, 'build']);

if (target === 'bel') {
  run([resolve(site, 'scripts/fix-bel-out.mjs')]);
} else {
  const ru = resolve(site, 'out/ru');
  if (existsSync(ru)) {
    rmSync(ru, { recursive: true, force: true });
    console.log('removed out/ru from com build');
  }
}

console.log(`build done: SITE=${target}`);
