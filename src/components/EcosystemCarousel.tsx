import { motion } from "framer-motion";

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
  return (
    <section
      id="ecosystem"
      className="relative py-28 bg-gradient-to-b from-[#05010E] via-[#0A1A2F] to-[#0C1222] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF]"
        >
          Creative & Strategic Ecosystem
        </motion.h2>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          A network of AI-driven worlds — each blending imagination, emotion, and technology.
        </p>

        {/* Central Node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto mt-16 w-40 h-40 rounded-full bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] flex items-center justify-center shadow-[0_0_40px_rgba(122,95,255,0.35)] animate-pulse"
          title="Creator, Strategist & AI Visionary"
        >
          <span className="text-white font-semibold text-lg text-center px-4">
            Nauiter Master
          </span>
        </motion.div>

        {/* Orbiting Nodes */}
        <div className="relative mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
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
