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
    // Create a timeout promise
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('IP detection timeout')), 3000)
    );
    
    // Race between fetch and timeout
    const response = await Promise.race([
      fetch('https://ipapi.co/json/'),
      timeoutPromise
    ]) as Response;
    
    if (!response.ok) throw new Error('IP detection failed');
    
    const data = await response.json();
    const portugueseCountries = ['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL'];
    
    if (data?.country_code && portugueseCountries.includes(data.country_code)) {
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
        try {
          const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
          
          if (stored && (stored === 'en' || stored === 'pt')) {
            navigate(`/${stored}`, { replace: true });
            return;
          }
        } catch (storageError) {
          console.error('localStorage error:', storageError);
        }
        
        // Priority 2: Check browser language (fast)
        const browserLang = detectLanguageFromBrowser();
        if (browserLang) {
          try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, browserLang);
          } catch (storageError) {
            console.error('localStorage save error:', storageError);
          }
          navigate(`/${browserLang}`, { replace: true });
          return;
        }
        
        // Priority 3: Try IP geolocation (slower, with fallback)
        try {
          const ipLang = await detectLanguageFromIP();
          try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, ipLang);
          } catch (storageError) {
            console.error('localStorage save error:', storageError);
          }
          navigate(`/${ipLang}`, { replace: true });
        } catch (ipError) {
          // If IP detection fails, fallback to English
          console.error('IP detection failed:', ipError);
          try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
          } catch (storageError) {
            console.error('localStorage save error:', storageError);
          }
          navigate('/en', { replace: true });
        }
        
      } catch (error) {
        // Priority 4: Final fallback to English
        console.error('Language detection failed, falling back to English:', error);
        try {
          localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
        } catch (storageError) {
          console.error('localStorage save error:', storageError);
        }
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
      <div className="min-h-screen flex items-center justify-center bg-[#0c1324]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#7A5FFF]/30 border-t-[#7A5FFF] rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
};
