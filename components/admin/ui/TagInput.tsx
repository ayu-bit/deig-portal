
import * as React from 'react';

interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
    label?: string;
    placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onChange, label, placeholder = "Press Enter to add..." }) => {
    const [inputValue, setInputValue] = React.useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                onChange([...tags, inputValue.trim()]);
            }
            setInputValue('');
        }
    };

    const removeTag = (indexToRemove: number) => {
        onChange(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <div className="bg-white border border-gray-300 rounded-md p-2 focus-within:ring-1 focus-within:ring-[#1075BB] focus-within:border-[#1075BB] flex flex-wrap gap-2 min-h-[42px]">
                {tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1075BB]/10 text-[#1075BB]">
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-[#1075BB] hover:bg-[#1075BB]/20 rounded-full focus:outline-none"
                        >
                            &times;
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={tags.length === 0 ? placeholder : ""}
                    className="flex-grow text-sm outline-none bg-transparent min-w-[120px]"
                />
            </div>
            <p className="text-xs text-gray-500 mt-1">Press <strong>Enter</strong> to add items.</p>
        </div>
    );
};

export default TagInput;
