// FIX: Reordered imports to ensure global JSX namespace augmentation from `types.ts` is applied before React is imported. This resolves errors where standard HTML elements were not recognized in JSX.
import '../../types';
import * as React from 'react';

interface ToggleSwitchProps {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    label?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, setEnabled, label }) => {
    return (
        <label htmlFor={label} className="flex items-center cursor-pointer">
            <div className="relative">
                <input id={label} type="checkbox" className="sr-only" checked={enabled} onChange={() => setEnabled(!enabled)} />
                <div className={`block w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-[#41737c]' : 'bg-gray-200'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${enabled ? 'transform translate-x-6' : ''}`}></div>
            </div>
            {label && <div className="ml-3 text-gray-700 text-sm font-medium">{label}</div>}
        </label>
    );
};

export default ToggleSwitch;