
// FIX: Moved React import to the top of the file before other imports. This ensures that the base JSX namespace is established before any augmentations, resolving errors where standard HTML elements were not recognized in JSX.
import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../../../types';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    titleClassName?: string;
    bodyClassName?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', titleClassName = '', bodyClassName = '' }) => {
    return (
        <div className={`bg-white rounded-lg shadow-sm border border-brand-blue-100 ${className}`}>
            {title && (
                <div className={`px-6 py-4 border-b border-brand-blue-100 ${titleClassName}`}>
                    <h3 className="text-lg font-semibold text-brand-blue-900 font-montserrat">{title}</h3>
                </div>
            )}
            <div className={`p-6 ${bodyClassName}`}>
                {children}
            </div>
        </div>
    );
};

export default Card;
