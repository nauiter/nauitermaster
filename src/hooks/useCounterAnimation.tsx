import { useState, useEffect } from 'react';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface UseCounterAnimationOptions {
  target: number;
  duration?: number;
  steps?: number;
  delay?: number;
}

/**
 * Custom hook for animating number counters
 * @param target - Target number to count up to
 * @param duration - Duration of animation in ms (default: 2000)
 * @param steps - Number of steps in animation (default: 60)
 * @param delay - Delay before starting animation in ms (default: 0)
 * @returns Current animated count value
 */
export const useCounterAnimation = ({
  target,
  duration = ANIMATION_CONFIG.COUNTER_DURATION,
  steps = ANIMATION_CONFIG.COUNTER_STEPS,
  delay = 0,
}: UseCounterAnimationOptions): number => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration, steps]);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  return count;
};
