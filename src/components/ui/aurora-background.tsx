import { motion } from 'framer-motion';

export const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Aurora Layer 1 - Vibrant Purple/Violet */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 70% at 50% -10%, rgba(138, 43, 226, 0.85), rgba(120, 119, 198, 0.6), transparent)',
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

      {/* Aurora Layer 2 - Electric Cyan/Blue */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 85% 75% at 70% 30%, rgba(0, 255, 255, 0.75), rgba(0, 196, 255, 0.5), transparent)',
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

      {/* Aurora Layer 3 - Vivid Green/Emerald */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 65% at 30% 40%, rgba(16, 185, 129, 0.7), rgba(52, 211, 153, 0.5), transparent)',
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

      {/* Aurora Layer 4 - Hot Pink/Magenta */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 80% 60%, rgba(236, 72, 153, 0.8), rgba(168, 85, 247, 0.6), transparent)',
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

      {/* Aurora Layer 5 - Deep Indigo/Violet */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 20% 70%, rgba(99, 102, 241, 0.75), rgba(129, 140, 248, 0.55), transparent)',
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

      {/* Subtle stars effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          backgroundPosition: '0 0, 40px 40px',
        }}
      />
    </div>
  );
};
