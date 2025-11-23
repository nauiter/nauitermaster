import { motion, AnimatePresence } from "framer-motion";
import { Brain, Image, Music, Zap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const AIToolsSection = () => {
  const { t, language } = useLanguage();

  return (
    <section 
      id="ai-tools"
      className="relative z-10 py-24 bg-gradient-to-b from-[#0A1A2F] to-[#0C1222]" 
      data-tour="ai-tools"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] text-center mb-3"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {t.aiTools.title}
            </motion.span>
          </AnimatePresence>
        </motion.h2>
        <AnimatePresence mode="wait">
          <motion.p
            key={language}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
          >
            {t.aiTools.subtitle}
          </motion.p>
        </AnimatePresence>
        
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
                className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left shadow-md hover:shadow-lg hover:border-[#7A5FFF]/30 transition-all flex flex-col"
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
                className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left shadow-md hover:shadow-lg hover:border-[#7A5FFF]/30 transition-all flex flex-col"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Image className="w-6 h-6 text-[#7A5FFF]" />
                  <h4 className="font-semibold text-lg text-white">Image / Video AI</h4>
                </div>
                <p className="text-gray-400 text-sm mb-3 flex-1">
                  Midjourney, Leonardo, Runway — creative workflow efficiency.
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Proficiency</span>
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
            <h3 className="text-left text-[#00C4FF] font-semibold mb-4 text-lg">Technical AI</h3>
            <div className="grid grid-rows-2 gap-4 flex-1">
              {/* Audio AI Card */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left shadow-md hover:shadow-lg hover:border-[#00C4FF]/30 transition-all flex flex-col"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Music className="w-6 h-6 text-[#00C4FF]" />
                  <h4 className="font-semibold text-lg text-white">Audio AI</h4>
                </div>
                <p className="text-gray-400 text-sm mb-3 flex-1">
                  ElevenLabs, MusicLM — Voice & sound synthesis for storytelling.
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Proficiency</span>
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
                className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left shadow-md hover:shadow-lg hover:border-[#00C4FF]/30 transition-all flex flex-col"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-6 h-6 text-[#00C4FF]" />
                  <h4 className="font-semibold text-lg text-white">Automation</h4>
                </div>
                <p className="text-gray-400 text-sm mb-3 flex-1">
                  Python, Zapier, Make — Workflow automation & efficiency.
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Proficiency</span>
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
      </div>
    </section>
  );
};
