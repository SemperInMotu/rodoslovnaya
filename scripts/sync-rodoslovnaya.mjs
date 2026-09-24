import { readdirSync, readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(site, 'rodoslovnaya');
const BEL = 'https://xn--80adf2alcbbnn3n.xn--90ais';
const COM = 'https://heritavia.com';
const ORIGIN = 'https://heritavia.vitalykhoruzhko.com';

const pages = [
  'index.html',
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

cpSync(resolve(site, 'src/styles/main.css'), resolve(root, 'src/styles/main.css'), { force: true });
cpSync(resolve(site, 'public/assets'), resolve(root, 'public/assets'), { recursive: true, force: true });
mkdirSync(resolve(root, 'ru'), { recursive: true });

function mount(html) {
  return html.replace(
    /import \{ mountChrome \} from '\/src\/site\.js';\s*mountChrome\(\{ current: '(\w+)' \}\);/,
    "import { mountBel } from '/src/bel.js';\n      mountBel({ current: '$1' });",
  );
}

function setCanonical(html, url) {
  return html
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${url}$2`)
    .replace(/(property="og:url"\s+content=")[^"]*(")/i, `$1${url}$2`);
}

function enHrefFromPage(name) {
  return name === 'index.html' ? `${COM}/` : `${COM}/${name}`;
}

function setAlternates(html, name) {
  const en = enHrefFromPage(name);
  const ru = name === 'index.html' ? `${BEL}/ru/` : `${BEL}/ru/${name}`;
  const be = name === 'index.html' ? `${BEL}/` : `${BEL}/${name}`;
  return html.replace(
    /<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="[^"]*"\s*\/?>/gi,
    (full, hl) => {
      const map = { en, ru, be, 'x-default': en };
      const href = map[hl.toLowerCase()];
      if (!href) return full;
      return `<link rel="alternate" hreflang="${hl}" href="${href}" />`;
    },
  );
}

/* BE root pages from site/be */
for (const name of readdirSync(resolve(site, 'be'))) {
  if (!name.endsWith('.html') || name.startsWith('_')) continue;
  let html = readFileSync(resolve(site, 'be', name), 'utf8');
  html = html.replaceAll(ORIGIN, COM);
  html = setAlternates(html, name);
  html = setCanonical(html, name === 'index.html' ? `${BEL}/` : `${BEL}/${name}`);
  html = html.replaceAll('href="/be/', 'href="/');
  html = html.replaceAll('href="/en/', `href="${COM}/`);
  html = html.replaceAll(`href="${COM}/en/`, `href="${COM}/`);
  html = mount(html);
  writeFileSync(resolve(root, name), html);
}

/* RU pages from site/ru (English is now at heritavia.com root) */
for (const name of pages) {
  const src = resolve(site, 'ru', name);
  if (!existsSync(src)) continue;
  let html = readFileSync(src, 'utf8');
  html = html.replaceAll(ORIGIN, COM);
  html = setAlternates(html, name);
  html = setCanonical(html, name === 'index.html' ? `${BEL}/ru/` : `${BEL}/ru/${name}`);
  html = html.replaceAll('href="/en/', `href="${COM}/`);
  html = html.replaceAll(`href="${COM}/en/`, `href="${COM}/`);
  html = mount(html);
  writeFileSync(resolve(root, 'ru', name), html);
}

console.log('rodoslovnaya: be + ru synced from site/be and site/ru');
