import { SiteShell } from '../../components/SiteShell';
import { rootLocale } from '../../lib/site-mode';
import { pathFor } from '../../lib/page-map';

const COPY = {
  en: {
    title: 'Page not found',
    lead: 'This address does not exist.',
    go: 'Open site map',
  },
  ru: {
    title: 'Страница не найдена',
    lead: 'Такого адреса нет.',
    go: 'Открыть карту сайта',
  },
  be: {
    title: 'Старонка не знойдзеная',
    lead: 'Такой адрас не існуе.',
    go: 'Адкрыць мапу сайту',
  },
};

export default function NotFound() {
  const locale = rootLocale;
  const t = COPY[locale] || COPY.en;
  const map = pathFor('sitemap', locale);
  const html = `<section class="page-hero heritage"><div class="wrap" style="max-width:640px"><div class="eyebrow heritage">404</div><h1>${t.title}</h1><p class="lead">${t.lead}</p><p style="margin-top:1rem"><a class="btn btn-heritage" href="${map}">${t.go}</a></p></div></section>`;
  return <SiteShell locale={locale} current="" pageId="home" html={html} />;
}
