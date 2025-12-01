import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Image, Music, Zap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useCard3D } from "@/hooks/useCard3D";
import { Section } from "@/components/ui/section";

export const AIToolsSection = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  
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
      paddingY="xl"
      dataTour="ai-tools"
      className="relative overflow-hidden"
    >
        {/* Two Groups Layout */}
        <div className="mt-12 max-w-5xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-10">
          {/* Creative AI Group */}
          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              <motion.h3
                key={language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-left text-[#7A5FFF] font-semibold mb-6 text-xl md:text-2xl"
              >
                {t.aiTools.creativeAI}
              </motion.h3>
            </AnimatePresence>
            <div className="grid grid-rows-2 gap-6 flex-1">
              {/* Text AI Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-[#7A5FFF] rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                {/* Card content */}
                <div
                  onMouseMove={textAI.handleMouseMove}
                  onMouseLeave={textAI.handleMouseLeave}
                  onTouchStart={textAI.handleTouchStart}
                  onTouchMove={textAI.handleTouchMove}
                  onTouchEnd={textAI.handleTouchEnd}
                  style={textAI.cardStyle}
                  className="relative p-6 text-left transition-all flex flex-col bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg hover:shadow-[#7A5FFF]/20 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3 mb-3">
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
                </div>
              </motion.div>

              {/* Image/Video AI Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-[#7A5FFF] rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                {/* Card content */}
                <div
                  onMouseMove={imageAI.handleMouseMove}
                  onMouseLeave={imageAI.handleMouseLeave}
                  onTouchStart={imageAI.handleTouchStart}
                  onTouchMove={imageAI.handleTouchMove}
                  onTouchEnd={imageAI.handleTouchEnd}
                  style={imageAI.cardStyle}
                  className="relative p-6 text-left transition-all flex flex-col bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg hover:shadow-[#7A5FFF]/20 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3 mb-3">
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
                className="text-left text-[#00C4FF] font-semibold mb-6 text-xl md:text-2xl"
              >
                {t.aiTools.technicalAI}
              </motion.h3>
            </AnimatePresence>
            <div className="grid grid-rows-2 gap-6 flex-1">
              {/* Audio AI Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-[#00C4FF] rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                {/* Card content */}
                <div
                  onMouseMove={audioAI.handleMouseMove}
                  onMouseLeave={audioAI.handleMouseLeave}
                  onTouchStart={audioAI.handleTouchStart}
                  onTouchMove={audioAI.handleTouchMove}
                  onTouchEnd={audioAI.handleTouchEnd}
                  style={audioAI.cardStyle}
                  className="relative p-6 text-left transition-all flex flex-col bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg hover:shadow-[#00C4FF]/20 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3 mb-3">
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
                </div>
              </motion.div>

              {/* Automation Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-[#00C4FF] rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                {/* Card content */}
                <div
                  onMouseMove={automationAI.handleMouseMove}
                  onMouseLeave={automationAI.handleMouseLeave}
                  onTouchStart={automationAI.handleTouchStart}
                  onTouchMove={automationAI.handleTouchMove}
                  onTouchEnd={automationAI.handleTouchEnd}
                  style={automationAI.cardStyle}
                  className="relative p-6 text-left transition-all flex flex-col bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg hover:shadow-[#00C4FF]/20 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3 mb-3">
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
                </div>
              </motion.div>
            </div>
          </div>
        </div>
    </Section>
  );
};
