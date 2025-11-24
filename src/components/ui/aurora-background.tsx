import { motion } from 'framer-motion';

type AuroraVariant = 'default' | 'warm' | 'cool' | 'nature' | 'sunset' | 'ocean';

interface AuroraBackgroundProps {
  variant?: AuroraVariant;
}

const colorSchemes = {
  default: {
    layer1: 'radial-gradient(ellipse 100% 70% at 50% -10%, rgba(138, 43, 226, 0.85), rgba(120, 119, 198, 0.6), transparent)',
    layer2: 'radial-gradient(ellipse 85% 75% at 70% 30%, rgba(0, 255, 255, 0.75), rgba(0, 196, 255, 0.5), transparent)',
    layer3: 'radial-gradient(ellipse 80% 65% at 30% 40%, rgba(16, 185, 129, 0.7), rgba(52, 211, 153, 0.5), transparent)',
    layer4: 'radial-gradient(ellipse 80% 70% at 80% 60%, rgba(236, 72, 153, 0.8), rgba(168, 85, 247, 0.6), transparent)',
    layer5: 'radial-gradient(ellipse 70% 60% at 20% 70%, rgba(99, 102, 241, 0.75), rgba(129, 140, 248, 0.55), transparent)',
  },
  warm: {
    layer1: 'radial-gradient(ellipse 100% 70% at 50% -10%, rgba(255, 107, 0, 0.85), rgba(255, 140, 50, 0.6), transparent)',
    layer2: 'radial-gradient(ellipse 85% 75% at 70% 30%, rgba(255, 69, 0, 0.75), rgba(255, 100, 50, 0.5), transparent)',
    layer3: 'radial-gradient(ellipse 80% 65% at 30% 40%, rgba(255, 200, 0, 0.7), rgba(255, 220, 100, 0.5), transparent)',
    layer4: 'radial-gradient(ellipse 80% 70% at 80% 60%, rgba(220, 38, 38, 0.8), rgba(239, 68, 68, 0.6), transparent)',
    layer5: 'radial-gradient(ellipse 70% 60% at 20% 70%, rgba(234, 88, 12, 0.75), rgba(251, 146, 60, 0.55), transparent)',
  },
  cool: {
    layer1: 'radial-gradient(ellipse 100% 70% at 50% -10%, rgba(59, 130, 246, 0.85), rgba(96, 165, 250, 0.6), transparent)',
    layer2: 'radial-gradient(ellipse 85% 75% at 70% 30%, rgba(14, 165, 233, 0.75), rgba(56, 189, 248, 0.5), transparent)',
    layer3: 'radial-gradient(ellipse 80% 65% at 30% 40%, rgba(99, 102, 241, 0.7), rgba(129, 140, 248, 0.5), transparent)',
    layer4: 'radial-gradient(ellipse 80% 70% at 80% 60%, rgba(139, 92, 246, 0.8), rgba(167, 139, 250, 0.6), transparent)',
    layer5: 'radial-gradient(ellipse 70% 60% at 20% 70%, rgba(6, 182, 212, 0.75), rgba(34, 211, 238, 0.55), transparent)',
  },
  nature: {
    layer1: 'radial-gradient(ellipse 100% 70% at 50% -10%, rgba(34, 197, 94, 0.85), rgba(74, 222, 128, 0.6), transparent)',
    layer2: 'radial-gradient(ellipse 85% 75% at 70% 30%, rgba(21, 128, 61, 0.75), rgba(34, 197, 94, 0.5), transparent)',
    layer3: 'radial-gradient(ellipse 80% 65% at 30% 40%, rgba(132, 204, 22, 0.7), rgba(163, 230, 53, 0.5), transparent)',
    layer4: 'radial-gradient(ellipse 80% 70% at 80% 60%, rgba(16, 185, 129, 0.8), rgba(52, 211, 153, 0.6), transparent)',
    layer5: 'radial-gradient(ellipse 70% 60% at 20% 70%, rgba(5, 150, 105, 0.75), rgba(16, 185, 129, 0.55), transparent)',
  },
  sunset: {
    layer1: 'radial-gradient(ellipse 100% 70% at 50% -10%, rgba(249, 115, 22, 0.85), rgba(251, 146, 60, 0.6), transparent)',
    layer2: 'radial-gradient(ellipse 85% 75% at 70% 30%, rgba(236, 72, 153, 0.75), rgba(244, 114, 182, 0.5), transparent)',
    layer3: 'radial-gradient(ellipse 80% 65% at 30% 40%, rgba(139, 92, 246, 0.7), rgba(167, 139, 250, 0.5), transparent)',
    layer4: 'radial-gradient(ellipse 80% 70% at 80% 60%, rgba(244, 63, 94, 0.8), rgba(251, 113, 133, 0.6), transparent)',
    layer5: 'radial-gradient(ellipse 70% 60% at 20% 70%, rgba(217, 70, 239, 0.75), rgba(232, 121, 249, 0.55), transparent)',
  },
  ocean: {
    layer1: 'radial-gradient(ellipse 100% 70% at 50% -10%, rgba(6, 182, 212, 0.85), rgba(34, 211, 238, 0.6), transparent)',
    layer2: 'radial-gradient(ellipse 85% 75% at 70% 30%, rgba(14, 165, 233, 0.75), rgba(56, 189, 248, 0.5), transparent)',
    layer3: 'radial-gradient(ellipse 80% 65% at 30% 40%, rgba(20, 184, 166, 0.7), rgba(45, 212, 191, 0.5), transparent)',
    layer4: 'radial-gradient(ellipse 80% 70% at 80% 60%, rgba(59, 130, 246, 0.8), rgba(96, 165, 250, 0.6), transparent)',
    layer5: 'radial-gradient(ellipse 70% 60% at 20% 70%, rgba(16, 185, 129, 0.75), rgba(52, 211, 153, 0.55), transparent)',
  },
};

export const AuroraBackground = ({ variant = 'default' }: AuroraBackgroundProps) => {
  const colors = colorSchemes[variant];

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Aurora Layer 1 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: colors.layer1,
          filter: 'blur(50px)',
        }}
        animate={{
          opacity: [0.75, 0.95, 0.85, 1, 0.75],
          scale: [1, 1.2, 1.15, 1.25, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 2 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: colors.layer2,
          filter: 'blur(60px)',
        }}
        animate={{
          opacity: [0.8, 0.7, 0.9, 0.75, 0.8],
          x: [0, 70, -50, 60, 0],
          y: [0, -50, 40, -60, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 3 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: colors.layer3,
          filter: 'blur(55px)',
        }}
        animate={{
          opacity: [0.65, 0.85, 0.75, 0.9, 0.65],
          x: [0, -60, 50, -70, 0],
          y: [0, 60, -40, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 4 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: colors.layer4,
          filter: 'blur(65px)',
        }}
        animate={{
          opacity: [0.75, 0.65, 0.85, 0.7, 0.75],
          x: [0, 80, -60, 70, 0],
          y: [0, -70, 60, -50, 0],
          scale: [1, 1.25, 1.15, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 5 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: colors.layer5,
          filter: 'blur(70px)',
        }}
        animate={{
          opacity: [0.7, 0.9, 0.75, 0.95, 0.7],
          x: [0, -50, 70, -60, 0],
          y: [0, 70, -60, 80, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Enhanced Shimmer overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, transparent 10%, rgba(255, 255, 255, 0.15) 50%, transparent 90%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Brighter stars effect */}
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 1) 1.5px, transparent 1.5px)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px',
        }}
      />
    </div>
  );
};
