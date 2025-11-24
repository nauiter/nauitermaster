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
      paddingY="lg"
      dataTour="skills"
      className="motion-safe:opacity-0 motion-safe:translate-y-6 motion-safe:transition-all motion-safe:duration-700 motion-safe:[animation:fadeInUp_0.7s_ease-out_forwards]"
      containerClassName="mb-12"
    >
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
            <div 
              onMouseMove={skill1.handleMouseMove}
              onMouseLeave={skill1.handleMouseLeave}
              style={skill1.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#7A5FFF]/20 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.1s_forwards]"
            >
              <span className="text-gray-300">Prompt Engineering</span>
              <div className="w-2 h-2 bg-primary rounded-full shadow-glow"></div>
            </div>
            <div 
              onMouseMove={skill2.handleMouseMove}
              onMouseLeave={skill2.handleMouseLeave}
              style={skill2.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#7A5FFF]/20 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.2s_forwards]"
            >
              <span className="text-gray-300">AI Ethics & Safety</span>
              <div className="w-2 h-2 bg-primary rounded-full shadow-glow"></div>
            </div>
            <div 
              onMouseMove={skill3.handleMouseMove}
              onMouseLeave={skill3.handleMouseLeave}
              style={skill3.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#7A5FFF]/20 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.3s_forwards]"
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
              className="font-semibold text-white mb-4 flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              {t.skills.growingAreas}
            </motion.h3>
          </AnimatePresence>
          <div className="space-y-3">
            <div 
              onMouseMove={skill4.handleMouseMove}
              onMouseLeave={skill4.handleMouseLeave}
              style={skill4.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#00C4FF]/20 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.1s_forwards]"
            >
              <span className="text-gray-300">Data Handling & Privacy</span>
              <div className="w-2 h-2 bg-accent rounded-full shadow-glow"></div>
            </div>
            <div 
              onMouseMove={skill5.handleMouseMove}
              onMouseLeave={skill5.handleMouseLeave}
              style={skill5.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#00C4FF]/20 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.2s_forwards]"
            >
              <span className="text-gray-300">AI Model Fine-tuning</span>
              <div className="w-2 h-2 bg-accent rounded-full shadow-glow"></div>
            </div>
            <div 
              onMouseMove={skill6.handleMouseMove}
              onMouseLeave={skill6.handleMouseLeave}
              style={skill6.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#00C4FF]/20 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.3s_forwards]"
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
