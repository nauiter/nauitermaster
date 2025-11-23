import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionTitle } from "@/components/ui/section-title";

export const SkillsSection = () => {
  const { t, language } = useLanguage();

  return (
    <section 
      id="skills"
      className="py-20 motion-safe:opacity-0 motion-safe:translate-y-6 motion-safe:transition-all motion-safe:duration-700 motion-safe:[animation:fadeInUp_0.7s_ease-out_forwards]" 
      style={{ backgroundColor: '#121E2C' }}
      data-tour="skills"
    >
      <div className="container mx-auto px-6">
        {/* Header - Using SectionTitle Component */}
        <SectionTitle
          title={t.skills.title}
          align="center"
          gradient="primary"
          dataAttr="skills-title"
          className="mb-12"
        />
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <AnimatePresence mode="wait">
              <motion.h3
                key={`core-strengths-${language}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="font-semibold text-white mb-4 flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                {t.skills.coreStrengths}
              </motion.h3>
            </AnimatePresence>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.1s_forwards]">
                <span className="text-gray-300">Prompt Engineering</span>
                <div className="w-2 h-2 bg-primary rounded-full shadow-glow"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.2s_forwards]">
                <span className="text-gray-300">AI Ethics & Safety</span>
                <div className="w-2 h-2 bg-primary rounded-full shadow-glow"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.3s_forwards]">
                <span className="text-gray-300">Human-AI Collaboration</span>
                <div className="w-2 h-2 bg-primary rounded-full shadow-glow"></div>
              </div>
            </div>
          </div>

          <div>
            <AnimatePresence mode="wait">
              <motion.h3
                key={`growing-areas-${language}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="font-semibold text-white mb-4 flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                {t.skills.growingAreas}
              </motion.h3>
            </AnimatePresence>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.1s_forwards]">
                <span className="text-gray-300">Data Handling & Privacy</span>
                <div className="w-2 h-2 bg-accent rounded-full shadow-glow"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.2s_forwards]">
                <span className="text-gray-300">AI Model Fine-tuning</span>
                <div className="w-2 h-2 bg-accent rounded-full shadow-glow"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.3s_forwards]">
                <span className="text-gray-300">Multi-modal AI Systems</span>
                <div className="w-2 h-2 bg-accent rounded-full shadow-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
