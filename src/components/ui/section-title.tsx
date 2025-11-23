import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SectionTitleProps {
  /** Main title text - always visible for SEO */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Alignment of text */
  align?: 'left' | 'center' | 'right';
  /** Custom className for the container */
  className?: string;
  /** Custom className for the title */
  titleClassName?: string;
  /** Custom className for the subtitle */
  subtitleClassName?: string;
  /** Enable subtitle animation (title is always static for SEO) */
  animateSubtitle?: boolean;
  /** HTML heading level (default: h2) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Gradient variant for title */
  gradient?: 'primary' | 'secondary' | 'accent' | 'none';
  /** Optional icon before title */
  icon?: ReactNode;
  /** Data attribute for tour/tracking */
  dataAttr?: string;
}

const gradientClasses = {
  primary: 'bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF]',
  secondary: 'bg-gradient-to-r from-[#00C4FF] to-[#7A5FFF]',
  accent: 'bg-gradient-to-r from-[#FF9800] to-[#4CAF50]',
  none: '',
};

const alignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

/**
 * SectionTitle Component
 * 
 * Reusable, SEO-friendly section title component with guaranteed visibility.
 * 
 * Features:
 * - Always visible (CSS-guaranteed with inline styles)
 * - SEO-optimized (static H2, no animation dependencies)
 * - Accessible (WCAG AA contrast, semantic HTML)
 * - Responsive typography
 * - Optional animated subtitle
 * - Customizable gradients and alignment
 * 
 * @example
 * <SectionTitle
 *   title="Showcase Projects"
 *   subtitle="Intersection of AI, storytelling, and digital strategy."
 *   align="center"
 *   gradient="primary"
 * />
 */
export const SectionTitle = ({
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  subtitleClassName,
  animateSubtitle = true,
  as: Tag = 'h2',
  gradient = 'primary',
  icon,
  dataAttr,
}: SectionTitleProps) => {
  const baseGradientClass = gradient !== 'none' 
    ? `text-transparent bg-clip-text ${gradientClasses[gradient]}`
    : 'text-white';

  return (
    <div 
      className={cn(alignmentClasses[align], 'mb-16', className)}
      data-section-title={dataAttr}
    >
      {/* Main Title - Static for SEO */}
      <Tag
        className={cn(
          'text-3xl md:text-5xl font-bold mb-4',
          baseGradientClass,
          titleClassName
        )}
        style={{
          opacity: 1,
          visibility: 'visible',
          display: 'block',
        }}
      >
        {icon && <span className="inline-flex items-center mr-3">{icon}</span>}
        {title}
      </Tag>

      {/* Subtitle - Optional Animation */}
      {subtitle && (
        <>
          {animateSubtitle ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn(
                'text-gray-400 text-lg max-w-2xl',
                align === 'center' && 'mx-auto',
                align === 'right' && 'ml-auto',
                subtitleClassName
              )}
            >
              {subtitle}
            </motion.p>
          ) : (
            <p
              className={cn(
                'text-gray-400 text-lg max-w-2xl',
                align === 'center' && 'mx-auto',
                align === 'right' && 'ml-auto',
                subtitleClassName
              )}
            >
              {subtitle}
            </p>
          )}
        </>
      )}
    </div>
  );
};
