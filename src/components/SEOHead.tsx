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
        description: 'Termos de Uso que regem o acesso ao site Nauiter Master e aos conteúdos sobre consultoria e desenvolvimento em IA.',
      },
      en: {
        title: 'Terms of Use | Nauiter Master',
        description: 'Terms of Use governing access to the Nauiter Master website and its content on AI consulting and development.',
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
      question: "Quem é Nauiter Master?",
      answer: "Nauiter Master é estrategista de IA e artista digital com mais de 14 anos em tecnologia, baseado em Macapá (Brasil). Une experiência em telecomunicações militares, análise de sistemas, filosofia e arte digital para criar plataformas web e fluxos de trabalho com inteligência artificial."
    },
    {
      question: "O que é Prompt Engineering?",
      answer: "Prompt Engineering é a prática de criar instruções estruturadas e otimizadas para modelos de IA como ChatGPT, Claude, Gemini e Midjourney, visando obter resultados mais precisos, consistentes e criativos. Envolve definir contexto, papel, formato de saída e critérios de avaliação."
    },
    {
      question: "Quais ferramentas de IA Nauiter Master utiliza?",
      answer: "No lado criativo: Midjourney, Leonardo AI, Runway e Suno para imagem, vídeo e música. No lado técnico: ChatGPT, Claude e Gemini para raciocínio e código, além de Make, Zapier e n8n para automação de processos."
    },
    {
      question: "Quais serviços de IA são oferecidos?",
      answer: "O portfólio reúne projetos de consultoria em estratégia de IA, automação de workflows criativos e desenvolvimento de aplicações com IA. Não há programas pagos nem valores divulgados no momento. Para contato, utilize os canais disponíveis no site."
    },
    {
      question: "Como a automação com IA pode ajudar criadores?",
      answer: "A automação com IA permite que criadores foquem no trabalho criativo enquanto tarefas repetitivas — organização de arquivos, publicação, respostas padrão e relatórios — são executadas automaticamente, aumentando produtividade e consistência do resultado."
    },
    {
      question: "Quais tecnologias são usadas nos projetos?",
      answer: "As plataformas são construídas com React, TypeScript, Tailwind CSS, Supabase e PostgreSQL, com testes automatizados e práticas de qualidade aplicadas do início ao fim do projeto."
    }
  ] : [
    {
      question: "Who is Nauiter Master?",
      answer: "Nauiter Master is an AI strategist and digital artist with over 14 years in technology, based in Macapá, Brazil. He combines military telecommunications experience, systems analysis, philosophy and digital art to build web platforms and AI-driven workflows."
    },
    {
      question: "What is Prompt Engineering?",
      answer: "Prompt Engineering is the practice of creating structured and optimized instructions for AI models like ChatGPT, Claude, Gemini and Midjourney, aiming for more precise, consistent and creative results. It covers defining context, role, output format and evaluation criteria."
    },
    {
      question: "Which AI tools does Nauiter Master use?",
      answer: "On the creative side: Midjourney, Leonardo AI, Runway and Suno for image, video and music. On the technical side: ChatGPT, Claude and Gemini for reasoning and code, plus Make, Zapier and n8n for process automation."
    },
    {
      question: "What AI services are offered?",
      answer: "The portfolio features AI strategy consulting, creative workflow automation, and AI-powered application development projects. No paid programs or prices are offered at the moment. For contact, use the channels available on the site."
    },
    {
      question: "How can AI automation help creators?",
      answer: "AI automation lets creators focus on creative work while repetitive tasks — file organization, publishing, standard replies and reporting — run automatically, increasing productivity and output consistency."
    },
    {
      question: "Which technologies power the projects?",
      answer: "The platforms are built with React, TypeScript, Tailwind CSS, Supabase and PostgreSQL, with automated testing and quality practices applied end to end."
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

      {/* Structured Data - WebSite (brand identity / sitelinks) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          "name": "Nauiter Master",
          "alternateName": [
            "Nauiter",
            "Nauiter Master Portfolio",
            "nauitermaster.com",
            currentLang === 'pt' ? "Nauiter Master — Estrategista de IA" : "Nauiter Master — AI Strategist"
          ],
          "url": baseUrl,
          "inLanguage": currentLang === 'pt' ? "pt-BR" : "en",
          "description": currentSEO.description,
          "publisher": { "@id": `${baseUrl}/#person` }
        })
      }} />

      {/* Structured Data - ProfilePage (links site to author) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${baseUrl}/#profilepage`,
          "name": "Nauiter Master",
          "url": fullUrl,
          "isPartOf": { "@id": `${baseUrl}/#website` },
          "mainEntity": { "@id": `${baseUrl}/#person` }
        })
      }} />

      {/* Structured Data - Person with Experience */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${baseUrl}/#person`,
          "name": "Nauiter Master",
          "alternateName": "Nauiter",
          "jobTitle": currentLang === 'pt' ? "Estrategista de IA e Artista Digital" : "AI Strategist & Digital Artist",
          "description": currentSEO.description,
          "url": baseUrl,
          "image": `${baseUrl}/og-image.png`,
          "sameAs": [
            "https://linkedin.com/in/nauiter-master-678a71144",
            "https://github.com/nauiter",
            "https://instagram.com/nauiter.master",
            "https://facebook.com/nauiter.master",
            "https://www.youtube.com/@nyetfuture"
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
              "url": "https://oraculodocaos.com.br"
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
              "url": "https://oraculodocaos.com.br",
              "creator": { "@type": "Person", "name": "Nauiter Master" }
            },
            {
              "@type": "WebApplication",
              "name": "QA Master",
              "description": currentLang === 'pt'
                ? "Plataforma local-first de auditoria e controle de qualidade estratégico com arquitetura multi-projeto e gamificação"
                : "Local-first platform for strategic auditing and quality control with multi-project architecture and gamification",
              "url": "https://audit-ace-77.lovable.app",
              "creator": { "@type": "Person", "name": "Nauiter Master" }
            },
            {
              "@type": "CreativeWork",
              "name": "Nyet Future",
              "description": currentLang === 'pt'
                ? "Canal de música dark/atmospheric criado com Suno AI para o público internacional de darkwave/coldwave/doomer/post-punk"
                : "Dark/atmospheric music channel built with Suno AI for the international darkwave/coldwave/doomer/post-punk scene",
              "url": "https://www.youtube.com/@nyetfuture",
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
