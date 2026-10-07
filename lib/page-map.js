import { BEL_ORIGIN, COM_ORIGIN } from './hosts.js';

/**
 * родословная.бел = BE at /, RU at /ru/. No EN pages.
 * EN language switch goes to heritavia.com.
 * hreflang en + x-default only on truly parallel pages (about, contact, order).
 */
export const PAGES = {
  home: {
    ru: '/ru/',
    be: '/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  onboarding: {
    ru: '/ru/s-chego-nachat/',
    be: '/z-chago-pachac/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  sources: {
    ru: '/ru/istochniki/',
    be: '/krynicy/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  'src-metrics': {
    ru: '/ru/istochniki/metricheskie-knigi/',
    be: '/krynicy/metrychnyja-knihi/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  'src-reviz': {
    ru: '/ru/istochniki/revizskie-skazki/',
    be: '/krynicy/revizskija-kazki/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  'src-conf': {
    ru: '/ru/istochniki/ispovednye-rospisi/',
    be: '/krynicy/spavedzi/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  'src-zags': {
    ru: '/ru/istochniki/zags/',
    be: '/krynicy/zags/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  'src-archives': {
    ru: '/ru/istochniki/arhivy/',
    be: '/krynicy/archivy/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  'src-dna': {
    ru: '/ru/istochniki/dnk/',
    be: '/krynicy/dnk/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  method: {
    ru: '/ru/metod/',
    be: '/metad/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  research: {
    ru: '/ru/poisk-predkov/',
    be: '/poshuk-prodkau/',
    enSwitch: '/',
    legacy: 'research.html',
    locales: ['ru', 'be'],
    noindex: true,
  },
  report: {
    ru: '/ru/otchet/',
    be: '/spravazdacha/',
    enSwitch: '/',
    legacy: 'report.html',
    locales: ['ru', 'be'],
  },
  about: {
    en: '/about/',
    ru: '/ru/o-proekte/',
    be: '/pra-praekt/',
    legacy: 'about.html',
    locales: ['en', 'ru', 'be'],
  },
  blog: {
    ru: '/ru/blog/',
    be: '/blog/',
    enSwitch: '/',
    legacy: 'blog.html',
    locales: ['ru', 'be'],
  },
  contacts: {
    en: '/contact/',
    ru: '/ru/kontakty/',
    be: '/kantakty/',
    legacy: 'contacts.html',
    locales: ['en', 'ru', 'be'],
  },
  order: {
    en: '/contact/start/',
    ru: '/ru/zakaz/',
    be: '/zamova/',
    legacy: null,
    locales: ['en', 'ru', 'be'],
  },
  start: {
    ru: '/ru/kontakty/start/',
    be: '/kantakty/start/',
    enSwitch: '/contact/',
    legacy: 'start.html',
    locales: ['ru', 'be'],
    noindex: true,
  },
  sitemap: {
    ru: '/ru/karta-sajta/',
    be: '/mapa-sajtu/',
    enSwitch: '/',
    legacy: 'sitemap.html',
    locales: ['ru', 'be'],
  },
  'blog-metrics': {
    ru: '/ru/blog/metrics-missing/',
    be: '/blog/metrics-missing/',
    enSwitch: '/',
    legacy: 'blog-metrics-missing.html',
    locales: ['ru', 'be'],
  },
  'blog-pokh': {
    ru: '/ru/blog/pokhozyaystvennye-knigi/',
    be: '/blog/pakhaaspadarchyja-knigi/',
    enSwitch: '/',
    legacy: 'blog-pokhozyaystvennye-knigi.html',
    locales: ['ru', 'be'],
  },
  'forma-1': {
    ru: '/ru/blog/forma-1/',
    be: '/blog/forma-1/',
    enSwitch: '/',
    legacy: 'forma-1-pasport-sssr-genealogy.html',
    locales: ['ru', 'be'],
  },
  gedmatch: {
    ru: '/ru/blog/gedmatch/',
    be: '/blog/gedmatch/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  'gedmatch-file': {
    ru: '/ru/blog/gedmatch/syroy-fayl/',
    be: '/blog/gedmatch/syroy-fajl/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  'gedmatch-profile': {
    ru: '/ru/blog/gedmatch/profil/',
    be: '/blog/gedmatch/profil/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  'gedmatch-projects': {
    ru: '/ru/blog/gedmatch/ancestor-projects/',
    be: '/blog/gedmatch/ancestor-projects/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  'gedmatch-choose': {
    ru: '/ru/blog/gedmatch/vybor-proekta/',
    be: '/blog/gedmatch/vybar-praekta/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  'gedmatch-matches': {
    ru: '/ru/blog/gedmatch/sovpadeniya/',
    be: '/blog/gedmatch/supadzenni/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
  'gedmatch-belarus': {
    ru: '/ru/blog/gedmatch/belarus/',
    be: '/blog/gedmatch/belarus/',
    enSwitch: '/',
    legacy: null,
    locales: ['ru', 'be'],
  },
};

export function localesFor(pageId) {
  const page = PAGES[pageId];
  if (!page) return ['ru', 'be'];
  return page.locales || ['ru', 'be'];
}

/** legacy filename → page id */
export const LEGACY_TO_ID = Object.fromEntries(
  Object.entries(PAGES)
    .filter(([, p]) => p.legacy)
    .map(([id, p]) => [p.legacy, id]),
);

/** Primary DIY navigation. Soft order is a bridge, not a nav item. */
export const NAV_IDS = ['onboarding', 'sources', 'method', 'about', 'contacts'];

export function pathFor(pageId, lang) {
  const page = PAGES[pageId];
  if (!page) return lang === 'ru' ? '/ru/' : '/';
  if (page[lang]) return page[lang];
  if (lang === 'en') return page.enSwitch || '/';
  return page.be || '/';
}

export function absoluteUrl(pageId, lang) {
  const path = pathFor(pageId, lang);
  if (lang === 'en') return `${COM_ORIGIN}${path === '/' ? '/' : path}`;
  return `${BEL_ORIGIN}${path}`;
}

/** Language-switch target. EN always leaves for heritavia.com. */
export function switchHref(pageId, lang, locale) {
  if (lang === locale) return pathFor(pageId, locale);
  if (lang === 'en') {
    const page = PAGES[pageId];
    const parallel = page && localesFor(pageId).includes('en') && page.en;
    const path = parallel ? page.en : page?.enSwitch || '/';
    return path === '/' ? `${COM_ORIGIN}/` : `${COM_ORIGIN}${path}`;
  }
  return absoluteUrl(pageId, lang);
}

/**
 * Resolve page id from a pathname (with or without host locale prefix).
 * On .bel, /ru/... → ru; otherwise be. On .com → en.
 */
export function pageIdFromPath(pathname, langHint = null) {
  const raw = (pathname || '/').replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  let path = raw.endsWith('/') || raw === '' ? raw || '/' : `${raw}/`;
  if (!path.startsWith('/')) path = `/${path}`;

  let lang = langHint;
  if (!lang) {
    if (path === '/ru' || path.startsWith('/ru/')) lang = 'ru';
    else lang = null;
  }

  const candidates = Object.entries(PAGES);
  for (const [id, page] of candidates) {
    for (const L of ['en', 'ru', 'be']) {
      if (page[L] === path) return { id, lang: L };
    }
  }

  const legacyName = raw.split('/').filter(Boolean).pop();
  if (legacyName && LEGACY_TO_ID[`${legacyName}.html`]) {
    return { id: LEGACY_TO_ID[`${legacyName}.html`], lang: lang || 'be' };
  }

  if (path === '/' || path === '/ru/') return { id: 'home', lang: path.startsWith('/ru') ? 'ru' : lang || 'be' };
  return null;
}

export function alternatesFor(pageId) {
  const page = PAGES[pageId];
  if (!page) return [];
  const locales = localesFor(pageId);
  const links = locales.map((lang) => ({ hreflang: lang, href: absoluteUrl(pageId, lang) }));
  if (locales.includes('en')) {
    links.push({ hreflang: 'x-default', href: absoluteUrl(pageId, 'en') });
  }
  return links;
}

export function alternateLinkTags(pageId) {
  return alternatesFor(pageId)
    .map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
    .join('\n    ');
}

/** Relative path of index.html under locale source tree (no leading slash). */
export function sourceRelPath(pageId, lang) {
  const path = pathFor(pageId, lang);
  if (lang === 'ru') {
    const rest = path.replace(/^\/ru\/?/, '');
    if (!rest) return 'index.html';
    return `${rest.replace(/\/$/, '')}/index.html`;
  }
  if (lang === 'en') {
    if (!PAGES[pageId]?.en) return null;
  }
  if (path === '/') return 'index.html';
  return `${path.replace(/^\//, '').replace(/\/$/, '')}/index.html`;
}

/** Vite/Next input path for EN content at site root */
export function enRelPath(pageId) {
  return sourceRelPath(pageId, 'en');
}

export function legacyRedirectTarget(legacyFile, lang) {
  const id = LEGACY_TO_ID[legacyFile];
  if (!id) return null;
  return pathFor(id, lang);
}

export { BEL_ORIGIN, COM_ORIGIN };
