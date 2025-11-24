import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageToggle } from './LanguageToggle';

export const FloatingNavbar = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'hero', label: t.nav.home },
    { id: 'projects', label: t.nav.projects },
    { id: 'impact', label: t.nav.metrics },
    { id: 'contact', label: t.nav.contact },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          // Get all sections
          const sections = navItems.map(item => ({
            id: item.id,
            element: document.getElementById(item.id)
          }));

          // Find which section is currently in view
          const currentSection = sections.find(section => {
            if (section.element) {
              const rect = section.element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          });

          if (currentSection) {
            setActiveSection(currentSection.id);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0B1623]/80 backdrop-blur-xl ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <button
            onClick={() => scrollToSection('hero')}
            className="text-white font-semibold text-lg hover:text-[#00C4FF] transition-colors"
          >
            Nauiter Master
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-[#A855F7]'
                    : 'text-[#B8C2CC] hover:text-[#00C4FF]'
                }`}
                style={
                  activeSection === item.id
                    ? { textShadow: '0 0 8px rgba(168, 85, 247, 0.6)' }
                    : {}
                }
              >
                {item.label}
              </button>
            ))}
            
            {/* Language Toggle */}
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:text-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700/50 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-[#A855F7] bg-[#A855F7]/10'
                    : 'text-[#B8C2CC] hover:text-[#00C4FF] hover:bg-white/5'
                }`}
                style={
                  activeSection === item.id
                    ? { textShadow: '0 0 8px rgba(168, 85, 247, 0.6)' }
                    : {}
                }
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Language Toggle */}
            <div className="px-4 pt-2">
              <LanguageToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
