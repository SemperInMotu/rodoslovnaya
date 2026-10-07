'use client';

import { useLayoutEffect } from 'react';

/** Prefill the soft-order radio from ?v= and reveal the thank-you note after ?sent=1. */
export function OrderFormPrefill() {
  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('sent') === '1') {
      document.querySelectorAll('[data-order-sent]').forEach((el) => {
        el.hidden = false;
      });
    }
    const choice = params.get('v');
    if (choice === 'branch' || choice === 'full') {
      const input = document.querySelector(`input[name="service"][data-v="${choice}"]`);
      if (input) input.checked = true;
    }
  }, []);
  return null;
}
