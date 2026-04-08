<<<<<<< HEAD
'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`relative h-5 w-full rounded-[10px] bg-white/10 overflow-hidden ${className ?? ''}`}>
      <motion.div
        className="absolute left-0 top-0 h-full bg-[#1D9BF0]"
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/80 z-10 select-none">
        {clamped.toFixed(1)}%
      </span>
    </div>
  );
}
=======
'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`relative h-5 w-full rounded-[10px] bg-white/10 overflow-hidden ${className ?? ''}`}>
      <motion.div
        className="absolute left-0 top-0 h-full bg-[#1D9BF0]"
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/80 z-10 select-none">
        {clamped.toFixed(1)}%
      </span>
    </div>
  );
}
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
