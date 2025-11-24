import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { LazyImage } from "@/components/LazyImage";
import { Section } from "@/components/ui/section";
import { ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import sweetLifeAnimes from "@/assets/sweet-life-animes.webp";
import sweetLifeAcademy from "@/assets/sweet-life-academy.webp";
import oVermePasseia from "@/assets/o-verme-passeia.webp";
import figueiredoLaw from "@/assets/figueiredo-law.webp";

export const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);


  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const projects = [
    {
      image: sweetLifeAnimes,
      alt: "Sweet Life Animes - Projeto de arte digital criado com IA focado em empoderar artistas digitais e storytellers | Digital art project created with AI focused on empowering digital artists and storytellers",
      title: t.projects.sweetLifeAnimes.title,
      description: t.projects.sweetLifeAnimes.description,
      tools: t.projects.sweetLifeAnimes.tools,
      url: "https://sweetlifeanimes.lovable.app",
      category: t.projects.creativeUniverse,
      categoryColor: "text-[#7A5FFF]",
    },
    {
      image: sweetLifeAcademy,
      alt: "Sweet Life Academy - Plataforma de educação em IA e automação para criadores digitais | AI education and automation platform for digital creators",
      title: t.projects.sweetLifeAcademy.title,
      description: t.projects.sweetLifeAcademy.description,
      tools: t.projects.sweetLifeAcademy.tools,
      url: "https://sweetlifeacademy.lovable.app",
      category: t.projects.creativeUniverse,
      categoryColor: "text-[#7A5FFF]",
    },
    {
      image: oVermePasseia,
      alt: "O Verme Passeia - Projeto explorando filosofia e estética através do design digital | Project exploring philosophy and aesthetics through digital design",
      title: t.projects.oVermePasseia.title,
      description: t.projects.oVermePasseia.description,
      tools: t.projects.oVermePasseia.tools,
      url: "https://overmepasseia.lovable.app",
      category: t.projects.creativeUniverse,
      categoryColor: "text-[#7A5FFF]",
    },
    {
      image: figueiredoLaw,
      alt: "Figueiredo Law - Consultoria em direito, tecnologia e ética de IA | Law, technology and AI ethics consultancy",
      title: t.projects.figueiredoLaw.title,
      description: t.projects.figueiredoLaw.description,
      tools: t.projects.figueiredoLaw.tools,
      url: "https://figueiredolaw.lovable.app",
      category: t.projects.experimentalConcepts,
      categoryColor: "text-[#00C4FF]",
    },
  ];

  return (
    <Section
      ref={sectionRef}
      id="projects"
      title={{
        title: language === 'pt' ? 'Projetos em Destaque' : 'Showcase Projects',
        subtitle: t.projects.subtitle,
        gradient: "primary",
        align: "center",
      }}
      background="transparent"
      containerWidth="7xl"
      paddingY="2xl"
      dataTour="projects"
      className="relative overflow-hidden"
    >
        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
            dragFree: false,
            containScroll: "trimSnaps",
            skipSnaps: false,
            duration: 25,
          }}
          plugins={[
            Autoplay({
              delay: 6500,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index}>
                <div className="p-4">
                  <div className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl hover:shadow-[#7A5FFF]/20 transition-all duration-500 group">
                    {/* Image Section with Parallax */}
                    <motion.div
                      key={`image-${index}`}
                      initial={{ opacity: 0, x: 100, scale: 1.1 }}
                      animate={{ 
                        opacity: current === index ? 1 : 0,
                        x: current === index ? 0 : -100,
                        scale: current === index ? 1 : 1.1
                      }}
                      transition={{ 
                        duration: 0.9,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="relative aspect-video md:aspect-[21/9] overflow-hidden"
                    >
                      <LazyImage
                        src={project.image}
                        alt={project.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        rootMargin="500px"
                        threshold={0.01}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1324] via-transparent to-transparent opacity-60"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-6 left-6">
                        <span className={`inline-block px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-sm font-semibold ${project.categoryColor} uppercase tracking-wider`}>
                          {project.category}
                        </span>
                      </div>
                    </motion.div>

                    {/* Content Section with Parallax */}
                    <motion.div
                      key={`content-${index}`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ 
                        opacity: current === index ? 1 : 0,
                        y: current === index ? 0 : 30
                      }}
                      transition={{ 
                        duration: 0.6,
                        delay: 0.2,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="p-8 md:p-10"
                    >
                      {/* Title */}
                      <h3 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-6">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tools */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tools.map((tool, toolIndex) => (
                          <span
                            key={toolIndex}
                            className="px-3 py-1.5 rounded-full bg-white/10 text-gray-300 text-sm backdrop-blur-md border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] text-white font-semibold hover:shadow-lg hover:shadow-[#7A5FFF]/50 transform hover:scale-105 transition-all duration-300"
                      >
                        <ExternalLink size={20} />
                        <span>{language === 'pt' ? 'Visitar Projeto' : 'Visit Project'}</span>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="left-0 -translate-x-12 bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-md" />
          <CarouselNext className="right-0 translate-x-12 bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-md" />
        </Carousel>

        {/* Progress Counter */}
        <div className="mt-12 max-w-md mx-auto">
          {/* Counter Text */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-gray-400 text-sm font-medium">
              {language === 'pt' ? 'Projeto' : 'Project'}
            </span>
            <div className="flex items-center gap-2">
              <motion.span
                key={current}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF]"
              >
                {current + 1}
              </motion.span>
              <span className="text-gray-500 text-xl">/</span>
              <span className="text-gray-400 text-xl font-semibold">
                {projects.length}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] rounded-full shadow-lg shadow-[#7A5FFF]/50"
              initial={{ width: "0%" }}
              animate={{ 
                width: `${((current + 1) / projects.length) * 100}%` 
              }}
              transition={{ 
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />
          </div>

          {/* Project Indicators Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index 
                    ? 'w-8 bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF]' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`${language === 'pt' ? 'Ir para projeto' : 'Go to project'} ${index + 1}`}
              />
            ))}
          </div>
        </div>
    </Section>
  );
};
