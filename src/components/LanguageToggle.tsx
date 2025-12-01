import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Language } from '@/lib/translations';
import { trackLanguageChange } from '@/lib/analytics';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = (newLang: Language) => {
    if (newLang === language) return;
    
    // Track language change
    trackLanguageChange(language, newLang, location.pathname);
    
    setLanguage(newLang);
    
    // Navigate to the language-specific route
    // Preserve current page structure
    if (location.pathname === '/pt' || location.pathname === '/en' || location.pathname === '/') {
      // Homepage
      navigate(`/${newLang}`, { replace: true });
    } else if (location.pathname.includes('/privacy-policy')) {
      // Privacy Policy page
      navigate(`/${newLang}/privacy-policy`, { replace: true });
    } else if (location.pathname.includes('/terms-of-use')) {
      // Terms of Use page
      navigate(`/${newLang}/terms-of-use`, { replace: true });
    } else {
      // Fallback to homepage with language
      navigate(`/${newLang}`);
    }
  };

  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
      <motion.button
        onClick={() => handleToggle('en')}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] text-white shadow-md'
            : 'text-gray-400 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        EN
      </motion.button>
      <motion.button
        onClick={() => handleToggle('pt')}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
          language === 'pt'
            ? 'bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] text-white shadow-md'
            : 'text-gray-400 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        PT
      </motion.button>
    </div>
  );
};
