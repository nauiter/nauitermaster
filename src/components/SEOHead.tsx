import { useEffect } from 'react';
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
  const baseUrl = 'https://nauitermaster.com';
  const currentPath = location.pathname;
  const fullUrl = `${baseUrl}${currentPath}`;

  const seoData = {
    pt: {
      title: 'Nauiter Master | IA, Arte Digital & Automação',
      description: 'Estrategista de IA com 14+ anos em tecnologia, especializado em prompt engineering para workflows criativos. Desenvolvedor de 5+ plataformas ativas usando React, TypeScript e Supabase.',
      keywords: 'IA criativa, automação digital, arte digital, educação em IA, filosofia e design, prompt engineering, automação criativa com IA, portfólio IA Macapá',
    },
    en: {
      title: 'Nauiter Master | AI, Digital Art & Automation',
      description: 'AI Strategist with 14+ years in technology, specialized in prompt engineering for creative workflows. Developer of 5+ active platforms using React, TypeScript and Supabase.',
      keywords: 'AI creative workflows, digital automation, digital art, AI education, philosophy & design, prompt engineering, creative AI automation',
    },
  };

  const currentSEO = seoData[currentLang];

  useEffect(() => {
    // Update document title
    document.title = currentSEO.title;

    // Update document lang attribute dynamically
    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';

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

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', fullUrl);
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

    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) {
      twitterUrl.setAttribute('content', fullUrl);
    }
  }, [currentLang, currentSEO, fullUrl]);

  // FAQ Data for Schema
  const faqData = currentLang === 'pt' ? [
    {
      question: "O que é Prompt Engineering?",
      answer: "Prompt Engineering é a prática de criar instruções estruturadas e otimizadas para modelos de IA como ChatGPT, Claude e Midjourney, visando obter resultados mais precisos e criativos."
    },
    {
      question: "Quais serviços de IA são oferecidos?",
      answer: "Oferecemos consultoria em estratégia de IA, automação de workflows criativos, desenvolvimento de aplicações com IA, e educação em prompt engineering através da Sweet Life Academy."
    },
    {
      question: "Como a automação com IA pode ajudar criadores?",
      answer: "A automação com IA permite que criadores foquem no trabalho criativo enquanto tarefas repetitivas são automatizadas, aumentando produtividade e qualidade do output."
    }
  ] : [
    {
      question: "What is Prompt Engineering?",
      answer: "Prompt Engineering is the practice of creating structured and optimized instructions for AI models like ChatGPT, Claude, and Midjourney, aiming to achieve more precise and creative results."
    },
    {
      question: "What AI services are offered?",
      answer: "We offer AI strategy consulting, creative workflow automation, AI-powered application development, and prompt engineering education through Sweet Life Academy."
    },
    {
      question: "How can AI automation help creators?",
      answer: "AI automation allows creators to focus on creative work while repetitive tasks are automated, increasing productivity and output quality."
    }
  ];

  // Service Data for Schema
  const serviceData = {
    name: currentLang === 'pt' ? "Consultoria em Estratégia de IA & Automação" : "AI Strategy & Automation Consulting",
    description: currentLang === 'pt' 
      ? "Serviços de consultoria especializada em estratégia de inteligência artificial, automação de workflows criativos e educação em prompt engineering."
      : "Specialized consulting services in artificial intelligence strategy, creative workflow automation, and prompt engineering education.",
    serviceTypes: currentLang === 'pt'
      ? ["Consultoria em IA", "Prompt Engineering", "Automação Criativa", "Educação em IA"]
      : ["AI Consulting", "Prompt Engineering", "Creative Automation", "AI Education"]
  };

  return (
    <>
      {/* Canonical and Hreflang */}
      <link rel="canonical" href={fullUrl} />
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
          "image": `${baseUrl}/og-image.png`,
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
              "url": "https://sweetlifeanimes.com/",
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
              "url": "https://overmepasseia.com.br",
              "creator": { "@type": "Person", "name": "Nauiter Master" }
            },
            {
              "@type": "CreativeWork",
              "name": "Figueiredo Law",
              "description": currentLang === 'pt'
                ? "Consultoria em IA conectando direito, ética e tecnologia"
                : "AI consultancy connecting law, ethics, and technology",
              "url": "https://advocaciafigueiredo.adv.br",
              "creator": { "@type": "Person", "name": "Nauiter Master" }
            },
            {
              "@type": "WebApplication",
              "name": "Avalia Macapá",
              "description": currentLang === 'pt'
                ? "Plataforma web de avaliação urbana para mapear e avaliar locais e serviços"
                : "Urban assessment web platform for mapping and rating locations and services",
              "url": "https://avaliamacapa.com.br",
              "creator": { "@type": "Person", "name": "Nauiter Master" }
            }
          ]
        })
      }} />

      {/* Structured Data - FAQPage (GEO Optimization) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })
      }} />

      {/* Structured Data - Service (GEO Optimization) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": serviceData.name,
          "description": serviceData.description,
          "provider": {
            "@type": "Person",
            "name": "Nauiter Master",
            "url": baseUrl
          },
          "serviceType": serviceData.serviceTypes,
          "areaServed": {
            "@type": "Place",
            "name": "Worldwide"
          },
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": baseUrl,
            "servicePhone": "",
            "availableLanguage": ["Portuguese", "English"]
          }
        })
      }} />
    </>
  );
};
