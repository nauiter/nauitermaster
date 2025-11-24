import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useCard3D } from "@/hooks/useCard3D";
import { Section } from "@/components/ui/section";

export const SkillsSection = () => {
  const { t, language } = useLanguage();
  
  const skill1 = useCard3D(6);
  const skill2 = useCard3D(6);
  const skill3 = useCard3D(6);
  const skill4 = useCard3D(6);
  const skill5 = useCard3D(6);
  const skill6 = useCard3D(6);

  return (
    <Section
      id="skills"
      title={{
        title: t.skills.title,
        align: "center",
        gradient: "primary",
      }}
      background="transparent"
      containerWidth="7xl"
      paddingY="xl"
      dataTour="skills"
      className="motion-safe:opacity-0 motion-safe:translate-y-6 motion-safe:transition-all motion-safe:duration-700 motion-safe:[animation:fadeInUp_0.7s_ease-out_forwards]"
      containerClassName="mb-12"
    >
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <AnimatePresence mode="wait">
            <motion.h3
              key={`core-strengths-${language}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="font-semibold text-white mb-6 text-xl md:text-2xl flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              {t.skills.coreStrengths}
            </motion.h3>
          </AnimatePresence>
          <div className="space-y-4">
            <div 
              onMouseMove={skill1.handleMouseMove}
              onMouseLeave={skill1.handleMouseLeave}
              onTouchStart={skill1.handleTouchStart}
              onTouchMove={skill1.handleTouchMove}
              onTouchEnd={skill1.handleTouchEnd}
              style={skill1.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#7A5FFF]/20 active:bg-white/20 active:shadow-xl active:shadow-[#7A5FFF]/30 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.1s_forwards]"
            >
              <span className="text-gray-300">Prompt Engineering</span>
              <div className="w-2 h-2 bg-primary rounded-full shadow-glow"></div>
            </div>
            <div 
              onMouseMove={skill2.handleMouseMove}
              onMouseLeave={skill2.handleMouseLeave}
              onTouchStart={skill2.handleTouchStart}
              onTouchMove={skill2.handleTouchMove}
              onTouchEnd={skill2.handleTouchEnd}
              style={skill2.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#7A5FFF]/20 active:bg-white/20 active:shadow-xl active:shadow-[#7A5FFF]/30 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.2s_forwards]"
            >
              <span className="text-gray-300">AI Ethics & Safety</span>
              <div className="w-2 h-2 bg-primary rounded-full shadow-glow"></div>
            </div>
            <div 
              onMouseMove={skill3.handleMouseMove}
              onMouseLeave={skill3.handleMouseLeave}
              onTouchStart={skill3.handleTouchStart}
              onTouchMove={skill3.handleTouchMove}
              onTouchEnd={skill3.handleTouchEnd}
              style={skill3.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#7A5FFF]/20 active:bg-white/20 active:shadow-xl active:shadow-[#7A5FFF]/30 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.3s_forwards]"
            >
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
              className="font-semibold text-white mb-6 text-xl md:text-2xl flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              {t.skills.growingAreas}
            </motion.h3>
          </AnimatePresence>
          <div className="space-y-4">
            <div 
              onMouseMove={skill4.handleMouseMove}
              onMouseLeave={skill4.handleMouseLeave}
              onTouchStart={skill4.handleTouchStart}
              onTouchMove={skill4.handleTouchMove}
              onTouchEnd={skill4.handleTouchEnd}
              style={skill4.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#00C4FF]/20 active:bg-white/20 active:shadow-xl active:shadow-[#00C4FF]/30 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.1s_forwards]"
            >
              <span className="text-gray-300">Data Handling & Privacy</span>
              <div className="w-2 h-2 bg-accent rounded-full shadow-glow"></div>
            </div>
            <div 
              onMouseMove={skill5.handleMouseMove}
              onMouseLeave={skill5.handleMouseLeave}
              onTouchStart={skill5.handleTouchStart}
              onTouchMove={skill5.handleTouchMove}
              onTouchEnd={skill5.handleTouchEnd}
              style={skill5.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#00C4FF]/20 active:bg-white/20 active:shadow-xl active:shadow-[#00C4FF]/30 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.2s_forwards]"
            >
              <span className="text-gray-300">AI Model Fine-tuning</span>
              <div className="w-2 h-2 bg-accent rounded-full shadow-glow"></div>
            </div>
            <div 
              onMouseMove={skill6.handleMouseMove}
              onMouseLeave={skill6.handleMouseLeave}
              onTouchStart={skill6.handleTouchStart}
              onTouchMove={skill6.handleTouchMove}
              onTouchEnd={skill6.handleTouchEnd}
              style={skill6.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#00C4FF]/20 active:bg-white/20 active:shadow-xl active:shadow-[#00C4FF]/30 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.3s_forwards]"
            >
              <span className="text-gray-300">Multi-modal AI Systems</span>
              <div className="w-2 h-2 bg-accent rounded-full shadow-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
