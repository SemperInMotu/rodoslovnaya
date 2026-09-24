import { SiteShell } from '../components/SiteShell';

export default function NotFound() {
  return (
    <SiteShell
      locale="be"
      current=""
      file="index.html"
      html={'<section class="page-hero heritage"><div class="wrap"><h1>404</h1><p class="lead">Такой страницы нет.</p></div></section>'}
    />
  );
}
