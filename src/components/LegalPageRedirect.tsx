import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

interface LegalPageRedirectProps {
  pagePath: 'privacy-policy' | 'terms-of-use';
}

/**
 * LegalPageRedirect component
 * Redirects users from generic legal pages to language-specific versions
 * E.g., /privacy-policy → /pt/privacy-policy or /en/privacy-policy
 */
export const LegalPageRedirect = ({ pagePath }: LegalPageRedirectProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const performRedirect = () => {
      // Priority 1: Check localStorage (user's previous choice)
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      
      if (stored && (stored === 'en' || stored === 'pt')) {
        navigate(`/${stored}/${pagePath}`, { replace: true });
        return;
      }
      
      // Priority 2: Check browser language
      const browserLang = detectLanguageFromBrowser();
      if (browserLang) {
        navigate(`/${browserLang}/${pagePath}`, { replace: true });
        return;
      }
      
      // Priority 3: Fallback to English
      navigate(`/en/${pagePath}`, { replace: true });
    };

    performRedirect();
  }, [navigate, pagePath]);

  // Show loading state during redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1623]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#7A5FFF]/30 border-t-[#7A5FFF] rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
};
