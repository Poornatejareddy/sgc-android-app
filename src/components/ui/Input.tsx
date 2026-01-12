import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            "w-full rounded-xl border border-gray-300 dark:border-gray-600",
                            "bg-white dark:bg-gray-800",
                            "px-4 py-3 text-base",
                            "text-gray-900 dark:text-white",
                            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            "transition-colors",
                            icon && "pl-12",
                            error && "border-red-500 focus:ring-red-500",
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
