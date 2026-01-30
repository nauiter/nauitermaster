import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useSection } from '@/hooks/useSection';
import { SectionTitle } from '@/components/ui/section-title';

// Import experience logos
import exercitoBrasileiroLogo from '@/assets/experience/exercitobrasileiro_logo.webp';
import googleLogo from '@/assets/experience/google_logo.webp';
import blizzardLogo from '@/assets/experience/blizzard_entertainment_logo.webp';
import tenXBankLogo from '@/assets/experience/10xbank_logo.webp';
import localHostLogo from '@/assets/experience/local_host_solucoes_logo.webp';
import sweetLifeAnimesLogo from '@/assets/experience/sweet_life_animes_logo.webp';
import advocaciaFigueiredoLogo from '@/assets/experience/advocacia_figueiredo_logo.webp';
import avaliaMacapaLogo from '@/assets/experience/avalia_macapa_logo.webp';

interface Experience {
  name: string;
  logo: string;
  period: { en: string; pt: string };
  role: { en: string; pt: string };
  url: string | null;
}

const experiences: Experience[] = [
  {
    name: 'Exército Brasileiro',
    logo: exercitoBrasileiroLogo,
    period: { en: '10+ years', pt: '10+ anos' },
    role: { en: 'Military Telecommunications', pt: 'Militar de Telecomunicações' },
    url: 'https://www.eb.mil.br/',
  },
  {
    name: 'Google',
    logo: googleLogo,
    period: { en: 'Certifications', pt: 'Certificações' },
    role: { en: 'Cloud Partner', pt: 'Cloud Partner' },
    url: 'https://cloud.google.com/',
  },
  {
    name: 'Blizzard Entertainment',
    logo: blizzardLogo,
    period: { en: 'Collaboration', pt: 'Colaboração' },
    role: { en: 'Community', pt: 'Comunidade' },
    url: 'https://www.blizzard.com/',
  },
  {
    name: '10xBank',
    logo: tenXBankLogo,
    period: { en: 'Project', pt: 'Projeto' },
    role: { en: 'Development', pt: 'Desenvolvimento' },
    url: null,
  },
  {
    name: 'Local Host Soluções',
    logo: localHostLogo,
    period: { en: 'Freelance', pt: 'Freelance' },
    role: { en: 'Tech Solutions', pt: 'Soluções Tech' },
    url: null,
  },
  {
    name: 'Sweet Life Animes',
    logo: sweetLifeAnimesLogo,
    period: { en: 'Current', pt: 'Atual' },
    role: { en: 'Founder & Creator', pt: 'Fundador & Criador' },
    url: 'https://sweetlifeanimes.com/',
  },
  {
    name: 'Advocacia Figueiredo',
    logo: advocaciaFigueiredoLogo,
    period: { en: 'Project', pt: 'Projeto' },
    role: { en: 'Web Development', pt: 'Desenvolvimento Web' },
    url: 'https://advocaciafigueiredo.adv.br',
  },
  {
    name: 'Avalia Macapá',
    logo: avaliaMacapaLogo,
    period: { en: 'Project', pt: 'Projeto' },
    role: { en: 'Platform Development', pt: 'Desenvolvimento de Plataforma' },
    url: 'https://avaliamacapa.com.br',
  },
];

export const ExperienceSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { sectionClasses, containerClasses } = useSection({
    containerWidth: '6xl',
    paddingY: 'lg',
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      id="experience"
      className={sectionClasses}
      aria-labelledby="experience-title"
    >
      <div className={containerClasses}>
        <SectionTitle
          title={t.experience.title}
          subtitle={t.experience.subtitle}
          dataAttr="experience-title"
        />

        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {experiences.map((exp) => {
            const LogoWrapper = exp.url ? 'a' : 'div';
            const wrapperProps = exp.url
              ? {
                  href: exp.url,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  'aria-label': `${exp.name} - ${exp.role[language]}`,
                }
              : {};

            return (
              <motion.div key={exp.name} variants={itemVariants}>
                <LogoWrapper
                  {...wrapperProps}
                  className="group flex items-center justify-center p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 cursor-pointer min-h-[80px] md:min-h-[100px] w-[90px] sm:w-[100px] md:w-[120px]"
                >
                  <img
                    src={exp.logo}
                    alt={`${exp.name} logo`}
                    className="h-12 md:h-16 w-auto object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    loading="lazy"
                  />
                </LogoWrapper>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
