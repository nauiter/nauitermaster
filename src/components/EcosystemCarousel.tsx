import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionTitle } from "@/components/ui/section-title";

interface EcosystemProject {
  name: string;
  purpose: string;
  image: string;
  url: string;
  type: string;
  color: string;
}

interface EcosystemCarouselProps {
  projects: EcosystemProject[];
}

export const EcosystemCarousel = ({ projects }: EcosystemCarouselProps) => {
  const { t, language } = useLanguage();

  return (
    <section
      id="ecosystem"
      className="relative py-28 bg-gradient-to-b from-[#05010E] via-[#0A1A2F] to-[#0C1222] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Header - Using SectionTitle Component */}
        <SectionTitle
          title={t.ecosystem.title}
          subtitle={t.ecosystem.subtitle}
          align="center"
          gradient="primary"
          dataAttr="ecosystem-title"
        />

        {/* Projects Grid */}
        <div className="relative mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {projects.map((node, i) => (
            <motion.a
              key={i}
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              whileHover={{ scale: 1.05 }}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all group block"
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${node.color} opacity-20 group-hover:opacity-40 rounded-2xl blur transition-all`}
              ></div>
              <div className="relative z-10">
                <h4 className="font-semibold text-white mb-1">{node.name}</h4>
                <p className="text-xs text-gray-400">{node.type}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
