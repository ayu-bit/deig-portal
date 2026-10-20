// FIX: Moved React import to the top of the file before other imports. This ensures that the base JSX namespace is established before any augmentations, resolving errors where standard HTML elements were not recognized in JSX.
import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../../../types';

interface StarRatingProps {
    rating: number; // 0-5
    className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, className = '' }) => {
    const totalStars = 5;

    return (
        <div className={`flex items-center ${className}`}>
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <svg
                        key={index}
                        className={`w-4 h-4 ${starValue <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            })}
        </div>
    );
};

export default StarRating;