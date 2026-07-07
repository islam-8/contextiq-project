import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const variantStyles = {
  primary:   'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:-translate-y-0.5',
  secondary: 'bg-bg-3 border border-border-1 text-t2 hover:border-blue-500 hover:text-blue-400',
  ghost:     'border border-border-1 text-t3 hover:border-border-2 hover:text-t1',
  danger:    'bg-red-500/10 border border-red-500/30 text-red-400',
  success:   'bg-green-500/10 border border-green-500/30 text-green-400',
};

const sizeStyles = {
  xs: 'px-2.5 py-1 text-[10.5px] rounded-md',
  sm: 'px-3 py-1.5 text-[11.5px] rounded-lg',
  md: 'px-4 py-2 text-[12.5px] rounded-xl',
  lg: 'px-6 py-3 text-sm rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold cursor-pointer transition-all duration-200 border-0',
        variantStyles[variant], sizeStyles[size], className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = 'Button';