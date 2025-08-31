import { useEffect, useRef, useState } from "react";

export function useCountUp(end: number, duration: number = 2000, start: number = 0) {
    const [count, setCount] = useState(start);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const startTime = Date.now();
            
            const animate = () => {
              const elapsed = Date.now() - startTime;
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
    }, [end, duration, start, hasAnimated]);
  
    return { count, ref };
  }