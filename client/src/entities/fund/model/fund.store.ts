<<<<<<< HEAD
import { createStore, createEffect, createEvent, sample } from 'effector';
import { fundApi, FundStats } from '../api/fund.api';

export const fetchFundStatsFx = createEffect<void, FundStats, Error>(
  () => fundApi.getStats(),
);

export const fundMounted = createEvent();

export const $fundStats = createStore<FundStats | null>(null).on(
  fetchFundStatsFx.doneData,
  (_, stats) => stats,
);

export const $fundLoading = createStore(false)
  .on(fetchFundStatsFx, () => true)
  .on(fetchFundStatsFx.finally, () => false);

if (process.env.NODE_ENV === 'development') {
  fetchFundStatsFx.watch(() => console.log('[fund] fetching stats…'));
  fetchFundStatsFx.doneData.watch((stats) => console.log('[fund] stats loaded:', stats));
  fetchFundStatsFx.failData.watch((err) => console.error('[fund] stats error:', err.message));
}

sample({
  clock: fundMounted,
  target: fetchFundStatsFx,
});
=======
import { createStore, createEffect, createEvent, sample } from 'effector';
import { fundApi, FundStats } from '../api/fund.api';

export const fetchFundStatsFx = createEffect<void, FundStats, Error>(
  () => fundApi.getStats(),
);

export const fundMounted = createEvent();

export const $fundStats = createStore<FundStats | null>(null).on(
  fetchFundStatsFx.doneData,
  (_, stats) => stats,
);

export const $fundLoading = createStore(false)
  .on(fetchFundStatsFx, () => true)
  .on(fetchFundStatsFx.finally, () => false);

if (process.env.NODE_ENV === 'development') {
  fetchFundStatsFx.watch(() => console.log('[fund] fetching stats…'));
  fetchFundStatsFx.doneData.watch((stats) => console.log('[fund] stats loaded:', stats));
  fetchFundStatsFx.failData.watch((err) => console.error('[fund] stats error:', err.message));
}

sample({
  clock: fundMounted,
  target: fetchFundStatsFx,
});
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
