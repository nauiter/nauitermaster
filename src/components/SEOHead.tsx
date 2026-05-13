import { useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useLocation } from 'react-router-dom';

type PageType = 'home' | 'privacy' | 'terms';

interface SEOHeadProps {
  forcedLanguage?: 'pt' | 'en';
  pageType?: PageType;
}

/**
 * SEO Head Component
 *
 * Dynamic SEO meta tags, hreflang, canonical URLs and structured data.
 * Updates based on current route and language.
 */
export const SEOHead = ({ forcedLanguage, pageType = 'home' }: SEOHeadProps) => {
  const { language } = useLanguage();
  const location = useLocation();
  const currentLang = forcedLanguage || language;
  const baseUrl = 'https://nauitermaster.com';
  const currentPath = location.pathname;
  const fullUrl = `${baseUrl}${currentPath}`;

  const pageMeta: Record<PageType, { pt: { title: string; description: string }; en: { title: string; description: string } }> = {
    home: {
      pt: {
        title: 'Nauiter Master | IA, Arte Digital & Automação',
        description: 'Estrategista de IA com 14+ anos em tecnologia. Prompt engineering, automação criativa e desenvolvimento com React, TypeScript e Supabase.',
      },
      en: {
        title: 'Nauiter Master | AI, Digital Art & Automation',
        description: 'AI Strategist with 14+ years in tech. Prompt engineering, creative automation and platform development with React, TypeScript and Supabase.',
      },
    },
    privacy: {
      pt: {
        title: 'Política de Privacidade | Nauiter Master',
        description: 'Política de Privacidade do site Nauiter Master, em conformidade com a LGPD. Saiba como seus dados são coletados, usados e protegidos.',
      },
      en: {
        title: 'Privacy Policy | Nauiter Master',
        description: 'Privacy Policy for the Nauiter Master site. Learn how your data is collected, used and protected under GDPR and LGPD compliance.',
      },
    },
    terms: {
      pt: {
        title: 'Termos de Uso | Nauiter Master',
        description: 'Termos de Uso que regem o acesso ao site Nauiter Master e aos serviços de consultoria, mentoria e desenvolvimento em IA.',
      },
      en: {
        title: 'Terms of Use | Nauiter Master',
        description: 'Terms of Use governing access to the Nauiter Master website and AI consulting, mentorship and development services.',
      },
    },
  };

  const currentSEO = {
    ...pageMeta[pageType][currentLang],
    keywords: currentLang === 'pt'
      ? 'IA criativa, automação digital, arte digital, educação em IA, filosofia e design, prompt engineering, automação criativa com IA, portfólio IA Macapá'
      : 'AI creative workflows, digital automation, digital art, AI education, philosophy & design, prompt engineering, creative AI automation',
  };


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
      answer: "Oferecemos consultoria em estratégia de IA, automação de workflows criativos, desenvolvimento de aplicações com IA, e educação em prompt engineering através de programas de mentoria personalizados."
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
      answer: "We offer AI strategy consulting, creative workflow automation, AI-powered application development, and prompt engineering education through personalized mentorship programs."
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
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en`} />

      {/* Structured Data - Person with Experience */}
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
          "worksFor": [
            {
              "@type": "Organization",
              "name": "Exército Brasileiro",
              "description": currentLang === 'pt' ? "Militar de Telecomunicações" : "Military Telecommunications",
              "url": "https://www.eb.mil.br/"
            },
            {
              "@type": "Organization",
              "name": "Google",
              "description": "Cloud Partner",
              "url": "https://cloud.google.com/"
            },
            {
              "@type": "Organization",
              "name": "Blizzard Entertainment",
              "description": currentLang === 'pt' ? "Comunidade" : "Community",
              "url": "https://www.blizzard.com/"
            },
            {
              "@type": "Organization",
              "name": "10xBank",
              "description": currentLang === 'pt' ? "Desenvolvimento" : "Development"
            },
            {
              "@type": "Organization",
              "name": "Local Host Soluções",
              "description": currentLang === 'pt' ? "Soluções Tech" : "Tech Solutions"
            },
            {
              "@type": "Organization",
              "name": "Advocacia Figueiredo",
              "description": currentLang === 'pt' ? "Desenvolvimento Web" : "Web Development",
              "url": "https://advocaciafigueiredo.adv.br"
            },
            {
              "@type": "Organization",
              "name": "Avalia Macapá",
              "description": currentLang === 'pt' ? "Desenvolvimento de Plataforma" : "Platform Development",
              "url": "https://avaliamacapa.com.br"
            },
            {
              "@type": "Organization",
              "name": "Chaos Oracle",
              "description": currentLang === 'pt' ? "Experiência Digital & Filosofia" : "Digital Experience & Philosophy",
              "url": "https://chaos-bloom-decision.lovable.app/"
            }
          ]
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
            },
            {
              "@type": "WebApplication",
              "name": "Chaos Oracle",
              "description": currentLang === 'pt'
                ? "Experiência digital inspirada na teoria do caos para tomada de decisões"
                : "Digital experience inspired by chaos theory for decision making",
              "url": "https://chaos-bloom-decision.lovable.app/",
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
          "priceRange": "$$",
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

      {/* Structured Data - BreadcrumbList (Navigation) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": `${baseUrl}/${currentLang === 'pt' ? 'pt' : 'en'}`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": currentLang === 'pt' ? "Projetos" : "Projects",
              "item": `${baseUrl}/${currentLang === 'pt' ? 'pt' : 'en'}#projects`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": currentLang === 'pt' ? "Contato" : "Contact",
              "item": `${baseUrl}/${currentLang === 'pt' ? 'pt' : 'en'}#contact`
            }
          ]
        })
      }} />
    </>
  );
};
