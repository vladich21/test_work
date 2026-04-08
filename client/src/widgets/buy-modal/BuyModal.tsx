'use client';

import { useUnit } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import {
  $modalOpen,
  $pointsAmount,
  $currency,
  amountIncremented,
  amountDecremented,
  currencyChanged,
  modalClosed,
  MIN_POINTS,
} from '../../features/buy-points/model/buy-points.store';
import { $fundStats } from '../../entities/fund/model/fund.store';
import { Counter } from '../../shared/ui/Counter';
import { formatTon } from '../../shared/lib/format';

const CURRENCIES = ['TON', 'USDT'];

export function BuyModal() {
  const [open, amount, currency, stats, close, increment, decrement, setCurrency] = useUnit([
    $modalOpen,
    $pointsAmount,
    $currency,
    $fundStats,
    modalClosed,
    amountIncremented,
    amountDecremented,
    currencyChanged,
  ]);

  const rate = stats?.wallet?.tonToPointsRate ?? 289.86;
  const priceInTon = rate > 0 ? amount / rate : 0;

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          className="fixed inset-0 z-50 max-w-[475px] mx-auto bg-[#2F2F33] flex flex-col overflow-hidden"
        >
          <header className="shrink-0 relative flex items-center justify-between px-4 pt-5 pb-3">
            <button
              onClick={close}
              className="text-[#007AFF] text-[17px] font-normal hover:opacity-75 transition-opacity active:opacity-50 z-10"
            >
              Cancel
            </button>
            <div className="absolute inset-x-0 text-center pointer-events-none">
              <p className="text-[#F5F8FA] font-bold text-[16px] leading-[22px]">Open Foundation</p>
              <p className="text-[#F5F8FA]/50 text-[13px] leading-[18px]">mini-app</p>
            </div>
            <button className="w-[28px] h-[28px] rounded-full border border-[#007AFF] bg-transparent hover:bg-[#007AFF]/10 active:scale-90 transition-all flex items-center justify-center z-10">
              <span className="text-[#007AFF] text-[10px] font-bold leading-none tracking-widest">•••</span>
            </button>
          </header>

          <div className="flex-1 flex flex-col justify-center px-5 gap-5 pb-8">
            <Counter
              value={amount}
              onIncrement={increment}
              onDecrement={decrement}
              min={MIN_POINTS}
              className="bg-[#15202B] rounded-[10px] px-3 h-[53px]"
            />

            <p className="text-[#AAB8C2] text-[12px] text-right leading-[120%] -mt-3 self-end">
              You must buy at least{' '}
              <span className="text-[#F5F8FA]">{MIN_POINTS} points</span>
            </p>

            <p className="text-[#F5F8FA] text-[14px] leading-[120%]">
              Set expiration date and time
            </p>

            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="appearance-none bg-[#15202B] border border-white/10 text-[#89969F] text-[16px] font-semibold rounded-[10px] px-4 py-3 pr-8 focus:outline-none cursor-pointer"
                >
                  {CURRENCIES.map((cur) => (
                    <option key={cur} value={cur}>{cur}</option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#AAB8C2] w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>

              <div className="flex-1 bg-[#15202B] border border-white/10 rounded-[10px] px-4 py-3 flex items-center">
                <span className="text-[#89969F] font-semibold text-[16px]">
                  {formatTon(priceInTon, 4)}
                </span>
              </div>
            </div>

            <button
              onClick={close}
              className="w-full h-[40px] bg-[#1D9BF0] hover:bg-[#1a8cdb] active:bg-[#1778c0] active:scale-[0.98] transition-all duration-150 rounded-[10px] px-[16px] text-white font-bold text-[14px]"
            >
              Buy
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
