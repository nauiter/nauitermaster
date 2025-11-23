import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Language } from '@/lib/translations';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const handleToggle = (lang: Language) => {
    if (lang !== language) {
      setLanguage(lang);
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
