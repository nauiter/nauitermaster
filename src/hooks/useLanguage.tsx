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

// Synchronous resolution: localStorage → browser → 'en' (no network, never blocks render)
const resolveInitialLanguage = (): { lang: Language; needsIPCheck: boolean } => {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (stored === 'en' || stored === 'pt') {
      return { lang: stored, needsIPCheck: false };
    }
  } catch (error) {
    console.error('localStorage error:', error);
  }

  const browserLang = detectLanguageFromBrowser();
  if (browserLang) {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, browserLang);
    } catch (error) {
      console.error('localStorage save error:', error);
    }
    return { lang: browserLang, needsIPCheck: false };
  }

  return { lang: 'en', needsIPCheck: true };
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [initial] = useState(resolveInitialLanguage);
  const [language, setLanguageState] = useState<Language>(initial.lang);

  useEffect(() => {
    if (!initial.needsIPCheck) return;

    let cancelled = false;

    // Refine in the background — UI already rendered in English
    detectLanguageFromIP().then((ipLang) => {
      if (cancelled) return;
      setLanguageState(ipLang);
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, ipLang);
      } catch (error) {
        console.error('localStorage save error:', error);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [initial.needsIPCheck]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  // Render immediately — language refines in the background if needed
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
