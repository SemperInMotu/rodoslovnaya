import { notFound } from 'next/navigation';
import { SiteShell } from '../../components/SiteShell';
import { listPages, loadPage } from '../../lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return listPages('be').map((file) => ({
    slug: file === 'index.html' ? [] : [file.replace(/\.html$/, '')],
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = loadPage('be', slug);
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = loadPage('be', slug);
  if (!page) notFound();
  return <SiteShell locale="be" current={page.current} file={page.file} html={page.html} />;
}
