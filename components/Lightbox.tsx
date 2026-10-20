import React, { useEffect } from 'react';

interface LightboxProps {
  images: string[];
  selectedIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  animationDirection?: 'next' | 'prev' | 'fade';
}

const Lightbox: React.FC<LightboxProps> = ({ images, selectedIndex, onClose, onNext, onPrev, animationDirection = 'fade' }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }
  
  const animationClass = 
    animationDirection === 'next' 
        ? 'animate-slide-in-from-right' 
        : animationDirection === 'prev' 
        ? 'animate-slide-in-from-left' 
        : 'animate-fadeIn';

  return (
    <div 
        className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-fadeIn"
        onClick={handleBackdropClick}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-brandTealLight transition-colors z-20 bg-black/50 rounded-full p-2"
          aria-label="Close lightbox"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Previous Button */}
        <button
          onClick={onPrev}
          className="absolute left-4 md:left-8 text-white hover:text-brandTealLight transition-colors z-20 bg-black/50 rounded-full p-2"
          aria-label="Previous image"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="absolute right-4 md:right-8 text-white hover:text-brandTealLight transition-colors z-20 bg-black/50 rounded-full p-2"
          aria-label="Next image"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Image Display */}
        <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
          <img
            key={selectedIndex} // Force re-render on image change for animation
            src={images[selectedIndex]}
            alt={`Gallery image ${selectedIndex + 1}`}
            className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl ${animationClass}`}
          />
          <div className="absolute bottom-4 bg-black/50 text-white text-sm py-1 px-3 rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;