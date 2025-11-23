import { useRef, CSSProperties } from 'react';
import { useScrollGradient } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedGradientProps {
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  children?: React.ReactNode;
}

/**
 * Gradient that animates based on scroll progress
 * Changes opacity and hue as user scrolls through the element
 */
export const AnimatedGradient = ({
  className,
  gradientFrom = 'from-purple-900/20',
  gradientTo = 'to-blue-900/20',
  children,
}: AnimatedGradientProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollGradient(ref);

  // Calculate dynamic gradient opacity based on scroll
  const opacity = 0.3 + (progress * 0.4); // 0.3 to 0.7
  const hueRotate = progress * 60; // 0 to 60 degrees

  const style: CSSProperties = {
    opacity,
    filter: `hue-rotate(${hueRotate}deg)`,
    transition: 'opacity 0.3s ease, filter 0.3s ease',
  };

  return (
    <div ref={ref} className="relative w-full">
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br',
          gradientFrom,
          gradientTo,
          className
        )}
        style={style}
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};

interface ScrollProgressBarProps {
  className?: string;
  color?: string;
}

/**
 * Progress bar that fills based on scroll position
 */
export const ScrollProgressBar = ({
  className,
  color = 'bg-primary',
}: ScrollProgressBarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollGradient(ref);

  return (
    <div ref={ref} className={cn('fixed top-0 left-0 right-0 h-1 z-50', className)}>
      <div
        className={cn('h-full transition-all duration-300', color)}
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};
