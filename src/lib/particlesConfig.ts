import { PARTICLES_CONFIG } from '@/lib/constants';

export const PARTICLES_OPTIONS = {
  background: {
    color: {
      value: '#0B1623',
    },
  },
  fpsLimit: PARTICLES_CONFIG.FPS_LIMIT,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'grab',
      },
      resize: {
        enable: true,
      },
    },
    modes: {
      grab: {
        distance: 150,
        links: {
          opacity: 0.4,
        },
      },
    },
  },
  particles: {
    color: {
      value: PARTICLES_CONFIG.PRIMARY_COLOR,
    },
    links: {
      color: PARTICLES_CONFIG.LINK_COLOR,
      distance: PARTICLES_CONFIG.LINK_DISTANCE,
      enable: true,
      opacity: 0.2,
      width: 1,
    },
    move: {
      direction: 'none' as const,
      enable: true,
      outModes: {
        default: 'out' as const,
      },
      random: false,
      speed: PARTICLES_CONFIG.PARTICLE_SPEED,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: PARTICLES_CONFIG.PARTICLE_COUNT,
    },
    opacity: {
      value: { min: 0.1, max: 0.3 },
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
    shape: {
      type: 'circle' as const,
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
} as const;
