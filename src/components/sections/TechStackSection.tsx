import { Section } from "@/components/ui/section";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  Cloud, 
  Zap, 
  Brain, 
  GitBranch,
  Layers,
  Terminal
} from "lucide-react";

const iconMap = {
  Code2,
  Database,
  Cloud,
  Zap,
  Brain,
  GitBranch,
  Layers,
  Terminal
};

interface TechCategory {
  icon: keyof typeof iconMap;
  title: string;
  technologies: string[];
  color: string;
}

export const TechStackSection = () => {
  const { t } = useLanguage();

  const techCategories: TechCategory[] = [
    {
      icon: "Code2",
      title: t.techStack.categories.frontend.title,
      technologies: t.techStack.categories.frontend.technologies,
      color: "from-[#00C4FF] to-[#0EA5E9]"
    },
    {
      icon: "Terminal",
      title: t.techStack.categories.backend.title,
      technologies: t.techStack.categories.backend.technologies,
      color: "from-[#10B981] to-[#34D399]"
    },
    {
      icon: "Database",
      title: t.techStack.categories.database.title,
      technologies: t.techStack.categories.database.technologies,
      color: "from-[#EC4899] to-[#A855F7]"
    },
    {
      icon: "Cloud",
      title: t.techStack.categories.cloud.title,
      technologies: t.techStack.categories.cloud.technologies,
      color: "from-[#F59E0B] to-[#FB923C]"
    },
    {
      icon: "Brain",
      title: t.techStack.categories.ai.title,
      technologies: t.techStack.categories.ai.technologies,
      color: "from-[#7A5FFF] to-[#A855F7]"
    },
    {
      icon: "GitBranch",
      title: t.techStack.categories.tools.title,
      technologies: t.techStack.categories.tools.technologies,
      color: "from-[#06B6D4] to-[#00C4FF]"
    }
  ];

  return (
    <Section
      id="tech-stack"
      title={{
        title: t.techStack.title,
        subtitle: t.techStack.subtitle,
        gradient: "primary",
        align: "center",
      }}
      background="gradient-dark"
      containerWidth="7xl"
      paddingY="lg"
      paddingX="md"
      dataTour="tech-stack-section"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techCategories.map((category, index) => {
          const IconComponent = iconMap[category.icon];
          
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div 
                className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
              />
              
              {/* Card content */}
              <div className="relative h-full bg-[#0c1324]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                {/* Icon header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
                    {category.title}
                  </h3>
                </div>

                {/* Technologies list */}
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          {t.techStack.footer}
        </p>
      </motion.div>
    </Section>
  );
};