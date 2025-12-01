/**
 * Google Analytics 4 Event Tracking Utilities
 * 
 * Centralized functions for tracking user interactions across the portfolio.
 * Uses gtag.js to send custom events to GA4.
 */

// Type definitions for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParams?: Record<string, any>
    ) => void;
  }
}

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (ctaName: string, location: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'cta_click', {
      cta_name: ctaName,
      cta_location: location,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track CV downloads
 */
export const trackCVDownload = (source: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'cv_download', {
      download_source: source,
      file_name: 'Nauiter_Master_Profile.pdf',
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track project navigation (carousel interactions)
 */
export const trackProjectNavigation = (
  projectName: string,
  navigationMethod: 'arrow' | 'dot' | 'autoplay',
  projectIndex: number
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'project_navigation', {
      project_name: projectName,
      navigation_method: navigationMethod,
      project_index: projectIndex,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track project link clicks
 */
export const trackProjectVisit = (projectName: string, projectUrl: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'project_visit', {
      project_name: projectName,
      project_url: projectUrl,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track language changes
 */
export const trackLanguageChange = (
  fromLanguage: string,
  toLanguage: string,
  currentPage: string
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'language_change', {
      from_language: fromLanguage,
      to_language: toLanguage,
      current_page: currentPage,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track social link clicks
 */
export const trackSocialClick = (platform: string, location: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'social_click', {
      social_platform: platform,
      click_location: location,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track section views (when user scrolls into view)
 */
export const trackSectionView = (sectionName: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'section_view', {
      section_name: sectionName,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track email/contact form interactions
 */
export const trackContactInteraction = (interactionType: 'email_click' | 'call_booking') => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'contact_interaction', {
      interaction_type: interactionType,
      timestamp: new Date().toISOString(),
    });
  }
};
