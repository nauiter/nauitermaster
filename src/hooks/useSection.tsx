import { useMemo } from 'react';

export interface UseSectionOptions {
  /** Container max width preset */
  containerWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  /** Vertical padding preset */
  paddingY?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  /** Horizontal padding preset */
  paddingX?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  /** Background variant */
  background?: 'dark' | 'cosmic' | 'gradient-dark' | 'gradient-light';
}

export interface UseSectionReturn {
  /** CSS classes for section wrapper */
  sectionClasses: string;
  /** CSS classes for container */
  containerClasses: string;
  /** Recommended container width */
  containerWidth: string;
  /** Recommended padding Y */
  paddingY: string;
  /** Recommended padding X */
  paddingX: string;
  /** Background class */
  background: string;
}

const containerWidthMap = {
  sm: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-4xl',
  xl: 'max-w-5xl',
  '2xl': 'max-w-6xl',
  '3xl': 'max-w-7xl',
  '4xl': 'max-w-screen-xl',
  '5xl': 'max-w-screen-2xl',
  '6xl': 'max-w-[1600px]',
  '7xl': 'max-w-[1800px]',
  full: 'max-w-full',
};

const paddingYMap = {
  none: 'py-0',
  sm: 'py-12',
  md: 'py-16',
  lg: 'py-24',
  xl: 'py-32',
};

const paddingXMap = {
  none: 'px-0',
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-8',
  xl: 'px-12',
};

const backgroundMap = {
  dark: 'bg-[#0B1623]',
  cosmic: 'bg-gradient-to-b from-[#05010E] via-[#0A1A2F] to-[#0C1222]',
  'gradient-dark': 'bg-gradient-to-b from-[#0C1222] to-[#05010E]',
  'gradient-light': 'bg-gradient-to-b from-[#0A1A2F] to-[#0C1222]',
};

/**
 * useSection Hook
 * 
 * Standardizes section structure with consistent container, padding, and background.
 * Returns optimized classes and configuration for section components.
 * 
 * Features:
 * - Memoized class generation for performance
 * - Type-safe presets
 * - Consistent spacing across portfolio
 * - Easy customization
 * 
 * @example
 * const { sectionClasses, containerClasses } = useSection({
 *   containerWidth: '7xl',
 *   paddingY: 'lg',
 *   background: 'gradient-dark'
 * });
 * 
 * return (
 *   <section className={sectionClasses}>
 *     <div className={containerClasses}>
 *       <SectionTitle title="My Section" />
 *       <Content />
 *     </div>
 *   </section>
 * );
 */
export const useSection = ({
  containerWidth = '7xl',
  paddingY = 'lg',
  paddingX = 'md',
  background = 'gradient-dark',
}: UseSectionOptions = {}): UseSectionReturn => {
  const sectionClasses = useMemo(
    () => `${backgroundMap[background]} ${paddingYMap[paddingY]} relative`,
    [background, paddingY]
  );

  const containerClasses = useMemo(
    () => `${containerWidthMap[containerWidth]} ${paddingXMap[paddingX]} mx-auto`,
    [containerWidth, paddingX]
  );

  return {
    sectionClasses,
    containerClasses,
    containerWidth: containerWidthMap[containerWidth],
    paddingY: paddingYMap[paddingY],
    paddingX: paddingXMap[paddingX],
    background: backgroundMap[background],
  };
};
