import { sample, createEffect } from 'effector';
import { navigateTo } from '@mfe/shared-lib';

// Эффект для push в History API
const pushHistoryFx = createEffect((url: string) => {
  window.history.pushState(null, '', url);
  // Для react-router можно вызвать router.navigate(url)
});

sample({
  clock: navigateTo,
  fn: ({ path, params }) => {
    const url = new URL(path, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([k, v]) =>
        url.searchParams.set(k, v)
      );
    }
    return url.pathname + url.search;
  },
  target: pushHistoryFx,
});
