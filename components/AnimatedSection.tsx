import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '', delay = '0ms' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`${className} animate-scroll-fade-up ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};
export default AnimatedSection;