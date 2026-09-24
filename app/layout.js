import { headers } from 'next/headers';
import { isBelHost } from '../lib/hosts';
import { UI } from '../lib/i18n';
import '../src/styles/main.css';

export const metadata = {
  icons: { icon: '/assets/favicon.svg' },
};

export default async function RootLayout({ children }) {
  const host = (await headers()).get('host');
  const path = (await headers()).get('x-pathname') || '/';
  const locale = path === '/ru' || path.startsWith('/ru/') ? 'ru' : isBelHost(host) ? 'be' : 'en';
  return (
    <html lang={UI[locale].htmlLang}>
      <body>{children}</body>
    </html>
  );
}
