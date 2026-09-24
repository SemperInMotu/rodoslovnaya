import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { SiteShell } from '../../components/SiteShell';
import { loadPage } from '../../lib/content';
import { isBelHost } from '../../lib/hosts';

async function locale() {
  const host = (await headers()).get('host');
  return isBelHost(host) ? 'be' : 'en';
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = loadPage(await locale(), slug);
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = loadPage(await locale(), slug);
  if (!page) notFound();
  return (
    <SiteShell locale={await locale()} current={page.current} file={page.file} html={page.html} />
  );
}
