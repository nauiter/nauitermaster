import { Section } from "@/components/ui/section";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import { Award, Calendar, CheckCircle2, ExternalLink, Cloud, Shield, Brain, Building2, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useIsMobile } from "@/hooks/use-mobile";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  color: string;
}

export const CertificationsSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  const certifications: Certification[] = t.certifications.items;
  
  // Group certifications: 3 per slide on mobile, 6 on desktop/tablet
  const cardsPerSlide = isMobile ? 3 : 6;
  const slides: Certification[][] = [];
  
  for (let i = 0; i < certifications.length; i += cardsPerSlide) {
    slides.push(certifications.slice(i, i + cardsPerSlide));
  }

  const autoplayPlugin = useRef(
    Autoplay({ delay: 7500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    skipSnaps: false,
  }, [autoplayPlugin.current]);
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Function to determine technology badges for each certification
  const getTechBadges = (cert: Certification) => {
    const badges = [];
    
    if (cert.issuer.toLowerCase().includes('google')) {
      badges.push({ label: 'Google Cloud', icon: Cloud, color: 'from-blue-500 to-cyan-500' });
    }
    if (cert.issuer.toLowerCase().includes('cisco')) {
      badges.push({ label: 'Cisco', icon: Shield, color: 'from-indigo-500 to-blue-500' });
    }
    if (cert.issuer.toLowerCase().includes('enap')) {
      badges.push({ label: 'Enap', icon: GraduationCap, color: 'from-green-500 to-emerald-500' });
    }
    if (cert.issuer.toLowerCase().includes('coursera')) {
      badges.push({ label: 'Coursera', icon: GraduationCap, color: 'from-blue-400 to-blue-600' });
    }
    if (cert.issuer.toLowerCase().includes('militar') || cert.issuer.toLowerCase().includes('exército') || cert.issuer.toLowerCase().includes('esie') || cert.issuer.toLowerCase().includes('cep')) {
      badges.push({ label: 'Military', icon: Building2, color: 'from-slate-500 to-slate-700' });
    }
    
    const aiKeywords = ['artificial intelligence', 'inteligência artificial', 'ai', 'ia'];
    const hasAI = aiKeywords.some(keyword => 
      cert.title.toLowerCase().includes(keyword) || 
      cert.skills.some(skill => skill.toLowerCase().includes(keyword))
    );
    
    if (hasAI && !badges.some(b => b.label === 'AI')) {
      badges.push({ label: 'AI', icon: Brain, color: 'from-purple-500 to-pink-500' });
    }
    
    const cyberKeywords = ['cybersecurity', 'cibersegurança', 'cyber'];
    const hasCyber = cyberKeywords.some(keyword => 
      cert.title.toLowerCase().includes(keyword) || 
      cert.skills.some(skill => skill.toLowerCase().includes(keyword))
    );
    
    if (hasCyber && !badges.some(b => b.label === 'Cybersecurity')) {
      badges.push({ label: 'Cybersecurity', icon: Shield, color: 'from-red-500 to-orange-500' });
    }
    
    return badges;
  };

  const CertificationCard = ({ cert, index, isActive }: { cert: Certification; index: number; isActive: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3, 
        y: isActive ? 0 : 10, 
        scale: isActive ? 1 : 0.98 
      }}
      transition={{ 
        duration: 0.5, 
        delay: isActive ? index * 0.08 : 0,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group relative h-full"
    >
      {/* Glow effect */}
      <div 
        className={`absolute -inset-0.5 bg-gradient-to-r ${cert.color} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
      />
      
      {/* Card content */}
      <div className="relative h-full bg-[#0c1324]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 lg:p-5 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] flex flex-col">
        {/* Header with badge */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className={`p-2 lg:p-2.5 rounded-xl bg-gradient-to-br ${cert.color} shadow-lg flex-shrink-0`}>
              <Award className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm lg:text-base font-bold text-white mb-0.5 line-clamp-2">
                {cert.title}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-1">
                {cert.issuer}
              </p>
            </div>
          </div>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/link flex-shrink-0 ml-2"
              aria-label={t.certifications.viewCredential}
            >
              <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400 group-hover/link:text-primary transition-colors" />
            </a>
          )}
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
          <Calendar className="w-3 h-3 flex-shrink-0" />
          <span className="line-clamp-1">{cert.date}</span>
        </div>

        {/* Technology badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {getTechBadges(cert).map((badge) => {
            const BadgeIcon = badge.icon;
            return (
              <div
                key={badge.label}
                className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-[10px] lg:text-xs font-semibold flex items-center gap-1 shadow-lg`}
              >
                <BadgeIcon className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
                {badge.label}
              </div>
            );
          })}
        </div>

        {/* Credential ID */}
        <div className="mb-3 p-2 bg-white/5 rounded-lg border border-white/5">
          <p className="text-[10px] text-gray-500 mb-0.5">{t.certifications.credentialId}</p>
          <p className="text-xs text-gray-300 font-mono break-all line-clamp-1">{cert.credentialId}</p>
        </div>

        {/* Skills gained */}
        <div className="space-y-1.5 mt-auto">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
            {t.certifications.skillsGained}
          </p>
          <div className="flex flex-wrap gap-1">
            {cert.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-[10px] font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg flex items-center gap-1"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-primary" />
                {skill}
              </span>
            ))}
            {cert.skills.length > 3 && (
              <span className="px-2 py-1 text-[10px] font-medium text-gray-400 bg-white/5 border border-white/10 rounded-lg">
                +{cert.skills.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Section
      id="certifications"
      title={{
        title: t.certifications.title,
        subtitle: t.certifications.subtitle,
        gradient: "accent",
        align: "center",
      }}
      background="dark"
      containerWidth="7xl"
      paddingY="lg"
      paddingX="md"
      dataTour="certifications-section"
    >
      <div className="relative">
        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slideCards, slideIndex) => (
              <div 
                key={slideIndex} 
                className="flex-[0_0_100%] min-w-0 px-2"
              >
              <motion.div 
                  key={`slide-${slideIndex}-${selectedIndex}`}
                  className={`grid gap-4 ${
                    isMobile 
                      ? 'grid-cols-1 sm:grid-cols-3' 
                      : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {slideCards.map((cert, cardIndex) => (
                    <CertificationCard 
                      key={cert.title} 
                      cert={cert} 
                      index={cardIndex}
                      isActive={slideIndex === selectedIndex}
                    />
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 z-10 p-2 lg:p-3 rounded-full bg-[#0c1324]/90 border border-white/10 hover:border-white/30 hover:bg-[#0c1324] transition-all duration-300 group shadow-lg backdrop-blur-sm"
          aria-label="Previous certifications"
        >
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 group-hover:text-white transition-colors" />
        </button>
        
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 z-10 p-2 lg:p-3 rounded-full bg-[#0c1324]/90 border border-white/10 hover:border-white/30 hover:bg-[#0c1324] transition-all duration-300 group shadow-lg backdrop-blur-sm"
          aria-label="Next certifications"
        >
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 group-hover:text-white transition-colors" />
        </button>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? 'bg-primary w-6' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Footer message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 text-center"
      >
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          {t.certifications.footer}
        </p>
      </motion.div>
    </Section>
  );
};
