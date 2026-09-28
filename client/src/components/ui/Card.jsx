import { cn } from '@/lib/utils';

export function Card({ children, className, hover, ...props }) {
  return (
    <div
      className={cn(
        'bg-surface border border-surface-border rounded-lg overflow-hidden',
        hover && 'transition-all duration-200 hover:border-amber/30 hover:shadow-glow cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return <div className={cn('p-5 pb-0', className)}>{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={cn('p-5', className)}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn('p-5 pt-0 flex items-center gap-3', className)}>
      {children}
    </div>
  );
}
