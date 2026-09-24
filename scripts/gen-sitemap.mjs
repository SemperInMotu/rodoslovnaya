import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const COM = 'https://heritavia.com';
const BEL = 'https://xn--80adf2alcbbnn3n.xn--90ais';

const pages = [
  '',
  'research.html',
  'report.html',
  'about.html',
  'blog.html',
  'blog-metrics-missing.html',
  'blog-pokhozyaystvennye-knigi.html',
  'forma-1-pasport-sssr-genealogy.html',
  'sitemap.html',
  'contacts.html',
  'start.html',
];

const url = (lang, page) => {
  const path = page ? `/${page}` : '/';
  if (lang === 'en') return `${COM}${path}`;
  if (lang === 'ru') return page ? `${BEL}/ru${path}` : `${BEL}/ru/`;
  return `${BEL}${path}`;
};

const entries = pages.map((page) => {
  const alternates = [
    `      <xhtml:link rel="alternate" hreflang="en" href="${url('en', page)}" />`,
    `      <xhtml:link rel="alternate" hreflang="ru" href="${url('ru', page)}" />`,
    `      <xhtml:link rel="alternate" hreflang="be" href="${url('be', page)}" />`,
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', page)}" />`,
  ].join('\n');
  return [
    '  <url>',
    `    <loc>${url('en', page)}</loc>`,
    alternates,
    `    <changefreq>monthly</changefreq>`,
    `    <priority>${page === '' ? '1.0' : '0.7'}</priority>`,
    '  </url>',
  ].join('\n');
});

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...entries,
  '</urlset>',
  '',
].join('\n');

writeFileSync(resolve(root, 'public/sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml — ${entries.length} urls`);
