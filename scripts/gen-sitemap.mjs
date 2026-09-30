import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, absoluteUrl, alternatesFor, localesFor } from '../lib/page-map.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function urlEntry(loc, pageId, priority) {
  const alts = alternatesFor(pageId)
    .map((a) => `      <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
    .join('\n');
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    alts,
    `    <changefreq>monthly</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
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

const enEntries = Object.keys(PAGES)
  .filter((id) => localesFor(id).includes('en'))
  .map((id) => urlEntry(absoluteUrl(id, 'en'), id, id === 'home' ? '1.0' : '0.7'));
writeFileSync(resolve(root, 'public/sitemap.xml'), wrap(enEntries), 'utf8');
console.log(`public/sitemap.xml — ${enEntries.length} EN urls`);

const belEntries = [];
for (const id of Object.keys(PAGES)) {
  const locales = localesFor(id);
  const priority = id === 'home' ? '1.0' : '0.7';
  if (locales.includes('be')) belEntries.push(urlEntry(absoluteUrl(id, 'be'), id, priority));
  if (locales.includes('ru')) belEntries.push(urlEntry(absoluteUrl(id, 'ru'), id, priority));
}
mkdirSync(resolve(root, 'public'), { recursive: true });
writeFileSync(resolve(root, 'public/sitemap-bel.xml'), wrap(belEntries), 'utf8');
console.log(`public/sitemap-bel.xml — ${belEntries.length} RU+BE urls`);
