import { useState, useEffect, useRef, RefObject } from 'react';

interface ObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  options: ObserverOptions = { threshold: 0.1, triggerOnce: true }
): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        if (options.triggerOnce && observerRef.current) {
          observerRef.current.unobserve(entry.target);
        }
      } else if (!options.triggerOnce) {
        setIntersecting(false);
      }
    }, { rootMargin: options.rootMargin, threshold: options.threshold });

    const { current: observer } = observerRef;
    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [ref, options.threshold, options.rootMargin, options.triggerOnce]);

  return isIntersecting;
};