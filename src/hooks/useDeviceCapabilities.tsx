import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  isMobile: boolean;
  isLowEnd: boolean;
  canHandleHeavyAnimations: boolean;
  canHandleParticles: boolean;
  connectionSpeed: 'slow' | 'medium' | 'fast';
}

/**
 * Hook to detect device capabilities and optimize performance
 * Prevents crashes on low-end mobile devices
 */
export const useDeviceCapabilities = (): DeviceCapabilities => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isLowEnd: false,
    canHandleHeavyAnimations: true,
    canHandleParticles: true,
    connectionSpeed: 'fast',
  });

  useEffect(() => {
    try {
      const checkCapabilities = () => {
        // Mobile detection
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;

        // Memory detection (if available)
        const deviceMemory = (navigator as any).deviceMemory || 8;
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;

        // Connection speed detection
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        let connectionSpeed: 'slow' | 'medium' | 'fast' = 'fast';
        
        if (connection) {
          const effectiveType = connection.effectiveType;
          if (effectiveType === 'slow-2g' || effectiveType === '2g') {
            connectionSpeed = 'slow';
          } else if (effectiveType === '3g') {
            connectionSpeed = 'medium';
          }
        }

        // Low-end device detection
        // Consider low-end if: mobile + (low memory OR low cores OR slow connection)
        const isLowEnd = isMobile && (
          deviceMemory < 4 || 
          hardwareConcurrency < 4 || 
          connectionSpeed === 'slow'
        );

        // Battery level check (if on battery and low, reduce performance)
        let onLowBattery = false;
        if ('getBattery' in navigator) {
          (navigator as any).getBattery().then((battery: any) => {
            if (!battery.charging && battery.level < 0.2) {
              onLowBattery = true;
            }
          }).catch(() => {
            // Battery API not available, ignore
          });
        }

        setCapabilities({
          isMobile,
          isLowEnd,
          canHandleHeavyAnimations: !isLowEnd && !onLowBattery,
          canHandleParticles: !isLowEnd && !onLowBattery,
          connectionSpeed,
        });
      };

      checkCapabilities();

      // Re-check on resize (orientation change)
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkCapabilities, 250);
      };

      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
      };
    } catch (error) {
      console.error('Failed to detect device capabilities:', error);
      // Safe fallback: assume low-end to prevent crashes
      setCapabilities({
        isMobile: true,
        isLowEnd: true,
        canHandleHeavyAnimations: false,
        canHandleParticles: false,
        connectionSpeed: 'medium',
      });
    }
  }, []);

  return capabilities;
};
