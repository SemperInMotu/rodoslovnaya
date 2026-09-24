import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { BEL_ORIGIN, COM_ORIGIN } from './hosts.js';

const ROOT = process.cwd();

const CURRENT = {
  index: 'home',
  research: 'research',
  report: 'report',
  about: 'about',
  blog: 'blog',
  'blog-metrics-missing': 'blog',
  'blog-pokhozyaystvennye-knigi': 'blog',
  'forma-1-pasport-sssr-genealogy': 'blog',
  sitemap: 'sitemap',
  contacts: 'contacts',
  start: 'start',
};

export function fileFromSlug(slug) {
  if (!slug?.length) return 'index.html';
  if (slug.length !== 1) return null;
  const name = slug[0].replace(/\.html$/, '');
  if (!CURRENT[name] && name !== 'index') return null;
  return `${name}.html`;
}

function sourcePath(locale, file) {
  if (locale === 'be') return resolve(ROOT, 'be', file);
  if (locale === 'en') return resolve(ROOT, 'en', file);
  return resolve(ROOT, 'ru', file);
}

export function listPages(locale) {
  const dir = locale === 'be' ? resolve(ROOT, 'be') : resolve(ROOT, 'ru');
  return readdirSync(dir).filter((name) => name.endsWith('.html') && !name.startsWith('_'));
}

function rewrite(html, locale) {
  if (locale === 'be') {
    return html
      .replaceAll('href="/be/', 'href="/')
      .replaceAll('href="/en/', `href="${COM_ORIGIN}/`)
      .replaceAll('href="/ru/', 'href="/ru/');
  }
  if (locale === 'ru') {
    return html
      .replaceAll('href="/be/', 'href="/')
      .replaceAll('href="/en/', `href="${COM_ORIGIN}/`)
      .replaceAll('href="/ru/', 'href="__RU__/')
      .replace(/href="\/(?!assets\/)/g, 'href="/ru/')
      .replaceAll('href="__RU__/', 'href="/ru/');
  }
  return html
    .replaceAll('href="/en/', 'href="/')
    .replaceAll('href="/be/', `href="${BEL_ORIGIN}/`)
    .replaceAll('href="/ru/', `href="${BEL_ORIGIN}/ru/`);
}

export function loadPage(locale, slug) {
  const file = fileFromSlug(slug);
  if (!file) return null;
  const path = sourcePath(locale, file);
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, 'utf8');
  const title = raw.match(/<title>([^<]*)<\/title>/)?.[1] ?? 'Heritavia';
  const description = raw.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const main = raw.match(/<main>([\s\S]*?)<\/main>/)?.[1];
  if (!main) return null;
  const key = file.replace(/\.html$/, '');
  return {
    title,
    description,
    html: rewrite(main, locale),
    current: CURRENT[key] || '',
    file,
  };
}
