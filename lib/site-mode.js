/** Build target: `com` = heritavia.com (EN), `bel` = родословная.бел (BE+/ru/). */
export const SITE = process.env.SITE || process.env.NEXT_PUBLIC_SITE || 'bel';
export const isCom = SITE === 'com';
export const rootLocale = isCom ? 'en' : 'be';
