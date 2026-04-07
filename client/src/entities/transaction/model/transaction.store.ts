import { createStore, createEffect, createEvent, sample } from 'effector';
import { transactionApi, Transaction } from '../api/transaction.api';

export const fetchTransactionsFx = createEffect<void, Transaction[], Error>(
  () => transactionApi.getAll(50),
);

export const transactionsMounted = createEvent();

export const $transactions = createStore<Transaction[]>([]).on(
  fetchTransactionsFx.doneData,
  (_, list) => list,
);

export const $transactionsLoading = createStore(false)
  .on(fetchTransactionsFx, () => true)
  .on(fetchTransactionsFx.finally, () => false);

export const $topHolders = $transactions.map((list) =>
  [...list]
    .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
    .slice(0, 20),
);

if (process.env.NODE_ENV === 'development') {
  fetchTransactionsFx.watch(() => console.log('[transactions] fetching…'));
  fetchTransactionsFx.doneData.watch((list) =>
    console.log(`[transactions] loaded ${list.length} records`),
  );
  fetchTransactionsFx.failData.watch((err) =>
    console.error('[transactions] error:', err.message),
  );
}

sample({
  clock: transactionsMounted,
  target: fetchTransactionsFx,
});
