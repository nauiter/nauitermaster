import { motion } from 'framer-motion';

export const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Aurora Layer 1 - Purple/Violet */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.3), transparent)',
          filter: 'blur(60px)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.4, 0.6, 0.3],
          scale: [1, 1.1, 1.05, 1.15, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 2 - Cyan/Blue */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 70% 30%, rgba(0, 196, 255, 0.25), transparent)',
          filter: 'blur(70px)',
        }}
        animate={{
          opacity: [0.4, 0.3, 0.5, 0.35, 0.4],
          x: [0, 50, -30, 40, 0],
          y: [0, -30, 20, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 3 - Green/Teal */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(76, 175, 80, 0.2), transparent)',
          filter: 'blur(65px)',
        }}
        animate={{
          opacity: [0.25, 0.4, 0.3, 0.45, 0.25],
          x: [0, -40, 30, -50, 0],
          y: [0, 40, -20, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 4 - Pink/Magenta */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 80% 60%, rgba(168, 85, 247, 0.28), transparent)',
          filter: 'blur(75px)',
        }}
        animate={{
          opacity: [0.35, 0.25, 0.45, 0.3, 0.35],
          x: [0, 60, -40, 50, 0],
          y: [0, -50, 40, -30, 0],
          scale: [1, 1.15, 1.05, 1.2, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Layer 5 - Violet Accent */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 20% 70%, rgba(122, 95, 255, 0.3), transparent)',
          filter: 'blur(80px)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.35, 0.55, 0.3],
          x: [0, -30, 50, -40, 0],
          y: [0, 50, -40, 60, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.03) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle stars effect */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px',
        }}
      />
    </div>
  );
};
