import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language } from '@/lib/translations';

const LANGUAGE_STORAGE_KEY = 'nauiter-portfolio-language';

// Browser language detection
const detectLanguageFromBrowser = (): Language | null => {
  try {
    const browserLang = navigator.language || (navigator as any).userLanguage;
    if (!browserLang) return null;
    
    const langCode = browserLang.toLowerCase().split('-')[0];
    
    if (langCode === 'pt') return 'pt';
    if (langCode === 'en') return 'en';
    
    return null;
  } catch (error) {
    console.error('Failed to detect browser language:', error);
    return null;
  }
};

// IP Geolocation detection
const detectLanguageFromIP = async (): Promise<Language> => {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(3000),
    });
    
    if (!response.ok) throw new Error('IP detection failed');
    
    const data = await response.json();
    const portugueseCountries = ['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL'];
    
    if (portugueseCountries.includes(data.country_code)) {
      return 'pt';
    }
    
    return 'en';
  } catch (error) {
    console.error('Failed to detect language from IP:', error);
    return 'en';
  }
};

/**
 * LanguageRedirect component
 * Automatically redirects users from "/" to "/pt" or "/en" 
 * based on language detection (localStorage → browser → IP → fallback)
 */
export const LanguageRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    const performRedirect = async () => {
      // Only redirect from root path
      if (location.pathname !== '/') {
        setIsRedirecting(false);
        return;
      }

      try {
        // Priority 1: Check localStorage (user's previous choice)
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
        
        if (stored && (stored === 'en' || stored === 'pt')) {
          navigate(`/${stored}`, { replace: true });
          return;
        }
        
        // Priority 2: Check browser language (fast)
        const browserLang = detectLanguageFromBrowser();
        if (browserLang) {
          localStorage.setItem(LANGUAGE_STORAGE_KEY, browserLang);
          navigate(`/${browserLang}`, { replace: true });
          return;
        }
        
        // Priority 3: Try IP geolocation (slower)
        const ipLang = await detectLanguageFromIP();
        localStorage.setItem(LANGUAGE_STORAGE_KEY, ipLang);
        navigate(`/${ipLang}`, { replace: true });
        
      } catch (error) {
        // Priority 4: Final fallback to English
        console.error('Language detection failed, falling back to English:', error);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
        navigate('/en', { replace: true });
      } finally {
        setIsRedirecting(false);
      }
    };

    performRedirect();
  }, [navigate, location.pathname]);

  // Show loading state during redirect
  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1623]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#7A5FFF]/30 border-t-[#7A5FFF] rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
};
