import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'relative flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none',
                    variant === 'primary' && 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700',
                    variant === 'outline' && 'border-2 border-gray-200 text-gray-700 hover:bg-gray-50',
                    variant === 'ghost' && 'text-gray-600 hover:bg-gray-100',
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
            </button>
        );
    }
);

Button.displayName = 'Button';
export { Button };
