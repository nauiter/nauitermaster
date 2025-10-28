// AI Portfolio Template - Professional and Interactive
import { useState } from 'react';
import portfolioAvatar from "@/assets/portfolio-avatar.png";
import { ProjectEditor } from "@/components/ProjectEditor";
import { OnboardingTour } from "@/components/OnboardingTour";
import { useOnboarding } from "@/hooks/useOnboarding";
import { Button } from "@/components/ui/button";
import { HelpCircle, Brain, Image, Music, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EnvironmentSwitcher } from "@/components/EnvironmentSwitcher";

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
      imageUrl: '/placeholder.svg'
    },
    {
      id: '2', 
      title: 'O Verme Passeia',
      description: 'Existential and aesthetic project inspired by Texhnolyze, Ergo Proxy, and Soviet post-punk',
      impact: 'Exploring philosophy, nihilism, and brutalist aesthetics through digital art',
      tools: ['Philosophy', 'Digital Art', 'AI'],
      imageUrl: '/placeholder.svg'
    },
    {
      id: '3',
      title: 'Sweet Life Academy', 
      description: 'Educational platform teaching creators to grow and monetize with AI',
      impact: 'Empowering creators with AI tools and strategies for digital success',
      tools: ['AI Education', 'Automation', 'Strategy'],
      imageUrl: '/placeholder.svg'
    }
  ]);

  const { hasSeenTour, isTourOpen, startTour, completeTour, skipTour } = useOnboarding();

  // Tour steps configuration
  const tourSteps = [
    {
      id: 'welcome',
      title: 'Welcome to My Portfolio',
      content: "Hi! I'm Nauiter Master, an AI Strategist and Digital Artist. Let me show you how I merge creativity, automation, and ethics to transform technology into art.",
      target: 'header',
      position: 'bottom' as const,
    },
    {
      id: 'expertise',
      title: 'AI Tools Expertise',
      content: 'Here you can see my mastery level across different AI tools and platforms. The color coding shows my expertise levels.',
      target: '[data-tour="ai-tools"]',
      position: 'bottom' as const,
    },
    {
      id: 'projects',
      title: 'Featured Projects',
      content: 'These are some of my key projects with real business impact. Click on any project to see more details.',
      target: '[data-tour="projects"]',
      position: 'top' as const,
    },
    {
      id: 'skills',
      title: 'Skills & Competencies',
      content: 'My core strengths and areas where I\'m actively learning and growing. This shows my commitment to continuous improvement.',
      target: '[data-tour="skills"]',
      position: 'top' as const,
    },
    {
      id: 'contact',
      title: 'Let\'s Connect',
      content: 'Ready to work together? Use these buttons to get in touch. I\'d love to discuss how AI can transform your business.',
      target: '[data-tour="contact"]',
      position: 'top' as const,
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Environment Switcher */}
      <EnvironmentSwitcher currentEnvironment="production" />

      {/* Help button for restarting tour */}
      {hasSeenTour && (
        <Button
          onClick={startTour}
          className="fixed top-4 right-4 z-40 bg-accent/10 text-accent hover:bg-accent/20 border-accent/20"
          size="sm"
          variant="outline"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Tour
        </Button>
      )}

      {/* Onboarding Tour */}
      <OnboardingTour
        steps={tourSteps}
        isOpen={isTourOpen}
        onComplete={completeTour}
        onSkip={skipTour}
      />

      {/* Header/Intro Section - Dark Navy Gradient */}
      <header 
        id="hero"
        className="relative text-white shadow-[0px_1px_20px_rgba(0,0,0,0.15)]" 
        style={{ background: 'linear-gradient(135deg, #0B1623 0%, #0E213A 100%)' }}
        data-tour="welcome"
      >
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <img 
                src={portfolioAvatar} 
                alt="Professional AI Specialist Profile" 
                className="w-32 h-32 rounded-full border-4 border-white/20 shadow-lg object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Nauiter Master
              </h1>
              <p className="text-xl text-gray-300 mb-6 max-w-2xl">
                AI Strategist and Digital Artist merging creativity, automation, and ethics to transform technology into art. Focused on AI Strategy, Generative Automation, and Digital Culture.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                  AI Strategy
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                  Digital Art
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                  Generative Automation
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* AI Tools Mastery Section - Dark Navy Gradient (matches hero) */}
      <section 
        id="ai-tools"
        className="py-20 shadow-[0px_1px_20px_rgba(0,0,0,0.15)]" 
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

      {/* Showcase Projects Section - Light Background */}
      <section 
        id="projects"
        className="py-20 shadow-[0px_1px_20px_rgba(0,0,0,0.15)]" 
        style={{ backgroundColor: '#F7F9FB' }}
        data-tour="projects"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-12">Showcase Projects</h2>
          <ProjectEditor projects={projects} onProjectsChange={setProjects} />
        </div>
      </section>

      {/* Skills & Competencies - Darker Slate */}
      <section 
        id="skills"
        className="py-20 shadow-[0px_1px_20px_rgba(0,0,0,0.15)]" 
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

      {/* Metrics Section - Light Background */}
      <section 
        id="metrics"
        className="py-20 shadow-[0px_1px_20px_rgba(0,0,0,0.15)]" 
        style={{ backgroundColor: '#F7F9FB' }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-12">Impact Metrics</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#0077B5' }}>6,900+</div>
              <div className="text-gray-700">LinkedIn Followers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#0077B5' }}>8+</div>
              <div className="text-gray-700">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#0077B5' }}>3</div>
              <div className="text-gray-700">Active Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action - Light Background */}
      <section 
        id="contact"
        className="py-20" 
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
          
          <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-200 max-w-2xl mx-auto shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">🎯 Template Ready for Customization</h3>
            <p className="text-sm text-gray-700">
              This template is designed to be easily customized. Replace placeholders with your own content, 
              add your projects, and update the color coding to reflect your expertise levels.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;