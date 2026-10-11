import { notFound, redirect } from 'next/navigation';
import { SiteShell } from '../../../components/SiteShell';
import { listSlugParams, loadPage } from '../../../lib/content';
import { isCom, rootLocale } from '../../../lib/site-mode';

export const dynamicParams = false;

function isRootSlug(slug) {
  return !slug || slug.length === 0;
}

export function generateStaticParams() {
  const params = listSlugParams(rootLocale).map(({ slug }) => ({ slug }));
  /* .bel: keep `/` in the param set so output:export / dev can serve root → /ru/ */
  if (!isCom && !params.some((p) => isRootSlug(p.slug))) {
    params.push({ slug: [] });
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!isCom && isRootSlug(slug)) {
    return { alternates: { canonical: 'https://xn--80adf2alcbbnn3n.xn--90ais/ru/' } };
  }
  const page = loadPage(rootLocale, slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.canonical,
      languages: Object.fromEntries(
        page.alternates.filter((a) => a.hreflang !== 'x-default').map((a) => [a.hreflang, a.href]),
      ),
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!isCom && isRootSlug(slug)) redirect('/ru/');
  const page = loadPage(rootLocale, slug);
  if (!page) notFound();
  return (
    <SiteShell locale={rootLocale} current={page.current} pageId={page.pageId} html={page.html} />
  );
}
