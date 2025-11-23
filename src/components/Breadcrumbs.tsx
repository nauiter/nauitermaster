import { useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

interface BreadcrumbItem {
  name: string;
  path: string;
}

export const Breadcrumbs = () => {
  const location = useLocation();
  const { language } = useLanguage();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: language === 'pt' ? 'Início' : 'Home', path: '/' }
    ];

    if (pathParts.length > 0) {
      pathParts.forEach((part, index) => {
        const path = '/' + pathParts.slice(0, index + 1).join('/');
        const names: Record<string, { pt: string; en: string }> = {
          'privacy-policy': { pt: 'Política de Privacidade', en: 'Privacy Policy' },
          'terms-of-use': { pt: 'Termos de Uso', en: 'Terms of Use' },
        };
        
        const name = names[part]?.[language] || part;
        breadcrumbs.push({ name, path });
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Schema markup for breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://nauitermaster.lovable.app${crumb.path}`
    }))
  };

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') return null;

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="py-4 px-6">
        <ol className="flex items-center space-x-2 text-sm max-w-6xl mx-auto">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-500 mx-2" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-300 font-medium flex items-center gap-2">
                  {index === 0 && <Home className="w-4 h-4" />}
                  {crumb.name}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-[#00C4FF] hover:text-[#7A5FFF] transition-colors flex items-center gap-2"
                >
                  {index === 0 && <Home className="w-4 h-4" />}
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};
