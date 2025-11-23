import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FloatingNavbar } from "@/components/FloatingNavbar";
import { EcosystemCarousel } from "@/components/EcosystemCarousel";
import { ImpactMetrics } from "@/components/sections/ImpactMetrics";
import { HeroSection } from "@/components/sections/HeroSection";
import { AIToolsSection } from "@/components/sections/AIToolsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useLanguage } from "@/hooks/useLanguage";
import sweetLifeAnimes from "@/assets/sweet-life-animes.webp";
import sweetLifeAcademy from "@/assets/sweet-life-academy.webp";
import oVermePasseia from "@/assets/o-verme-passeia.webp";
import figueiredoLaw from "@/assets/figueiredo-law.webp";

const Index = () => {
  const { t, language } = useLanguage();

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

      {/* Hero Section */}
      <HeroSection />

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-slate-800 to-slate-900"></div>

      {/* AI Tools Mastery Section */}
      <AIToolsSection />

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-slate-800 to-[#F7F9FB]"></div>

      {/* Showcase Projects Section */}
      <ProjectsSection />

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
                name: "Figueiredo Law",
                purpose: "Law, technology, and AI ethics consultancy.",
                type: "Ethics & AI",
                color: "from-rose-600 to-gray-500",
                image: figueiredoLaw,
                url: "https://figueiredo-landing-amapa.lovable.app/"
              }
            ]}
          />
        </div>
      </section>

      {/* Impact Metrics Section */}
      <ImpactMetrics />

      {/* Gradient Separator */}
      <div className="h-16 bg-gradient-to-b from-[#0C1222] to-[#121E2C]"></div>

      {/* Skills & Competencies Section */}
      <SkillsSection />

      {/* Contact & Collaboration CTA */}
      <ContactSection />

      {/* Footer - Nauiter Master Signature */}
      <footer
        className="w-full bg-[#0D0D0D] text-white py-6 text-center border-t border-white/10"
      >
        <div className="container mx-auto px-4">
          {/* Links LGPD */}
          <div className="flex justify-center gap-6 mb-4 text-sm">
            <Link 
              to="/privacy-policy" 
              className="text-white/70 hover:text-white transition-colors duration-300 hover:underline"
            >
              Política de Privacidade
            </Link>
            <span className="text-white/30">|</span>
            <Link 
              to="/terms-of-use" 
              className="text-white/70 hover:text-white transition-colors duration-300 hover:underline"
            >
              Termos de Uso
            </Link>
          </div>

          {/* Linha principal */}
          <p className="text-[clamp(0.85rem,1vw,1rem)] leading-relaxed opacity-90">
            © 2025{" "}
            <strong className="text-white font-semibold tracking-wide transition-colors duration-300 hover:text-[hsl(var(--bronze-soft))]">
              Developer — Nauiter Master
            </strong>{" "}
            | All Rights Reserved
          </p>

          {/* Linha de assinatura */}
          <span className="block mt-2 text-[0.85rem] italic text-white/60">
            Sic Mundus Creatus Est
          </span>
        </div>
      </footer>

    </div>
  );
};

export default Index;
