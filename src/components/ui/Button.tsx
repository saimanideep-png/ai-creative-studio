import React, { type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  target?: string;
  rel?: string;
  id?: string;
  'aria-label'?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white shadow-sm',
  secondary:
    'bg-transparent border border-[var(--color-border)] hover:border-[var(--color-coral)] text-[var(--color-text)] hover:text-white',
  ghost:
    'bg-transparent border-0 text-[var(--color-coral)] hover:underline',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-xs px-3 py-1.5 gap-1.5',
  md: 'text-sm px-5 py-2.5 gap-2',
  lg: 'text-base px-6 py-3 gap-2.5',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  as = 'button',
  href,
  onClick,
  type = 'button',
  disabled = false,
  target,
  rel,
  ...rest
}) => {
  const prefersReduced = useReducedMotion();
  const tapAnimation = prefersReduced || disabled ? undefined : { scale: 0.97 };

  const isGhost = variant === 'ghost';
  const sizeClass = isGhost ? 'py-1 text-sm' : sizeStyles[size];
  const baseClasses =
    'inline-flex items-center justify-center font-medium font-body rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-coral)] focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const combinedClasses = `${baseClasses} ${variantStyles[variant]} ${sizeClass} ${className}`.trim();

  if (as === 'a') {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        whileTap={tapAnimation}
        className={combinedClasses}
        target={target}
        rel={target === '_blank' && !rel ? 'noopener noreferrer' : rel}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={tapAnimation}
      className={combinedClasses}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;
