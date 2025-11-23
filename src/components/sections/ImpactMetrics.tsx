import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { SectionTitle } from '@/components/ui/section-title';
import { METRICS, ANIMATION_CONFIG } from '@/lib/constants';

interface MetricCardProps {
  value: string | number;
  label: string;
  delay: number;
  isVisible: boolean;
  language: string;
}

const MetricCard = ({ value, label, delay, isVisible, language }: MetricCardProps) => {
  const displayValue = typeof value === 'number' 
    ? useCounterAnimation({ target: value, delay: isVisible ? delay : 0 })
    : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all"
    >
      <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] mb-2">
        {displayValue}
        {typeof value === 'string' && value.includes('+') && ''}
      </h3>
      <AnimatePresence mode="wait">
        <motion.p
          key={language}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-300 text-sm"
        >
          {label}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

export const ImpactMetrics = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: ANIMATION_CONFIG.INTERSECTION_THRESHOLD,
  });

  const metrics = [
    { value: METRICS.AI_VISUALS_GENERATED, label: t.impact.aiVisualsGenerated, delay: 100 },
    { value: METRICS.ECOSYSTEMS_BUILT, label: t.impact.ecosystemsBuilt, delay: 200 },
    { value: METRICS.AI_DRIVEN_BRANDS, label: t.impact.aiDrivenBrands, delay: 300 },
    { value: METRICS.IDEAS_IN_MOTION, label: t.impact.ideasInMotion, delay: 400 },
  ];

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-[#0A1A2F] to-[#0C1222] text-center"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header - Using SectionTitle Component */}
        <SectionTitle
          title={t.impact.title}
          subtitle={t.impact.subtitle}
          align="center"
          gradient="primary"
          dataAttr="impact-title"
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              value={metric.value}
              label={metric.label}
              delay={metric.delay}
              isVisible={isVisible}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
