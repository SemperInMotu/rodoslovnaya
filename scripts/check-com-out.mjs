import { readFileSync, existsSync } from 'node:fs';
import { absoluteUrl, pathFor } from '../lib/page-map.js';

console.log('page-map EN home', pathFor('home', 'en'));
console.log('page-map RU research', absoluteUrl('research', 'ru'));
console.log('page-map BE research', absoluteUrl('research', 'be'));

for (const f of ['out/index.html', 'out/research/index.html', 'out/poshuk-prodkau/index.html']) {
  if (!existsSync(f)) {
    console.log('MISS', f);
    continue;
  }
  const h = readFileSync(f, 'utf8');
  const lang = h.match(/<html[^>]*lang="([^"]+)/)?.[1];
  const title = h.match(/<title>([^<]+)/)?.[1];
  const can = h.match(/rel="canonical"[^>]*href="([^"]+)/)?.[1];
  const hasRuNav = /href="https:\/\/xn--80adf2alcbbnn3n\.xn--90ais\/ru\//.test(h);
  const hasBeNav = /href="https:\/\/xn--80adf2alcbbnn3n\.xn--90ais\/(?:poshuk|pra-praekt|kantakty|mapa|spravazdacha|)"/.test(h)
    || h.includes('href="https://xn--80adf2alcbbnn3n.xn--90ais/"');
  const hasLocalRu = /href="\/ru\//.test(h);
  const hasPoshuk = h.includes('/poshuk-prodkau');
  console.log({ f, lang, title: title?.slice(0, 60), can, hasRuNav, hasBeNav, hasLocalRu, hasPoshuk });
}
