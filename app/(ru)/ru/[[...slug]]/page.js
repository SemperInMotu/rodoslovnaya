import { notFound } from 'next/navigation';
import { SiteShell } from '../../../../components/SiteShell';
import { listSlugParams, loadPage } from '../../../../lib/content';
import { isCom } from '../../../../lib/site-mode';

export const dynamicParams = false;

export function generateStaticParams() {
  /* output:export requires generateStaticParams; empty array fails on catch-all */
  if (isCom) return [{ slug: ['__skip__'] }];
  return listSlugParams('ru').map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  if (isCom) return { robots: { index: false, follow: false } };
  const { slug } = await params;
  const page = loadPage('ru', slug);
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
  if (isCom) notFound();
  const { slug } = await params;
  if (slug?.[0] === '__skip__') notFound();
  const page = loadPage('ru', slug);
  if (!page) notFound();
  return (
    <SiteShell locale="ru" current={page.current} pageId={page.pageId} html={page.html} />
  );
}
