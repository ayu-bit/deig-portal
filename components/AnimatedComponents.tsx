
import React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../types';
import { useInView } from '../hooks/useInView';

// Component to wrap sections that should animate on scroll
export const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`animate-on-scroll ${className} ${isInView ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Component for the animated number counter
export const AnimatedCounter: React.FC<{ end: number; duration?: number; className?: string; decimals?: number }> = ({ end, duration = 2000, className, decimals = 0 }) => {
  const [count, setCount] = React.useState(0);
  const [ref, isInView] = useInView({ threshold: 0.5 });

  const easeOutCubic = (t: number) => (--t) * t * t + 1;

  React.useEffect(() => {
    let animationFrameId: number;
    if (isInView) {
      const startTime = performance.now();
      
      const animateCount = (timestamp: number) => {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentCount = easeOutCubic(progress) * end;
        setCount(currentCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animateCount);
        }
      };
      animationFrameId = requestAnimationFrame(animateCount);
    }
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, end, duration]);

  return <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>{count.toFixed(decimals)}</span>;
};


// Component for the animated SVG checkmark
export const AnimatedCheckmark: React.FC<{ className?: string }> = ({ className }) => {
    const [ref, isInView] = useInView({ threshold: 0.5 });
    
    return (
        <svg
            ref={ref as any}
            className={`w-5 h-5 text-[#1075BB] mr-3 flex-shrink-0 ${className}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                className={isInView ? 'animate-draw' : ''}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                style={{
                    strokeDasharray: 100,
                    strokeDashoffset: isInView ? 0 : 100,
                    transition: 'stroke-dashoffset 1s ease-in-out',
                }}
            />
        </svg>
    );
};
