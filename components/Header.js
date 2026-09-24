'use client';

import { useState } from 'react';

export function Header({ t, links, startHref, current, home }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <a className="brand" href={home}>
          Heritavia
        </a>
        <div className="header-tools">
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {t.menu}
          </button>
        </div>
        <nav className={open ? 'nav is-open' : 'nav'} id="site-nav">
          {links.map((item) => (
            <a key={item.key} href={item.href} aria-current={current === item.key ? 'page' : undefined}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href={startHref} aria-current={current === 'start' ? 'page' : undefined}>
            {t.start}
          </a>
        </nav>
      </div>
    </header>
  );
}
