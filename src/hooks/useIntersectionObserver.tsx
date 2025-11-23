import { useEffect, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

/**
 * Custom hook for Intersection Observer API
 * @param elementRef - Ref to the element to observe
 * @param options - IntersectionObserver options
 * @returns Boolean indicating if element is visible
 */
export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  {
    threshold = 0.3,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = true,
  }: UseIntersectionObserverOptions = {}
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If already visible and frozen, don't observe
    if (freezeOnceVisible && isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);

        // Stop observing if frozen once visible
        if (freezeOnceVisible && isIntersecting) {
          observer.unobserve(element);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible, isVisible]);

  return isVisible;
};
