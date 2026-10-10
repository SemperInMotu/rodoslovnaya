import { existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, absoluteUrl, localesFor, sourceRelPath } from '../lib/page-map.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function sourceFile(pageId, lang) {
  const rel = sourceRelPath(pageId, lang);
  if (lang === 'be') return resolve(root, 'be', rel);
  if (lang === 'ru') return resolve(root, 'ru', rel);
  return null;
}

function pageExists(pageId, lang) {
  if (lang === 'en') return localesFor(pageId).includes('en');
  const file = sourceFile(pageId, lang);
  return Boolean(file && existsSync(file));
}

function lastmod(pageId, lang) {
  const file = sourceFile(pageId, lang);
  if (!file || !existsSync(file)) return null;
  return statSync(file).mtime.toISOString().slice(0, 10);
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function urlEntry(pageId, lang) {
  const locales = localesFor(pageId).filter((code) => pageExists(pageId, code));
  const xDefault = locales.includes('en') ? 'en' : locales[0];
  const links = [
    ...locales.map(
      (code) =>
        `    <xhtml:link rel="alternate" hreflang="${code}" href="${escapeXml(absoluteUrl(pageId, code))}" />`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absoluteUrl(pageId, xDefault))}" />`,
  ];
  const lines = ['  <url>', `    <loc>${escapeXml(absoluteUrl(pageId, lang))}</loc>`];
  const modified = lastmod(pageId, lang);
  if (modified) lines.push(`    <lastmod>${modified}</lastmod>`);
  lines.push(...links, '  </url>');
  return lines.join('\n');
}

function wrap(entries) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
}

const skipped = [];
const entries = [];
for (const id of Object.keys(PAGES)) {
  for (const lang of ['be', 'ru']) {
    if (!localesFor(id).includes(lang)) continue;
    if (!pageExists(id, lang)) {
      skipped.push(`${lang}:${id}`);
      continue;
    }
    entries.push(urlEntry(id, lang));
  }
}

mkdirSync(resolve(root, 'public'), { recursive: true });
const xml = wrap(entries);
writeFileSync(resolve(root, 'public/sitemap.xml'), xml, 'utf8');
writeFileSync(resolve(root, 'public/sitemap-bel.xml'), xml, 'utf8');
console.log(`public/sitemap.xml — ${entries.length} BE+RU urls`);
if (skipped.length) console.log(`skipped (no source file): ${skipped.join(', ')}`);
