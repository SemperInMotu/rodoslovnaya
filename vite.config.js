import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

const basePages = [
  'index.html',
  'research.html',
  'report.html',
  'about.html',
  'blog.html',
  'blog-metrics-missing.html',
  'blog-pokhozyaystvennye-knigi.html',
  'forma-1-pasport-sssr-genealogy.html',
  'sitemap.html',
  'contacts.html',
  'start.html',
];

/* heritavia.com: English at root. /en/* redirects kept for old links. */
const pages = [
  '404.html',
  ...basePages,
  ...basePages.map((page) => `en/${page}`),
];

export default defineConfig({
  root,
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page.replace(/\.html$/, '').replace(/\//g, '-'), resolve(root, page)]),
      ),
    },
  },
});
