import { Header } from './Header';
import { Maps } from './Maps';
import { LangSync } from './LangSync';
import { pathFor, switchHref, NAV_IDS } from '../lib/page-map';
import { OrderFormPrefill } from './OrderFormPrefill';
import { UI } from '../lib/i18n';

const LANG_LABELS = {
  en: { short: 'EN', label: 'English' },
  ru: { short: 'RU', label: 'Русский' },
  be: { short: 'BE', label: 'Беларуская' },
};

function langOrder(locale) {
  if (locale === 'en') return ['en', 'ru', 'be'];
  if (locale === 'ru') return ['ru', 'be', 'en'];
  return ['be', 'ru', 'en'];
}

function hrefs(locale, pageId) {
  const local = (id) => pathFor(id, locale);
  const id = pageId || 'home';
  return {
    home: local('home'),
    onboarding: local('onboarding'),
    sources: local('sources'),
    method: local('method'),
    about: local('about'),
    contacts: local('contacts'),
    sitemap: local('sitemap'),
    start: local('onboarding'),
    order: local('order'),
    langs: langOrder(locale).map((code) => ({
      code,
      short: LANG_LABELS[code].short,
      label: LANG_LABELS[code].label,
      href: code === locale ? local(id) : switchHref(id, code, locale),
    })),
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

export function SiteShell({ locale, current, pageId = 'home', html }) {
  const t = UI[locale];
  const links = hrefs(locale, pageId);
  const nav = NAV_IDS.map((key) => ({ key, href: links[key], label: t[key] }));
  const here = (key) => (current === key ? 'page' : undefined);
  return (
    <>
      <LangSync locale={locale} />
      <OrderFormPrefill />
      <Header
        t={t}
        links={nav}
        startHref={links.start}
        current={current}
        home={links.home}
        langs={links.langs}
        locale={locale}
      />
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
                  <a href={links.order} aria-current={here('order')}>
                    {t.bridge}
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.contactCol}</h4>
              <ul>
                <li>
                  <a href="mailto:info@heritavia.com">info@heritavia.com</a>
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
                  <a href={links.order}>{t.formLink}</a>
                </li>
                <li>
                  <a href={author(locale)}>{t.author}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Heritavia</span>
            <span>{t.unp}</span>
          </div>
        </div>
      </footer>
      <Maps />
    </>
  );
}
