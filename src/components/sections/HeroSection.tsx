import { useRef } from 'react';
import { Download, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import portfolioAvatar from "@/assets/portfolio-avatar.webp";
import { useLanguage } from "@/hooks/useLanguage";
import { useMultiLayerParallax } from "@/hooks/useParallax";
import { METRICS } from "@/lib/constants";

export const HeroSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [layer1, layer2, layer3] = useMultiLayerParallax(sectionRef, 3);

  return (
    <section 
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      data-tour="welcome"
    >
      {/* Aurora Borealis Background */}
      <AuroraBackground />
      
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        {/* Profile Image with Enhanced Glow - Optimized for LCP */}
        <div className="flex justify-center mb-6">
          <img
            src={portfolioAvatar}
            alt="Nauiter Master - Estrategista de IA, artista digital especializado em automação criativa e educação | AI Strategist, digital artist specialized in creative automation and education"
            className="w-56 h-56 rounded-full border-[3px] border-white/30 shadow-2xl object-cover"
            style={{ 
              filter: "drop-shadow(0 0 30px rgba(122, 95, 255, 0.4))",
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
              e.currentTarget.style.filter = 'drop-shadow(0 0 30px rgba(122, 95, 255, 0.4))';
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
          className="space-y-4 px-6"
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
            className="text-3xl md:text-5xl font-bold leading-tight"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            <span className="block text-white mb-2">Nauiter Master</span>
            <span className="block text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] via-[#A855F7] to-[#00C4FF]">
              {t.hero.subtitle}
            </span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
        </motion.div>

        {/* Key Metrics - Horizontal */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-10 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF]">
              {METRICS.LINKEDIN_FOLLOWERS}
            </p>
            <p className="text-gray-400 text-sm">{t.hero.linkedinFollowers}</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF]">
              {METRICS.YEARS_EXPERIENCE}
            </p>
            <p className="text-gray-400 text-sm">{t.hero.yearsExperience}</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF]">
              {METRICS.ACTIVE_PROJECTS}
            </p>
            <p className="text-gray-400 text-sm">{t.hero.activeProjects}</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button
            asChild
            size="lg"
            className="relative overflow-hidden bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] hover:opacity-90 transition-all shadow-lg hover:shadow-[0_0_25px_rgba(122,95,255,0.5)] text-white font-medium"
          >
            <a 
              href="/Nauiter_Master_Profile.pdf" 
              download 
              className="flex items-center gap-2"
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
            className="border-2 border-white/20 text-white hover:bg-white/10 transition-all"
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
      
      {/* Scroll Cue */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-gray-500/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown className="w-7 h-7" />
      </motion.div>

    </section>
  );
};
