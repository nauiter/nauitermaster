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
    linkedinFollowers: string;
    yearsExperience: string;
    activeProjects: string;
  };
    badges: {
      aiStrategy: {
        label: string;
        description: string;
      };
      development: {
        label: string;
        description: string;
      };
      database: {
        label: string;
        description: string;
      };
      automation: {
        label: string;
        description: string;
      };
      systemsAnalysis: {
        label: string;
        description: string;
      };
      socialMedia: {
        label: string;
        description: string;
      };
      contentCreator: {
        label: string;
        description: string;
      };
      militaryTelecom: {
        label: string;
        description: string;
      };
    };
  // Navigation
  nav: {
    home: string;
    projects: string;
    metrics: string;
    techStack: string;
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
    projects: {
      sweetLifeAnimes: {
        name: string;
        purpose: string;
        type: string;
      };
      sweetLifeAcademy: {
        name: string;
        purpose: string;
        type: string;
      };
      oVermePasseia: {
        name: string;
        purpose: string;
        type: string;
      };
      figueiredoLaw: {
        name: string;
        purpose: string;
        type: string;
      };
    };
  };
  // Skills Section
  skills: {
    title: string;
    coreStrengths: string;
    growingAreas: string;
    leadershipOps: string;
    items: {
      promptEngineering: string;
      aiEthicsSafety: string;
      humanAiCollaboration: string;
      dataHandlingPrivacy: string;
      aiModelFineTuning: string;
      multiModalAiSystems: string;
    };
  };
  // Tech Stack Section
  techStack: {
    title: string;
    subtitle: string;
    categories: {
      frontend: {
        title: string;
        technologies: string[];
      };
      backend: {
        title: string;
        technologies: string[];
      };
      database: {
        title: string;
        technologies: string[];
      };
      cloud: {
        title: string;
        technologies: string[];
      };
      ai: {
        title: string;
        technologies: string[];
      };
      tools: {
        title: string;
        technologies: string[];
      };
    };
    footer: string;
  };
  // Soft Skills Section
  softSkills: {
    title: string;
    subtitle: string;
    categories: {
      teamwork: {
        title: string;
        skills: string[];
      };
      leadership: {
        title: string;
        skills: string[];
      };
      communication: {
        title: string;
        skills: string[];
      };
      problemSolving: {
        title: string;
        skills: string[];
      };
      timeManagement: {
        title: string;
        skills: string[];
      };
      adaptability: {
        title: string;
        skills: string[];
      };
    };
    footer: string;
  };
  // Certifications Section
  certifications: {
    title: string;
    subtitle: string;
    viewCredential: string;
    credentialId: string;
    skillsGained: string;
    footer: string;
    items: Array<{
      title: string;
      issuer: string;
      date: string;
      credentialId?: string;
      credentialUrl?: string;
      skills: string[];
      color: string;
    }>;
  };
  // Impact Metrics Section
  impact: {
    title: string;
    subtitle: string;
    aiVisualsGenerated: string;
    ecosystemsBuilt: string;
    aiDrivenBrands: string;
    militaryExperience: string;
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
  // LGPD / Privacy Section
  lgpd: {
    banner: {
      title: string;
      description: string;
      acceptAll: string;
      rejectNonEssential: string;
      managePreferences: string;
      privacyLink: string;
    };
    preferences: {
      title: string;
      description: string;
      essential: {
        title: string;
        description: string;
      };
      analytics: {
        title: string;
        description: string;
      };
      marketing: {
        title: string;
        description: string;
      };
      savePreferences: string;
      cancel: string;
    };
    privacy: {
      title: string;
      lastUpdated: string;
      sections: {
        introduction: {
          title: string;
          content: string;
        };
        dataCollection: {
          title: string;
          content: string;
        };
        cookies: {
          title: string;
          content: string;
        };
        dataRetention: {
          title: string;
          content: string;
        };
        sharing: {
          title: string;
          content: string;
        };
        rights: {
          title: string;
          content: string;
        };
      };
    };
    terms: {
      title: string;
      sections: {
        terms: {
          title: string;
          content: string;
        };
        license: {
          title: string;
          content: string;
        };
        disclaimer: {
          title: string;
          content: string;
        };
        limitations: {
          title: string;
          content: string;
        };
      };
    };
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    hero: {
      title: 'Nauiter Master',
      subtitle: 'Exploring the edge between Intelligence, Art, and Automation.',
      description: 'Systems Analyst & AI Strategist | Dev (TS/JS/SQL) | Content Creator & Digital Strategy',
      downloadCV: 'Download CV',
      viewProjects: 'View My Projects',
      linkedinFollowers: 'LinkedIn Followers',
      yearsExperience: 'Years Experience',
      activeProjects: 'Active Projects',
    },
    badges: {
      aiStrategy: {
        label: 'AI Strategy',
        description: 'Developing AI strategies for optimizing creative processes and intelligent workflow automation.',
      },
      development: {
        label: 'TS/JS Dev',
        description: 'Full-stack development with TypeScript, JavaScript, React, Node.js and modern web technologies.',
      },
      database: {
        label: 'SQL/DB',
        description: 'Database design, optimization and management with SQL, PostgreSQL, Supabase and cloud solutions.',
      },
      automation: {
        label: 'Automation',
        description: 'Automating creative and operational processes using AI APIs and intelligent systems integration.',
      },
      systemsAnalysis: {
        label: 'Systems Analysis',
        description: 'Requirements analysis, system architecture design and technical documentation for complex projects.',
      },
      socialMedia: {
        label: 'Social Media',
        description: 'Building engaged communities and creating impactful digital content strategies across platforms.',
      },
      contentCreator: {
        label: 'Content Creator',
        description: 'Crafting compelling narratives and visual stories that resonate with diverse audiences.',
      },
      militaryTelecom: {
        label: 'Military Telecom',
        description: '10+ years managing critical communication systems and secure tactical networks in the Brazilian Army.',
      },
    },
    nav: {
      home: 'Home',
      projects: 'Projects',
      metrics: 'Metrics',
      techStack: 'Tech Stack',
      contact: 'Contact',
    },
    aiTools: {
      title: 'AI Tools Mastery',
      subtitle: 'Expert in AI prompt workflows and automation pipelines for creative expression.',
      creativeAI: 'Creative AI',
      technicalAI: 'Technical AI',
      textAI: {
        title: 'Text AI (Prompt Engineering)',
        description: 'GPTs, Claude, Llama. Advanced prompt engineering & ideation workflows.',
      },
      imageVideoAI: {
        title: 'Image / Video AI',
        description: 'Midjourney, Leonardo, Runway. Creative workflow efficiency.',
      },
      audioAI: {
        title: 'Audio AI',
        description: 'Suno, Udio, ElevenLabs. Voice & audio production expertise.',
      },
      automation: {
        title: 'Automation',
        description: 'Make, Zapier, n8n. No-code workflow orchestration & optimization.',
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
      projects: {
        sweetLifeAnimes: {
          name: 'Sweet Life Animes',
          purpose: 'Empowering digital artists and storytellers.',
          type: 'Creative Brand'
        },
        sweetLifeAcademy: {
          name: 'Sweet Life Academy',
          purpose: 'AI education and automation for creators.',
          type: 'AI Education'
        },
        oVermePasseia: {
          name: 'O Verme Passeia',
          purpose: 'Exploring philosophy and aesthetics through design.',
          type: 'Art & Philosophy'
        },
        figueiredoLaw: {
          name: 'Figueiredo Law',
          purpose: 'Law, technology, and AI ethics consultancy.',
          type: 'Ethics & AI'
        }
      }
    },
    skills: {
      title: 'Skills & Competencies',
      coreStrengths: 'Core Strengths',
      growingAreas: 'Growing Areas',
      leadershipOps: 'Leadership & Ops',
      items: {
        promptEngineering: 'Prompt Engineering',
        aiEthicsSafety: 'AI Ethics & Safety',
        humanAiCollaboration: 'Human-AI Collaboration',
        dataHandlingPrivacy: 'Data Handling & Privacy',
        aiModelFineTuning: 'AI Model Fine-tuning',
        multiModalAiSystems: 'Multi-modal AI Systems',
      },
    },
    techStack: {
      title: 'Tech Stack & Tools',
      subtitle: 'Technologies and frameworks I use to build scalable solutions',
      categories: {
        frontend: {
          title: 'Frontend',
          technologies: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite', 'HTML5/CSS3']
        },
        backend: {
          title: 'Backend',
          technologies: ['Node.js', 'Express', 'API REST', 'Supabase', 'Edge Functions']
        },
        database: {
          title: 'Database',
          technologies: ['PostgreSQL', 'SQL', 'Supabase', 'Database Design', 'RLS Policies']
        },
        cloud: {
          title: 'Cloud & DevOps',
          technologies: ['Vercel', 'Netlify', 'GitHub Actions', 'CI/CD', 'Lovable Cloud']
        },
        ai: {
          title: 'AI & Automation',
          technologies: ['GPT APIs', 'Claude', 'Midjourney', 'Make.com', 'Zapier', 'n8n']
        },
        tools: {
          title: 'Tools & Workflow',
          technologies: ['Git', 'GitHub', 'VS Code', 'Figma', 'Notion', 'Linear']
        }
      },
      footer: ''
    },
    softSkills: {
      title: 'Soft Skills & Human Competencies',
      subtitle: 'Essential interpersonal abilities shaped by military discipline and tech experience',
      categories: {
        teamwork: {
          title: 'Teamwork & Collaboration',
          skills: ['Cross-functional Teams', 'Peer Mentoring', 'Active Listening', 'Conflict Resolution']
        },
        leadership: {
          title: 'Leadership & Management',
          skills: ['Team Management', 'Strategic Planning', 'Decision Making', 'Mission-Driven Focus']
        },
        communication: {
          title: 'Communication',
          skills: ['Clear Documentation', 'Technical Writing', 'Client Relations', 'Presentation Skills']
        },
        problemSolving: {
          title: 'Problem Solving',
          skills: ['Critical Thinking', 'Creative Solutions', 'Crisis Management', 'Analytical Mindset']
        },
        timeManagement: {
          title: 'Time Management',
          skills: ['Priority Setting', 'Deadline Focus', 'Multitasking', 'Resource Optimization']
        },
        adaptability: {
          title: 'Adaptability & Resilience',
          skills: ['Change Management', 'Stress Tolerance', 'Fast Learning', 'Continuous Growth']
        }
      },
      footer: ''
    },
    certifications: {
      title: 'Certifications & Achievements',
      subtitle: 'Professional credentials and recognized accomplishments in AI, technology, and leadership',
      viewCredential: 'View Credential',
      credentialId: 'Credential ID',
      skillsGained: 'Skills Gained',
      footer: 'Continuously learning and expanding expertise through recognized industry certifications.',
      items: [
        {
          title: 'Google Cloud Computing Foundations: Infrastructure',
          issuer: 'Google Cloud',
          date: 'December 2023',
          credentialId: '6601547',
          skills: ['Cybersecurity', 'Server Administration', 'Artificial Intelligence'],
          color: 'from-blue-500 to-cyan-500'
        },
        {
          title: 'Create and Manage Cloud Resources',
          issuer: 'Google Cloud',
          date: 'August 2023',
          credentialId: '4756822',
          skills: ['Teamwork', 'Server Administration', 'Technical Problem Solving'],
          color: 'from-purple-500 to-pink-500'
        },
        {
          title: 'Digital Transformation with Google Cloud',
          issuer: 'Google',
          date: 'August 2023',
          credentialId: '4641486',
          skills: ['Cybersecurity', 'AI Systems', 'Teamwork'],
          color: 'from-green-500 to-emerald-500'
        },
        {
          title: 'Google Cloud Computing',
          issuer: 'Google',
          date: 'August 2023',
          credentialId: '4825058',
          skills: ['Cybersecurity', 'AI Systems', 'Team Coordination'],
          color: 'from-orange-500 to-red-500'
        },
        {
          title: 'Cyber Threat Management',
          issuer: 'Cisco',
          date: 'July 2023',
          credentialId: 'CYB-THR-2023-7452',
          skills: ['Cybersecurity', 'Server Administration', 'Self-confidence'],
          color: 'from-indigo-500 to-purple-500'
        },
        {
          title: 'AI in Public Service Context',
          issuer: 'Enap - National School of Public Administration',
          date: 'July 2023',
          credentialId: 'fSSv9968151xypř',
          skills: ['AI Systems', 'Teamwork', 'Server Administration'],
          color: 'from-teal-500 to-cyan-500'
        },
        {
          title: 'Introduction to Artificial Intelligence',
          issuer: 'Coursera',
          date: 'July 2023',
          credentialId: 'U7ST992X4UM2',
          credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/U7ST992X4UM2',
          skills: ['Cybersecurity', 'AI Systems', 'Server Administration'],
          color: 'from-yellow-500 to-orange-500'
        },
        {
          title: 'Digital Technologies on Traditional Education',
          issuer: 'Army Distance Education Center',
          date: 'May 2023',
          credentialId: '645b9700-4604-40a7-8a24-0edcc0a80174',
          skills: ['Teamwork', 'Public Speaking', 'Self-confidence'],
          color: 'from-pink-500 to-rose-500'
        },
        {
          title: 'Curriculum and Didactics for Indirect Teaching Agents',
          issuer: 'Personnel Studies Center - CEP',
          date: 'May 2023',
          credentialId: '645671ee-1868-44b0-b8f9-bfa5c0a80174',
          skills: ['Teamwork', 'Public Speaking', 'Server Administration'],
          color: 'from-amber-500 to-orange-500'
        },
        {
          title: 'Competency Based Teaching in Digital',
          issuer: 'Personnel Studies Center - CEP',
          date: 'May 2023',
          credentialId: '64593aa4-4cd4-4eeb-bd13-50e2c0a80174',
          skills: ['Cybersecurity', 'Military Logistics', 'AI Systems'],
          color: 'from-violet-500 to-purple-500'
        },
        {
          title: 'Learning Assessment Theory and Practice',
          issuer: 'Personnel Studies Center - CEP',
          date: 'May 2023',
          credentialId: '64593f43-cac8-498e-b70c-50efc0a80174',
          skills: ['Cybersecurity', 'Military Logistics', 'AI Systems'],
          color: 'from-sky-500 to-blue-500'
        },
        {
          title: 'Personal Management - Leadership Base',
          issuer: 'Enap - National School of Public Administration',
          date: 'May 2023',
          credentialId: 'Vw3a9272046lH9H',
          skills: ['Leadership', 'Team Management', 'Strategic Thinking'],
          color: 'from-blue-500 to-indigo-500'
        },
        {
          title: 'Veterans and Pensioners Service',
          issuer: 'ESIE - Specialized Instruction School',
          date: 'April 2022',
          credentialId: '624c91d5-b4e8-4173-85b5-e4a5c0a80174',
          skills: ['Cybersecurity', 'Military Logistics', 'AI Systems'],
          color: 'from-emerald-500 to-green-500'
        },
        {
          title: 'Innovation Management',
          issuer: 'Military Institute of Engineering',
          date: 'September 2021',
          credentialId: '6151f217-7088-4968-81f9-3deec0a80174',
          skills: ['Innovation', 'Strategic Planning', 'Project Management'],
          color: 'from-purple-500 to-indigo-500'
        },
        {
          title: 'Cybercrimes',
          issuer: 'Ministry of Justice',
          date: 'May 2021',
          credentialId: 'MJ-CYB-2021-9384',
          skills: ['Cybersecurity', 'Digital Forensics', 'Legal Framework'],
          color: 'from-red-500 to-orange-500'
        },
        {
          title: 'Human Rights Education',
          issuer: 'Enap - National School of Public Administration',
          date: 'April 2021',
          credentialId: 'CVVm4539307hchM',
          skills: ['Ethics', 'Social Responsibility', 'Public Policy'],
          color: 'from-green-500 to-teal-500'
        },
        {
          title: 'Basic Procurement Course',
          issuer: 'Enap - National School of Public Administration',
          date: 'March 2021',
          credentialId: 'egrF42458838JXo',
          skills: ['Cybersecurity', 'Teamwork', 'Server Administration'],
          color: 'from-lime-500 to-green-500'
        },
        {
          title: 'Statistics',
          issuer: 'Enap - National School of Public Administration',
          date: 'March 2021',
          credentialId: 'mtrj4425905xHAl',
          skills: ['Cybersecurity', 'Teamwork', 'Public Speaking'],
          color: 'from-fuchsia-500 to-pink-500'
        },
        {
          title: 'One For All and All For One',
          issuer: 'Enap - National School of Public Administration',
          date: 'January 2021',
          credentialId: 'L9tN4133067hLa1',
          skills: ['Cybersecurity', 'AI Systems', 'Teamwork'],
          color: 'from-rose-500 to-red-500'
        },
        {
          title: 'Introduction to Cybersecurity',
          issuer: 'Cisco',
          date: 'September 2020',
          credentialId: 'INTR-CYB-2020-5619',
          skills: ['Cybersecurity', 'Network Security', 'Threat Analysis'],
          color: 'from-cyan-500 to-blue-500'
        }
      ]
    },
    impact: {
      title: 'Impact Metrics',
      subtitle: 'Expressing creativity through data, each number tells part of the story.',
      aiVisualsGenerated: 'AI Visuals Generated',
      ecosystemsBuilt: 'Creative Ecosystems Built',
      aiDrivenBrands: 'AI-Driven Brands',
      militaryExperience: 'Years Military Leadership',
      ideasInMotion: 'Ideas in Motion',
    },
    contact: {
      title: "Let's Co-Create the Future",
      subtitle: 'If your vision connects with mine, let\'s build something extraordinary.',
      bookCall: 'Book a Discovery Call',
      email: 'Email',
      followMe: 'Follow Me',
    },
    lgpd: {
      banner: {
        title: 'Privacy & Cookies',
        description: 'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your preferences at any time.',
        acceptAll: 'Accept All',
        rejectNonEssential: 'Reject Non-Essential',
        managePreferences: 'Manage Preferences',
        privacyLink: 'Privacy Policy',
      },
      preferences: {
        title: 'Cookie Preferences',
        description: 'Choose which types of cookies you want to allow. Essential cookies cannot be disabled as they are necessary for the website to function.',
        essential: {
          title: 'Essential Cookies',
          description: 'Required for basic site functionality. These cannot be disabled.',
        },
        analytics: {
          title: 'Analytics Cookies',
          description: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
        },
        marketing: {
          title: 'Marketing Cookies',
          description: 'Used to track visitors across websites to display relevant and engaging advertisements.',
        },
        savePreferences: 'Save Preferences',
        cancel: 'Cancel',
      },
      privacy: {
        title: 'Privacy Policy',
        lastUpdated: 'Last updated',
        sections: {
          introduction: {
            title: '1. Introduction',
            content: 'Your privacy is important to us. It is Nauiter Master\'s policy to respect your privacy regarding any information we may collect from the Nauiter Master website and other sites we own and operate.',
          },
          dataCollection: {
            title: '2. Data Collection',
            content: 'We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we\'re collecting it and how it will be used.',
          },
          cookies: {
            title: '3. Use of Cookies',
            content: 'We use cookies to improve the browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences at any time through our consent manager.',
          },
          dataRetention: {
            title: '4. Data Retention',
            content: 'We only retain collected information for as long as necessary to provide you with your requested service. When we store data, we protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.',
          },
          sharing: {
            title: '5. Sharing',
            content: 'We don\'t share any personally identifying information publicly or with third parties, except when required by law.',
          },
          rights: {
            title: '6. Your Rights (LGPD)',
            content: 'You have the right to request access, correction, or deletion of your personal data. Contact us to exercise these rights.',
          },
        },
      },
      terms: {
        title: 'Terms of Use',
        sections: {
          terms: {
            title: '1. Terms',
            content: 'By accessing the Nauiter Master website, you agree to comply with these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.',
          },
          license: {
            title: '2. Use License',
            content: 'Permission is granted to temporarily download one copy of the materials (information or software) on Nauiter Master\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.',
          },
          disclaimer: {
            title: '3. Disclaimer',
            content: 'The materials on Nauiter Master\'s website are provided on an \'as is\' basis. Nauiter Master makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
          },
          limitations: {
            title: '4. Limitations',
            content: 'In no event shall Nauiter Master or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Nauiter Master\'s website.',
          },
        },
      },
    },
  },
  pt: {
    hero: {
      title: 'Nauiter Master',
      subtitle: 'Explorando a fronteira entre Inteligência, Arte e Automação.',
      description: 'Analista de Sistemas & Estrategista de IA | Dev (TS/JS/SQL) | Criador de Conteúdo & Estratégia Digital',
      downloadCV: 'Baixar CV',
      viewProjects: 'Ver Meus Projetos',
      linkedinFollowers: 'Seguidores LinkedIn',
      yearsExperience: 'Anos de Experiência',
      activeProjects: 'Projetos Ativos',
    },
    badges: {
      aiStrategy: {
        label: 'Estratégia IA',
        description: 'Desenvolvimento de estratégias de IA para otimização de processos criativos e automação inteligente de workflows.',
      },
      development: {
        label: 'Dev TS/JS',
        description: 'Desenvolvimento full-stack com TypeScript, JavaScript, React, Node.js e tecnologias web modernas.',
      },
      database: {
        label: 'SQL/BD',
        description: 'Design, otimização e gerenciamento de banco de dados com SQL, PostgreSQL, Supabase e soluções cloud.',
      },
      automation: {
        label: 'Automação',
        description: 'Automação de processos criativos e operacionais usando APIs de IA e integração de sistemas inteligentes.',
      },
      systemsAnalysis: {
        label: 'Análise de Sistemas',
        description: 'Análise de requisitos, arquitetura de sistemas e documentação técnica para projetos complexos.',
      },
      socialMedia: {
        label: 'Social Media',
        description: 'Construindo comunidades engajadas e criando estratégias de conteúdo digital impactantes nas plataformas.',
      },
      contentCreator: {
        label: 'Criador de Conteúdo',
        description: 'Criando narrativas convincentes e histórias visuais que ressoam com audiências diversas.',
      },
      militaryTelecom: {
        label: 'Telecom Militar',
        description: '10+ anos gerenciando sistemas de comunicação críticos e redes táticas seguras no Exército Brasileiro.',
      },
    },
    nav: {
      home: 'Início',
      projects: 'Projetos',
      metrics: 'Métricas',
      techStack: 'Stack Tech',
      contact: 'Contato',
    },
    aiTools: {
      title: 'Domínio de Ferramentas de IA',
      subtitle: 'Especialista em workflows de prompts de IA e pipelines de automação para expressão criativa.',
      creativeAI: 'IA Criativa',
      technicalAI: 'IA Técnica',
      textAI: {
        title: 'IA de Texto (Prompt Engineering)',
        description: 'GPTs, Claude, Llama. Engenharia avançada de prompts (instruções estruturadas para IA) & workflows de ideação.',
      },
      imageVideoAI: {
        title: 'IA de Imagem / Vídeo',
        description: 'Midjourney, Leonardo, Runway. Eficiência em workflows criativos (pipelines de produção visual).',
      },
      audioAI: {
        title: 'IA de Áudio',
        description: 'Suno, Udio, ElevenLabs. Expertise em produção de voz & áudio.',
      },
      automation: {
        title: 'Automação (No-Code)',
        description: 'Make, Zapier, n8n. Orquestração & otimização de workflows sem código (integração entre sistemas).',
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
      projects: {
        sweetLifeAnimes: {
          name: 'Sweet Life Animes',
          purpose: 'Capacitando artistas digitais e contadores de histórias.',
          type: 'Marca Criativa'
        },
        sweetLifeAcademy: {
          name: 'Sweet Life Academy',
          purpose: 'Educação em IA e automação para criadores.',
          type: 'Educação IA'
        },
        oVermePasseia: {
          name: 'O Verme Passeia',
          purpose: 'Explorando filosofia e estética através do design.',
          type: 'Arte & Filosofia'
        },
        figueiredoLaw: {
          name: 'Figueiredo Law',
          purpose: 'Consultoria em direito, tecnologia e ética de IA.',
          type: 'Ética & IA'
        }
      }
    },
    skills: {
      title: 'Habilidades & Competências',
      coreStrengths: 'Forças Principais',
      growingAreas: 'Áreas em Crescimento',
      leadershipOps: 'Liderança & Ops',
      items: {
        promptEngineering: 'Engenharia de Prompts',
        aiEthicsSafety: 'Ética e Segurança em IA',
        humanAiCollaboration: 'Colaboração Humano-IA',
        dataHandlingPrivacy: 'Gestão de Dados & Privacidade',
        aiModelFineTuning: 'Ajuste Fino de Modelos de IA',
        multiModalAiSystems: 'Sistemas de IA Multimodais',
      },
    },
    techStack: {
      title: 'Stack Tecnológico & Ferramentas',
      subtitle: 'Tecnologias e frameworks que uso para construir soluções escaláveis',
      categories: {
        frontend: {
          title: 'Frontend',
          technologies: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite', 'HTML5/CSS3']
        },
        backend: {
          title: 'Backend',
          technologies: ['Node.js', 'Express', 'API REST', 'Supabase', 'Edge Functions']
        },
        database: {
          title: 'Banco de Dados',
          technologies: ['PostgreSQL', 'SQL', 'Supabase', 'Design de BD', 'Políticas RLS']
        },
        cloud: {
          title: 'Cloud & DevOps',
          technologies: ['Vercel', 'Netlify', 'GitHub Actions', 'CI/CD', 'Lovable Cloud']
        },
        ai: {
          title: 'IA & Automação',
          technologies: ['GPT APIs', 'Claude', 'Midjourney', 'Make.com', 'Zapier', 'n8n']
        },
        tools: {
          title: 'Ferramentas & Workflow',
          technologies: ['Git', 'GitHub', 'VS Code', 'Figma', 'Notion', 'Linear']
        }
      },
      footer: ''
    },
    softSkills: {
      title: 'Soft Skills & Competências Humanas',
      subtitle: 'Habilidades interpessoais essenciais moldadas pela disciplina militar e experiência tech',
      categories: {
        teamwork: {
          title: 'Trabalho em Equipe & Colaboração',
          skills: ['Times Multifuncionais', 'Mentoria de Pares', 'Escuta Ativa', 'Resolução de Conflitos']
        },
        leadership: {
          title: 'Liderança & Gestão',
          skills: ['Gestão de Equipes', 'Planejamento Estratégico', 'Tomada de Decisão', 'Foco em Missão']
        },
        communication: {
          title: 'Comunicação',
          skills: ['Documentação Clara', 'Escrita Técnica', 'Relações com Cliente', 'Habilidades de Apresentação']
        },
        problemSolving: {
          title: 'Resolução de Problemas',
          skills: ['Pensamento Crítico', 'Soluções Criativas', 'Gestão de Crises', 'Mentalidade Analítica']
        },
        timeManagement: {
          title: 'Gestão de Tempo',
          skills: ['Definição de Prioridades', 'Foco em Prazos', 'Multitarefa', 'Otimização de Recursos']
        },
        adaptability: {
          title: 'Adaptabilidade & Resiliência',
          skills: ['Gestão de Mudanças', 'Tolerância ao Estresse', 'Aprendizado Rápido', 'Crescimento Contínuo']
        }
      },
      footer: ''
    },
    certifications: {
      title: 'Certificações & Conquistas',
      subtitle: 'Credenciais profissionais e conquistas reconhecidas em IA, tecnologia e liderança',
      viewCredential: 'Ver Credencial',
      credentialId: 'ID da Credencial',
      skillsGained: 'Habilidades Adquiridas',
      footer: 'Aprendizado contínuo e expansão de expertise através de certificações reconhecidas pela indústria.',
      items: [
        {
          title: 'Google Cloud Computing Foundations: Infrastructure',
          issuer: 'Google Cloud',
          date: 'Dezembro 2023',
          credentialId: '6601547',
          skills: ['Cibersegurança', 'Administração de Servidores', 'Inteligência Artificial'],
          color: 'from-blue-500 to-cyan-500'
        },
        {
          title: 'Create and Manage Cloud Resources',
          issuer: 'Google Cloud',
          date: 'Agosto 2023',
          credentialId: '4756822',
          skills: ['Trabalho em Equipe', 'Administração de Servidores', 'Resolução de Problemas Técnicos'],
          color: 'from-purple-500 to-pink-500'
        },
        {
          title: 'Digital Transformation with Google Cloud',
          issuer: 'Google',
          date: 'Agosto 2023',
          credentialId: '4641486',
          skills: ['Cibersegurança', 'Sistemas de IA', 'Trabalho em Equipe'],
          color: 'from-green-500 to-emerald-500'
        },
        {
          title: 'Google Cloud Computing',
          issuer: 'Google',
          date: 'Agosto 2023',
          credentialId: '4825058',
          skills: ['Cibersegurança', 'Sistemas de IA', 'Coordenação de Equipe'],
          color: 'from-orange-500 to-red-500'
        },
        {
          title: 'Cyber Threat Management',
          issuer: 'Cisco',
          date: 'Julho 2023',
          credentialId: 'CYB-THR-2023-7452',
          skills: ['Cibersegurança', 'Administração de Servidores', 'Autoconfiança'],
          color: 'from-indigo-500 to-purple-500'
        },
        {
          title: 'Inteligência Artificial no Contexto do Serviço Público',
          issuer: 'Enap - Escola Nacional de Administração Pública',
          date: 'Julho 2023',
          credentialId: 'fSSv9968151xypř',
          skills: ['Sistemas de IA', 'Trabalho em Equipe', 'Administração de Servidores'],
          color: 'from-teal-500 to-cyan-500'
        },
        {
          title: 'Introduction to Artificial Intelligence',
          issuer: 'Coursera',
          date: 'Julho 2023',
          credentialId: 'U7ST992X4UM2',
          credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/U7ST992X4UM2',
          skills: ['Cibersegurança', 'Sistemas de IA', 'Administração de Servidores'],
          color: 'from-yellow-500 to-orange-500'
        },
        {
          title: 'Tecnologias Digitais na Educação Tradicional',
          issuer: 'Centro de Educação a Distância do Exército',
          date: 'Maio 2023',
          credentialId: '645b9700-4604-40a7-8a24-0edcc0a80174',
          skills: ['Trabalho em Equipe', 'Oratória', 'Autoconfiança'],
          color: 'from-pink-500 to-rose-500'
        },
        {
          title: 'Capacitação - Currículo e Didática',
          issuer: 'Centro de Estudos de Pessoal - CEP',
          date: 'Maio 2023',
          credentialId: '645671ee-1868-44b0-b8f9-bfa5c0a80174',
          skills: ['Trabalho em Equipe', 'Oratória', 'Administração de Servidores'],
          color: 'from-amber-500 to-orange-500'
        },
        {
          title: 'Ensino por Competências em Digital',
          issuer: 'Centro de Estudos de Pessoal - CEP',
          date: 'Maio 2023',
          credentialId: '64593aa4-4cd4-4eeb-bd13-50e2c0a80174',
          skills: ['Cibersegurança', 'Logística Militar', 'Sistemas de IA'],
          color: 'from-violet-500 to-purple-500'
        },
        {
          title: 'Capacitação - Avaliação da Aprendizagem',
          issuer: 'Centro de Estudos de Pessoal - CEP',
          date: 'Maio 2023',
          credentialId: '64593f43-cac8-498e-b70c-50efc0a80174',
          skills: ['Cibersegurança', 'Logística Militar', 'Sistemas de IA'],
          color: 'from-sky-500 to-blue-500'
        },
        {
          title: 'EVG Gestão Pessoal - Base da Liderança',
          issuer: 'Enap - Escola Nacional de Administração Pública',
          date: 'Maio 2023',
          credentialId: 'Vw3a9272046lH9H',
          skills: ['Liderança', 'Gestão de Equipe', 'Pensamento Estratégico'],
          color: 'from-blue-500 to-indigo-500'
        },
        {
          title: 'Serviço de Veteranos e Pensionistas',
          issuer: 'ESIE - Escola de Instrução Especializada',
          date: 'Abril 2022',
          credentialId: '624c91d5-b4e8-4173-85b5-e4a5c0a80174',
          skills: ['Cibersegurança', 'Logística Militar', 'Sistemas de IA'],
          color: 'from-emerald-500 to-green-500'
        },
        {
          title: 'Gestão da Inovação',
          issuer: 'Instituto Militar de Engenharia',
          date: 'Setembro 2021',
          credentialId: '6151f217-7088-4968-81f9-3deec0a80174',
          skills: ['Inovação', 'Planejamento Estratégico', 'Gestão de Projetos'],
          color: 'from-purple-500 to-indigo-500'
        },
        {
          title: 'Crimes Cibernéticos',
          issuer: 'Ministério da Justiça',
          date: 'Maio 2021',
          credentialId: 'MJ-CYB-2021-9384',
          skills: ['Cibersegurança', 'Perícia Digital', 'Marco Legal'],
          color: 'from-red-500 to-orange-500'
        },
        {
          title: 'EVG Educação em Direitos Humanos',
          issuer: 'Enap - Escola Nacional de Administração Pública',
          date: 'Abril 2021',
          credentialId: 'CVVm4539307hchM',
          skills: ['Ética', 'Responsabilidade Social', 'Políticas Públicas'],
          color: 'from-green-500 to-teal-500'
        },
        {
          title: 'EVG Curso Básico de Licitações',
          issuer: 'Enap - Escola Nacional de Administração Pública',
          date: 'Março 2021',
          credentialId: 'egrF42458838JXo',
          skills: ['Cibersegurança', 'Trabalho em Equipe', 'Administração de Servidores'],
          color: 'from-lime-500 to-green-500'
        },
        {
          title: 'EVG Estatística',
          issuer: 'Enap - Escola Nacional de Administração Pública',
          date: 'Março 2021',
          credentialId: 'mtrj4425905xHAl',
          skills: ['Cibersegurança', 'Trabalho em Equipe', 'Oratória'],
          color: 'from-fuchsia-500 to-pink-500'
        },
        {
          title: 'EVG Um Por Todos e Todos Por Um',
          issuer: 'Enap - Escola Nacional de Administração Pública',
          date: 'Janeiro 2021',
          credentialId: 'L9tN4133067hLa1',
          skills: ['Cibersegurança', 'Sistemas de IA', 'Trabalho em Equipe'],
          color: 'from-rose-500 to-red-500'
        },
        {
          title: 'Introduction to Cybersecurity',
          issuer: 'Cisco',
          date: 'Setembro 2020',
          credentialId: 'INTR-CYB-2020-5619',
          skills: ['Cibersegurança', 'Segurança de Redes', 'Análise de Ameaças'],
          color: 'from-cyan-500 to-blue-500'
        }
      ]
    },
    impact: {
      title: 'Métricas de Impacto',
      subtitle: 'Expressando criatividade através de dados, cada número conta parte da história.',
      aiVisualsGenerated: 'Visuais de IA Gerados',
      ecosystemsBuilt: 'Ecossistemas Criativos Construídos',
      aiDrivenBrands: 'Marcas Impulsionadas por IA',
      militaryExperience: 'Anos de Liderança Militar',
      ideasInMotion: 'Ideias em Movimento',
    },
    contact: {
      title: 'Vamos Co-Criar o Futuro',
      subtitle: 'Se sua visão se conecta com a minha, vamos construir algo extraordinário.',
      bookCall: 'Agendar uma Chamada',
      email: 'Email',
      followMe: 'Me Siga',
    },
    lgpd: {
      banner: {
        title: 'Privacidade & Cookies',
        description: 'Utilizamos cookies para melhorar sua experiência de navegação, analisar o tráfego do site e personalizar conteúdo. Você pode gerenciar suas preferências a qualquer momento.',
        acceptAll: 'Aceitar Todos',
        rejectNonEssential: 'Rejeitar Não Essenciais',
        managePreferences: 'Gerenciar Preferências',
        privacyLink: 'Política de Privacidade',
      },
      preferences: {
        title: 'Preferências de Cookies',
        description: 'Escolha quais tipos de cookies você deseja permitir. Cookies essenciais não podem ser desativados, pois são necessários para o funcionamento do site.',
        essential: {
          title: 'Cookies Essenciais',
          description: 'Necessários para a funcionalidade básica do site. Não podem ser desativados.',
        },
        analytics: {
          title: 'Cookies Analíticos',
          description: 'Nos ajudam a entender como os visitantes interagem com nosso site coletando e reportando informações anonimamente.',
        },
        marketing: {
          title: 'Cookies de Marketing',
          description: 'Usados para rastrear visitantes em websites para exibir anúncios relevantes e envolventes.',
        },
        savePreferences: 'Salvar Preferências',
        cancel: 'Cancelar',
      },
      privacy: {
        title: 'Política de Privacidade',
        lastUpdated: 'Última atualização',
        sections: {
          introduction: {
            title: '1. Introdução',
            content: 'A sua privacidade é importante para nós. É política do Nauiter Master respeitar a sua privacidade em relação a qualquer informação que possamos coletar no site Nauiter Master, e outros sites que possuímos e operamos.',
          },
          dataCollection: {
            title: '2. Coleta de Dados',
            content: 'Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.',
          },
          cookies: {
            title: '3. Uso de Cookies',
            content: 'Utilizamos cookies para melhorar a experiência de navegação, analisar o tráfego do site e personalizar conteúdo. Você pode gerenciar suas preferências de cookies a qualquer momento através do nosso gerenciador de consentimento.',
          },
          dataRetention: {
            title: '4. Retenção de Dados',
            content: 'Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.',
          },
          sharing: {
            title: '5. Compartilhamento',
            content: 'Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.',
          },
          rights: {
            title: '6. Seus Direitos (LGPD)',
            content: 'Você tem o direito de solicitar o acesso, correção ou exclusão de seus dados pessoais. Entre em contato conosco para exercer esses direitos.',
          },
        },
      },
      terms: {
        title: 'Termos de Uso',
        sections: {
          terms: {
            title: '1. Termos',
            content: 'Ao acessar ao site Nauiter Master, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.',
          },
          license: {
            title: '2. Uso de Licença',
            content: 'É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Nauiter Master, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título.',
          },
          disclaimer: {
            title: '3. Isenção de responsabilidade',
            content: 'Os materiais no site da Nauiter Master são fornecidos "como estão". Nauiter Master não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.',
          },
          limitations: {
            title: '4. Limitações',
            content: 'Em nenhum caso o Nauiter Master ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Nauiter Master.',
          },
        },
      },
    },
  },
};
