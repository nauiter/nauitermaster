import React, { useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  forcedLanguage?: 'pt' | 'en';
}

/**
 * SEO Head Component
 * 
 * Dynamic SEO meta tags, hreflang, canonical URLs and structured data.
 * Updates based on current route and language.
 */
export const SEOHead = ({ forcedLanguage }: SEOHeadProps) => {
  const { language } = useLanguage();
  const location = useLocation();
  const currentLang = forcedLanguage || language;
  const baseUrl = 'https://nauitermaster.lovable.app';
  const currentPath = location.pathname;

  const seoData = {
    pt: {
      title: 'Nauiter Master | Estrategista de IA, Arte Digital & Automação',
      description: 'Estrategista de IA e artista digital. Projetos criativos em automação, arte e educação com tecnologia de ponta.',
      keywords: 'IA criativa, automação digital, arte digital, educação em IA, filosofia e design, prompt engineering',
    },
    en: {
      title: 'Nauiter Master | AI Strategist, Digital Art & Automation',
      description: 'AI strategist and digital artist. Creative projects in automation, art, and education with cutting-edge technology.',
      keywords: 'AI creative workflows, digital automation, digital art, AI education, philosophy & design, prompt engineering',
    },
  };

  const currentSEO = seoData[currentLang];

  useEffect(() => {
    // Update document title
    document.title = currentSEO.title;

    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentSEO.description);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', currentSEO.keywords);
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', currentSEO.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', currentSEO.description);
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', currentSEO.title);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', currentSEO.description);
    }
  }, [currentLang, currentSEO]);

  return (
    <>
      {/* Canonical and Hreflang */}
      <link rel="canonical" href={`${baseUrl}${currentPath}`} />
      <link rel="alternate" hrefLang="pt-BR" href={`${baseUrl}/pt`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/`} />

      {/* Structured Data - Person */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Nauiter Master",
          "jobTitle": currentLang === 'pt' ? "Estrategista de IA e Artista Digital" : "AI Strategist & Digital Artist",
          "description": currentSEO.description,
          "url": baseUrl,
          "image": `${baseUrl}/src/assets/portfolio-avatar.webp`,
          "sameAs": [
            "https://linkedin.com/in/nauiter-master-678a71144",
            "https://instagram.com/nauiter.master",
            "https://facebook.com/nauiter.master"
          ],
          "knowsAbout": currentLang === 'pt'
            ? ["Inteligência Artificial", "Arte Digital", "Prompt Engineering", "Automação com IA", "IA Criativa", "Educação em IA"]
            : ["Artificial Intelligence", "Digital Art", "Prompt Engineering", "AI Automation", "Creative AI", "AI Education"],
          "alumniOf": currentLang === 'pt' ? "Análise de Sistemas" : "Systems Analysis",
          "email": "nauitermaster@hotmail.com",
          "worksFor": {
            "@type": "Organization",
            "name": "Sweet Life Academy",
            "description": currentLang === 'pt' 
              ? "Educação em IA e automação para criadores" 
              : "AI education and automation for creators"
          }
        })
      }} />

      {/* Structured Data - Creative Works */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": [
            {
              "@type": "CreativeWork",
              "name": "Sweet Life Animes",
              "description": currentLang === 'pt'
                ? "Marca criativa focada em empoderar artistas digitais e contadores de histórias"
                : "Creative brand focused on empowering digital artists and storytellers",
              "url": "https://sweetlifeanimes.lovable.app/",
              "creator": { "@type": "Person", "name": "Nauiter Master" }
            },
            {
              "@type": "EducationalOrganization",
              "name": "Sweet Life Academy",
              "description": currentLang === 'pt'
                ? "Educação em IA e automação para criadores"
                : "AI education and automation for creators",
              "url": "https://sweetlifeacademy.coursify.me/",
              "founder": { "@type": "Person", "name": "Nauiter Master" }
            },
            {
              "@type": "CreativeWork",
              "name": "O Verme Passeia",
              "description": currentLang === 'pt'
                ? "Explorando filosofia e estética através do design"
                : "Exploring philosophy and aesthetics through design",
              "url": "https://overmepasseia.lovable.app",
              "creator": { "@type": "Person", "name": "Nauiter Master" }
            },
            {
              "@type": "CreativeWork",
              "name": "Figueiredo Law",
              "description": currentLang === 'pt'
                ? "Consultoria em IA conectando direito, ética e tecnologia"
                : "AI consultancy connecting law, ethics, and technology",
              "url": "https://figueiredo-landing-amapa.lovable.app/",
              "creator": { "@type": "Person", "name": "Nauiter Master" }
            }
          ]
        })
      }} />
    </>
  );
};
