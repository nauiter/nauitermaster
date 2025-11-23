export type Language = 'en' | 'pt';

export interface ProjectData {
  title: string;
  description: string;
  tools: string[];
}

export interface Translations {
  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    description: string;
    downloadCV: string;
    viewProjects: string;
  };
  // Navigation
  nav: {
    home: string;
    projects: string;
    metrics: string;
    contact: string;
  };
  // AI Tools Section
  aiTools: {
    title: string;
    subtitle: string;
    creativeAI: string;
    technicalAI: string;
    textAI: {
      title: string;
      description: string;
    };
    imageVideoAI: {
      title: string;
      description: string;
    };
    audioAI: {
      title: string;
      description: string;
    };
    automation: {
      title: string;
      description: string;
    };
    proficiency: string;
  };
  // Projects Section
  projects: {
    title: string;
    subtitle: string;
    creativeUniverse: string;
    experimentalConcepts: string;
    visitWebsite: string;
    tools: string;
    sweetLifeAnimes: ProjectData;
    sweetLifeAcademy: ProjectData;
    oVermePasseia: ProjectData;
    clickNoPoint: ProjectData;
    pomodoroProject: ProjectData;
    figueiredoLaw: ProjectData;
    decisionDie: ProjectData;
  };
  // Ecosystem Section
  ecosystem: {
    title: string;
    subtitle: string;
    centralNode: string;
  };
  // Impact Metrics Section
  impact: {
    title: string;
    subtitle: string;
    aiVisualsGenerated: string;
    ecosystemsBuilt: string;
    aiDrivenBrands: string;
    ideasInMotion: string;
  };
  // Contact Section
  contact: {
    title: string;
    subtitle: string;
    bookCall: string;
    email: string;
    followMe: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    hero: {
      title: 'Nauiter Master',
      subtitle: 'Exploring the edge between Intelligence, Art, and Automation.',
      description: 'AI Strategist & Digital Artist | Founder of Sweet Life Animes & O Verme Passeia',
      downloadCV: 'Download CV',
      viewProjects: 'View My Projects',
    },
    nav: {
      home: 'Home',
      projects: 'Projects',
      metrics: 'Metrics',
      contact: 'Contact',
    },
    aiTools: {
      title: 'AI Tools Mastery',
      subtitle: 'Expert in AI prompt workflows and automation pipelines for creative expression.',
      creativeAI: 'Creative AI',
      technicalAI: 'Technical AI',
      textAI: {
        title: 'Text AI',
        description: 'GPTs, Claude, Llama - advanced prompt engineering & ideation workflows.',
      },
      imageVideoAI: {
        title: 'Image / Video AI',
        description: 'Midjourney, Leonardo, Runway - creative workflow efficiency.',
      },
      audioAI: {
        title: 'Audio AI',
        description: 'Suno, Udio, ElevenLabs - voice & audio production expertise.',
      },
      automation: {
        title: 'Automation',
        description: 'Make, Zapier, n8n - no-code workflow orchestration & optimization.',
      },
      proficiency: 'Proficiency',
    },
    projects: {
      title: 'Showcase Projects',
      subtitle: 'Intersection of AI, storytelling, and digital strategy.',
      creativeUniverse: 'Creative Universe',
      experimentalConcepts: 'Experimental Concepts',
      visitWebsite: 'Visit Website',
      tools: 'Tools',
      sweetLifeAnimes: {
        title: 'Sweet Life Animes',
        description: 'Empowering digital artists and creative communities.',
        tools: ['AI', 'Digital Art', 'Community'],
      },
      sweetLifeAcademy: {
        title: 'Sweet Life Academy',
        description: 'Helping creators grow with AI strategy and education.',
        tools: ['AI Education', 'Automation', 'Strategy'],
      },
      oVermePasseia: {
        title: 'O Verme Passeia',
        description: 'Exploring philosophy and aesthetics through design.',
        tools: ['Philosophy', 'Digital Art', 'AI'],
      },
      clickNoPoint: {
        title: 'Click No Point',
        description: 'Creative comedy exploring irony and absurdity in the digital era.',
        tools: ['Comedy', 'Humor', 'Creative Media'],
      },
      pomodoroProject: {
        title: 'Pomodoro Project',
        description: 'A minimalist AI-driven time management experiment.',
        tools: ['Productivity', 'Design', 'Focus'],
      },
      figueiredoLaw: {
        title: 'Figueiredo Law',
        description: 'AI consultancy connecting law, ethics, and technology.',
        tools: ['Law', 'Ethics', 'Technology'],
      },
      decisionDie: {
        title: 'Decision Die',
        description: 'A playful AI experiment to simulate random creativity.',
        tools: ['Game', 'AI', 'Design'],
      },
    },
    ecosystem: {
      title: 'Creative & Strategic Ecosystem',
      subtitle: 'An interconnected network of brands, projects, and ideas.',
      centralNode: 'Creator, Strategist & AI Visionary',
    },
    impact: {
      title: 'Impact Metrics',
      subtitle: 'Expressing creativity through data - each number tells part of the story.',
      aiVisualsGenerated: 'AI Visuals Generated',
      ecosystemsBuilt: 'Creative Ecosystems Built',
      aiDrivenBrands: 'AI-Driven Brands',
      ideasInMotion: 'Ideas in Motion',
    },
    contact: {
      title: "Let's Co-Create the Future",
      subtitle: 'If your vision connects with mine - let\'s build something extraordinary.',
      bookCall: 'Book a Discovery Call',
      email: 'Email',
      followMe: 'Follow Me',
    },
  },
  pt: {
    hero: {
      title: 'Nauiter Master',
      subtitle: 'Explorando a fronteira entre Inteligência, Arte e Automação.',
      description: 'Estrategista de IA & Artista Digital | Fundador de Sweet Life Animes & O Verme Passeia',
      downloadCV: 'Baixar CV',
      viewProjects: 'Ver Meus Projetos',
    },
    nav: {
      home: 'Início',
      projects: 'Projetos',
      metrics: 'Métricas',
      contact: 'Contato',
    },
    aiTools: {
      title: 'Domínio de Ferramentas de IA',
      subtitle: 'Especialista em workflows de prompts de IA e pipelines de automação para expressão criativa.',
      creativeAI: 'IA Criativa',
      technicalAI: 'IA Técnica',
      textAI: {
        title: 'IA de Texto',
        description: 'GPTs, Claude, Llama - engenharia avançada de prompts & workflows de ideação.',
      },
      imageVideoAI: {
        title: 'IA de Imagem / Vídeo',
        description: 'Midjourney, Leonardo, Runway - eficiência em workflows criativos.',
      },
      audioAI: {
        title: 'IA de Áudio',
        description: 'Suno, Udio, ElevenLabs - expertise em produção de voz & áudio.',
      },
      automation: {
        title: 'Automação',
        description: 'Make, Zapier, n8n - orquestração & otimização de workflows sem código.',
      },
      proficiency: 'Proficiência',
    },
    projects: {
      title: 'Projetos em Destaque',
      subtitle: 'Interseção entre IA, narrativa e estratégia digital.',
      creativeUniverse: 'Universo Criativo',
      experimentalConcepts: 'Conceitos Experimentais',
      visitWebsite: 'Visitar Website',
      tools: 'Ferramentas',
      sweetLifeAnimes: {
        title: 'Sweet Life Animes',
        description: 'Empoderando artistas digitais e comunidades criativas.',
        tools: ['IA', 'Arte Digital', 'Comunidade'],
      },
      sweetLifeAcademy: {
        title: 'Sweet Life Academy',
        description: 'Ajudando criadores a crescer com estratégia e educação em IA.',
        tools: ['Educação IA', 'Automação', 'Estratégia'],
      },
      oVermePasseia: {
        title: 'O Verme Passeia',
        description: 'Explorando filosofia e estética através do design.',
        tools: ['Filosofia', 'Arte Digital', 'IA'],
      },
      clickNoPoint: {
        title: 'Click No Point',
        description: 'Comédia criativa explorando ironia e absurdo na era digital.',
        tools: ['Comédia', 'Humor', 'Mídia Criativa'],
      },
      pomodoroProject: {
        title: 'Projeto Pomodoro',
        description: 'Um experimento minimalista de gestão de tempo impulsionado por IA.',
        tools: ['Produtividade', 'Design', 'Foco'],
      },
      figueiredoLaw: {
        title: 'Figueiredo Law',
        description: 'Consultoria em IA conectando direito, ética e tecnologia.',
        tools: ['Direito', 'Ética', 'Tecnologia'],
      },
      decisionDie: {
        title: 'Decision Die',
        description: 'Um experimento lúdico de IA para simular criatividade aleatória.',
        tools: ['Jogo', 'IA', 'Design'],
      },
    },
    ecosystem: {
      title: 'Ecossistema Criativo & Estratégico',
      subtitle: 'Uma rede interconectada de marcas, projetos e ideias.',
      centralNode: 'Criador, Estrategista & Visionário de IA',
    },
    impact: {
      title: 'Métricas de Impacto',
      subtitle: 'Expressando criatividade através de dados - cada número conta parte da história.',
      aiVisualsGenerated: 'Visuais de IA Gerados',
      ecosystemsBuilt: 'Ecossistemas Criativos Construídos',
      aiDrivenBrands: 'Marcas Impulsionadas por IA',
      ideasInMotion: 'Ideias em Movimento',
    },
    contact: {
      title: 'Vamos Co-Criar o Futuro',
      subtitle: 'Se sua visão se conecta com a minha - vamos construir algo extraordinário.',
      bookCall: 'Agendar uma Chamada',
      email: 'Email',
      followMe: 'Me Siga',
    },
  },
};
