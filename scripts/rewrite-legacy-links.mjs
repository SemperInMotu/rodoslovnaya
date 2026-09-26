import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { LEGACY_TO_ID, pathFor } from '../lib/page-map.js';

function rewrite(html, lang) {
  let out = html;
  const legacyFiles = Object.keys(LEGACY_TO_ID).sort((a, b) => b.length - a.length);
  for (const legacy of legacyFiles) {
    const id = LEGACY_TO_ID[legacy];
    const next = pathFor(id, lang);
    const esc = legacy.replace('.', '\\.');
    out = out.replace(new RegExp(`(href=["'])/?${esc}(["'])`, 'gi'), `$1${next}$2`);
    out = out.replace(new RegExp(`(href=["'])/be/${esc}(["'])`, 'gi'), `$1${pathFor(id, 'be')}$2`);
    out = out.replace(new RegExp(`(href=["'])/ru/${esc}(["'])`, 'gi'), `$1${pathFor(id, 'ru')}$2`);
    out = out.replace(new RegExp(`(href=["'])/en/${esc}(["'])`, 'gi'), `$1${pathFor(id, 'en')}$2`);
  }
  return out;
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('_') || name === 'node_modules' || name === 'out' || name === '.next') continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (name === 'index.html') acc.push(full);
  }
  return acc;
}

const jobs = [
  ...walk('be').map((f) => [f, 'be']),
  ...walk('ru').map((f) => [f, 'ru']),
  ...walk('.').filter((f) => !f.startsWith('be\\') && !f.startsWith('ru\\') && !f.startsWith('be/') && !f.startsWith('ru/') && !f.includes('public') && !f.includes('app') && !f.includes('en\\') && !f.includes('en/')).map((f) => [f, 'en']),
];

/* EN roots only: index + section trees */
const enFiles = [
  'index.html',
  ...walk('research'),
  ...walk('report'),
  ...walk('about'),
  ...walk('blog'),
  ...walk('contact'),
  ...walk('sitemap'),
].filter((f, i, a) => a.indexOf(f) === i);

for (const file of enFiles) {
  try {
    let html = readFileSync(file, 'utf8');
    if (html.includes('http-equiv="refresh"') && html.length < 800) continue;
    const next = rewrite(html, 'en');
    if (next !== html) {
      writeFileSync(file, next);
      console.log('en', file);
    }
  } catch {
    /* missing */
  }
}

for (const [file, lang] of [...walk('be').map((f) => [f, 'be']), ...walk('ru').map((f) => [f, 'ru'])]) {
  let html = readFileSync(file, 'utf8');
  if (html.includes('http-equiv="refresh"') && html.length < 800) continue;
  const next = rewrite(html, lang);
  if (next !== html) {
    writeFileSync(file, next);
    console.log(lang, file);
  }
}

console.log('rewrite-links done');
