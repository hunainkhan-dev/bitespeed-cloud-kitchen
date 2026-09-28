import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Input = forwardRef(({ className, label, error, icon: Icon, type = 'text', ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold tracking-wide uppercase text-slate-muted">{label}</label>
      )}
      <div className="relative group">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-dim group-focus-within:text-amber transition-colors duration-300" />
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full glass-card rounded-xl px-4 py-3 text-sm text-alabaster placeholder:text-slate-dim transition-all duration-300 focus:outline-none focus:border-amber/30 focus:shadow-glow min-h-[48px]',
            Icon && 'pl-11',
            error && 'border-error/50 focus:border-error focus:shadow-[0_0_20px_rgba(239,68,68,0.15)]',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-error font-medium">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
