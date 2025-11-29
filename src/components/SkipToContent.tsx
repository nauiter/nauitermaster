import { useLanguage } from "@/hooks/useLanguage";

export const SkipToContent = () => {
  const { language } = useLanguage();
  
  const text = language === 'pt' 
    ? 'Pular para o conteúdo principal' 
    : 'Skip to main content';

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-gradient-to-r focus:from-[#7A5FFF] focus:to-[#00C4FF] focus:text-white focus:font-medium focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#7A5FFF]/50 transition-all duration-200"
      tabIndex={0}
    >
      {text}
    </a>
  );
};
