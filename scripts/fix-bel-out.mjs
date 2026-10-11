import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = resolve(dirname(fileURLToPath(import.meta.url)), '../out');
const ruHtml = resolve(out, 'ru.html');
const ruIndex = resolve(out, 'ru/index.html');

if (existsSync(ruHtml)) {
  mkdirSync(dirname(ruIndex), { recursive: true });
  if (!existsSync(ruIndex)) {
    copyFileSync(ruHtml, ruIndex);
    console.log('fixed out/ru/index.html from out/ru.html');
  }
}

/* Prefer .bel sitemap + robots for bel deploy */
const belMap = resolve(out, 'sitemap-bel.xml');
const mainMap = resolve(out, 'sitemap.xml');
if (existsSync(belMap)) {
  writeFileSync(mainMap, readFileSync(belMap));
  console.log('out/sitemap.xml ← sitemap-bel.xml');
}

const belRobots = resolve(out, 'robots-bel.txt');
const robots = resolve(out, 'robots.txt');
if (existsSync(belRobots)) {
  writeFileSync(robots, readFileSync(belRobots));
  console.log('out/robots.txt ← robots-bel.txt');
}

/* RU default: / → /ru/; BE home lives at /be/ */
const rootIndex = resolve(out, 'index.html');
writeFileSync(
  rootIndex,
  `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0;url=/ru/" />
    <link rel="canonical" href="https://xn--80adf2alcbbnn3n.xn--90ais/ru/" />
    <title>Heritavia</title>
    <script>location.replace('/ru/');</script>
  </head>
  <body>
    <p><a href="/ru/">Продолжить</a></p>
  </body>
</html>
`,
  'utf8',
);
console.log('out/index.html → redirect /ru/');
