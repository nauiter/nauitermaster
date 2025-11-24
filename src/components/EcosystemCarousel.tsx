import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/section";

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

const EcosystemCard = ({ node, index }: { node: EcosystemProject; index: number }) => {
  return (
    <motion.a
      href={node.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className="relative p-8 transition-all group block bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:shadow-2xl hover:shadow-[#7A5FFF]/30"
    >
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${node.color} opacity-20 group-hover:opacity-40 rounded-2xl blur transition-all`}
      ></div>
      <div className="relative z-10 text-center">
        <h4 className="font-semibold text-white mb-2 text-lg">{node.name}</h4>
        <p className="text-sm text-gray-400">{node.type}</p>
      </div>
    </motion.a>
  );
};

export const EcosystemCarousel = ({ projects }: EcosystemCarouselProps) => {
  const { t } = useLanguage();

  return (
    <Section
      id="ecosystem"
      title={{
        title: t.ecosystem.title,
        subtitle: t.ecosystem.subtitle,
        align: "center",
        gradient: "primary",
      }}
      background="transparent"
      containerWidth="6xl"
      paddingY="xl"
      dataTour="ecosystem"
      className="overflow-hidden text-center"
      showParticles={true}
      particleColor="secondary"
      particleMagneticStrength={70}
    >
      {/* Projects Grid */}
      <div className="relative mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {projects.map((node, i) => (
          <EcosystemCard key={i} node={node} index={i} />
        ))}
      </div>
    </Section>
  );
};
