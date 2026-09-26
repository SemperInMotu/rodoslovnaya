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
