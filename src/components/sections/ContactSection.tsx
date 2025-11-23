import { motion, AnimatePresence } from "framer-motion";
import { Mail, Facebook, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { SOCIAL_LINKS } from "@/lib/constants";

export const ContactSection = () => {
  const { t, language } = useLanguage();

  return (
    <section
      id="contact"
      className="relative py-28 bg-gradient-to-b from-[#05010E] via-[#0A1A2F] to-[#0C1222] text-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-6"
      >
        <AnimatePresence mode="wait">
          <motion.h2
            key={language}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF]"
          >
            {t.contact.title}
          </motion.h2>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={language}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto"
          >
            {t.contact.subtitle}
          </motion.p>
        </AnimatePresence>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <motion.a
            href={SOCIAL_LINKS.EMAIL}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] text-white font-medium shadow-lg hover:shadow-[0_0_20px_rgba(122,95,255,0.5)] transition-all"
          >
            <Mail size={18} />
            <AnimatePresence mode="wait">
              <motion.span
                key={language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {t.contact.bookCall}
              </motion.span>
            </AnimatePresence>
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#7A5FFF80] text-white/90 hover:bg-white/10 transition-all"
          >
            <ArrowRight size={18} />
            <AnimatePresence mode="wait">
              <motion.span
                key={language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {t.hero.viewProjects}
              </motion.span>
            </AnimatePresence>
          </motion.a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-12 text-gray-400">
          <motion.a
            href={SOCIAL_LINKS.EMAIL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "#7A5FFF" }}
            className="transition-colors"
            aria-label="Contact via email"
          >
            <Mail size={24} />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "#00C4FF" }}
            className="transition-colors"
            aria-label="Follow on Facebook"
          >
            <Facebook size={24} />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "#7A5FFF" }}
            className="transition-colors"
            aria-label="Follow on Instagram"
          >
            <Instagram size={24} />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "#00C4FF" }}
            className="transition-colors"
            aria-label="Connect on LinkedIn"
          >
            <Linkedin size={24} />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};
