import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import type { Container, Engine } from "@tsparticles/engine";
import { Download, Sparkles, Palette, Wand2, Zap, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import portfolioAvatar from "@/assets/portfolio-avatar.webp";
import { useLanguage } from "@/hooks/useLanguage";
import { PARTICLES_OPTIONS } from "@/lib/particlesConfig";

const Particles = lazy(() => import("@tsparticles/react"));

export const HeroSection = () => {
  const { t } = useLanguage();
  const [init, setInit] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Skip particles on mobile for better performance and stability
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
      setInit(false);
      return;
    }

    // Defer particle initialization until after LCP to reduce render blocking
    const initParticles = async () => {
      try {
        const { initParticlesEngine } = await import("@tsparticles/react");
        const { loadSlim } = await import("@tsparticles/slim");
        
        await initParticlesEngine(async (engine: Engine) => {
          await loadSlim(engine);
        });
        setInit(true);
      } catch (error) {
        console.error('Failed to initialize particles:', error);
        // Continue without particles
        setInit(false);
      }
    };
    
    // Delay particle initialization to prioritize LCP image rendering
    const timer = setTimeout(() => {
      initParticles();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log('Particles loaded successfully');
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20 sm:pt-16 bg-[#0c1324]"
      data-tour="welcome"
    >
      {/* Aurora Borealis Background */}
      <AuroraBackground />

      {/* Particles Background */}
      {init && (
        <Suspense fallback={<div className="absolute inset-0 z-0" />}>
          <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            className="absolute inset-0 z-0"
            options={PARTICLES_OPTIONS}
          />
        </Suspense>
      )}
      
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10 px-4">
        {/* Profile Image with Enhanced Glow - Optimized for LCP */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <img
            src={portfolioAvatar}
            alt="Nauiter Master - Estrategista de IA, artista digital especializado em automação criativa e educação | AI Strategist, digital artist specialized in creative automation and education"
            className="w-40 h-40 sm:w-56 sm:h-56 rounded-full border-[3px] border-white/30 shadow-2xl object-cover"
            style={{ 
              filter: "drop-shadow(0 0 20px rgba(122, 95, 255, 0.4))",
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) rotate(3deg) translateZ(0)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 40px rgba(0, 196, 255, 0.6))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(0)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(122, 95, 255, 0.4))';
            }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={224}
            height={224}
          />
        </div>

        {/* Title & Description */}
        <motion.div 
          className="space-y-4 sm:space-y-6 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            willChange: 'opacity, transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          <h1 
            className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            <span className="block text-white mb-2 sm:mb-3">Nauiter Master</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] via-[#A855F7] to-[#00C4FF]">
              {t.hero.subtitle}
            </span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2">
            {t.hero.description}
          </p>
        </motion.div>

        {/* Animated Skill Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6 px-4 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <AnimatedBadge 
            icon={<Brain className="w-6 h-6 text-[#7A5FFF]" />}
            label={t.badges.aiStrategy.label}
            description={t.badges.aiStrategy.description}
            delay={0.1}
            color="purple"
          />
          <AnimatedBadge 
            icon={<Palette className="w-6 h-6 text-[#00C4FF]" />}
            label={t.badges.digitalArt.label}
            description={t.badges.digitalArt.description}
            delay={0.2}
            color="cyan"
          />
          <AnimatedBadge 
            icon={<Wand2 className="w-6 h-6 text-[#EC4899]" />}
            label={t.badges.promptEng.label}
            description={t.badges.promptEng.description}
            delay={0.3}
            color="pink"
          />
          <AnimatedBadge 
            icon={<Zap className="w-6 h-6 text-[#10B981]" />}
            label={t.badges.automation.label}
            description={t.badges.automation.description}
            delay={0.4}
            color="green"
          />
          <AnimatedBadge 
            icon={<Sparkles className="w-6 h-6 text-[#7A5FFF]" />}
            label={t.badges.creativeAI.label}
            description={t.badges.creativeAI.description}
            delay={0.5}
            color="purple"
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button
            asChild
            size="lg"
            className="relative overflow-hidden bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] hover:opacity-90 transition-all shadow-lg hover:shadow-[0_0_25px_rgba(122,95,255,0.5)] text-white font-medium w-full sm:w-auto"
          >
            <a 
              href="/Nauiter_Master_Profile.pdf" 
              download 
              className="flex items-center justify-center gap-2"
              aria-label="Download professional resume"
            >
              <Download size={18} />
              {t.hero.downloadCV}
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-white/20 text-white hover:bg-white/10 transition-all w-full sm:w-auto"
          >
            <a 
              href="#projects"
              aria-label="Navigate to projects section"
            >
              {t.hero.viewProjects}
            </a>
          </Button>
        </motion.div>
      </div>

    </section>
  );
};
