const COM = 'https://heritavia.com';

const COPY = {
  be: {
    menu: 'Мэню',
    research: 'Пакеты',
    report: 'Справаздача',
    about: 'Пра нас',
    blog: 'Нататкі',
    sitemap: 'Мапа сайту',
    contacts: 'Кантакты',
    start: 'Пачаць',
    tagline: 'Дакумэнтальная сямейная гісторыя Ўсходняй Эўропы — досьлед і жывая справаздача.',
    navCol: 'Heritavia',
    contactCol: 'Кантакты',
    formLink: 'Замовіць стратэгію',
    author: 'Праект Віталя Харужкі',
    location: 'Менск, Беларусь',
    unp: 'УНП 102176582',
    home: 'Галоўная',
  },
  ru: {
    menu: 'Меню',
    research: 'Пакеты',
    report: 'Отчёт',
    about: 'О нас',
    blog: 'Заметки',
    sitemap: 'Карта сайта',
    contacts: 'Контакты',
    start: 'Начать',
    tagline: 'Документальная семейная история Восточной Европы — исследование и живой отчёт.',
    navCol: 'Heritavia',
    contactCol: 'Контакты',
    formLink: 'Заказать стратегию',
    author: 'Проект Виталия Хоружко',
    location: 'Минск, Беларусь',
    unp: 'УНП 102176582',
    home: 'Главная',
  },
};

function langFromPath() {
  return window.location.pathname.startsWith('/ru/') || window.location.pathname === '/ru'
    ? 'ru'
    : 'be';
}

function pagePath() {
  const path = window.location.pathname.replace(/\/index\.html$/, '/');
  if (path === '/ru' || path === '/ru/') return '/';
  if (path.startsWith('/ru/')) return path.slice(3);
  return path;
}

function ruUrl() {
  const path = pagePath();
  return path === '/' ? '/ru/' : `/ru${path}`;
}

function beUrl() {
  const path = pagePath();
  return path === '/' ? '/' : path;
}

function enUrl() {
  const path = pagePath();
  return path === '/' ? `${COM}/` : `${COM}${path}`;
}

export function mountBel({ current = '' } = {}) {
  const lang = langFromPath();
  const t = COPY[lang];
  const hrefFor = (file) => (lang === 'be' ? `/${file}` : `/ru/${file}`);
  const links = {
    home: lang === 'be' ? '/' : '/ru/',
    research: hrefFor('research.html'),
    report: hrefFor('report.html'),
    about: hrefFor('about.html'),
    blog: hrefFor('blog.html'),
    sitemap: hrefFor('sitemap.html'),
    contacts: hrefFor('contacts.html'),
    start: hrefFor('start.html'),
  };
  const here = (key) => (current === key ? 'aria-current="page"' : '');
  const langs = [
    { code: 'be', label: 'BE', href: beUrl() },
    { code: 'ru', label: 'RU', href: ruUrl() },
    { code: 'en', label: 'EN', href: enUrl() },
  ];

  const header = document.querySelector('[data-site-header]');
  const footer = document.querySelector('[data-site-footer]');

  if (header) {
    header.innerHTML = `
      <div class="wrap site-header__inner">
        <a class="brand" href="${links.home}">Heritavia</a>
        <div class="header-tools">
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">${t.menu}</button>
        </div>
        <nav class="nav" id="site-nav">
          <a href="${links.research}" ${here('research')}>${t.research}</a>
          <a href="${links.report}" ${here('report')}>${t.report}</a>
          <a href="${links.about}" ${here('about')}>${t.about}</a>
          <a href="${links.blog}" ${here('blog')}>${t.blog}</a>
          <a href="${links.contacts}" ${here('contacts')}>${t.contacts}</a>
          <a class="nav-cta" href="${links.start}" ${here('start')}>${t.start}</a>
        </nav>
      </div>
    `;
    const toggle = header.querySelector('.nav-toggle');
    const nav = header.querySelector('.nav');
    toggle?.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  if (footer) {
    const item = (key, label) => `<li><a href="${links[key]}" ${here(key)}>${label}</a></li>`;
    footer.innerHTML = `
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">Heritavia</div>
            <p class="fine footer-tagline">${t.tagline}</p>
            <p class="fine">${t.location}</p>
          </div>
          <div class="footer-col">
            <h4>${t.navCol}</h4>
            <ul>
              ${item('home', t.home)}
              ${item('research', t.research)}
              ${item('report', t.report)}
              ${item('about', t.about)}
              ${item('blog', t.blog)}
              ${item('contacts', t.contacts)}
              ${item('sitemap', t.sitemap)}
              ${item('start', t.start)}
            </ul>
          </div>
          <div class="footer-col">
            <h4>${t.contactCol}</h4>
            <ul>
              <li><a href="mailto:info@vitalykhoruzhko.com">info@vitalykhoruzhko.com</a></li>
              <li><a href="https://t.me/Heritavia" rel="noopener">Telegram</a></li>
              <li><a href="https://www.instagram.com/heritavia_genealogy/" rel="noopener" target="_blank">Instagram</a></li>
              ${item('start', t.formLink)}
              <li><a href="${lang === 'be' ? 'https://vitalykhoruzhko.com/be' : 'https://vitalykhoruzhko.com/ru'}">${t.author}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <nav class="lang-switch" aria-label="Language">
            ${langs
              .map((item) =>
                item.code === lang
                  ? `<span class="lang-current" aria-current="page">${item.label}</span>`
                  : `<a href="${item.href}" hreflang="${item.code}">${item.label}</a>`,
              )
              .join('')}
          </nav>
          <span>© ${new Date().getFullYear()} Heritavia</span>
          <span>${t.unp}</span>
        </div>
      </div>
    `;
  }
}
