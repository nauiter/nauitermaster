import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "@/hooks/useLanguage";
import { CookieConsent } from "@/components/CookieConsent";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LanguageRedirect } from "@/components/LanguageRedirect";
import { LegalPageRedirect } from "@/components/LegalPageRedirect";
import { HeroSkeleton } from "@/components/skeletons/HeroSkeleton";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Code splitting by route for better performance
const Index = lazy(() => import("./pages/Index"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CookieConsent />
            <Breadcrumbs />
            <Suspense fallback={<HeroSkeleton />}>
              <Routes>
                {/* Root path - Auto-redirect to /pt or /en based on language detection */}
                <Route path="/" element={<LanguageRedirect />} />
                
                {/* Language-specific homepage routes */}
                <Route path="/pt" element={<Index forcedLanguage="pt" />} />
                <Route path="/en" element={<Index forcedLanguage="en" />} />
                
                {/* Legal pages - Generic routes (redirect to language-specific) */}
                <Route path="/privacy-policy" element={<LegalPageRedirect pagePath="privacy-policy" />} />
                <Route path="/terms-of-use" element={<LegalPageRedirect pagePath="terms-of-use" />} />
                
                {/* Legal pages - Portuguese routes */}
                <Route path="/pt/privacy-policy" element={<PrivacyPolicy forcedLanguage="pt" />} />
                <Route path="/pt/terms-of-use" element={<TermsOfUse forcedLanguage="pt" />} />
                
                {/* Legal pages - English routes */}
                <Route path="/en/privacy-policy" element={<PrivacyPolicy forcedLanguage="en" />} />
                <Route path="/en/terms-of-use" element={<TermsOfUse forcedLanguage="en" />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
