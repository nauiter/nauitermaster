import { motion } from "framer-motion";

interface SectionParticlesProps {
  count?: number;
  color?: 'primary' | 'secondary' | 'accent';
}

const colorVariants = {
  primary: 'bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF]',
  secondary: 'bg-gradient-to-r from-[#00C4FF] to-[#4CAF50]',
  accent: 'bg-gradient-to-r from-[#FF9800] to-[#7A5FFF]',
};

/**
 * SectionParticles Component
 * 
 * Floating animated particles for section borders creating cosmic atmosphere.
 * Uses Framer Motion for smooth, organic movement patterns.
 * 
 * @example
 * <SectionParticles count={8} color="primary" />
 */
export const SectionParticles = ({ count = 6, color = 'primary' }: SectionParticlesProps) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1, // 1-4px
    initialX: Math.random() * 100, // 0-100%
    initialY: Math.random() * 100, // 0-100%
    duration: Math.random() * 20 + 15, // 15-35s
    delay: Math.random() * -10, // Stagger start times
    opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${colorVariants[color]}`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            opacity: particle.opacity,
            filter: 'blur(1px)',
            boxShadow: `0 0 ${particle.size * 4}px currentColor`,
          }}
          animate={{
            x: [0, 30, -20, 40, 0],
            y: [0, -40, 30, -20, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity * 0.5, particle.opacity * 1.2, particle.opacity],
            scale: [1, 1.3, 0.8, 1.1, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
