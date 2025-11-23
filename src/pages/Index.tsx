// AI Portfolio Template - Professional and Interactive
import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import type { Container, Engine } from "@tsparticles/engine";
import { Mail, Facebook, Instagram, Linkedin, Download, Calendar, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
import { useLanguage } from "@/hooks/useLanguage";

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
  const { t, language } = useLanguage();
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
          {/* Profile Image with Enhanced Glow */}
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.img 
              src={portfolioAvatar} 
              alt="Portrait of Nauiter Master — AI Strategist and Digital Artist"
              loading="eager"
              fetchPriority="high"
              width="224"
              height="224"
              decoding="async"
              whileHover={{ scale: 1.04, rotate: 0.5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover ring-2 ring-[#6366F1] shadow-[0_0_30px_#6366F180,0_0_60px_#8B5CF640]"
            />
          </motion.div>

          {/* Name & Titles with Gradient Typography */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={language}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#06B6D4]">
                  {t.hero.title}
                </h1>
                <p className="mt-3 text-gray-300 leading-snug tracking-wide">
                  {t.hero.subtitle}
                </p>
                <p className="text-sm md:text-base text-gray-400/80 max-w-3xl mx-auto">
                  {t.hero.description}
                </p>
              </motion.div>
            </AnimatePresence>
            
            {/* CTA Buttons with Enhanced Styling */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] text-white font-semibold px-8 py-3 rounded-full shadow-lg shadow-[#7A5FFF]/30 hover:shadow-xl hover:shadow-[#00C4FF]/40 transition-all duration-300 hover:scale-105 group border border-transparent"
              >
                <a 
                  href="/Nauiter_Master_Profile.pdf" 
                  download="Nauiter_Master_Profile.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={language}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {t.hero.downloadCV}
                    </motion.span>
                  </AnimatePresence>
                </a>
              </Button>
              
              <Button 
                asChild
                size="lg"
                className="bg-white/90 text-gray-900 font-semibold px-8 py-3 rounded-full border border-gray-200/50 shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm group"
              >
                <a 
                  href="#projects" 
                  className="flex items-center gap-2"
                >
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={language}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {t.hero.viewProjects}
                    </motion.span>
                  </AnimatePresence>
                </a>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Scroll Cue */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-gray-500/60"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-7 h-7" />
          </motion.div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0B1623] pointer-events-none z-10"></div>
      </section>

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-slate-800 to-slate-900"></div>

      {/* AI Tools Mastery Section - Dark Navy Gradient with Glassmorphism */}
      <section 
        id="ai-tools"
        className="relative z-10 py-24 bg-gradient-to-b from-[#0A1A2F] to-[#0C1222]" 
        data-tour="ai-tools"
      >
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] text-center mb-3"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {t.aiTools.title}
              </motion.span>
            </AnimatePresence>
          </motion.h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
            >
              {t.aiTools.subtitle}
            </motion.p>
          </AnimatePresence>
          
          {/* Two Groups Layout */}
          <div className="mt-14 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            {/* Creative AI Group */}
            <div className="flex flex-col">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-left text-[#7A5FFF] font-semibold mb-4 text-lg"
                >
                  {t.aiTools.creativeAI}
                </motion.h3>
              </AnimatePresence>
              <div className="grid grid-rows-2 gap-4 flex-1">
                {/* Text AI Card */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left shadow-md hover:shadow-lg hover:border-[#7A5FFF]/30 transition-all flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-2 text-white">
                    <Brain className="w-6 h-6 text-[#7A5FFF]" />
                    <AnimatePresence mode="wait">
                      <motion.h4
                        key={language}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-semibold text-lg"
                      >
                        {t.aiTools.textAI.title}
                      </motion.h4>
                    </AnimatePresence>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={language}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400 text-sm mb-3 flex-1"
                    >
                      {t.aiTools.textAI.description}
                    </motion.p>
                  </AnimatePresence>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-400">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={language}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {t.aiTools.proficiency}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-[#7A5FFF] font-semibold">98%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] transition-all duration-1000"
                        style={{ width: '98%' }}
                      ></div>
                    </div>
                  </div>
                </motion.div>

                {/* Image/Video AI Card */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left shadow-md hover:shadow-lg hover:border-[#7A5FFF]/30 transition-all flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-2 text-white">
                    <Image className="w-6 h-6 text-[#7A5FFF]" />
                    <h4 className="font-semibold text-lg">Image / Video AI</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-3 flex-1">
                    Midjourney, Leonardo, Runway — creative workflow efficiency.
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Proficiency</span>
                      <span className="text-[#7A5FFF] font-semibold">95%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] transition-all duration-1000"
                        style={{ width: '95%' }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-left text-[#00C4FF] font-semibold mb-4 text-lg">Technical AI</h3>
              <div className="grid grid-rows-2 gap-4 flex-1">
                {/* Audio AI Card */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left shadow-md hover:shadow-lg hover:border-[#00C4FF]/30 transition-all flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-2 text-white">
                    <Music className="w-6 h-6 text-[#00C4FF]" />
                    <h4 className="font-semibold text-lg">Audio AI</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-3 flex-1">
                    ElevenLabs, MusicLM — Voice & sound synthesis for storytelling.
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Proficiency</span>
                      <span className="text-[#00C4FF] font-semibold">90%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] transition-all duration-1000"
                        style={{ width: '90%' }}
                      ></div>
                    </div>
                  </div>
                </motion.div>

                {/* Automation Card */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left shadow-md hover:shadow-lg hover:border-[#00C4FF]/30 transition-all flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-2 text-white">
                    <Zap className="w-6 h-6 text-[#00C4FF]" />
                    <h4 className="font-semibold text-lg">Automation</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-3 flex-1">
                    Python, Zapier, Make — Workflow automation & efficiency.
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Proficiency</span>
                      <span className="text-[#00C4FF] font-semibold">92%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] transition-all duration-1000"
                        style={{ width: '92%' }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-slate-800 to-[#F7F9FB]"></div>

      {/* Showcase Projects Section */}
      <section id="projects" className="py-24 bg-gradient-to-b from-[#0C1222] to-[#05010E]" data-tour="projects">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF]"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {t.projects.title}
              </motion.span>
            </AnimatePresence>
          </motion.h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400 mt-2 text-sm md:text-base"
            >
              {t.projects.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* Creative Universe */}
          <AnimatePresence mode="wait">
            <motion.h3
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-left mt-12 mb-6 font-semibold text-[#7A5FFF] uppercase tracking-widest text-sm"
            >
              {t.projects.creativeUniverse}
            </motion.h3>
          </AnimatePresence>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.a
              href="https://sweetlifeanimes.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={sweetLifeAnimes}
                  alt="Sweet Life Animes project thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-all"></div>
              </div>
              <div className="p-4 text-left">
                <h4 className="font-semibold text-white drop-shadow-md mb-1">{t.projects.sweetLifeAnimes.title}</h4>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 text-sm mb-2"
                  >
                    {t.projects.sweetLifeAnimes.description}
                  </motion.p>
                </AnimatePresence>
                <div className="flex flex-wrap gap-2 text-xs">
                  {t.projects.sweetLifeAnimes.tools.map((tool) => (
                    <AnimatePresence mode="wait" key={tool}>
                      <motion.span
                        key={`${language}-${tool}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="px-2 py-1 rounded-full bg-white/10 text-gray-300 backdrop-blur-md hover:bg-white/20 transition-colors"
                      >
                        {tool}
                      </motion.span>
                    </AnimatePresence>
                  ))}
                </div>
              </div>
            </motion.a>

            <motion.a
              href="https://sweetlifeacademy.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={sweetLifeAcademy}
                  alt="Sweet Life Academy project thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-all"></div>
              </div>
              <div className="p-4 text-left">
                <h4 className="font-semibold text-white drop-shadow-md mb-1">{t.projects.sweetLifeAcademy.title}</h4>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 text-sm mb-2"
                  >
                    {t.projects.sweetLifeAcademy.description}
                  </motion.p>
                </AnimatePresence>
                <div className="flex flex-wrap gap-2 text-xs">
                  {t.projects.sweetLifeAcademy.tools.map((tool) => (
                    <AnimatePresence mode="wait" key={tool}>
                      <motion.span
                        key={`${language}-${tool}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="px-2 py-1 rounded-full bg-white/10 text-gray-300 backdrop-blur-md hover:bg-white/20 transition-colors"
                      >
                        {tool}
                      </motion.span>
                    </AnimatePresence>
                  ))}
                </div>
              </div>
            </motion.a>

            <motion.a
              href="https://overmepasseia.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={oVermePasseia}
                  alt="O Verme Passeia project thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-all"></div>
              </div>
              <div className="p-4 text-left">
                <h4 className="font-semibold text-white drop-shadow-md mb-1">{t.projects.oVermePasseia.title}</h4>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 text-sm mb-2"
                  >
                    {t.projects.oVermePasseia.description}
                  </motion.p>
                </AnimatePresence>
                <div className="flex flex-wrap gap-2 text-xs">
                  {t.projects.oVermePasseia.tools.map((tool) => (
                    <AnimatePresence mode="wait" key={tool}>
                      <motion.span
                        key={`${language}-${tool}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="px-2 py-1 rounded-full bg-white/10 text-gray-300 backdrop-blur-md hover:bg-white/20 transition-colors"
                      >
                        {tool}
                      </motion.span>
                    </AnimatePresence>
                  ))}
                </div>
              </div>
            </motion.a>
          </div>

          {/* Experimental Concepts */}
          <AnimatePresence mode="wait">
            <motion.h3
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-left mt-6 mb-6 font-semibold text-[#00C4FF] uppercase tracking-widest text-sm"
            >
              {t.projects.experimentalConcepts}
            </motion.h3>
          </AnimatePresence>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.a
              href="https://clicknopoint.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={clickNoPoint}
                  alt="Click No Point project thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-all"></div>
              </div>
              <div className="p-4 text-left">
                <h4 className="font-semibold text-white drop-shadow-md mb-1">{t.projects.clickNoPoint.title}</h4>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 text-sm mb-2"
                  >
                    {t.projects.clickNoPoint.description}
                  </motion.p>
                </AnimatePresence>
                <div className="flex flex-wrap gap-2 text-xs">
                  {t.projects.clickNoPoint.tools.map((tool) => (
                    <AnimatePresence mode="wait" key={tool}>
                      <motion.span
                        key={`${language}-${tool}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="px-2 py-1 rounded-full bg-white/10 text-gray-300 backdrop-blur-md hover:bg-white/20 transition-colors"
                      >
                        {tool}
                      </motion.span>
                    </AnimatePresence>
                  ))}
                </div>
              </div>
            </motion.a>

            <motion.a
              href="https://time-craft-clock.lovable.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={pomodoroTimer}
                  alt="Pomodoro Project thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-all"></div>
              </div>
              <div className="p-4 text-left">
                <h4 className="font-semibold text-white drop-shadow-md mb-1">{t.projects.pomodoroProject.title}</h4>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 text-sm mb-2"
                  >
                    {t.projects.pomodoroProject.description}
                  </motion.p>
                </AnimatePresence>
                <div className="flex flex-wrap gap-2 text-xs">
                  {t.projects.pomodoroProject.tools.map((tool) => (
                    <AnimatePresence mode="wait" key={tool}>
                      <motion.span
                        key={`${language}-${tool}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="px-2 py-1 rounded-full bg-white/10 text-gray-300 backdrop-blur-md hover:bg-white/20 transition-colors"
                      >
                        {tool}
                      </motion.span>
                    </AnimatePresence>
                  ))}
                </div>
              </div>
            </motion.a>

            <motion.a
              href="https://figueiredolaw.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={figueiredoLaw}
                  alt="Figueiredo Law project thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-all"></div>
              </div>
              <div className="p-4 text-left">
                <h4 className="font-semibold text-white drop-shadow-md mb-1">{t.projects.figueiredoLaw.title}</h4>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 text-sm mb-2"
                  >
                    {t.projects.figueiredoLaw.description}
                  </motion.p>
                </AnimatePresence>
                <div className="flex flex-wrap gap-2 text-xs">
                  {t.projects.figueiredoLaw.tools.map((tool) => (
                    <AnimatePresence mode="wait" key={tool}>
                      <motion.span
                        key={`${language}-${tool}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="px-2 py-1 rounded-full bg-white/10 text-gray-300 backdrop-blur-md hover:bg-white/20 transition-colors"
                      >
                        {tool}
                      </motion.span>
                    </AnimatePresence>
                  ))}
                </div>
              </div>
            </motion.a>

            <motion.a
              href="https://decisiondie.lovable.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={decisionDie}
                  alt="Decision Die project thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-all"></div>
              </div>
              <div className="p-4 text-left">
                <h4 className="font-semibold text-white drop-shadow-md mb-1">{t.projects.decisionDie.title}</h4>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={language}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 text-sm mb-2"
                  >
                    {t.projects.decisionDie.description}
                  </motion.p>
                </AnimatePresence>
                <div className="flex flex-wrap gap-2 text-xs">
                  {t.projects.decisionDie.tools.map((tool) => (
                    <AnimatePresence mode="wait" key={tool}>
                      <motion.span
                        key={`${language}-${tool}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="px-2 py-1 rounded-full bg-white/10 text-gray-300 backdrop-blur-md hover:bg-white/20 transition-colors"
                      >
                        {tool}
                      </motion.span>
                    </AnimatePresence>
                  ))}
                </div>
              </div>
            </motion.a>
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
          <AnimatePresence mode="wait">
            <motion.h2
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-white text-center mb-6"
            >
              {t.ecosystem.title}
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-300 text-center mb-12 max-w-3xl mx-auto"
            >
              {t.ecosystem.subtitle}
            </motion.p>
          </AnimatePresence>
          
          <EcosystemCarousel 
            projects={[
              {
                name: "Sweet Life Animes",
                purpose: "Empowering digital artists and storytellers.",
                type: "Creative Brand",
                color: "from-pink-500 to-fuchsia-400",
                image: sweetLifeAnimes,
                url: "https://sweetlifeanimes.lovable.app/"
              },
              {
                name: "Sweet Life Academy",
                purpose: "AI education and automation for creators.",
                type: "AI Education",
                color: "from-purple-500 to-cyan-400",
                image: sweetLifeAcademy,
                url: "https://sweetlifeacademy.coursify.me/"
              },
              {
                name: "O Verme Passeia",
                purpose: "Exploring philosophy and aesthetics through design.",
                type: "Art & Philosophy",
                color: "from-amber-500 to-yellow-400",
                image: oVermePasseia,
                url: "https://overmepasseia.lovable.app"
              },
              {
                name: "Click No Point",
                purpose: "Comedy and humor in the digital era.",
                type: "Humor & Media",
                color: "from-orange-500 to-red-400",
                image: clickNoPoint,
                url: "https://click-no-point.lovable.app"
              },
              {
                name: "Pomodoro Project",
                purpose: "Mindful productivity and focus tools.",
                type: "Design Tool",
                color: "from-green-500 to-lime-400",
                image: pomodoroTimer,
                url: "https://time-craft-clock.lovable.app/"
              },
              {
                name: "Figueiredo Law",
                purpose: "Law, technology, and AI ethics consultancy.",
                type: "Ethics & AI",
                color: "from-rose-600 to-gray-500",
                image: figueiredoLaw,
                url: "https://figueiredo-landing-amapa.lovable.app/"
              },
              {
                name: "Decision Die",
                purpose: "Turning choices into playful design moments.",
                type: "Game & Experiment",
                color: "from-emerald-500 to-green-400",
                image: decisionDie,
                url: "https://decisiondie.lovable.app/"
              }
            ]}
          />
        </div>
      </section>

      {/* Impact Metrics Section - Cosmic Design */}
      <section 
        id="impact"
        className="relative py-24 bg-gradient-to-b from-[#0A1A2F] to-[#0C1222] text-center"
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF]"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {t.impact.title}
              </motion.span>
            </AnimatePresence>
          </motion.h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400 mt-2 max-w-2xl mx-auto"
            >
              {t.impact.subtitle}
            </motion.p>
          </AnimatePresence>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* AI Visuals Generated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all"
            >
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] mb-2">
                200<span className="text-3xl">+</span>
              </h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-300 text-sm"
                >
                  {t.impact.aiVisualsGenerated}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Creative Ecosystems Built */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all"
            >
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] mb-2">
                10<span className="text-3xl">+</span>
              </h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-300 text-sm"
                >
                  {t.impact.ecosystemsBuilt}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* AI-Driven Brands */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all"
            >
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] mb-2">
                7
              </h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-300 text-sm"
                >
                  {t.impact.aiDrivenBrands}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Ideas in Motion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all"
            >
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] mb-2">
                ∞
              </h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-300 text-sm"
                >
                  {t.impact.ideasInMotion}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-[#0C1222] to-[#121E2C]"></div>

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

      {/* Contact & Collaboration CTA */}
      <section
        id="contact"
        className="relative py-28 bg-gradient-to-b from-[#05010E] via-[#0A1A2F] to-[#0C1222] text-center overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto px-6"
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF]"
            >
              {t.contact.title}
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto"
            >
              {t.contact.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.a
              href="mailto:nauitermaster@hotmail.com?subject=Let's Collaborate"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] text-white font-medium shadow-lg hover:shadow-[0_0_20px_rgba(122,95,255,0.5)] transition-all"
            >
              <Mail size={18} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {t.contact.bookCall}
                </motion.span>
              </AnimatePresence>
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#7A5FFF80] text-white/90 hover:bg-white/10 transition-all"
            >
              <ArrowRight size={18} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {t.hero.viewProjects}
                </motion.span>
              </AnimatePresence>
            </motion.a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-12 text-gray-400">
            <motion.a
              href="mailto:nauitermaster@hotmail.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: "#7A5FFF" }}
              className="transition-colors"
              aria-label="Contact via email"
            >
              <Mail size={24} />
            </motion.a>
            <motion.a
              href="https://facebook.com/nauiter.master"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: "#00C4FF" }}
              className="transition-colors"
              aria-label="Follow on Facebook"
            >
              <Facebook size={24} />
            </motion.a>
            <motion.a
              href="https://instagram.com/nauiter.master"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: "#7A5FFF" }}
              className="transition-colors"
              aria-label="Follow on Instagram"
            >
              <Instagram size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/nauiter-master-678a71144"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: "#00C4FF" }}
              className="transition-colors"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin size={24} />
            </motion.a>
          </div>
        </motion.div>
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
            | All Rights Reserved
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