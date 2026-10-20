// FIX: Moved React import to the top of the file before other imports. This ensures that the base JSX namespace is established before any augmentations, resolving errors where standard HTML elements were not recognized in JSX.
import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../../types';

interface AdminSectionProps {
    title: string;
    children: React.ReactNode;
}

const AdminSection: React.FC<AdminSectionProps> = ({ title, children }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">{title}</h2>
            <div>
                {children}
            </div>
        </div>
    );
};

export default AdminSection;