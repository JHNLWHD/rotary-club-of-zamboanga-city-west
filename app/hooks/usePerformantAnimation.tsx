import { useEffect, useRef, useCallback, useState } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

type AnimationConfig = {
  duration?: number;
  delay?: number;
  easing?: (t: number) => number;
  onStart?: () => void;
  onComplete?: () => void;
  enabled?: boolean;
};

type AnimationState = {
  progress: number;
  isAnimating: boolean;
  isComplete: boolean;
};

// Optimized easing functions
export const easings = {
  linear: (t: number) => t,
  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeOutExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
};

export function usePerformantAnimation({
  duration = 1000,
  delay = 0,
  easing = easings.easeOutQuart,
  onStart,
  onComplete,
  enabled = true,
}: AnimationConfig = {}) {
  const [animationState, setAnimationState] = useState<AnimationState>({
    progress: 0,
    isAnimating: false,
    isComplete: false,
  });

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);

  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
    enabled,
  });

  const animate = useCallback(
    (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime + delay;
        return;
      }

      if (currentTime < startTimeRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);

      setAnimationState({
        progress: easedProgress,
        isAnimating: progress < 1,
        isComplete: progress >= 1,
      });

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
        onComplete?.();
      }
    },
    [duration, delay, easing, onComplete]
  );

  const startAnimation = useCallback(() => {
    if (hasStartedRef.current || !enabled) return;

    hasStartedRef.current = true;
    startTimeRef.current = null;
    
    setAnimationState((prev: AnimationState) => ({ ...prev, isAnimating: true }));
    onStart?.();
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [animate, enabled, onStart]);

  useEffect(() => {
    if (isIntersecting && enabled) {
      startAnimation();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isIntersecting, enabled, startAnimation]);

  const reset = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    hasStartedRef.current = false;
    startTimeRef.current = null;
    animationFrameRef.current = null;
    
    setAnimationState({
      progress: 0,
      isAnimating: false,
      isComplete: false,
    });
  }, []);

  return {
    elementRef,
    ...animationState,
    startAnimation,
    reset,
  };
}