import { createStore, createEvent } from 'effector';

export const MIN_POINTS = 100;
export const STEP = 100;

export const modalOpened = createEvent();
export const modalClosed = createEvent();
export const amountIncremented = createEvent();
export const amountDecremented = createEvent();
export const currencyChanged = createEvent<string>();

export const $modalOpen = createStore(false)
  .on(modalOpened, () => true)
  .on(modalClosed, () => false);

export const $pointsAmount = createStore(MIN_POINTS)
  .on(amountIncremented, (val) => val + STEP)
  .on(amountDecremented, (val) => Math.max(MIN_POINTS, val - STEP))
  .reset(modalClosed);

export const $currency = createStore('TON')
  .on(currencyChanged, (_, c) => c)
  .reset(modalClosed);
