import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface SectionParticlesProps {
  count?: number;
  color?: 'primary' | 'secondary' | 'accent';
  magneticStrength?: number;
}

const colorVariants = {
  primary: 'bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF]',
  secondary: 'bg-gradient-to-r from-[#00C4FF] to-[#4CAF50]',
  accent: 'bg-gradient-to-r from-[#FF9800] to-[#7A5FFF]',
};

interface Particle {
  id: number;
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  opacity: number;
}

/**
 * SectionParticles Component
 * 
 * Floating animated particles with magnetic mouse interaction.
 * Particles react to cursor proximity with repulsion/attraction effect.
 * 
 * @example
 * <SectionParticles count={8} color="primary" magneticStrength={80} />
 */
export const SectionParticles = ({ 
  count = 6, 
  color = 'primary',
  magneticStrength = 60
}: SectionParticlesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1.5, // 1.5-4.5px
    initialX: Math.random() * 100, // 0-100%
    initialY: Math.random() * 100, // 0-100%
    duration: Math.random() * 20 + 15, // 15-35s
    delay: Math.random() * -10, // Stagger start times
    opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <ParticleElement
          key={particle.id}
          particle={particle}
          mousePosition={mousePosition}
          isHovering={isHovering}
          magneticStrength={magneticStrength}
          color={color}
        />
      ))}
    </div>
  );
};

interface ParticleElementProps {
  particle: Particle;
  mousePosition: { x: number; y: number };
  isHovering: boolean;
  magneticStrength: number;
  color: 'primary' | 'secondary' | 'accent';
}

const ParticleElement = ({ 
  particle, 
  mousePosition, 
  isHovering, 
  magneticStrength,
  color 
}: ParticleElementProps) => {
  const particleRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    try {
      if (!particleRef.current || !isHovering) {
        x.set(0);
        y.set(0);
        return;
      }

      const rect = particleRef.current.getBoundingClientRect();
      const particleX = rect.left + rect.width / 2;
      const particleY = rect.top + rect.height / 2;

      const offsetParent = particleRef.current.offsetParent;
      if (!offsetParent) {
        x.set(0);
        y.set(0);
        return;
      }

      const parentRect = offsetParent.getBoundingClientRect();
      
      // Calculate distance from mouse to particle
      const deltaX = mousePosition.x - (particleX - parentRect.left);
      const deltaY = mousePosition.y - (particleY - parentRect.top);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Apply magnetic effect (repulsion)
      if (distance < magneticStrength * 2) {
        const force = (1 - distance / (magneticStrength * 2)) * magneticStrength;
        const angle = Math.atan2(deltaY, deltaX);
        
        // Repulsion effect - push away from cursor
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    } catch (error) {
      console.error('Particle animation error:', error);
      x.set(0);
      y.set(0);
    }
  }, [mousePosition, isHovering, x, y, magneticStrength]);

  return (
    <motion.div
      ref={particleRef}
      className={`absolute rounded-full ${colorVariants[color]}`}
      style={{
        width: particle.size,
        height: particle.size,
        left: `${particle.initialX}%`,
        top: `${particle.initialY}%`,
        opacity: particle.opacity,
        filter: 'blur(1px)',
        boxShadow: `0 0 ${particle.size * 6}px currentColor`,
        x: springX,
        y: springY,
      }}
      animate={{
        x: [0, 30, -20, 40, 0],
        y: [0, -40, 30, -20, 0],
        opacity: [
          particle.opacity, 
          particle.opacity * 1.5, 
          particle.opacity * 0.5, 
          particle.opacity * 1.2, 
          particle.opacity
        ],
        scale: [1, 1.3, 0.8, 1.1, 1],
      }}
      transition={{
        duration: particle.duration,
        delay: particle.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};
