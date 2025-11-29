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
  const skill7 = useCard3D(6);
  const skill8 = useCard3D(6);
  const skill9 = useCard3D(6);
  const skill10 = useCard3D(6);
  const skill11 = useCard3D(6);

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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {/* Core Strengths */}
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

        {/* Growing Areas */}
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

        {/* Leadership & Ops - New Category */}
        <div>
          <AnimatePresence mode="wait">
            <motion.h3
              key={`leadership-ops-${language}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="font-semibold text-white mb-6 text-xl md:text-2xl flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
              {t.skills.leadershipOps}
            </motion.h3>
          </AnimatePresence>
          <div className="space-y-4">
            <div 
              onMouseMove={skill7.handleMouseMove}
              onMouseLeave={skill7.handleMouseLeave}
              onTouchStart={skill7.handleTouchStart}
              onTouchMove={skill7.handleTouchMove}
              onTouchEnd={skill7.handleTouchEnd}
              style={skill7.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#FFD700]/20 active:bg-white/20 active:shadow-xl active:shadow-[#FFD700]/30 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.1s_forwards]"
            >
              <span className="text-gray-300">{language === 'pt' ? 'Telecom & Redes Militares' : 'Military Telecom & Networks'}</span>
              <div className="w-2 h-2 bg-[#FFD700] rounded-full shadow-glow"></div>
            </div>
            <div 
              onMouseMove={skill8.handleMouseMove}
              onMouseLeave={skill8.handleMouseLeave}
              onTouchStart={skill8.handleTouchStart}
              onTouchMove={skill8.handleTouchMove}
              onTouchEnd={skill8.handleTouchEnd}
              style={skill8.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#FFD700]/20 active:bg-white/20 active:shadow-xl active:shadow-[#FFD700]/30 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.2s_forwards]"
            >
              <span className="text-gray-300">{language === 'pt' ? 'Liderança de Equipes (10+ Anos)' : 'Team Leadership (10+ Years)'}</span>
              <div className="w-2 h-2 bg-[#FFD700] rounded-full shadow-glow"></div>
            </div>
            <div 
              onMouseMove={skill9.handleMouseMove}
              onMouseLeave={skill9.handleMouseLeave}
              onTouchStart={skill9.handleTouchStart}
              onTouchMove={skill9.handleTouchMove}
              onTouchEnd={skill9.handleTouchEnd}
              style={skill9.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#FFD700]/20 active:bg-white/20 active:shadow-xl active:shadow-[#FFD700]/30 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.3s_forwards]"
            >
              <span className="text-gray-300">{language === 'pt' ? 'Gestão de Crises' : 'Crisis Management'}</span>
              <div className="w-2 h-2 bg-[#FFD700] rounded-full shadow-glow"></div>
            </div>
            <div 
              onMouseMove={skill10.handleMouseMove}
              onMouseLeave={skill10.handleMouseLeave}
              onTouchStart={skill10.handleTouchStart}
              onTouchMove={skill10.handleTouchMove}
              onTouchEnd={skill10.handleTouchEnd}
              style={skill10.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#FFD700]/20 active:bg-white/20 active:shadow-xl active:shadow-[#FFD700]/30 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.4s_forwards]"
            >
              <span className="text-gray-300">{language === 'pt' ? 'Logística Operacional' : 'Operational Logistics'}</span>
              <div className="w-2 h-2 bg-[#FFD700] rounded-full shadow-glow"></div>
            </div>
            <div 
              onMouseMove={skill11.handleMouseMove}
              onMouseLeave={skill11.handleMouseLeave}
              onTouchStart={skill11.handleTouchStart}
              onTouchMove={skill11.handleTouchMove}
              onTouchEnd={skill11.handleTouchEnd}
              style={skill11.cardStyle}
              className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 hover:shadow-lg hover:shadow-[#FFD700]/20 active:bg-white/20 active:shadow-xl active:shadow-[#FFD700]/30 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.5s_forwards]"
            >
              <span className="text-gray-300">{language === 'pt' ? 'Instrução & Treinamento' : 'Instruction & Training'}</span>
              <div className="w-2 h-2 bg-[#FFD700] rounded-full shadow-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};