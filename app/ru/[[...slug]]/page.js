import { notFound } from 'next/navigation';
import { SiteShell } from '../../../components/SiteShell';
import { loadPage } from '../../../lib/content';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = loadPage('ru', slug);
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = loadPage('ru', slug);
  if (!page) notFound();
  return <SiteShell locale="ru" current={page.current} file={page.file} html={page.html} />;
}
