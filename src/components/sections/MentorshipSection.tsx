import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Crown, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";

interface MentorshipTier {
  id: string;
  tier_key: string;
  name_pt: string;
  name_en: string;
  description_pt: string | null;
  description_en: string | null;
  price: string | null;
  features_pt: unknown[];
  features_en: unknown[];
  is_available: boolean;
  display_order: number;
}

const tierIcons: Record<string, React.ElementType> = {
  strategic_insight: Sparkles,
  ecosystem_builder: Zap,
  private_partnership: Crown,
};

const tierColors: Record<string, string> = {
  strategic_insight: "from-[#00C4FF] to-[#7A5FFF]",
  ecosystem_builder: "from-[#7A5FFF] to-pink-500",
  private_partnership: "from-amber-400 to-orange-500",
};

export const MentorshipSection = () => {
  const { language, t } = useLanguage();
  const [tiers, setTiers] = useState<MentorshipTier[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTiers = async () => {
      const { data, error } = await supabase
        .from("mentorship_tiers")
        .select("*")
        .eq("is_available", true)
        .order("display_order");

      if (!error && data) {
        setTiers(data.map(t => ({
          ...t,
          features_pt: Array.isArray(t.features_pt) ? t.features_pt : [],
          features_en: Array.isArray(t.features_en) ? t.features_en : [],
        })));
      }
      setIsLoading(false);
    };

    fetchTiers();
  }, []);

  const openLucyChat = () => {
    // Find and click the Lucy button
    const lucyButton = document.querySelector('[aria-label*="Lucy"]') as HTMLButtonElement;
    if (lucyButton) {
      lucyButton.click();
    }
  };

  if (isLoading) {
    return (
      <section className="relative py-20 md:py-32 bg-[#0c1324]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="mentorship" className="relative py-20 md:py-32 bg-[#0c1324] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#7A5FFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#00C4FF]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7A5FFF]/20 border border-[#7A5FFF]/30 text-[#7A5FFF] text-sm font-medium mb-6">
            <Crown className="w-4 h-4" />
            {language === "pt" ? "Mentorias" : "Mentorship"}
          </span>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {language === "pt" 
              ? "Acelere Seu Crescimento" 
              : "Accelerate Your Growth"}
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {language === "pt"
              ? "Programas exclusivos de mentoria para transformar sua visão em realidade."
              : "Exclusive mentorship programs to transform your vision into reality."}
          </p>
        </motion.div>

        {/* Tiers Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, index) => {
            const Icon = tierIcons[tier.tier_key] || Sparkles;
            const gradient = tierColors[tier.tier_key] || "from-[#7A5FFF] to-[#00C4FF]";
            const name = language === "pt" ? tier.name_pt : tier.name_en;
            const description = language === "pt" ? tier.description_pt : tier.description_en;
            const features = language === "pt" ? tier.features_pt : tier.features_en;
            const isPopular = tier.tier_key === "ecosystem_builder";

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative group ${isPopular ? "md:-mt-4 md:mb-4" : ""}`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className={`px-4 py-1 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-semibold shadow-lg`}>
                      {language === "pt" ? "Mais Popular" : "Most Popular"}
                    </span>
                  </div>
                )}

                <div className={`h-full rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isPopular 
                    ? "border-[#7A5FFF]/50 bg-gradient-to-b from-[#7A5FFF]/10 to-transparent" 
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}>
                  <div className="p-6 lg:p-8">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-6`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
                    <p className="text-gray-400 text-sm mb-6">{description}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <span className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                        {tier.price}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {(features as string[]).map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            isPopular ? "text-[#7A5FFF]" : "text-[#00C4FF]"
                          }`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      onClick={openLucyChat}
                      className={`w-full group/btn ${
                        isPopular 
                          ? `bg-gradient-to-r ${gradient} hover:opacity-90 text-white` 
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    >
                      {language === "pt" ? "Aplicar Agora" : "Apply Now"}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-sm">
            {language === "pt" 
              ? "Não sabe qual programa escolher? Converse com a Lucy, nossa assistente." 
              : "Not sure which program to choose? Chat with Lucy, our assistant."}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
