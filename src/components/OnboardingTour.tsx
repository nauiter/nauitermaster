import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  highlightClass?: string;
}

interface OnboardingTourProps {
  steps: TourStep[];
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({
  steps,
  isOpen,
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);

  // Emergency escape with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onSkip();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onSkip]);

  useEffect(() => {
    if (!isOpen || steps.length === 0) return;

    let rafId: number | null = null;
    let resizeTicking = false;
    let scrollTicking = false;

    const updateTooltipPosition = () => {
      const target = document.querySelector(steps[currentStep].target);
      if (!target) return;

      rafId = window.requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const modalWidth = 384; // max-w-sm = 24rem = 384px
        const modalHeight = 300; // estimated modal height
        
        let top = 0;
        let left = 0;

        switch (steps[currentStep].position) {
          case 'top':
            top = rect.top + scrollTop - modalHeight - 20;
            left = rect.left + scrollLeft + rect.width / 2;
            break;
          case 'bottom':
            top = rect.bottom + scrollTop + 20;
            left = rect.left + scrollLeft + rect.width / 2;
            break;
          case 'left':
            top = rect.top + scrollTop + rect.height / 2;
            left = rect.left + scrollLeft - modalWidth - 20;
            break;
          case 'right':
            top = rect.top + scrollTop + rect.height / 2;
            left = rect.right + scrollLeft + 20;
            break;
        }

        // Ensure modal stays within viewport bounds
        const padding = 20;
        
        // Constrain horizontal position
        if (left + modalWidth > viewportWidth + scrollLeft) {
          left = viewportWidth + scrollLeft - modalWidth - padding;
        }
        if (left < scrollLeft + padding) {
          left = scrollLeft + padding;
        }
        
        // Constrain vertical position
        if (top + modalHeight > viewportHeight + scrollTop) {
          top = viewportHeight + scrollTop - modalHeight - padding;
        }
        if (top < scrollTop + padding) {
          top = scrollTop + padding;
        }

        // Ensure modal is always visible
        top = Math.max(scrollTop + 20, Math.min(top, scrollTop + viewportHeight - 400));
        left = Math.max(scrollLeft + 20, Math.min(left, scrollLeft + viewportWidth - 400));

        setTooltipPosition({ top, left });

        resizeTicking = false;
        scrollTicking = false;
      });
    };

    // Initial position update
    updateTooltipPosition();

    // Scroll element into view once
    const target = document.querySelector(steps[currentStep].target);
    if (target) {
      target.classList.add('tour-highlight');
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'center'
      });
    }

    const handleResize = () => {
      if (!resizeTicking) {
        updateTooltipPosition();
        resizeTicking = true;
      }
    };

    const handleScroll = () => {
      if (!scrollTicking) {
        updateTooltipPosition();
        scrollTicking = true;
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      
      // Remove highlight from all elements
      document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight');
      });
    };
  }, [currentStep, isOpen, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  if (!isOpen || steps.length === 0) return null;

  const currentStepData = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={handleSkip}
      />

      {/* Emergency Exit Button - Always Visible */}
      <Button
        onClick={handleSkip}
        className="fixed top-4 right-4 z-[70] bg-destructive text-destructive-foreground hover:bg-destructive/90"
        size="sm"
      >
        <X className="w-4 h-4 mr-1" />
        Exit Tour
      </Button>

      {/* Tooltip - Always Visible */}
      <Card
        className="fixed z-[60] w-96 max-w-[calc(100vw-40px)] max-h-[calc(100vh-40px)] p-4 shadow-2xl border-2 animate-scale-in overflow-y-auto"
        style={{
          top: Math.max(20, Math.min(tooltipPosition.top, window.innerHeight - 400)),
          left: Math.max(20, Math.min(tooltipPosition.left, window.innerWidth - 400)),
          transform: 'none'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <h3 className="font-semibold text-sm">
              {currentStepData.title}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="h-6 w-6 p-0 hover:bg-destructive/10"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>

        {/* Content */}
        <p className="text-sm text-muted-foreground mb-4">
          {currentStepData.content}
        </p>

        {/* Progress */}
        <div className="flex items-center gap-1 mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-colors ${
                index <= currentStep ? 'bg-accent' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={isFirst}
              className="h-8"
            >
              <ChevronLeft className="w-3 h-3 mr-1" />
              Back
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSkip}
              className="h-8"
            >
              Skip Tour
            </Button>
          </div>
          
          <Button
            onClick={handleNext}
            size="sm"
            className="h-8"
          >
            {isLast ? 'Finish' : 'Next'}
            {!isLast && <ChevronRight className="w-3 h-3 ml-1" />}
          </Button>
        </div>

        {/* Step counter */}
        <div className="text-xs text-muted-foreground mt-2 text-center">
          Step {currentStep + 1} of {steps.length}
        </div>
      </Card>

    </>
  );
};