import { useState, useEffect, useMemo } from "react";
import { usePerformantAnimation, easings } from "./usePerformantAnimation";

export function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(0); // Always start with 0 for consistent SSR/client hydration
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { elementRef, progress } = usePerformantAnimation({
    duration,
    easing: easings.easeOutQuart,
    enabled: isClient && typeof window !== 'undefined',
  });

  // Calculate current count based on animation progress
  const currentCount = useMemo(() => {
    if (!isClient) return 0;
    return Math.floor(progress * (end - start) + start);
  }, [progress, end, start, isClient]);

  useEffect(() => {
    setCount(currentCount);
  }, [currentCount]);

  return { 
    count, 
    ref: elementRef as React.RefObject<HTMLDivElement>
  };
}