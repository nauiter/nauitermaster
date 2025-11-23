// Staging Environment - Safe Testing Area
import { useState } from 'react';
import portfolioAvatar from "@/assets/portfolio-avatar.webp";
import { ProjectEditor } from "@/components/ProjectEditor";
import { Button } from "@/components/ui/button";
import { TestTube } from "lucide-react";
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

const Staging = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'AI Content Automation System',
      description: 'Automated content generation pipeline using GPT-4 and custom prompts',
      impact: 'Reduced manual processing time by 80% and improved accuracy to 99.2%',
      tools: ['GPT-4', 'Python', 'Automation'],
      imageUrl: '/placeholder.svg'
    },
    {
      id: '2', 
      title: 'Creative Asset Generator',
      description: 'AI-powered design system for marketing materials',
      impact: 'Generated 500+ unique assets, saving $15K in design costs',
      tools: ['DALL-E', 'Creative'],
      imageUrl: '/placeholder.svg'
    },
    {
      id: '3',
      title: 'Document Analysis Pipeline', 
      description: 'Intelligent document processing and insight extraction',
      impact: 'Analyzed 10K+ documents in hours instead of weeks',
      tools: ['Claude', 'Analysis'],
      imageUrl: '/placeholder.svg'
    }
  ]);


  return (
    <div className="min-h-screen bg-background">
      {/* Environment Switcher */}
      <EnvironmentSwitcher currentEnvironment="staging" />

      {/* Staging Environment Banner */}
      <div className="bg-yellow-500/10 border-b border-yellow-500/20 text-center py-2">
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-yellow-600">
          <TestTube className="w-4 h-4" />
          STAGING ENVIRONMENT - Safe to edit and test
        </div>
      </div>


      {/* Header/Intro Section */}
      <header className="relative bg-gradient-hero text-white" data-tour="welcome">
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                [Your Name]
              </h1>
              <p className="text-xl text-white/90 mb-6 max-w-2xl">
                AI Specialist & Prompt Engineer helping businesses harness the power of artificial intelligence
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                  Prompt Engineering
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                  AI Strategy
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                  Automation
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* AI Tools Mastery Section */}
      <section className="py-20 bg-background" data-tour="ai-tools">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">AI Tools Mastery</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Expertise across the AI ecosystem with practical applications and proven results
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-glow transition-all duration-300 border border-border">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="font-semibold mb-2">Text AI</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Advanced prompt engineering with GPT, Claude, and other LLMs
              </p>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-strength text-strength-foreground">
                Expert
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-glow transition-all duration-300 border border-border">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="font-semibold mb-2">Image/Video AI</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Creative workflows with DALL-E, Midjourney, and video generation
              </p>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-strength text-strength-foreground">
                Expert
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-glow transition-all duration-300 border border-border">
              <div className="text-3xl mb-4">🎵</div>
              <h3 className="font-semibold mb-2">Audio AI</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Voice synthesis, music generation, and audio processing
              </p>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-learning text-learning-foreground">
                Learning
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-glow transition-all duration-300 border border-border">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-semibold mb-2">Productivity/Automation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Workflow automation and AI-powered productivity solutions
              </p>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-strength text-strength-foreground">
                Expert
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Projects Section */}
      <section className="py-20 bg-secondary/30" data-tour="projects">
        <div className="container mx-auto px-6">
          <ProjectEditor projects={projects} onProjectsChange={setProjects} />
        </div>
      </section>

      {/* Skills & Competencies */}
      <section className="py-20 bg-background" data-tour="skills">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Skills & Competencies</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-strength rounded-full"></div>
                Core Strengths
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                  <span>Prompt Engineering</span>
                  <div className="w-2 h-2 bg-strength rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                  <span>AI Ethics & Safety</span>
                  <div className="w-2 h-2 bg-strength rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                  <span>Human-AI Collaboration</span>
                  <div className="w-2 h-2 bg-strength rounded-full"></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-learning rounded-full"></div>
                Growing Areas
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                  <span>Data Handling & Privacy</span>
                  <div className="w-2 h-2 bg-learning rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                  <span>AI Model Fine-tuning</span>
                  <div className="w-2 h-2 bg-learning rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                  <span>Multi-modal AI Systems</span>
                  <div className="w-2 h-2 bg-learning rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Impact Metrics</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-muted-foreground">Hours Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">25+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">12</div>
              <div className="text-muted-foreground">AI Tools Mastered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-20 bg-background" data-tour="contact">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Collaborate</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to transform your business with AI? Let's discuss how we can work together.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors">
              📧 Email Me
            </button>
            <button className="border border-border px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors">
              💼 LinkedIn
            </button>
            <button className="border border-border px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors">
              🌐 Website
            </button>
          </div>
          
          <div className="mt-12 p-6 bg-card rounded-xl border border-border max-w-2xl mx-auto">
            <h3 className="font-semibold mb-2">🎯 Template Ready for Customization</h3>
            <p className="text-sm text-muted-foreground">
              This template is designed to be easily customized. Replace placeholders with your own content, 
              add your projects, and update the color coding to reflect your expertise levels.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Staging;