import { useEffect, useState, RefObject, useCallback, useRef } from 'react';
import { throttle } from '@/lib/utils';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  throttleMs?: number;
}

export const useParallax = (
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const { speed = 0.5, direction = 'up', throttleMs = 16 } = options; // 60fps throttle
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>();
  const cachedRectRef = useRef<DOMRect | null>(null);

  const handleScroll = useCallback(() => {
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Use requestAnimationFrame to batch DOM reads
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;

      const element = ref.current;
      
      // Cache rect to avoid multiple getBoundingClientRect calls
      if (!cachedRectRef.current) {
        cachedRectRef.current = element.getBoundingClientRect();
      }
      
      const rect = cachedRectRef.current;
      const windowHeight = window.innerHeight;
      const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
      
      // Calculate parallax offset based on scroll position
      const parallaxOffset = scrollPercent * 100 * speed;
      
      setOffset(direction === 'up' ? -parallaxOffset : parallaxOffset);
    });
  }, [ref, speed, direction]);

  useEffect(() => {
    // Reset cached rect on mount
    cachedRectRef.current = null;
    
    // Initial calculation
    handleScroll();

    // Throttled scroll handler for better performance
    const throttledScroll = throttle(() => {
      cachedRectRef.current = null; // Invalidate cache
      handleScroll();
    }, throttleMs);

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, throttleMs]);

  return offset;
};

// Hook for multiple parallax layers with different speeds
export const useMultiLayerParallax = (
  ref: RefObject<HTMLElement>,
  layers: number = 3,
  throttleMs: number = 16
) => {
  const [offsets, setOffsets] = useState<number[]>(Array(layers).fill(0));
  const rafRef = useRef<number>();
  const cachedRectRef = useRef<DOMRect | null>(null);

  const handleScroll = useCallback(() => {
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Use requestAnimationFrame to batch DOM reads
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;

      const element = ref.current;
      
      // Cache rect to avoid multiple getBoundingClientRect calls
      if (!cachedRectRef.current) {
        cachedRectRef.current = element.getBoundingClientRect();
      }
      
      const rect = cachedRectRef.current;
      const windowHeight = window.innerHeight;
      const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
      
      // Calculate offsets for each layer with different speeds
      const newOffsets = Array(layers)
        .fill(0)
        .map((_, index) => {
          const speed = 0.2 + (index * 0.15); // Progressive speeds: 0.2, 0.35, 0.5...
          return -scrollPercent * 100 * speed;
        });
      
      setOffsets(newOffsets);
    });
  }, [ref, layers]);

  useEffect(() => {
    // Reset cached rect
    cachedRectRef.current = null;
    
    handleScroll();

    // Throttled scroll handler for better performance
    const throttledScroll = throttle(() => {
      cachedRectRef.current = null; // Invalidate cache
      handleScroll();
    }, throttleMs);

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, throttleMs]);

  return offsets;
};
