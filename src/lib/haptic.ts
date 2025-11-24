/**
 * Haptic Feedback Utilities for Mobile Devices
 * Provides vibration feedback for touch interactions
 */

export type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

const hapticPatterns: Record<HapticPattern, number | number[]> = {
  light: 10,           // Quick tap
  medium: 20,          // Standard interaction
  heavy: 30,           // Important action
  success: [10, 50, 10], // Success pattern
  warning: [20, 100, 20], // Warning pattern
  error: [30, 100, 30, 100, 30], // Error pattern
};

/**
 * Check if haptic feedback is supported
 */
export const isHapticSupported = (): boolean => {
  return 'vibrate' in navigator;
};

/**
 * Trigger haptic feedback
 * @param pattern - Predefined haptic pattern or custom duration/pattern
 */
export const triggerHaptic = (pattern: HapticPattern = 'light'): void => {
  if (!isHapticSupported()) {
    return;
  }

  try {
    const vibrationPattern = hapticPatterns[pattern];
    navigator.vibrate(vibrationPattern);
  } catch (error) {
    console.warn('Haptic feedback failed:', error);
  }
};

/**
 * Cancel any ongoing vibration
 */
export const cancelHaptic = (): void => {
  if (isHapticSupported()) {
    navigator.vibrate(0);
  }
};

/**
 * Trigger haptic only on mobile devices
 */
export const triggerMobileHaptic = (pattern: HapticPattern = 'light'): void => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    triggerHaptic(pattern);
  }
};
