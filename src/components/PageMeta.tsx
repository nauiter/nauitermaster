import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMetaProps {
  title: string;
  description: string;
  noindex?: boolean;
}

/**
 * Lightweight per-route head updater for utility pages
 * (404, login) that don't need the full SEOHead schema payload.
 * Updates title, description, canonical, og:* and twitter:* tags.
 */
export const PageMeta = ({ title, description, noindex = false }: PageMetaProps) => {
  const { pathname } = useLocation();
  const baseUrl = 'https://nauitermaster.com';
  const fullUrl = `${baseUrl}${pathname}`;

  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', fullUrl);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:url"]', 'content', fullUrl);

    // Self-referencing canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // robots noindex (optional, removed on unmount)
    let robots: HTMLMetaElement | null = null;
    if (noindex) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex, nofollow';
      document.head.appendChild(robots);
    }

    return () => {
      if (robots) robots.remove();
    };
  }, [title, description, fullUrl, noindex]);

  return null;
};
