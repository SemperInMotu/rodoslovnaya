# Heritavia site architecture

Two language front doors, one business. **Next.js static export only** (Vite removed).

## Domains

| Host | Build | Root locale | Other |
|------|-------|-------------|-------|
| [heritavia.com](https://heritavia.com) | `npm run build:com` (`SITE=com`) | English at `/` | no `/en/` content (legacy redirects in `public/`) |
| [родословная.бел](https://xn--80adf2alcbbnn3n.xn--90ais) | `npm run build` (`SITE=bel`) | Беларуская at `/` | Русский at `/ru/` |

`x-default` and English canonicals → heritavia.com.  
RU/BE canonicals → родословная.бел. Each page’s `canonical` is self.

GitHub Pages workflow deploys the **bel** build by default.

## Source of truth

[`lib/page-map.js`](lib/page-map.js) — page ids, EN/RU/BE paths, legacy `.html` names, hreflang helpers.

Content HTML (main body + meta) lives in:

- EN: site root directories (`index.html`, `research/index.html`, …)
- RU: `ru/…`
- BE: `be/…`

Next reads `<main>` via [`lib/content.js`](lib/content.js) and wraps chrome in [`components/SiteShell.js`](components/SiteShell.js).

## Commands

```bash
npm run dev        # .bel shape (BE + /ru/)
npm run dev:com    # .com shape (EN)
npm run build      # out/ for родословная.бел
npm run build:com  # out/ for heritavia.com
```

## Not in this iteration

Empty hubs (`/services/`, `/dna/`, `/family-tree/`, `/places/`, country research) — add when there is real copy.

## Language switcher

Footer: `English | Русский | Беларуская` (current language first). Links go to the **sibling page** on the other host/locale via page-map, not only to home.
