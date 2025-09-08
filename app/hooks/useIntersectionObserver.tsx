import { useEffect, useRef, useState, useCallback } from 'react';

type UseIntersectionObserverOptions = {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  enabled?: boolean;
};

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  enabled = true,
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      const isCurrentlyIntersecting = entry.isIntersecting;

      if (isCurrentlyIntersecting && (!hasTriggered || !triggerOnce)) {
        setIsIntersecting(true);
        setHasTriggered(true);

        // If triggerOnce is true, disconnect observer after first trigger
        if (triggerOnce && observerRef.current) {
          observerRef.current.disconnect();
        }
      } else if (!triggerOnce) {
        setIsIntersecting(isCurrentlyIntersecting);
      }
    },
    [hasTriggered, triggerOnce]
  );

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const element = elementRef.current;
    if (!element) return;

    // Create observer with performance optimizations
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enabled, handleIntersection, rootMargin, threshold]);

  // Reset function for reusing the observer
  const reset = useCallback(() => {
    setIsIntersecting(false);
    setHasTriggered(false);
  }, []);

  return {
    elementRef,
    isIntersecting,
    hasTriggered,
    reset,
  };
}