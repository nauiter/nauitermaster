import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useCard3D } from "@/hooks/useCard3D";
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

export const EcosystemCarousel = ({ projects }: EcosystemCarouselProps) => {
  const { t, language } = useLanguage();

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
        {projects.map((node, i) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const card3D = useCard3D(10);
          
          return (
            <motion.a
              key={i}
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              onMouseMove={card3D.handleMouseMove}
              onMouseLeave={card3D.handleMouseLeave}
              style={card3D.cardStyle}
              className="relative p-6 transition-all group block"
            >
            <div
              className={`absolute -inset-0.5 bg-gradient-to-r ${node.color} opacity-20 group-hover:opacity-40 rounded-2xl blur transition-all`}
            ></div>
            <div className="relative z-10">
              <h4 className="font-semibold text-white mb-1">{node.name}</h4>
              <p className="text-xs text-gray-400">{node.type}</p>
            </div>
          </motion.a>
        );
        })}
      </div>
    </Section>
  );
};
