import { ReactNode } from 'react';
import { SectionTitle, SectionTitleProps } from '@/components/ui/section-title';
import { cn } from '@/lib/utils';

export interface SectionProps {
  /** Section ID for navigation/anchors */
  id: string;
  /** Section title configuration */
  title: Omit<SectionTitleProps, 'className'>;
  /** Children content */
  children: ReactNode;
  /** Background variant */
  background?: 'dark' | 'cosmic' | 'gradient-dark' | 'gradient-light' | 'custom';
  /** Custom background className */
  backgroundClassName?: string;
  /** Container max width */
  containerWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  /** Vertical padding */
  paddingY?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  /** Horizontal padding */
  paddingX?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  /** Custom className for section wrapper */
  className?: string;
  /** Custom className for container */
  containerClassName?: string;
  /** Data attribute for tour/tracking */
  dataTour?: string;
  /** Show section title */
  showTitle?: boolean;
}

const backgroundVariants = {
  dark: 'bg-[#0B1623]',
  cosmic: 'bg-gradient-to-b from-[#05010E] via-[#0A1A2F] to-[#0C1222]',
  'gradient-dark': 'bg-gradient-to-b from-[#0C1222] to-[#05010E]',
  'gradient-light': 'bg-gradient-to-b from-[#0A1A2F] to-[#0C1222]',
  custom: '',
};

const containerWidths = {
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

const paddingYVariants = {
  none: 'py-0',
  sm: 'py-12',
  md: 'py-16',
  lg: 'py-24',
  xl: 'py-32',
};

const paddingXVariants = {
  none: 'px-0',
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-8',
  xl: 'px-12',
};

/**
 * Section Component
 * 
 * Standardized section wrapper with title, container, padding, and background.
 * 
 * Features:
 * - Automatic SectionTitle integration
 * - Responsive container widths
 * - Predefined background variants
 * - Flexible padding system
 * - SEO-optimized structure
 * - Consistent spacing across portfolio
 * 
 * @example
 * <Section
 *   id="projects"
 *   title={{
 *     title: "Showcase Projects",
 *     subtitle: "My latest work",
 *     gradient: "primary"
 *   }}
 *   background="gradient-dark"
 *   containerWidth="7xl"
 *   paddingY="lg"
 * >
 *   <ProjectsGrid />
 * </Section>
 */
export const Section = ({
  id,
  title,
  children,
  background = 'gradient-dark',
  backgroundClassName,
  containerWidth = '7xl',
  paddingY = 'lg',
  paddingX = 'md',
  className,
  containerClassName,
  dataTour,
  showTitle = true,
}: SectionProps) => {
  const bgClass = background === 'custom' ? backgroundClassName : backgroundVariants[background];
  const containerWidthClass = containerWidths[containerWidth];
  const paddingYClass = paddingYVariants[paddingY];
  const paddingXClass = paddingXVariants[paddingX];

  return (
    <section
      id={id}
      className={cn(bgClass, paddingYClass, 'relative', className)}
      data-tour={dataTour}
    >
      <div className={cn(containerWidthClass, paddingXClass, 'mx-auto', containerClassName)}>
        {/* Section Title */}
        {showTitle && <SectionTitle {...title} />}

        {/* Section Content */}
        {children}
      </div>
    </section>
  );
};
