import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, ...props }, ref) => {
        return (
            <div className="space-y-1.5 w-full">
                {label && (
                    <label className="text-sm font-medium text-gray-600 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        className={cn(
                            'flex w-full px-4 py-3.5 bg-gray-50 text-gray-900 rounded-xl border-2 border-transparent transition-all outline-none placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]',
                            error && 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]',
                            icon && 'pl-11',
                            className
                        )}
                        {...props}
                    />
                    {icon && (
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                            {icon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-xs text-red-500 font-medium ml-1 animate-in slide-in-from-top-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
export { Input };
