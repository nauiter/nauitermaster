import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

const STORAGE_KEY = 'cookie-consent-settings';

export const CookieConsent = () => {
  const { t } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    essential: true,
    analytics: false,
    marketing: false,
    timestamp: Date.now(),
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setShowBanner(true);
    } else {
      try {
        const parsed = JSON.parse(stored) as CookieSettings;
        setSettings(parsed);
      } catch (error) {
        console.error('Failed to parse cookie settings:', error);
        setShowBanner(true);
      }
    }
  }, []);

  const saveSettings = (newSettings: CookieSettings) => {
    const settingsToSave = { ...newSettings, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsToSave));
    setSettings(settingsToSave);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    saveSettings({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    });
  };

  const handleRejectNonEssential = () => {
    saveSettings({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    });
  };

  const handleSavePreferences = () => {
    saveSettings(settings);
  };

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <Card className="mx-auto max-w-5xl bg-cosmic-base/95 backdrop-blur-lg border border-white/10 shadow-glow">
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
                      {t.lgpd.banner.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t.lgpd.banner.description}
                    </p>
                    <Link
                      to="/privacy"
                      className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                    >
                      {t.lgpd.banner.privacyLink} →
                    </Link>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleAcceptAll}
                      className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
                    >
                      {t.lgpd.banner.acceptAll}
                    </Button>
                    <Button
                      onClick={handleRejectNonEssential}
                      variant="outline"
                      className="flex-1 border-white/20 hover:bg-white/5"
                    >
                      {t.lgpd.banner.rejectNonEssential}
                    </Button>
                    <Button
                      onClick={() => {
                        setShowBanner(false);
                        setShowPreferences(true);
                      }}
                      variant="ghost"
                      className="flex-1 hover:bg-white/5"
                    >
                      {t.lgpd.banner.managePreferences}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Dialog */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="bg-cosmic-base border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
              {t.lgpd.preferences.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {t.lgpd.preferences.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Essential Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex-1 space-y-1">
                <h4 className="font-medium text-foreground">
                  {t.lgpd.preferences.essential.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t.lgpd.preferences.essential.description}
                </p>
              </div>
              <Switch checked={true} disabled className="mt-1" />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex-1 space-y-1">
                <h4 className="font-medium text-foreground">
                  {t.lgpd.preferences.analytics.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t.lgpd.preferences.analytics.description}
                </p>
              </div>
              <Switch
                checked={settings.analytics}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, analytics: checked })
                }
                className="mt-1"
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex-1 space-y-1">
                <h4 className="font-medium text-foreground">
                  {t.lgpd.preferences.marketing.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t.lgpd.preferences.marketing.description}
                </p>
              </div>
              <Switch
                checked={settings.marketing}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, marketing: checked })
                }
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSavePreferences}
              className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {t.lgpd.preferences.savePreferences}
            </Button>
            <Button
              onClick={() => setShowPreferences(false)}
              variant="outline"
              className="flex-1 border-white/20 hover:bg-white/5"
            >
              {t.lgpd.preferences.cancel}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
