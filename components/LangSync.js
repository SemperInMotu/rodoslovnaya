'use client';

import { useEffect } from 'react';
import { UI } from '../lib/i18n';

export function LangSync({ locale }) {
  useEffect(() => {
    const lang = UI[locale]?.htmlLang || locale;
    document.documentElement.lang = lang;
  }, [locale]);
  return null;
}
