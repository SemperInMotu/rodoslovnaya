import { notFound } from 'next/navigation';
import { SiteShell } from '../../../components/SiteShell';
import { listSlugParams, loadPage } from '../../../lib/content';
import { rootLocale } from '../../../lib/site-mode';

export const dynamicParams = false;

export function generateStaticParams() {
  return listSlugParams(rootLocale).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
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
  const page = loadPage(rootLocale, slug);
  if (!page) notFound();
  return (
    <SiteShell locale={rootLocale} current={page.current} pageId={page.pageId} html={page.html} />
  );
}
