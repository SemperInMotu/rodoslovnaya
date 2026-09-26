/**
 * One-shot migration: flat *.html → directory URLs per lib/page-map.js
 * Run: node scripts/migrate-slugs.mjs
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  PAGES,
  LEGACY_TO_ID,
  pathFor,
  absoluteUrl,
  alternateLinkTags,
  sourceRelPath,
  enRelPath,
} from '../lib/page-map.js';

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function ensureDir(filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
}

function redirectHtml(target, lang = 'en') {
  const label = lang === 'ru' ? 'Продолжить' : lang === 'be' ? 'Працягнуць' : 'Continue';
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0;url=${target}" />
    <link rel="canonical" href="${target.startsWith('http') ? target : `https://heritavia.com${target}`}" />
    <title>Redirect…</title>
    <script>location.replace('${target}');</script>
  </head>
  <body>
    <p><a href="${target}">${label}</a></p>
  </body>
</html>
`;
}

/** Rewrite legacy hrefs to new paths for a given language */
function rewriteLinks(html, lang) {
  let out = html;
  /* longest legacy names first */
  const legacyFiles = Object.keys(LEGACY_TO_ID).sort((a, b) => b.length - a.length);
  for (const legacy of legacyFiles) {
    const id = LEGACY_TO_ID[legacy];
    const next = pathFor(id, lang);
    const re = new RegExp(`(href=["'])/?${legacy.replace('.', '\\.')}(["'])`, 'gi');
    out = out.replace(re, `$1${next}$2`);
    /* absolute com/bel URLs with legacy filenames */
    out = out.replaceAll(`heritavia.com/${legacy}`, `heritavia.com${pathFor(id, 'en')}`);
    out = out.replaceAll(`heritavia.com/ru/${legacy}`, `heritavia.com${pathFor(id, 'ru')}`.replace('heritavia.com', 'xn--80adf2alcbbnn3n.xn--90ais'));
  }
  /* formsubmit _next */
  out = out.replace(
    /(_next" value="https:\/\/heritavia\.com\/)start\.html(\?sent=1")/g,
    `$1contact/start/$2`,
  );
  out = out.replace(
    /(_next" value="https:\/\/[^"]+\/)(?:ru\/)?start\.html(\?sent=1")/g,
    (_, a, b) => {
      if (lang === 'ru') return `${a}ru/kontakty/start/${b}`;
      if (lang === 'be') return `${a}kantakty/start/${b}`;
      return `${a}contact/start/${b}`;
    },
  );
  return out;
}

function setHead(html, pageId, lang) {
  const canonical = absoluteUrl(pageId, lang);
  const alts = alternateLinkTags(pageId);
  let out = html;
  out = out.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${canonical}$2`);
  out = out.replace(/(property="og:url"\s+content=")[^"]*(")/i, `$1${canonical}$2`);
  /* replace all alternate links block */
  out = out.replace(
    /(?:\s*<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="[^"]*"\s*\/?>)+/gi,
    `\n    ${alts}`,
  );
  return out;
}

function legacySrc(lang, pageId) {
  const legacy = PAGES[pageId].legacy;
  if (pageId === 'home') {
    if (lang === 'en') return resolve(site, 'index.html');
    if (lang === 'ru') return resolve(site, 'ru/index.html');
    return resolve(site, 'be/index.html');
  }
  if (lang === 'en') return resolve(site, legacy);
  if (lang === 'ru') return resolve(site, 'ru', legacy);
  return resolve(site, 'be', legacy);
}

function destPath(lang, pageId) {
  if (lang === 'en') return resolve(site, enRelPath(pageId));
  if (lang === 'ru') return resolve(site, 'ru', sourceRelPath(pageId, 'ru'));
  return resolve(site, 'be', sourceRelPath(pageId, 'be'));
}

function migrateLocale(lang) {
  for (const [pageId, page] of Object.entries(PAGES)) {
    const src = legacySrc(lang, pageId);
    if (!existsSync(src)) {
      console.warn('skip missing', lang, pageId, src);
      continue;
    }
    let html = readFileSync(src, 'utf8');
    /* skip if already a redirect stub when migrating home from wrong place */
    if (html.includes('http-equiv="refresh"') && pageId !== 'home' && src.endsWith(page.legacy || '')) {
      /* might be reading stub — try finding content elsewhere */
    }
    if (html.includes('http-equiv="refresh"') && html.length < 600 && pageId !== 'home') {
      console.warn('skip redirect stub as source', src);
      continue;
    }

    html = rewriteLinks(html, lang);
    html = setHead(html, pageId, lang);

    const dest = destPath(lang, pageId);
    ensureDir(dest);

    /* home stays at index.html — same path for en */
    if (pageId === 'home') {
      writeFileSync(dest, html, 'utf8');
      console.log('home', lang, dest);
      continue;
    }

    /* if dest === src (shouldn't for non-home), just write */
    if (resolve(dest) === resolve(src)) {
      writeFileSync(dest, html, 'utf8');
      continue;
    }

    writeFileSync(dest, html, 'utf8');
    console.log('moved', lang, pageId, '→', dest);

    /* write redirect at legacy location */
    const target = pathFor(pageId, lang);
    const absCanonical =
      lang === 'en' ? absoluteUrl(pageId, 'en') : absoluteUrl(pageId, lang);
    const stub = redirectHtml(lang === 'en' ? target : target, lang).replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${absCanonical}" />`,
    );
    writeFileSync(src, stub, 'utf8');
    console.log('stub', src, '→', target);
  }
}

function updateEnRedirects() {
  const enDir = resolve(site, 'en');
  for (const [legacy, id] of Object.entries(LEGACY_TO_ID)) {
    const target = pathFor(id, 'en');
    const file = resolve(enDir, legacy);
    writeFileSync(file, redirectHtml(target, 'en'), 'utf8');
    console.log('en stub', legacy, '→', target);
  }
  writeFileSync(resolve(enDir, 'index.html'), redirectHtml('/', 'en'), 'utf8');
}

migrateLocale('en');
migrateLocale('ru');
migrateLocale('be');
updateEnRedirects();
console.log('migrate-slugs done');
