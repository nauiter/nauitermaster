import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface TermsOfUseProps {
  forcedLanguage?: 'pt' | 'en';
}

export default function TermsOfUse({ forcedLanguage }: TermsOfUseProps) {
  const { t, language, setLanguage } = useLanguage();

  // Force language if specified in route
  React.useEffect(() => {
    if (forcedLanguage && language !== forcedLanguage) {
      setLanguage(forcedLanguage);
    }
  }, [forcedLanguage, language, setLanguage]);

  const sections = [
    t.lgpd.terms.sections.terms,
    t.lgpd.terms.sections.license,
    t.lgpd.terms.sections.disclaimer,
    t.lgpd.terms.sections.limitations,
  ];

  return (
    <div className="min-h-screen bg-gradient-cosmic">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to={language === 'pt' ? '/pt' : '/en'}>
            <Button
              variant="ghost"
              className="mb-8 hover:bg-white/5 text-muted-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.nav.home}
            </Button>
          </Link>

          <Card className="max-w-4xl mx-auto bg-cosmic-base/80 backdrop-blur-lg border-white/10 shadow-glow">
            <CardHeader className="space-y-4 pb-8">
              <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {t.lgpd.terms.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <h2 className="text-2xl font-semibold text-primary">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-8 border-t border-white/10"
              >
                <p className="text-sm text-muted-foreground">
                  {t.lgpd.privacy.lastUpdated === 'Last updated'
                    ? 'For questions about these Terms of Use, please contact us at:'
                    : 'Para questões sobre estes Termos de Uso, entre em contato conosco em:'}
                </p>
                <a
                  href="mailto:nauitermaster@hotmail.com"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  nauitermaster@hotmail.com
                </a>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
