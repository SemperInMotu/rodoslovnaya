import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = process.argv[2] === 'com' ? 'com' : 'bel';
const env = { ...process.env, SITE: target, NEXT_PUBLIC_SITE: target };
const nextBin = resolve(site, 'node_modules/next/dist/bin/next');
const r = spawnSync(process.execPath, [nextBin, 'dev'], {
  cwd: site,
  env,
  stdio: 'inherit',
});
process.exit(r.status ?? 0);
