import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Split long-lived vendor code into stable chunks so the first visit
    // downloads less and repeat visits hit the browser cache.
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("react-dom") || /node_modules\/(react|scheduler)\//.test(id)) {
            return "vendor-react";
          }
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("recharts") || id.includes("d3-")) return "vendor-charts";
          if (id.includes("@tsparticles")) return "vendor-particles";
          if (id.includes("@supabase")) return "vendor-supabase";
          if (id.includes("@radix-ui")) return "vendor-radix";
          if (id.includes("embla-carousel")) return "vendor-carousel";
          if (id.includes("react-markdown") || id.includes("remark") || id.includes("micromark")) {
            return "vendor-markdown";
          }
          return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
}));
