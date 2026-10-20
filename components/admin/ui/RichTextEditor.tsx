
import * as React from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    rows?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, label, placeholder, rows = 6 }) => {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <div className="border border-gray-300 rounded-md overflow-hidden bg-white focus-within:ring-1 focus-within:ring-[#1075BB] focus-within:border-[#1075BB]">
                {/* Toolbar Mockup */}
                <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
                    {['Bold', 'Italic', 'Underline', 'Strike', 'Link', 'List', 'Quote'].map((tool) => (
                        <button
                            key={tool}
                            type="button"
                            className="p-1.5 text-gray-500 hover:text-[#1075BB] hover:bg-gray-200 rounded text-xs font-semibold"
                            title={tool}
                        >
                            {tool.charAt(0)}
                        </button>
                    ))}
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 text-gray-500 hover:text-[#1075BB] hover:bg-gray-200 rounded text-xs">H1</button>
                    <button type="button" className="p-1.5 text-gray-500 hover:text-[#1075BB] hover:bg-gray-200 rounded text-xs">H2</button>
                </div>
                
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={rows}
                    className="w-full p-3 text-sm text-gray-800 focus:outline-none resize-y font-lato leading-relaxed"
                />
            </div>
            <p className="text-xs text-gray-400 mt-1 text-right">{value.length} characters</p>
        </div>
    );
};

export default RichTextEditor;
