import { motion } from 'framer-motion';

export const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Aurora Layer 1 - Vibrant Purple/Violet */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% -20%, rgba(138, 43, 226, 0.55), rgba(120, 119, 198, 0.35), transparent)',
          filter: 'blur(80px)',
        }}
        animate={{
          opacity: [0.5, 0.7, 0.6, 0.8, 0.5],
          scale: [1, 1.15, 1.08, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 2 - Electric Cyan/Blue */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 75% 65% at 70% 30%, rgba(0, 255, 255, 0.5), rgba(0, 196, 255, 0.3), transparent)',
          filter: 'blur(90px)',
        }}
        animate={{
          opacity: [0.6, 0.5, 0.7, 0.55, 0.6],
          x: [0, 60, -40, 50, 0],
          y: [0, -40, 30, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 3 - Vivid Green/Emerald */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 30% 40%, rgba(16, 185, 129, 0.45), rgba(52, 211, 153, 0.3), transparent)',
          filter: 'blur(85px)',
        }}
        animate={{
          opacity: [0.4, 0.6, 0.5, 0.65, 0.4],
          x: [0, -50, 40, -60, 0],
          y: [0, 50, -30, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 4 - Hot Pink/Magenta */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 80% 60%, rgba(236, 72, 153, 0.55), rgba(168, 85, 247, 0.4), transparent)',
          filter: 'blur(95px)',
        }}
        animate={{
          opacity: [0.55, 0.45, 0.65, 0.5, 0.55],
          x: [0, 70, -50, 60, 0],
          y: [0, -60, 50, -40, 0],
          scale: [1, 1.2, 1.1, 1.25, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 5 - Deep Indigo/Violet */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 20% 70%, rgba(99, 102, 241, 0.5), rgba(129, 140, 248, 0.35), transparent)',
          filter: 'blur(100px)',
        }}
        animate={{
          opacity: [0.5, 0.7, 0.55, 0.75, 0.5],
          x: [0, -40, 60, -50, 0],
          y: [0, 60, -50, 70, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Enhanced Shimmer overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, transparent 20%, rgba(255, 255, 255, 0.08) 50%, transparent 80%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Brighter stars effect */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px',
        }}
      />
    </div>
  );
};
