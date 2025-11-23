import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, Translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'nauiter-portfolio-language';

// Browser language detection
const detectLanguageFromBrowser = (): Language | null => {
  try {
    // Get browser language (e.g., 'pt-BR', 'en-US', 'pt')
    const browserLang = navigator.language || (navigator as any).userLanguage;
    
    if (!browserLang) return null;
    
    // Extract language code (pt-BR -> pt, en-US -> en)
    const langCode = browserLang.toLowerCase().split('-')[0];
    
    // Check if it's Portuguese
    if (langCode === 'pt') {
      return 'pt';
    }
    
    // Default to English for other languages
    if (langCode === 'en') {
      return 'en';
    }
    
    return null;
  } catch (error) {
    console.error('Failed to detect browser language:', error);
    return null;
  }
};

// IP Geolocation detection (fallback)
const detectLanguageFromIP = async (): Promise<Language> => {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(3000), // 3 second timeout
    });
    
    if (!response.ok) {
      throw new Error('IP detection failed');
    }
    
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
      // Priority 1: Check localStorage (user's explicit preference)
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      
      if (stored && (stored === 'en' || stored === 'pt')) {
        setLanguageState(stored);
        setIsInitialized(true);
        return;
      }
      
      // Priority 2: Check browser language (fast, no API call)
      const browserLang = detectLanguageFromBrowser();
      if (browserLang) {
        setLanguageState(browserLang);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, browserLang);
        setIsInitialized(true);
        return;
      }
      
      // Priority 3: Try IP geolocation (slower, but location-based)
      try {
        const ipLang = await detectLanguageFromIP();
        setLanguageState(ipLang);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, ipLang);
      } catch (error) {
        // Priority 4: Final fallback to English
        setLanguageState('en');
        localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
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

  // Always provide context, even during initialization
  return (
    <LanguageContext.Provider value={value}>
      {isInitialized ? children : null}
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
