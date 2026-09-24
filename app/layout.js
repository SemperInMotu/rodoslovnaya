import { UI } from '../lib/i18n';
import '../src/styles/main.css';

export const metadata = {
  icons: { icon: '/assets/favicon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang={UI.be.htmlLang}>
      <body>{children}</body>
    </html>
  );
}
