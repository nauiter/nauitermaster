import { useEffect, useState, RefObject, useRef } from 'react';
import { throttle } from '@/lib/utils';

interface ScrollAnimationOptions {
  threshold?: number;
  throttleMs?: number;
}

/**
 * Hook to detect when element enters viewport and trigger animations
 * Optimized with throttle and requestAnimationFrame for better performance
 */
export const useScrollAnimation = (
  ref: RefObject<HTMLElement>,
  options: ScrollAnimationOptions = {}
) => {
  const { threshold = 0.1, throttleMs = 100 } = options;
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>();
  const cachedRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const checkVisibility = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame to batch DOM reads
      rafRef.current = requestAnimationFrame(() => {
        if (!element) return;
        
        // Cache rect to avoid multiple getBoundingClientRect calls
        if (!cachedRectRef.current) {
          cachedRectRef.current = element.getBoundingClientRect();
        }
        
        const rect = cachedRectRef.current;
        const windowHeight = window.innerHeight;
        
        // Element is visible when threshold of it is in viewport
        const elementHeight = rect.height;
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visiblePercentage = visibleHeight / elementHeight;
        
        if (visiblePercentage >= threshold && !isVisible) {
          setIsVisible(true);
        }
      });
    };

    // Initial check
    checkVisibility();

    // Throttled scroll handler
    const throttledCheck = throttle(() => {
      cachedRectRef.current = null; // Invalidate cache
      checkVisibility();
    }, throttleMs);

    window.addEventListener('scroll', throttledCheck, { passive: true });
    window.addEventListener('resize', throttledCheck, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledCheck);
      window.removeEventListener('resize', throttledCheck);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [ref, threshold, throttleMs, isVisible]);

  return isVisible;
};

/**
 * Hook for gradient animation on scroll
 * Returns a value between 0 and 1 based on scroll progress through element
 * Optimized with requestAnimationFrame to prevent forced reflows
 */
export const useScrollGradient = (
  ref: RefObject<HTMLElement>,
  throttleMs: number = 16
) => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>();
  const cachedRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const calculateProgress = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame to batch DOM reads
      rafRef.current = requestAnimationFrame(() => {
        if (!element) return;
        
        // Cache rect to avoid multiple getBoundingClientRect calls
        if (!cachedRectRef.current) {
          cachedRectRef.current = element.getBoundingClientRect();
        }
        
        const rect = cachedRectRef.current;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress (0 to 1)
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Progress from 0 (top of viewport) to 1 (bottom of viewport)
        const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
        
        // Clamp between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        setProgress(clampedProgress);
      });
    };

    calculateProgress();

    const throttledCalculate = throttle(() => {
      cachedRectRef.current = null; // Invalidate cache
      calculateProgress();
    }, throttleMs);

    window.addEventListener('scroll', throttledCalculate, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledCalculate);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [ref, throttleMs]);

  return progress;
};
