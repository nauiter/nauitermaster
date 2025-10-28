import { useState, useEffect } from 'react';

export const useOnboarding = () => {
  const [hasSeenTour, setHasSeenTour] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the tour before
    const tourCompleted = localStorage.getItem('onboarding-tour-completed');
    if (!tourCompleted) {
      // Show tour after a short delay for better UX
      const timer = setTimeout(() => {
        setIsTourOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setHasSeenTour(true);
    }
  }, []);

  const startTour = () => {
    setIsTourOpen(true);
  };

  const completeTour = () => {
    setIsTourOpen(false);
    setHasSeenTour(true);
    localStorage.setItem('onboarding-tour-completed', 'true');
  };

  const skipTour = () => {
    setIsTourOpen(false);
    setHasSeenTour(true);
    localStorage.setItem('onboarding-tour-completed', 'true');
  };

  const resetTour = () => {
    localStorage.removeItem('onboarding-tour-completed');
    setHasSeenTour(false);
    setIsTourOpen(true);
  };

  return {
    hasSeenTour,
    isTourOpen,
    startTour,
    completeTour,
    skipTour,
    resetTour
  };
};