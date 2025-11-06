// AI Portfolio Template - Professional and Interactive
import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import type { Container, Engine } from "@tsparticles/engine";
import { Mail, Facebook, Instagram, Linkedin, Download, Calendar, ArrowRight } from "lucide-react";

// Lazy load particles to reduce initial bundle size
const Particles = lazy(() => import("@tsparticles/react"));
import { Button } from "@/components/ui/button";
import portfolioAvatar from "@/assets/nauiter-professional.png";
import sweetLifeAnimes from "@/assets/sweet-life-animes-2.png";
import sweetLifeAcademy from "@/assets/sweet-life-academy-2.jpg";
import oVermePasseia from "@/assets/o-verme-passeia-2.png";
import figueiredoLaw from "@/assets/figueiredo-law-2.png";
import clickNoPoint from "@/assets/click-no-point-button.jpg";
import pomodoroTimer from "@/assets/pomodoro-timer.png";
import decisionDie from "@/assets/decision-die.png";
import beaconsWhite from "@/assets/beacons-white.png";
import { ProjectEditor } from "@/components/ProjectEditor";
import { FloatingNavbar } from "@/components/FloatingNavbar";
import { EcosystemCarousel } from "@/components/EcosystemCarousel";
import { Brain, Image, Music, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Project {
  id: string;
  title: string;
  description: string;
  impact: string;
  tools: string[];
  imageUrl?: string;
  websiteUrl?: string;
  isCustomImage?: boolean;
}

const Index = () => {
  const [init, setInit] = useState(false);
  const [linkedinFollowers] = useState(5750);
  const [yearsExperience] = useState(14);
  const [activeProjects] = useState(7);
  const [followerCount, setFollowerCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Sweet Life Animes',
      description: 'Creative community uniting digital art, anime, and AI with exclusive content and strategies for creators',
      impact: 'Community platform helping creators transform passion into business',
      tools: ['AI', 'Digital Art', 'Community'],
      imageUrl: sweetLifeAnimes,
      isCustomImage: true
    },
    {
      id: '2', 
      title: 'O Verme Passeia',
      description: 'Existential and aesthetic project inspired by Texhnolyze, Ergo Proxy, and Soviet post-punk',
      impact: 'Exploring philosophy, nihilism, and brutalist aesthetics through digital art',
      tools: ['Philosophy', 'Digital Art', 'AI'],
      imageUrl: oVermePasseia,
      websiteUrl: 'https://overmepasseia.lovable.app',
      isCustomImage: true
    },
    {
      id: '3',
      title: 'Sweet Life Academy', 
      description: 'Educational platform teaching creators to grow and monetize with AI',
      impact: 'Empowering creators with AI tools and strategies for digital success',
      tools: ['AI Education', 'Automation', 'Strategy'],
      imageUrl: sweetLifeAcademy,
      isCustomImage: true
    },
    {
      id: '4',
      title: 'Figueiredo Law',
      description: 'Digital law and AI ethics consultancy supporting creators and businesses',
      impact: 'Bridging technology, law, and ethics in the AI era',
      tools: ['Law', 'Ethics', 'Technology'],
      imageUrl: figueiredoLaw,
      isCustomImage: true
    }
  ]);

  // Initialize particles with dynamic import
  useEffect(() => {
    const initParticles = async () => {
      const { initParticlesEngine } = await import("@tsparticles/react");
      const { loadSlim } = await import("@tsparticles/slim");
      
      await initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      });
      setInit(true);
    };
    
    initParticles();
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log(container);
  }, []);

  // Counter animation effect
  useEffect(() => {
    const animateCount = (
      target: number,
      setter: React.Dispatch<React.SetStateAction<number>>
    ) => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = target / steps;
      const stepDuration = duration / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start animations with slight delays
            setTimeout(() => animateCount(linkedinFollowers, setFollowerCount), 200);
            setTimeout(() => animateCount(yearsExperience, setExperienceCount), 400);
            setTimeout(() => animateCount(activeProjects, setProjectCount), 600);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 } // Start earlier for better visibility
    );

    const metricsSection = document.getElementById("impact");
    if (metricsSection) {
      observer.observe(metricsSection);
    }

    return () => {
      if (metricsSection) {
        observer.unobserve(metricsSection);
      }
    };
  }, [linkedinFollowers, yearsExperience, activeProjects]);


  return (
    <div className="min-h-screen bg-background">
      {/* SEO Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Nauiter Master",
          "jobTitle": "AI Strategist & Digital Artist",
          "description": "AI Strategist & Digital Artist specializing in prompt engineering, automation, and creative AI applications",
          "url": window.location.href,
          "sameAs": [
            "https://linkedin.com/in/nauiter-master-678a71144",
            "https://instagram.com/nauiter.master",
            "https://facebook.com/nauiter.master",
            "https://beacons.ai/nauiter.master"
          ],
          "knowsAbout": ["Artificial Intelligence", "Digital Art", "Prompt Engineering", "AI Automation", "Creative AI"],
          "alumniOf": "Systems Analysis",
          "email": "nauitermaster@hotmail.com"
        })
      }} />
      
      {/* Floating Navigation Bar */}
      <FloatingNavbar />


      {/* Hero Section - Tech Animated Background */}
      <section 
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        data-tour="welcome"
      >
        {/* Particles Background */}
        {init && (
          <Suspense fallback={<div className="absolute inset-0 z-0 bg-[#0B1623]" />}>
            <Particles
              id="tsparticles"
              particlesLoaded={particlesLoaded}
              className="absolute inset-0 z-0"
              options={{
              background: {
                color: {
                  value: "#0B1623",
                },
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onHover: {
                    enable: true,
                    mode: "grab",
                  },
                  resize: {
                    enable: true,
                  },
                },
                modes: {
                  grab: {
                    distance: 150,
                    links: {
                      opacity: 0.4,
                    },
                  },
                },
              },
              particles: {
                color: {
                  value: "#00C4FF",
                },
                links: {
                  color: "#0077B5",
                  distance: 140,
                  enable: true,
                  opacity: 0.2,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "out",
                  },
                  random: false,
                  speed: 1.5,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                  },
                  value: 65,
                },
                opacity: {
                  value: { min: 0.1, max: 0.3 },
                  animation: {
                    enable: true,
                    speed: 1,
                    sync: false,
                  },
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 3 },
                },
              },
              detectRetina: true,
            }}
            />
          </Suspense>
        )}
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          {/* Profile Image */}
          <div className="flex justify-center mb-6 motion-safe:animate-fade-in motion-safe:animation-delay-[200ms]">
            <div className="relative">
              <img 
                src={portfolioAvatar} 
                alt="Nauiter Master - AI Strategist and Digital Artist professional portrait"
                loading="eager"
                fetchPriority="high"
                width="224"
                height="224"
                decoding="async"
                className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover ring-4 ring-primary/70 shadow-glow hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
          </div>

          {/* Name & Titles */}
          <div className="space-y-6 motion-safe:animate-fade-in motion-safe:animation-delay-[400ms]">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Nauiter Master
            </h1>
            <p className="text-lg md:text-xl text-[#AAB4C2] font-medium max-w-2xl mx-auto">
              Exploring the edge between <span className="text-primary">Intelligence</span>, <span className="text-accent">Art</span>, and <span className="text-primary">Automation</span>.
            </p>
            <p className="text-base md:text-lg text-[#B8C2CC] max-w-3xl mx-auto">
              AI Strategist & Digital Artist | Systems Analyst | Founder of Sweet Life Animes & O Verme Passeia.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 motion-safe:animate-fade-in motion-safe:animation-delay-[600ms]">
              <Button 
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-glow-strong transition-all duration-300"
                aria-label="Download Nauiter Master's CV in PDF format"
              >
                <a href="/Nauiter_Master_Profile.pdf" download="Nauiter_Master_Profile.pdf">
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </a>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="View Nauiter Master's portfolio projects"
              >
                <a href="#projects">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  View My Projects
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0B1623] pointer-events-none z-10"></div>
      </section>

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-slate-800 to-slate-900"></div>

      {/* AI Tools Mastery Section - Dark Navy Gradient with Glassmorphism */}
      <section 
        id="ai-tools"
        className="py-20 motion-safe:opacity-0 motion-safe:translate-y-6 motion-safe:transition-all motion-safe:duration-700 motion-safe:[animation:fadeInUp_0.7s_ease-out_forwards]" 
        style={{ background: 'linear-gradient(135deg, #0B1623 0%, #0E213A 100%)' }}
        data-tour="ai-tools"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-4">AI Tools Mastery</h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Expert in AI prompt workflows and automation pipelines with practical applications
          </p>
          
          <TooltipProvider>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Text AI */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all duration-400 ease-in-out border border-white/10 motion-safe:opacity-0 motion-safe:translate-y-4 motion-safe:[animation:fadeInUp_0.5s_ease-out_0.1s_forwards]">
                    <div className="flex items-center gap-3 mb-4">
                      <Brain className="w-6 h-6 text-primary" />
                      <h3 className="font-semibold text-white text-lg">Text AI</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      GPT, Claude, LLaMA - Advanced prompt engineering
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Proficiency</span>
                        <span className="text-primary font-semibold">95%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out shadow-glow"
                          style={{ width: '95%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                  <p className="max-w-xs">Expert in AI prompt workflows and automation pipelines. Specialized in conversational AI and content generation.</p>
                </TooltipContent>
              </Tooltip>

              {/* Image/Video AI */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all duration-400 ease-in-out border border-white/10 motion-safe:opacity-0 motion-safe:translate-y-4 motion-safe:[animation:fadeInUp_0.5s_ease-out_0.2s_forwards]">
                    <div className="flex items-center gap-3 mb-4">
                      <Image className="w-6 h-6 text-primary" />
                      <h3 className="font-semibold text-white text-lg">Image/Video AI</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Midjourney, DALL·E, RunwayML - Creative workflows
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Proficiency</span>
                        <span className="text-primary font-semibold">90%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out shadow-glow"
                          style={{ width: '90%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                  <p className="max-w-xs">Advanced visual content creation using cutting-edge generative AI tools for images and video production.</p>
                </TooltipContent>
              </Tooltip>

              {/* Audio AI */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all duration-400 ease-in-out border border-white/10 motion-safe:opacity-0 motion-safe:translate-y-4 motion-safe:[animation:fadeInUp_0.5s_ease-out_0.3s_forwards]">
                    <div className="flex items-center gap-3 mb-4">
                      <Music className="w-6 h-6 text-primary" />
                      <h3 className="font-semibold text-white text-lg">Audio AI</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      ElevenLabs, MusicGen - Voice & audio synthesis
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Proficiency</span>
                        <span className="text-primary font-semibold">70%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out shadow-glow"
                          style={{ width: '70%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                  <p className="max-w-xs">Growing expertise in voice synthesis, music generation, and audio processing using AI tools.</p>
                </TooltipContent>
              </Tooltip>

              {/* Automation */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all duration-400 ease-in-out border border-white/10 motion-safe:opacity-0 motion-safe:translate-y-4 motion-safe:[animation:fadeInUp_0.5s_ease-out_0.4s_forwards]">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-primary" />
                      <h3 className="font-semibold text-white text-lg">Automation</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Python, Zapier, Notion AI, Make - Workflow automation
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Proficiency</span>
                        <span className="text-primary font-semibold">92%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out shadow-glow"
                          style={{ width: '92%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                  <p className="max-w-xs">Expert in AI prompt workflows and automation pipelines. Building efficient systems that scale.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </section>

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-slate-800 to-[#F7F9FB]"></div>

      {/* Showcase Projects Section - White Background */}
      <section 
        id="projects"
        className="py-20 bg-gradient-to-b from-white to-[#f8fafc] motion-safe:opacity-0 motion-safe:translate-y-6 motion-safe:transition-all motion-safe:duration-700 motion-safe:[animation:fadeInUp_0.7s_ease-out_forwards]" 
        data-tour="projects"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-4">Showcase Projects</h2>
          <p className="text-center text-gray-600 mb-10">
            Exploring the intersection of technology, design, and creativity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sweet Life Animes */}
            <a 
              href="https://sweetlifeanimes.lovable.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="showcase-item block overflow-hidden rounded-2xl shadow-lg bg-white/95 backdrop-blur-md hover:shadow-xl transition duration-300 group motion-safe:opacity-0 motion-safe:translate-y-4 motion-safe:[animation:fadeInUp_0.5s_ease-out_0.1s_forwards]"
              aria-label="Visit Sweet Life Animes project"
            >
              <img 
                src={sweetLifeAnimes} 
                alt="Sweet Life Animes - Creative community for digital art and anime"
                loading="lazy"
                width="408"
                height="220"
                decoding="async"
                className="w-full h-56 object-cover transition duration-300 group-hover:brightness-110"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sweet Life Animes</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Empowering digital artists and creative communities.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white">
                  <span className="bg-indigo-600 px-2 py-1 rounded-md">AI</span>
                  <span className="bg-pink-600 px-2 py-1 rounded-md">Digital Art</span>
                  <span className="bg-purple-600 px-2 py-1 rounded-md">Community</span>
                </div>
                <p className="mt-4 text-xs text-gray-500 italic">
                  Impact: Helping creators transform passion into business.
                </p>
              </div>
            </a>

            {/* O Verme Passeia */}
            <a 
              href="https://overmepasseia.lovable.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="showcase-item block overflow-hidden rounded-2xl shadow-lg bg-white/95 backdrop-blur-md hover:shadow-xl transition duration-300 group motion-safe:opacity-0 motion-safe:translate-y-4 motion-safe:[animation:fadeInUp_0.5s_ease-out_0.2s_forwards]"
              aria-label="Visit O Verme Passeia project"
            >
              <img 
                src={oVermePasseia} 
                alt="O Verme Passeia - Existential digital art project"
                loading="lazy"
                width="408"
                height="220"
                decoding="async"
                className="w-full h-56 object-cover transition duration-300 group-hover:brightness-110"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">O Verme Passeia</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Exploring philosophy and aesthetics through design.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white">
                  <span className="bg-gray-800 px-2 py-1 rounded-md">Philosophy</span>
                  <span className="bg-indigo-700 px-2 py-1 rounded-md">Digital Art</span>
                  <span className="bg-blue-700 px-2 py-1 rounded-md">AI</span>
                </div>
                <p className="mt-4 text-xs text-gray-500 italic">
                  Impact: Exploring philosophy, nihilism, and brutalist aesthetics through digital art.
                </p>
              </div>
            </a>

            {/* Sweet Life Academy */}
            <a 
              href="https://sweetlifeacademy.coursify.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="showcase-item block overflow-hidden rounded-2xl shadow-lg bg-white/95 backdrop-blur-md hover:shadow-xl transition duration-300 group motion-safe:opacity-0 motion-safe:translate-y-4 motion-safe:[animation:fadeInUp_0.5s_ease-out_0.3s_forwards]"
              aria-label="Visit Sweet Life Academy educational platform"
            >
              <img 
                src={sweetLifeAcademy} 
                alt="Sweet Life Academy - AI education and creator empowerment"
                loading="lazy"
                width="408"
                height="220"
                decoding="async"
                className="w-full h-56 object-cover transition duration-300 group-hover:brightness-110"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sweet Life Academy</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Helping creators grow with strategy and knowledge.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white">
                  <span className="bg-blue-600 px-2 py-1 rounded-md">AI Education</span>
                  <span className="bg-yellow-600 px-2 py-1 rounded-md">Automation</span>
                  <span className="bg-violet-700 px-2 py-1 rounded-md">Strategy</span>
                </div>
                <p className="mt-4 text-xs text-gray-500 italic">
                  Impact: Empowering creators with AI tools and strategies for success.
                </p>
              </div>
            </a>

            {/* Figueiredo Law */}
            <a 
              href="https://figueiredo-landing-amapa.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="showcase-item block overflow-hidden rounded-2xl shadow-lg bg-white/95 backdrop-blur-md hover:shadow-xl transition duration-300 group motion-safe:opacity-0 motion-safe:translate-y-4 motion-safe:[animation:fadeInUp_0.5s_ease-out_0.4s_forwards]"
              aria-label="Visit Figueiredo Law consultancy"
            >
              <img 
                src={figueiredoLaw} 
                alt="Figueiredo Law - Digital law and AI ethics consultancy"
                loading="lazy"
                width="408"
                height="220"
                decoding="async"
                className="w-full h-56 object-cover transition duration-300 group-hover:brightness-110"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Figueiredo Law</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Digital law firm & AI-driven consultancy supporting creators and businesses.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white">
                  <span className="bg-red-700 px-2 py-1 rounded-md">Law</span>
                  <span className="bg-gray-700 px-2 py-1 rounded-md">Ethics</span>
                  <span className="bg-orange-700 px-2 py-1 rounded-md">Technology</span>
                </div>
                <p className="mt-4 text-xs text-gray-500 italic">
                  Impact: Bridging technology, law, and ethics in the AI era.
                </p>
              </div>
            </a>

            {/* Click No Point */}
            <a 
              href="https://click-no-point.lovable.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="showcase-item block overflow-hidden rounded-2xl shadow-lg bg-white/95 backdrop-blur-md hover:shadow-xl transition duration-300 group motion-safe:opacity-0 motion-safe:translate-y-4 motion-safe:[animation:fadeInUp_0.5s_ease-out_0.5s_forwards]"
              aria-label="Visit Click No Point comedy project"
            >
              <img 
                src={clickNoPoint} 
                alt="Click No Point - Comedy and creative humor project"
                loading="lazy"
                width="408"
                height="220"
                decoding="async"
                className="w-full h-56 object-cover transition duration-300 group-hover:brightness-110"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Click No Point</h3>
                <p className="text-sm text-gray-600 mb-4">
                  A creative comedy project exploring irony, timing, and absurd humor in the digital era.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white">
                  <span className="bg-amber-600 px-2 py-1 rounded-md">Comedy</span>
                  <span className="bg-rose-600 px-2 py-1 rounded-md">Humor</span>
                  <span className="bg-cyan-700 px-2 py-1 rounded-md">Creative Media</span>
                </div>
                <p className="mt-4 text-xs text-gray-500 italic">
                  Impact: Blending humor, simplicity, and reflection in the digital space.
                </p>
              </div>
            </a>

            {/* Pomodoro Project */}
            <a 
              href="https://time-craft-clock.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="showcase-item block overflow-hidden rounded-2xl shadow-lg bg-white/95 backdrop-blur-md hover:shadow-xl transition duration-300 group motion-safe:opacity-0 motion-safe:translate-y-4 motion-safe:[animation:fadeInUp_0.5s_ease-out_0.6s_forwards]"
              aria-label="Visit Pomodoro Project time-management tool"
            >
              <img 
                src={pomodoroTimer} 
                alt="Pomodoro Project - Minimalist time-management tool"
                loading="lazy"
                width="408"
                height="220"
                decoding="async"
                className="w-full h-56 object-cover transition duration-300 group-hover:brightness-110"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Pomodoro Project</h3>
                <p className="text-sm text-gray-600 mb-4">
                  A minimalist time-management tool inspired by the Pomodoro Technique, blending focus and visual clarity.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white">
                  <span className="bg-green-600 px-2 py-1 rounded-md">Productivity</span>
                  <span className="bg-indigo-600 px-2 py-1 rounded-md">Design</span>
                  <span className="bg-teal-700 px-2 py-1 rounded-md">Focus</span>
                </div>
                <p className="mt-4 text-xs text-gray-500 italic">
                  Impact: Encouraging mindful productivity through simple design.
                </p>
              </div>
            </a>

            {/* Decision Die */}
            <a 
              href="https://decisiondie.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="showcase-item block overflow-hidden rounded-2xl shadow-lg bg-white/95 backdrop-blur-md hover:shadow-xl transition duration-300 group motion-safe:opacity-0 motion-safe:translate-y-4 motion-safe:[animation:fadeInUp_0.5s_ease-out_0.7s_forwards]"
              aria-label="Visit Decision Die playful decision tool"
            >
              <img 
                src={decisionDie} 
                alt="Decision Die - Playful decision-making tool"
                loading="lazy"
                width="408"
                height="220"
                decoding="async"
                className="w-full h-56 object-cover transition duration-300 group-hover:brightness-110"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Decision Die</h3>
                <p className="text-sm text-gray-600 mb-4">
                  A playful project that transforms everyday choices into a fun visual experience using a digital decision die.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white">
                  <span className="bg-purple-600 px-2 py-1 rounded-md">Creativity</span>
                  <span className="bg-pink-600 px-2 py-1 rounded-md">Decision</span>
                  <span className="bg-blue-700 px-2 py-1 rounded-md">Game Design</span>
                </div>
                <p className="mt-4 text-xs text-gray-500 italic">
                  Impact: Turning uncertainty into creativity through design.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-[#F7F9FB] to-slate-900"></div>

      {/* Partner & Projects - Dark Navy Gradient */}
      <section 
        id="partners"
        className="py-12 md:py-20 motion-safe:opacity-0 motion-safe:translate-y-6 motion-safe:transition-all motion-safe:duration-700 motion-safe:[animation:fadeInUp_0.7s_ease-out_forwards]"
        style={{ background: 'linear-gradient(135deg, #0B1623 0%, #0E213A 100%)' }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">Creative & Strategic Ecosystem</h2>
          <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Exploring diverse intersections of art, technology, and storytelling — now including comedy.
          </p>
          
          <EcosystemCarousel 
            projects={[
              {
                name: "Sweet Life Animes",
                purpose: "Empowering digital artists and creative communities.",
                image: sweetLifeAnimes,
                url: "https://sweetlifeanimes.lovable.app"
              },
              {
                name: "O Verme Passeia",
                purpose: "Exploring philosophy and aesthetics through design.",
                image: oVermePasseia,
                url: "https://overmepasseia.lovable.app"
              },
              {
                name: "Sweet Life Academy",
                purpose: "Helping creators grow with strategy and knowledge.",
                image: sweetLifeAcademy,
                url: "https://sweetlifeacademy.coursify.me/"
              },
              {
                name: "Figueiredo Law",
                purpose: "Bridging law, technology, and ethics.",
                image: figueiredoLaw,
                url: "https://figueiredo-landing-amapa.lovable.app/"
              },
              {
                name: "Click No Point",
                purpose: "Finding humor in simplicity and digital irony.",
                image: clickNoPoint,
                url: "https://click-no-point.lovable.app"
              },
              {
                name: "Pomodoro Project",
                purpose: "Encouraging focus and mindful productivity.",
                image: pomodoroTimer,
                url: "https://time-craft-clock.lovable.app/"
              },
              {
                name: "Decision Die",
                purpose: "Turning choices into playful design moments.",
                image: decisionDie,
                url: "https://decisiondie.lovable.app/"
              }
            ]}
          />
        </div>
      </section>

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-slate-900 to-[#0B1623]"></div>

      {/* Impact Metrics Section - White Background with Animated Counters */}
      <section 
        id="impact"
        className="impact-section motion-safe:opacity-0 motion-safe:translate-y-6 motion-safe:transition-all motion-safe:duration-700 motion-safe:[animation:fadeInUp_0.7s_ease-out_forwards]"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-10">Impact Metrics</h2>
          <div className="flex flex-wrap justify-center gap-16 text-center">
            <div className="metric">
              <div>
                <span className="metric-number">{followerCount}</span>
                <span className="metric-number">+</span>
              </div>
              <p className="text-gray-600 mt-2">LinkedIn Followers</p>
            </div>
            <div className="metric">
              <div>
                <span className="metric-number">{experienceCount}</span>
                <span className="metric-number">+</span>
              </div>
              <p className="text-gray-600 mt-2">Years Experience</p>
            </div>
            <div className="metric">
              <span className="metric-number">{projectCount}</span>
              <p className="text-gray-600 mt-2">Active Projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-[#13283F] to-[#121E2C]"></div>

      {/* Skills & Competencies - Darker Slate with Glassmorphism */}
      <section 
        id="skills"
        className="py-20 motion-safe:opacity-0 motion-safe:translate-y-6 motion-safe:transition-all motion-safe:duration-700 motion-safe:[animation:fadeInUp_0.7s_ease-out_forwards]" 
        style={{ backgroundColor: '#121E2C' }}
        data-tour="skills"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">Skills & Competencies</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Core Strengths
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.1s_forwards]">
                  <span className="text-gray-300">Prompt Engineering</span>
                  <div className="w-2 h-2 bg-primary rounded-full shadow-glow"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.2s_forwards]">
                  <span className="text-gray-300">AI Ethics & Safety</span>
                  <div className="w-2 h-2 bg-primary rounded-full shadow-glow"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.3s_forwards]">
                  <span className="text-gray-300">Human-AI Collaboration</span>
                  <div className="w-2 h-2 bg-primary rounded-full shadow-glow"></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Growing Areas
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.1s_forwards]">
                  <span className="text-gray-300">Data Handling & Privacy</span>
                  <div className="w-2 h-2 bg-accent rounded-full shadow-glow"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.2s_forwards]">
                  <span className="text-gray-300">AI Model Fine-tuning</span>
                  <div className="w-2 h-2 bg-accent rounded-full shadow-glow"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/15 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-x-4 motion-safe:[animation:fadeInUp_0.4s_ease-out_0.3s_forwards]">
                  <span className="text-gray-300">Multi-modal AI Systems</span>
                  <div className="w-2 h-2 bg-accent rounded-full shadow-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-[#121E2C] to-[#F7F9FB]"></div>

      {/* Contact Section - Dark Background */}
      <section 
        id="contact"
        className="py-16 bg-[#0B1623] text-center motion-safe:opacity-0 motion-safe:translate-y-6 motion-safe:transition-all motion-safe:duration-700 motion-safe:[animation:fadeInUp_0.7s_ease-out_forwards]" 
        data-tour="contact"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-white">Let's Collaborate</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Ready to transform your business with AI? Let's connect and discuss how we can work together!
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 motion-safe:animate-fade-in motion-safe:animation-delay-[200ms]">
            <Button 
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-glow-strong transition-all duration-300"
              aria-label="Book a discovery call with Nauiter Master"
            >
              <a href="mailto:nauitermaster@hotmail.com?subject=Discovery Call Request">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Discovery Call
              </a>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Download Nauiter Master's CV in PDF format"
            >
              <a href="/Nauiter_Master_Profile.pdf" download="Nauiter_Master_Profile.pdf">
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </a>
            </Button>
          </div>
          
          {/* Social Media Links */}
          <div className="flex justify-center gap-8">
            <a 
              href="mailto:nauitermaster@hotmail.com" 
              target="_blank"
              rel="noopener noreferrer" 
              className="text-white hover:opacity-70 hover:drop-shadow-[0_0_8px_rgba(0,196,255,0.6)] transition-all duration-300"
              aria-label="Contact via email - nauitermaster@hotmail.com"
            >
              <Mail className="w-8 h-8" />
            </a>
            <a 
              href="https://facebook.com/nauiter.master" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:opacity-70 hover:drop-shadow-[0_0_8px_rgba(0,196,255,0.6)] transition-all duration-300"
              aria-label="Follow on Facebook - Nauiter Master"
            >
              <Facebook className="w-8 h-8" />
            </a>
            <a 
              href="https://instagram.com/nauiter.master" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:opacity-70 hover:drop-shadow-[0_0_8px_rgba(0,196,255,0.6)] transition-all duration-300"
              aria-label="Follow on Instagram - @nauiter.master"
            >
              <Instagram className="w-8 h-8" />
            </a>
            <a 
              href="https://linkedin.com/in/nauiter-master-678a71144" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:opacity-70 hover:drop-shadow-[0_0_8px_rgba(0,196,255,0.6)] transition-all duration-300"
              aria-label="Connect on LinkedIn - Nauiter Master"
            >
              <Linkedin className="w-8 h-8" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Nauiter Master Signature */}
      <footer
        id="nauiter-footer"
        className="w-full bg-[hsl(var(--footer-bg))] text-white py-6 text-center border-t border-white/5 relative overflow-hidden animate-fade-in-footer shadow-[0_-2px_10px_rgba(0,0,0,0.4)]"
      >
        <div className="container mx-auto px-4">
          {/* Linha principal */}
          <p className="text-[clamp(0.85rem,1vw,1rem)] leading-relaxed opacity-90">
            © 2025{" "}
            <strong className="text-white font-semibold tracking-wide transition-colors duration-300 hover:text-[hsl(var(--bronze-soft))]">
              Developer — Nauiter Master
            </strong>{" "}
            | Todos os direitos reservados
          </p>

          {/* Linha de assinatura */}
          <span className="block mt-2 text-[0.85rem] italic text-white/70 animate-bronze-glow">
            Sic Mundus Creatus Est
          </span>
        </div>
      </footer>

      {/* Script para fixar footer globalmente */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener("DOMContentLoaded", () => {
            const footer = document.querySelector("#nauiter-footer");
            if (footer && footer.parentNode !== document.body) {
              document.body.appendChild(footer);
            }
          });
        `
      }} />
    </div>
  );
};

export default Index;