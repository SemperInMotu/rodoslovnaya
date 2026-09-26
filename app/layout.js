import Script from 'next/script';
import { UI } from '../lib/i18n';
import { rootLocale } from '../lib/site-mode';
import '../src/styles/main.css';

export const metadata = {
  icons: { icon: '/assets/favicon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang={UI[rootLocale].htmlLang}>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Z12LCY13ES"
          strategy="beforeInteractive"
        />
        <Script id="gtag-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-Z12LCY13ES');`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
