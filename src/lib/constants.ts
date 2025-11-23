// Portfolio Constants and Configuration
// Centralized configuration for maintainability

export const METRICS = {
  LINKEDIN_FOLLOWERS: 5750,
  YEARS_EXPERIENCE: 14,
  ACTIVE_PROJECTS: 4,
  AI_VISUALS_GENERATED: '200+',
  ECOSYSTEMS_BUILT: '10+',
  AI_DRIVEN_BRANDS: 4,
  IDEAS_IN_MOTION: '∞',
} as const;

export const SOCIAL_LINKS = {
  EMAIL: 'mailto:nauitermaster@hotmail.com',
  FACEBOOK: 'https://facebook.com/nauiter.master',
  INSTAGRAM: 'https://instagram.com/nauiter.master',
  LINKEDIN: 'https://linkedin.com/in/nauiter-master-678a71144',
} as const;

export const PROJECT_URLS = {
  SWEET_LIFE_ANIMES: 'https://sweetlifeanimes.lovable.app',
  SWEET_LIFE_ACADEMY: 'https://sweetlifeacademy.coursify.me/',
  O_VERME_PASSEIA: 'https://overmepasseia.lovable.app',
  FIGUEIREDO_LAW: 'https://figueiredo-landing-amapa.lovable.app/',
} as const;

export const NAVBAR_CONFIG = {
  HEIGHT: 80,
  SCROLL_THRESHOLD: 50,
  SECTION_OFFSET: 100,
} as const;

export const ANIMATION_CONFIG = {
  COUNTER_DURATION: 2000,
  COUNTER_STEPS: 60,
  STAGGER_DELAY: 200,
  INTERSECTION_THRESHOLD: 0.3,
} as const;

export const PARTICLES_CONFIG = {
  FPS_LIMIT: 120,
  PARTICLE_COUNT: 65,
  LINK_DISTANCE: 140,
  PARTICLE_SPEED: 1.5,
  PRIMARY_COLOR: '#00C4FF',
  LINK_COLOR: '#0077B5',
} as const;
