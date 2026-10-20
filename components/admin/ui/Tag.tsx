
// FIX: Moved React import to the top of the file before other imports. This ensures that the base JSX namespace is established before any augmentations, resolving errors where standard HTML elements were not recognized in JSX.
import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../../../types';
import type { ContentStatus } from '../../../types';

interface TagProps {
    status: ContentStatus;
}

const Tag: React.FC<TagProps> = ({ status }) => {
    // Map statuses to Blue/White variants to stick to #1075BB palette
    const statusStyles: { [key in ContentStatus]: string } = {
        Published: 'bg-brand-blue-500 text-white', // Solid Blue for active/published
        Draft: 'bg-white text-brand-blue-600 border border-brand-blue-500', // Outlined Blue for draft
        Archived: 'bg-brand-blue-100 text-brand-blue-800', // Light Blue for archived
    };

    const className = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-brand-blue-50 text-brand-blue-900'}`;

    return (
        <span className={className}>
            <svg className="-ml-0.5 mr-1.5 h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
            </svg>
            {status}
        </span>
    );
};

export default Tag;
