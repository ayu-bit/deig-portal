
// FIX: Moved React import to the top of the file before other imports. This ensures that the base JSX namespace is established before any augmentations, resolving errors where standard HTML elements were not recognized in JSX.
import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../../../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'icon';
    size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200';

    const variantStyles = {
        // Primary: Base #1075BB, Hover #0D629E, Focus #1075BB
        primary: 'bg-[#1075BB] text-white hover:bg-[#0D629E] active:bg-[#04253D] focus:ring-[#1075BB] shadow-sm',
        // Secondary: Base Border Blue, Text Blue, Hover Light Blue
        secondary: 'bg-white text-[#1075BB] border border-[#1075BB] hover:bg-[#F0F7FC] focus:ring-[#1075BB]',
        icon: 'text-gray-500 hover:bg-gray-100 hover:text-[#1075BB] focus:ring-[#1075BB]',
    };

    const sizeStyles = {
        sm: `px-2 py-1 text-xs ${variant === 'icon' ? 'p-1.5' : ''}`,
        md: `px-4 py-2 text-sm ${variant === 'icon' ? 'p-2' : ''}`,
        lg: `px-6 py-3 text-base ${variant === 'icon' ? 'p-3' : ''}`,
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
};

export default Button;
