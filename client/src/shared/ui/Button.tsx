<<<<<<< HEAD
'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/cn';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-colors duration-150 select-none focus:outline-none active:scale-[0.97]';

  const variants = {
    primary: 'bg-[#1D9BF0] hover:bg-[#1a8cdb] active:bg-[#1778c0] text-white',
    secondary:
      'bg-[#2A2A2A] hover:bg-[#333333] active:bg-[#1E1E1E] text-white border border-[#3A3A3A]',
    ghost:
      'bg-transparent hover:bg-white/10 active:bg-white/5 text-[#3B82F6]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
=======
'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/cn';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-colors duration-150 select-none focus:outline-none active:scale-[0.97]';

  const variants = {
    primary: 'bg-[#1D9BF0] hover:bg-[#1a8cdb] active:bg-[#1778c0] text-white',
    secondary:
      'bg-[#2A2A2A] hover:bg-[#333333] active:bg-[#1E1E1E] text-white border border-[#3A3A3A]',
    ghost:
      'bg-transparent hover:bg-white/10 active:bg-white/5 text-[#3B82F6]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
