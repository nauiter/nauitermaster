import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Image, Music, Zap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useParallax } from "@/hooks/useParallax";
import { useCard3D } from "@/hooks/useCard3D";
import { Section } from "@/components/ui/section";

export const AIToolsSection = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxOffset = useParallax(sectionRef, { speed: 0.3, direction: 'down' });
  
  const textAI = useCard3D(8);
  const imageAI = useCard3D(8);
  const audioAI = useCard3D(8);
  const automationAI = useCard3D(8);

  return (
    <Section
      ref={sectionRef}
      id="ai-tools"
      title={{
        title: t.aiTools.title,
        subtitle: t.aiTools.subtitle,
        gradient: "primary",
        align: "center",
      }}
      background="transparent"
      containerWidth="5xl"
      paddingY="lg"
      dataTour="ai-tools"
      className="relative overflow-hidden"
    >
      {/* Parallax Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(122, 95, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0, 196, 255, 0.08) 0%, transparent 50%)',
          transform: `translateY(${parallaxOffset}px)`,
          willChange: 'transform',
        }}
      />
        {/* Two Groups Layout */}
        <div className="mt-14 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Creative AI Group */}
          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              <motion.h3
                key={language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-left text-[#7A5FFF] font-semibold mb-4 text-lg"
              >
                {t.aiTools.creativeAI}
              </motion.h3>
            </AnimatePresence>
            <div className="grid grid-rows-2 gap-4 flex-1">
              {/* Text AI Card */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onMouseMove={textAI.handleMouseMove}
                onMouseLeave={textAI.handleMouseLeave}
                style={textAI.cardStyle}
                className="p-5 text-left transition-all flex flex-col bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg hover:shadow-[#7A5FFF]/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-6 h-6 text-[#7A5FFF]" />
                  <AnimatePresence mode="wait">
                    <motion.h4
                      key={language}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-semibold text-lg text-white"
                    >
                      {t.aiTools.textAI.title}
                    </motion.h4>
                  </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 text-sm mb-3 flex-1"
                  >
                    {t.aiTools.textAI.description}
                  </motion.p>
                </AnimatePresence>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-400">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={language}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {t.aiTools.proficiency}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-[#7A5FFF] font-semibold">98%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] transition-all duration-1000"
                      style={{ width: '98%' }}
                    ></div>
                  </div>
                </div>
              </motion.div>

              {/* Image/Video AI Card */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onMouseMove={imageAI.handleMouseMove}
                onMouseLeave={imageAI.handleMouseLeave}
                style={imageAI.cardStyle}
                className="p-5 text-left transition-all flex flex-col bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg hover:shadow-[#7A5FFF]/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Image className="w-6 h-6 text-[#7A5FFF]" />
                  <AnimatePresence mode="wait">
                    <motion.h4
                      key={language}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-semibold text-lg text-white"
                    >
                      {t.aiTools.imageVideoAI.title}
                    </motion.h4>
                  </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 text-sm mb-3 flex-1"
                  >
                    {t.aiTools.imageVideoAI.description}
                  </motion.p>
                </AnimatePresence>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-400">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={language}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {t.aiTools.proficiency}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-[#7A5FFF] font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] transition-all duration-1000"
                      style={{ width: '95%' }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Technical AI Group */}
          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              <motion.h3
                key={language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-left text-[#00C4FF] font-semibold mb-4 text-lg"
              >
                {t.aiTools.technicalAI}
              </motion.h3>
            </AnimatePresence>
            <div className="grid grid-rows-2 gap-4 flex-1">
              {/* Audio AI Card */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onMouseMove={audioAI.handleMouseMove}
                onMouseLeave={audioAI.handleMouseLeave}
                style={audioAI.cardStyle}
                className="p-5 text-left transition-all flex flex-col bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg hover:shadow-[#00C4FF]/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Music className="w-6 h-6 text-[#00C4FF]" />
                  <AnimatePresence mode="wait">
                    <motion.h4
                      key={language}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-semibold text-lg text-white"
                    >
                      {t.aiTools.audioAI.title}
                    </motion.h4>
                  </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 text-sm mb-3 flex-1"
                  >
                    {t.aiTools.audioAI.description}
                  </motion.p>
                </AnimatePresence>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-400">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={language}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {t.aiTools.proficiency}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-[#00C4FF] font-semibold">90%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] transition-all duration-1000"
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                </div>
              </motion.div>

              {/* Automation Card */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onMouseMove={automationAI.handleMouseMove}
                onMouseLeave={automationAI.handleMouseLeave}
                style={automationAI.cardStyle}
                className="p-5 text-left transition-all flex flex-col bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg hover:shadow-[#00C4FF]/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-6 h-6 text-[#00C4FF]" />
                  <AnimatePresence mode="wait">
                    <motion.h4
                      key={language}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-semibold text-lg text-white"
                    >
                      {t.aiTools.automation.title}
                    </motion.h4>
                  </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 text-sm mb-3 flex-1"
                  >
                    {t.aiTools.automation.description}
                  </motion.p>
                </AnimatePresence>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-400">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={language}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {t.aiTools.proficiency}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-[#00C4FF] font-semibold">92%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] transition-all duration-1000"
                      style={{ width: '92%' }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
    </Section>
  );
};
