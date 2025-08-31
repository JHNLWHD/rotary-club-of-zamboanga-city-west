import { useEffect, useRef, useState } from "react";

export function useCountUp(end: number, duration: number = 2000, start: number = 0) {
    const [count, setCount] = useState(start);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const startTimeRef = useRef<number | null>(null);
  
    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      // Only run on client-side
      if (!isClient || typeof window === 'undefined') return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            startTimeRef.current = performance.now();
            
            const animate = (currentTime: number) => {
              if (startTimeRef.current === null) return;
              
              const elapsed = currentTime - startTimeRef.current;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentCount = Math.floor(easeOutQuart * (end - start) + start);
              
              setCount(currentCount);
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            requestAnimationFrame(animate);
          }
        },
        { threshold: 0.5 }
      );
  
      if (ref.current) {
        observer.observe(ref.current);
      }
  
      return () => observer.disconnect();
    }, [end, duration, start, hasAnimated, isClient]);
  
    return { count, ref };
  }