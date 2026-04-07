'use client';

import { motion } from 'framer-motion';
import { formatPoints } from '../lib/format';

interface CounterProps {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  min?: number;
  className?: string;
}

export function Counter({ value, onDecrement, onIncrement, min = 0, className }: CounterProps) {
  const canDecrement = value > min;

  return (
    <div className={`flex items-center justify-center w-full gap-[10px] ${className ?? 'bg-[#253341] rounded-[14px] px-5 py-5'}`}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onDecrement}
        disabled={!canDecrement}
        className="w-6 h-6 rounded-full bg-[#AAB8C2] flex items-center justify-center text-[#15202B] text-xl font-light leading-none hover:opacity-80 active:opacity-60 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
      >
        −
      </motion.button>
      <span className="text-white text-lg font-bold tracking-wide text-center select-none">
        {formatPoints(value)}
      </span>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onIncrement}
        className="w-6 h-6 rounded-full bg-[#AAB8C2] flex items-center justify-center text-[#15202B] text-xl font-light leading-none hover:opacity-80 active:opacity-60 transition-opacity shrink-0"
      >
        +
      </motion.button>
    </div>
  );
}
