import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, Translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'nauiter-portfolio-language';

// IP Geolocation detection
const detectLanguageFromIP = async (): Promise<Language> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    // Check if country is Brazil (PT) or Portuguese-speaking country
    const portugueseCountries = ['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL'];
    
    if (portugueseCountries.includes(data.country_code)) {
      return 'pt';
    }
    
    return 'en';
  } catch (error) {
    console.error('Failed to detect language from IP:', error);
    return 'en'; // Fallback to English
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeLanguage = async () => {
      // Check localStorage first
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      
      if (stored && (stored === 'en' || stored === 'pt')) {
        setLanguageState(stored);
      } else {
        // Detect from IP if no stored preference
        const detected = await detectLanguageFromIP();
        setLanguageState(detected);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, detected);
      }
      
      setIsInitialized(true);
    };

    initializeLanguage();
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  // Show nothing until initialized to prevent flash of wrong language
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
