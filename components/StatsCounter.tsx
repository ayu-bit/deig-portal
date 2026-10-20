import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCountUp } from '../hooks/useCountUp';

interface StatsCounterProps {
  target: number;
  label: string;
  suffix?: string;
  className?: string;
}

const StatsCounter: React.FC<StatsCounterProps> = ({ target, label, suffix = '', className = "text-center" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.5, triggerOnce: true });
  const count = useCountUp(target, 2000, isVisible);

  return (
    <div ref={ref} className={`${className} group`}>
      <p className="text-5xl md:text-6xl font-bold text-primary font-display mb-3 transition-transform duration-500 group-hover:scale-110">
        {count.toLocaleString()}
        {suffix}
      </p>
      <div className="w-12 h-1 bg-primary/20 mx-auto rounded-full mb-4 group-hover:w-20 transition-all duration-500"></div>
      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{label}</p>
    </div>
  );
};

export default StatsCounter;