// AI Portfolio Template - Professional and Interactive
import { useState, useEffect } from 'react';
import portfolioAvatar from "@/assets/nauiter-professional.png";
import sweetLifeAnimes from "@/assets/sweet-life-animes-2.png";
import sweetLifeAcademy from "@/assets/sweet-life-academy-2.jpg";
import oVermePasseia from "@/assets/o-verme-passeia-2.png";
import figueiredoLaw from "@/assets/figueiredo-law-2.png";
import { ProjectEditor } from "@/components/ProjectEditor";
import { FloatingNavbar } from "@/components/FloatingNavbar";
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


  return (
    <div className="min-h-screen bg-background">
      {/* Floating Navigation Bar */}
      <FloatingNavbar />


      {/* Hero Section - Cinematic Introduction */}
      <section 
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center py-20 md:py-32 px-6 md:px-12 relative overflow-hidden pt-20"
        style={{ 
          background: 'radial-gradient(ellipse at top, #0B1623 0%, #13283F 100%)',
        }}
        data-tour="welcome"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          {/* Profile Image */}
          <div className="flex justify-center mb-6 motion-safe:animate-fade-in motion-safe:animation-delay-[200ms]">
            <div className="relative">
              <img 
                src={portfolioAvatar} 
                alt="Nauiter Master - Professional Portrait" 
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover ring-4 ring-[#0077B5]/60 shadow-lg shadow-blue-900/50 hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0077B5]/20 to-transparent"></div>
            </div>
          </div>

          {/* Name & Titles */}
          <div className="space-y-4 motion-safe:animate-fade-in motion-safe:animation-delay-[400ms]">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Nauiter Master
            </h1>
            <p className="text-lg md:text-xl text-[#AAB4C2] font-medium max-w-2xl mx-auto">
              Exploring the edge between <span className="text-[#0077B5]">Intelligence</span>, <span className="text-[#A855F7]">Art</span>, and <span className="text-[#00C4FF]">Automation</span>.
            </p>
            <p className="text-base md:text-lg text-[#B8C2CC] max-w-3xl mx-auto">
              AI Strategist & Digital Artist | Systems Analyst | Founder of Sweet Life Animes & O Verme Passeia.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 motion-safe:animate-fade-in motion-safe:animation-delay-[600ms]">
            <a 
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0077B5] to-[#00C4FF] text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,119,181,0.5)]"
            >
              🔗 Explore Projects
            </a>
            <a 
              href="https://linkedin.com/in/nauiter-master-678a71144"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#0077B5] text-[#AAB4C2] hover:text-[#00C4FF] hover:border-[#00C4FF] transition-all duration-300"
            >
              💼 Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0B1623] pointer-events-none"></div>
      </section>

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-slate-800 to-slate-900"></div>

      {/* AI Tools Mastery Section - Dark Navy Gradient */}
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
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-400 ease-in-out border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Brain className="w-6 h-6 text-blue-400" />
                      <h3 className="font-semibold text-white text-lg">Text AI</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      GPT, Claude, LLaMA - Advanced prompt engineering
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Proficiency</span>
                        <span className="text-blue-400 font-semibold">95%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000 ease-out"
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
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-400 ease-in-out border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Image className="w-6 h-6 text-purple-400" />
                      <h3 className="font-semibold text-white text-lg">Image/Video AI</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Midjourney, DALL·E, RunwayML - Creative workflows
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Proficiency</span>
                        <span className="text-purple-400 font-semibold">90%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000 ease-out"
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
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-400 ease-in-out border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Music className="w-6 h-6 text-green-400" />
                      <h3 className="font-semibold text-white text-lg">Audio AI</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      ElevenLabs, MusicGen - Voice & audio synthesis
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Proficiency</span>
                        <span className="text-green-400 font-semibold">70%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out"
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
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-400 ease-in-out border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-yellow-400" />
                      <h3 className="font-semibold text-white text-lg">Automation</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Python, Zapier, Notion AI, Make - Workflow automation
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Proficiency</span>
                        <span className="text-yellow-400 font-semibold">92%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
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

      {/* Showcase Projects Section - Light Background */}
      <section 
        id="projects"
        className="py-20 motion-safe:opacity-0 motion-safe:translate-y-6 motion-safe:transition-all motion-safe:duration-700 motion-safe:[animation:fadeInUp_0.7s_ease-out_forwards]" 
        style={{ backgroundColor: '#F7F9FB' }}
        data-tour="projects"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-12">Showcase Projects</h2>
          <ProjectEditor projects={projects} onProjectsChange={setProjects} />
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
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">Creative & Strategic Ecosystem</h2>
          
          <TooltipProvider>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {/* Sweet Life Animes */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="#projects" 
                    className="bg-slate-900 p-4 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,119,181,0.3)] motion-safe:animate-fade-in"
                  >
                    <img 
                      src={sweetLifeAnimes} 
                      alt="Sweet Life Animes Logo" 
                      className="w-full h-32 object-contain"
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                  <p className="max-w-xs">AI-driven anime and art community.</p>
                </TooltipContent>
              </Tooltip>

              {/* Sweet Life Academy */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="#projects" 
                    className="bg-slate-900 p-4 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,119,181,0.3)] motion-safe:animate-fade-in"
                  >
                    <img 
                      src={sweetLifeAcademy} 
                      alt="Sweet Life Academy Logo" 
                      className="w-full h-32 object-contain"
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                  <p className="max-w-xs">Educational and mentorship hub for AI creatives.</p>
                </TooltipContent>
              </Tooltip>

              {/* O Verme Passeia */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="#projects" 
                    className="bg-slate-900 p-4 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,119,181,0.3)] motion-safe:animate-fade-in"
                  >
                    <img 
                      src={oVermePasseia} 
                      alt="O Verme Passeia Logo" 
                      className="w-full h-32 object-contain"
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                  <p className="max-w-xs">Philosophical AI-art project exploring existential design.</p>
                </TooltipContent>
              </Tooltip>

              {/* Figueiredo Law */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="#projects" 
                    className="bg-slate-900 p-4 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,119,181,0.3)] motion-safe:animate-fade-in"
                  >
                    <img 
                      src={figueiredoLaw} 
                      alt="Figueiredo Law Logo" 
                      className="w-full h-32 object-contain"
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                  <p className="max-w-xs">Digital Law & Tech strategy collaboration.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </section>

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-slate-900 to-[#121E2C]"></div>

      {/* Skills & Competencies - Darker Slate */}
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
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Core Strengths
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-gray-300">Prompt Engineering</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-gray-300">AI Ethics & Safety</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-gray-300">Human-AI Collaboration</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Growing Areas
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-gray-300">Data Handling & Privacy</span>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-gray-300">AI Model Fine-tuning</span>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-gray-300">Multi-modal AI Systems</span>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-[#121E2C] to-[#F7F9FB]"></div>

      {/* Call-to-Action - Light Background */}
      <section 
        id="contact"
        className="py-20 motion-safe:opacity-0 motion-safe:translate-y-6 motion-safe:transition-all motion-safe:duration-700 motion-safe:[animation:fadeInUp_0.7s_ease-out_forwards]" 
        style={{ backgroundColor: '#F7F9FB' }}
        data-tour="contact"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">Let's Collaborate</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Ready to transform your business with AI? Let's discuss how we can work together.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="mailto:nauitermaster@hotmail.com" 
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
              style={{ backgroundColor: '#0077B5', color: 'white' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005885'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0077B5'}
            >
              📧 Email Me
            </a>
            <a 
              href="https://www.linkedin.com/in/nauiter-master-678a71144/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="border-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 bg-white text-gray-900 hover:bg-gray-100"
              style={{ borderColor: '#0077B5' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#005885'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#0077B5'}
            >
              💼 LinkedIn
            </a>
            <a 
              href="https://beacons.ai/nauiter.master" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="border-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 bg-white text-gray-900 hover:bg-gray-100"
              style={{ borderColor: '#0077B5' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#005885'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#0077B5'}
            >
              🌐 My Links
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Dark Navy */}
      <footer 
        className="bg-[#0B1623] border-t border-gray-700 py-6 text-center text-sm text-[#AAB4C2] motion-safe:animate-fade-in"
      >
        <div className="flex justify-center gap-6 mb-3">
          <a 
            href="https://linkedin.com/in/nauiter-master-678a71144" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#00C4FF] transition-all duration-300 text-lg"
            aria-label="LinkedIn"
          >
            💼
          </a>
          <a 
            href="mailto:nauiter.master@gmail.com" 
            className="hover:text-[#00C4FF] transition-all duration-300 text-lg"
            aria-label="Email"
          >
            📧
          </a>
          <a 
            href="https://beacons.ai/nauitermaster" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#00C4FF] transition-all duration-300 text-lg"
            aria-label="Beacons"
          >
            🔗
          </a>
        </div>
        <p>© 2025 Developer — Nauiter Master | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Index;