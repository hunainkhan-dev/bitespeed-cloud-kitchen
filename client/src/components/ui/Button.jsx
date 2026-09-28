import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const variants = {
  primary:
    'bg-gradient-to-br from-amber to-gold text-jet hover:from-amber-light hover:to-amber shadow-glow hover:shadow-glow-strong active:scale-[0.97]',
  secondary:
    'glass-card text-alabaster hover:border-amber/20 hover:text-amber active:scale-[0.97]',
  outline:
    'border border-amber/40 text-amber hover:bg-amber/10 hover:border-amber active:scale-[0.97] backdrop-blur-md',
  ghost:
    'text-slate-muted hover:text-alabaster hover:bg-white/[0.04] active:scale-[0.97]',
  danger:
    'bg-gradient-to-br from-error to-red-600 text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-[0.97]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-3.5 text-base gap-2',
};

const Button = forwardRef(({ className, variant = 'primary', size = 'md', disabled, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-amber/40 focus:ring-offset-2 focus:ring-offset-deep disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none min-h-[44px] select-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
