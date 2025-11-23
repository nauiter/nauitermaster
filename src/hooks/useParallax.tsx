import { useEffect, useState, RefObject } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
}

export const useParallax = (
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const { speed = 0.5, direction = 'up' } = options;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      
      // Calculate parallax offset based on scroll position
      const parallaxOffset = scrollPercent * 100 * speed;
      
      setOffset(direction === 'up' ? -parallaxOffset : parallaxOffset);
    };

    // Initial calculation
    handleScroll();

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, speed, direction]);

  return offset;
};

// Hook for multiple parallax layers with different speeds
export const useMultiLayerParallax = (
  ref: RefObject<HTMLElement>,
  layers: number = 3
) => {
  const [offsets, setOffsets] = useState<number[]>(Array(layers).fill(0));

  useEffect(() => {
    const handleScroll = () => {
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
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, layers]);

  return offsets;
};
