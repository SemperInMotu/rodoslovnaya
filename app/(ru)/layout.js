import { UI } from '../../lib/i18n';
import { GtagScripts } from '../../components/GtagScripts';
import '../../src/styles/main.css';

export const metadata = {
  icons: { icon: '/assets/favicon.svg' },
};

/** Russian pages under /ru/ on родословная.бел */
export default function RuRootLayout({ children }) {
  return (
    <html lang={UI.ru.htmlLang}>
      <head>
        <GtagScripts />
      </head>
      <body>{children}</body>
    </html>
  );
}
