# Nauiter Master | AI Strategist & Digital Artist

> **"Exploring the edge between Intelligence, Art, and Automation."**

This repository contains the source code for Nauiter Master's professional portfolio. An immersive, high-performance, and visually striking web application designed to demonstrate expertise in Artificial Intelligence, Generative Design, and Software Engineering.

## 🌌 Project Overview

This project is an interactive **Single Page Application (SPA)** featuring:
- **"Cosmic" Design System:** A futuristic aesthetic with glassmorphism, neon gradients, and particle animations.
- **Internationalization (i18n):** Native and fluid support for English (EN) and Portuguese (PT).
- **Project Showcase:** An interactive carousel displaying 6+ active initiatives: *Sweet Life Animes*, *Sweet Life Academy*, *O Verme Passeia*, *Figueiredo Law*, *Avalia Macapá*, and *Chaos Oracle*.
- **Impact Metrics:** Animated data visualization regarding professional reach.
- **Compliance:** Full LGPD implementation (Cookie Consent, Terms of Use, and Privacy Policy).

## 🤖 AI Assistant & Admin Features

### Lucy AI Chat
- Floating chat assistant for lead qualification
- Extremely brief responses (2-3 sentences max)
- Automatic lead capture from email detection in conversations
- Success notification when lead is captured
- Multi-language support (PT/EN)

### Admin Panel (/fimo_admin)
- **Dashboard**: Lead metrics, conversion rates, status breakdown
- **Leads Management**: Search, filter, CSV export, conversation history
- **Mentorship Tiers**: Edit pricing and features (PT/EN)
- **Knowledge Base**: Configure Lucy's responses
- **Settings**: Site-wide configurations

### Security
- Row Level Security (RLS) on all tables
- Admin-only access to sensitive data
- GDPR-compliant conversation management (DELETE policy)

## 🚀 Tech Stack

The project was built using the most modern technologies in the React ecosystem:

- **Core:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [tsParticles](https://particles.js.org/)
- **State Management:** [TanStack Query](https://tanstack.com/query/latest)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend/Integrations:** Supabase (Configured)

## 🛠️ Installation & Local Development

To run this project locally, follow the steps below:

### Prerequisites
- Node.js (Version 18 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nauiter-master-portfolio.git
   cd nauiter-master-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📄 Project Structure

- `/src/components`: Modular components (UI, Sections, Layout).
- `/src/hooks`: Custom hooks (i18n, Animations, Observer).
- `/src/lib`: Utilities, constants, and translation configurations.
- `/src/pages`: Main application routes.

---

© 2025 Nauiter Master. All Rights Reserved.
