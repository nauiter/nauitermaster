import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import sweetLifeAnimes from "@/assets/sweet-life-animes.webp";
import sweetLifeAcademy from "@/assets/sweet-life-academy.webp";
import oVermePasseia from "@/assets/o-verme-passeia.webp";
import figueiredoLaw from "@/assets/figueiredo-law.webp";

export const ProjectsSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-[#0C1222] to-[#05010E]" data-tour="projects">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF]"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {t.projects.title}
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
            className="text-gray-400 mt-2 text-sm md:text-base"
          >
            {t.projects.subtitle}
          </motion.p>
        </AnimatePresence>

        {/* Creative Universe */}
        <AnimatePresence mode="wait">
          <motion.h3
            key={language}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-left mt-12 mb-6 font-semibold text-[#7A5FFF] uppercase tracking-widest text-sm"
          >
            {t.projects.creativeUniverse}
          </motion.h3>
        </AnimatePresence>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.a
            href="https://sweetlifeanimes.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={sweetLifeAnimes}
                alt="Sweet Life Animes project thumbnail"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-all"></div>
            </div>
            <div className="p-4 text-left">
              <h4 className="font-semibold text-white drop-shadow-md mb-1">{t.projects.sweetLifeAnimes.title}</h4>
              <AnimatePresence mode="wait">
                <motion.p
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400 text-sm mb-2"
                >
                  {t.projects.sweetLifeAnimes.description}
                </motion.p>
              </AnimatePresence>
              <div className="flex flex-wrap gap-2 text-xs">
                {t.projects.sweetLifeAnimes.tools.map((tool) => (
                  <AnimatePresence mode="wait" key={tool}>
                    <motion.span
                      key={`${language}-${tool}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="px-2 py-1 rounded-full bg-white/10 text-gray-300 backdrop-blur-md hover:bg-white/20 transition-colors"
                    >
                      {tool}
                    </motion.span>
                  </AnimatePresence>
                ))}
              </div>
            </div>
          </motion.a>

          <motion.a
            href="https://sweetlifeacademy.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={sweetLifeAcademy}
                alt="Sweet Life Academy project thumbnail"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-all"></div>
            </div>
            <div className="p-4 text-left">
              <h4 className="font-semibold text-white drop-shadow-md mb-1">{t.projects.sweetLifeAcademy.title}</h4>
              <AnimatePresence mode="wait">
                <motion.p
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400 text-sm mb-2"
                >
                  {t.projects.sweetLifeAcademy.description}
                </motion.p>
              </AnimatePresence>
              <div className="flex flex-wrap gap-2 text-xs">
                {t.projects.sweetLifeAcademy.tools.map((tool) => (
                  <AnimatePresence mode="wait" key={tool}>
                    <motion.span
                      key={`${language}-${tool}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="px-2 py-1 rounded-full bg-white/10 text-gray-300 backdrop-blur-md hover:bg-white/20 transition-colors"
                    >
                      {tool}
                    </motion.span>
                  </AnimatePresence>
                ))}
              </div>
            </div>
          </motion.a>

          <motion.a
            href="https://overmepasseia.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={oVermePasseia}
                alt="O Verme Passeia project thumbnail"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-all"></div>
            </div>
            <div className="p-4 text-left">
              <h4 className="font-semibold text-white drop-shadow-md mb-1">{t.projects.oVermePasseia.title}</h4>
              <AnimatePresence mode="wait">
                <motion.p
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400 text-sm mb-2"
                >
                  {t.projects.oVermePasseia.description}
                </motion.p>
              </AnimatePresence>
              <div className="flex flex-wrap gap-2 text-xs">
                {t.projects.oVermePasseia.tools.map((tool) => (
                  <AnimatePresence mode="wait" key={tool}>
                    <motion.span
                      key={`${language}-${tool}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="px-2 py-1 rounded-full bg-white/10 text-gray-300 backdrop-blur-md hover:bg-white/20 transition-colors"
                    >
                      {tool}
                    </motion.span>
                  </AnimatePresence>
                ))}
              </div>
            </div>
          </motion.a>
        </div>

        {/* Experimental Concepts */}
        <AnimatePresence mode="wait">
          <motion.h3
            key={language}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-left mt-6 mb-6 font-semibold text-[#00C4FF] uppercase tracking-widest text-sm"
          >
            {t.projects.experimentalConcepts}
          </motion.h3>
        </AnimatePresence>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.a
            href="https://figueiredolaw.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={figueiredoLaw}
                alt="Figueiredo Law project thumbnail"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-all"></div>
            </div>
            <div className="p-4 text-left">
              <h4 className="font-semibold text-white drop-shadow-md mb-1">{t.projects.figueiredoLaw.title}</h4>
              <AnimatePresence mode="wait">
                <motion.p
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400 text-sm mb-2"
                >
                  {t.projects.figueiredoLaw.description}
                </motion.p>
              </AnimatePresence>
              <div className="flex flex-wrap gap-2 text-xs">
                {t.projects.figueiredoLaw.tools.map((tool) => (
                  <AnimatePresence mode="wait" key={tool}>
                    <motion.span
                      key={`${language}-${tool}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="px-2 py-1 rounded-full bg-white/10 text-gray-300 backdrop-blur-md hover:bg-white/20 transition-colors"
                    >
                      {tool}
                    </motion.span>
                  </AnimatePresence>
                ))}
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
