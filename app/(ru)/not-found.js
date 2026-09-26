import { SiteShell } from '../../components/SiteShell';
import { pathFor } from '../../lib/page-map';

export default function RuNotFound() {
  const map = pathFor('sitemap', 'ru');
  const html = `<section class="page-hero heritage"><div class="wrap" style="max-width:640px"><div class="eyebrow heritage">404</div><h1>Страница не найдена</h1><p class="lead">Такого адреса нет.</p><p style="margin-top:1rem"><a class="btn btn-heritage" href="${map}">Открыть карту сайта</a></p></div></section>`;
  return <SiteShell locale="ru" current="" pageId="home" html={html} />;
}
