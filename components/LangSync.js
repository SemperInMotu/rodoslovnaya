'use client';

import { useLayoutEffect } from 'react';
import { UI } from '../lib/i18n';

export function LangSync({ locale }) {
  useLayoutEffect(() => {
    const lang = UI[locale]?.htmlLang || locale;
    document.documentElement.lang = lang;
  }, [locale]);
  return null;
}
