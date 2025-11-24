import { useCallback } from 'react';

interface RippleConfig {
  color?: string;
  duration?: number;
  size?: number;
}

/**
 * Hook to create ripple effect on touch/click
 * Synchronized with haptic feedback for enhanced sensory response
 */
export const useRippleEffect = (config: RippleConfig = {}) => {
  const {
    color = 'rgba(122, 95, 255, 0.4)',
    duration = 600,
    size = 100,
  } = config;

  const createRipple = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      
      // Get touch or mouse position
      let x: number, y: number;
      if ('touches' in event) {
        const touch = event.touches[0] || event.changedTouches[0];
        x = touch.clientX - rect.left;
        y = touch.clientY - rect.top;
      } else {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
      }

      // Create ripple element
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: ${color};
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        pointer-events: none;
        transform: scale(0);
        opacity: 1;
        animation: ripple-animation ${duration}ms ease-out;
        z-index: 9999;
      `;

      // Ensure parent has relative positioning
      const currentPosition = window.getComputedStyle(target).position;
      if (currentPosition === 'static') {
        target.style.position = 'relative';
      }

      // Ensure parent has overflow hidden for clean effect
      target.style.overflow = 'hidden';

      // Add ripple to target
      target.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, duration);
    },
    [color, duration, size]
  );

  return { createRipple };
};
