import { useEffect, useState, RefObject, useCallback } from 'react';
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

  const handleScroll = useCallback(() => {
    if (!ref.current) return;

    const element = ref.current;
    const rect = element.getBoundingClientRect();
    const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    
    // Calculate parallax offset based on scroll position
    const parallaxOffset = scrollPercent * 100 * speed;
    
    setOffset(direction === 'up' ? -parallaxOffset : parallaxOffset);
  }, [ref, speed, direction]);

  useEffect(() => {
    // Initial calculation
    handleScroll();

    // Throttled scroll handler for better performance
    const throttledScroll = throttle(handleScroll, throttleMs);

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
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

  const handleScroll = useCallback(() => {
    if (!ref.current) return;

    const element = ref.current;
    const rect = element.getBoundingClientRect();
    const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    
    // Calculate offsets for each layer with different speeds
    const newOffsets = Array(layers)
      .fill(0)
      .map((_, index) => {
        const speed = 0.2 + (index * 0.15); // Progressive speeds: 0.2, 0.35, 0.5...
        return -scrollPercent * 100 * speed;
      });
    
    setOffsets(newOffsets);
  }, [ref, layers]);

  useEffect(() => {
    handleScroll();

    // Throttled scroll handler for better performance
    const throttledScroll = throttle(handleScroll, throttleMs);

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll, throttleMs]);

  return offsets;
};
