import { Header } from './Header';
import { Maps } from './Maps';
import { BEL_ORIGIN, COM_ORIGIN } from '../lib/hosts';
import { NAV, UI } from '../lib/i18n';

function hrefs(locale, pageFile) {
  const stem = pageFile === 'index.html' ? '' : pageFile;
  const local = (file) => {
    if (locale === 'ru') return file === 'index.html' ? '/ru/' : `/ru/${file}`;
    return file === 'index.html' ? '/' : `/${file}`;
  };
  const other = (file, lang) => {
    if (lang === 'en') return file === 'index.html' ? `${COM_ORIGIN}/` : `${COM_ORIGIN}/${file}`;
    if (lang === 'ru') return file === 'index.html' ? `${BEL_ORIGIN}/ru/` : `${BEL_ORIGIN}/ru/${file}`;
    return file === 'index.html' ? `${BEL_ORIGIN}/` : `${BEL_ORIGIN}/${file}`;
  };
  const page = (lang) => (lang === locale ? local(pageFile) : other(pageFile, lang));
  return {
    home: local('index.html'),
    research: local('research.html'),
    report: local('report.html'),
    about: local('about.html'),
    blog: local('blog.html'),
    sitemap: local('sitemap.html'),
    contacts: local('contacts.html'),
    start: local('start.html'),
    langs: [
      { code: 'be', label: 'BE', href: page('be') },
      { code: 'ru', label: 'RU', href: page('ru') },
      { code: 'en', label: 'EN', href: page('en') },
    ],
    stem,
  };
}

function author(locale) {
  if (locale === 'be') return 'https://vitalykhoruzhko.com/be';
  if (locale === 'ru') return 'https://vitalykhoruzhko.com/ru';
  return 'https://vitalykhoruzhko.com';
}

function instagram(locale) {
  if (locale === 'en') return 'https://www.instagram.com/h.e.r.i.t.a.v.i.a/';
  return 'https://www.instagram.com/heritavia_genealogy/';
}

export function SiteShell({ locale, current, file, html }) {
  const t = UI[locale];
  const links = hrefs(locale, file);
  const nav = NAV.map((key) => ({ key, href: links[key], label: t[key] }));
  const here = (key) => (current === key ? 'page' : undefined);
  return (
    <>
      <Header t={t} links={nav} startHref={links.start} current={current} home={links.home} />
      <main dangerouslySetInnerHTML={{ __html: html }} />
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">Heritavia</div>
              <p className="fine footer-tagline">{t.tagline}</p>
              <p className="fine">{t.location}</p>
            </div>
            <div className="footer-col">
              <h4>{t.navCol}</h4>
              <ul>
                <li>
                  <a href={links.home} aria-current={here('home')}>
                    {t.home}
                  </a>
                </li>
                {nav.map((item) => (
                  <li key={item.key}>
                    <a href={item.href} aria-current={here(item.key)}>
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={links.sitemap} aria-current={here('sitemap')}>
                    {t.sitemap}
                  </a>
                </li>
                <li>
                  <a href={links.start} aria-current={here('start')}>
                    {t.start}
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.contactCol}</h4>
              <ul>
                <li>
                  <a href="mailto:info@vitalykhoruzhko.com">info@vitalykhoruzhko.com</a>
                </li>
                <li>
                  <a href="https://t.me/Heritavia" rel="noopener">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href={instagram(locale)} rel="noopener" target="_blank">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={links.start}>{t.formLink}</a>
                </li>
                <li>
                  <a href={author(locale)}>{t.author}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <nav className="lang-switch" aria-label="Language">
              {links.langs.map((item) =>
                item.code === locale ? (
                  <span key={item.code} className="lang-current" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <a key={item.code} href={item.href} hrefLang={item.code}>
                    {item.label}
                  </a>
                ),
              )}
            </nav>
            <span>© {new Date().getFullYear()} Heritavia</span>
            <span>{t.unp}</span>
          </div>
        </div>
      </footer>
      <Maps />
    </>
  );
}
