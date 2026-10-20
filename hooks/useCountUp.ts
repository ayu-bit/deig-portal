import { useState, useEffect, useCallback } from 'react';

const easeOutQuad = (t: number) => t * (2 - t);

export const useCountUp = (
  end: number,
  duration: number = 2000,
  startAnimation: boolean
): number => {
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuad(progress);
      setCount(Math.floor(easedProgress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  useEffect(() => {
    if (startAnimation) {
      animate();
    }
  }, [startAnimation, animate]);

  return count;
};