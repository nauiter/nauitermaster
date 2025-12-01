import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FloatingNavbar } from "@/components/FloatingNavbar";
import { SkipToContent } from "@/components/SkipToContent";
import { EcosystemCarousel } from "@/components/EcosystemCarousel";
import { ImpactMetrics } from "@/components/sections/ImpactMetrics";
import { HeroSection } from "@/components/sections/HeroSection";
import { AIToolsSection } from "@/components/sections/AIToolsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { SoftSkillsSection } from "@/components/sections/SoftSkillsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SEOHead } from "@/components/SEOHead";
import { HeroSkeleton } from "@/components/skeletons/HeroSkeleton";
import { ProjectsSkeleton } from "@/components/skeletons/ProjectsSkeleton";
import { EcosystemSkeleton } from "@/components/skeletons/EcosystemSkeleton";
import { AIToolsSkeleton } from "@/components/skeletons/AIToolsSkeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { usePageLoading } from "@/hooks/usePageLoading";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import sweetLifeAnimes from "@/assets/sweet-life-animes.webp";
import sweetLifeAcademy from "@/assets/sweet-life-academy.webp";
import oVermePasseia from "@/assets/o-verme-passeia.webp";
import figueiredoLaw from "@/assets/figueiredo-law.webp";

interface IndexProps {
  forcedLanguage?: 'pt' | 'en';
}

const Index = ({ forcedLanguage }: IndexProps) => {
  const { t, language, setLanguage } = useLanguage();
  const isLoading = usePageLoading(800);
  useSmoothScroll();

  // Force language if specified in route
  React.useEffect(() => {
    if (forcedLanguage && language !== forcedLanguage) {
      setLanguage(forcedLanguage);
    }
  }, [forcedLanguage, language, setLanguage]);

  return (
    <div className="min-h-screen bg-[#0c1324]">
      {/* SEO Head with dynamic meta tags and structured data */}
      <SEOHead forcedLanguage={forcedLanguage} />
      
      {/* Skip to Content Link for Accessibility */}
      <SkipToContent />
      
      <FloatingNavbar />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSkeleton />
            <AIToolsSkeleton />
            <ProjectsSkeleton />
            <EcosystemSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
      {/* Main Content Wrapper */}
      <main id="main-content">
      {/* Hero Section */}
      <HeroSection />

      {/* AI Tools Mastery Section */}
      <AIToolsSection />

      {/* Showcase Projects Section */}
      <ProjectsSection />

      {/* Creative & Strategic Ecosystem */}
      <EcosystemCarousel 
        projects={[
          {
            name: t.ecosystem.projects.sweetLifeAnimes.name,
            purpose: t.ecosystem.projects.sweetLifeAnimes.purpose,
            type: t.ecosystem.projects.sweetLifeAnimes.type,
            color: "from-pink-500 to-fuchsia-400",
            image: sweetLifeAnimes,
            url: "https://sweetlifeanimes.com"
          },
          {
            name: t.ecosystem.projects.sweetLifeAcademy.name,
            purpose: t.ecosystem.projects.sweetLifeAcademy.purpose,
            type: t.ecosystem.projects.sweetLifeAcademy.type,
            color: "from-purple-500 to-cyan-400",
            image: sweetLifeAcademy,
            url: "https://sweetlifeacademy.coursify.me/"
          },
          {
            name: t.ecosystem.projects.oVermePasseia.name,
            purpose: t.ecosystem.projects.oVermePasseia.purpose,
            type: t.ecosystem.projects.oVermePasseia.type,
            color: "from-amber-500 to-yellow-400",
            image: oVermePasseia,
            url: "https://overmepasseia.com.br"
          },
          {
            name: t.ecosystem.projects.figueiredoLaw.name,
            purpose: t.ecosystem.projects.figueiredoLaw.purpose,
            type: t.ecosystem.projects.figueiredoLaw.type,
            color: "from-rose-600 to-gray-500",
            image: figueiredoLaw,
            url: "https://advocaciafigueiredo.adv.br"
          }
        ]}
      />

      {/* Impact Metrics Section */}
      <ImpactMetrics />

      {/* Skills & Competencies Section */}
      <SkillsSection />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Soft Skills Section */}
      <SoftSkillsSection />

      {/* Certifications & Achievements Section */}
      <CertificationsSection />

      {/* Contact & Collaboration CTA */}
      <ContactSection />
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-[#0c1324] to-[#000000]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
          {/* Top Section - Links & Info */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6">
            {/* Quick Links */}
            <div className="text-center md:text-left">
              <AnimatePresence mode="wait">
                <motion.h4
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                   className="text-white font-semibold mb-3 sm:mb-4 text-sm uppercase tracking-wider"
                >
                  {language === 'pt' ? 'Jurídico' : 'Legal'}
                </motion.h4>
              </AnimatePresence>
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <Link 
                  to={`/${language}/privacy-policy`}
                  className="text-gray-400 hover:text-[#00C4FF] transition-colors text-sm py-2 px-2 min-h-[44px] inline-flex items-center"
                >
                  {language === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
                </Link>
                <Link 
                  to={`/${language}/terms-of-use`}
                  className="text-gray-400 hover:text-[#00C4FF] transition-colors text-sm py-2 px-2 min-h-[44px] inline-flex items-center"
                >
                  {language === 'pt' ? 'Termos de Uso' : 'Terms of Use'}
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-right">
              <AnimatePresence mode="wait">
                <motion.h4
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                   className="text-white font-semibold mb-3 sm:mb-4 text-sm uppercase tracking-wider"
                >
                  {language === 'pt' ? 'Conectar' : 'Connect'}
                </motion.h4>
              </AnimatePresence>
              <div className="flex justify-center md:justify-end gap-3 sm:gap-4">
                <a 
                  href="https://linkedin.com/in/nauiter-master-678a71144"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00C4FF]/20 hover:border-[#00C4FF] transition-all group min-h-[44px] min-w-[44px]"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#00C4FF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com/nauiter.master"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7A5FFF]/20 hover:border-[#7A5FFF] transition-all group min-h-[44px] min-w-[44px]"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#7A5FFF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://facebook.com/nauiter.master"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00C4FF]/20 hover:border-[#00C4FF] transition-all group min-h-[44px] min-w-[44px]"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#00C4FF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright */}
          <div className="text-center space-y-1 sm:space-y-1.5 mt-6 sm:mt-8">
            <p className="text-gray-400 text-sm">
              © 2025 <span className="text-white font-semibold">Developer — Nauiter Master</span> | All Rights Reserved
            </p>
            <p className="text-gray-500 text-xs italic">
              Sic Mundus Creatus Est
            </p>
          </div>
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#7A5FFF]/5 pointer-events-none"></div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
