import { Section } from "@/components/ui/section";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import { Award, Calendar, CheckCircle2, ExternalLink, Cloud, Shield, Brain, Building2, GraduationCap } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  color: string;
}

export const CertificationsSection = () => {
  const { t } = useLanguage();

  const certifications: Certification[] = t.certifications.items;

  // Function to determine technology badges for each certification
  const getTechBadges = (cert: Certification) => {
    const badges = [];
    
    // Check issuer for specific badges
    if (cert.issuer.toLowerCase().includes('google')) {
      badges.push({ label: 'Google Cloud', icon: Cloud, color: 'from-blue-500 to-cyan-500' });
    }
    if (cert.issuer.toLowerCase().includes('cisco')) {
      badges.push({ label: 'Cisco', icon: Shield, color: 'from-indigo-500 to-blue-500' });
    }
    if (cert.issuer.toLowerCase().includes('enap')) {
      badges.push({ label: 'Enap', icon: GraduationCap, color: 'from-green-500 to-emerald-500' });
    }
    if (cert.issuer.toLowerCase().includes('coursera')) {
      badges.push({ label: 'Coursera', icon: GraduationCap, color: 'from-blue-400 to-blue-600' });
    }
    if (cert.issuer.toLowerCase().includes('militar') || cert.issuer.toLowerCase().includes('exército') || cert.issuer.toLowerCase().includes('esie') || cert.issuer.toLowerCase().includes('cep')) {
      badges.push({ label: 'Military', icon: Building2, color: 'from-slate-500 to-slate-700' });
    }
    
    // Check title and skills for AI-related content
    const aiKeywords = ['artificial intelligence', 'inteligência artificial', 'ai', 'ia'];
    const hasAI = aiKeywords.some(keyword => 
      cert.title.toLowerCase().includes(keyword) || 
      cert.skills.some(skill => skill.toLowerCase().includes(keyword))
    );
    
    if (hasAI && !badges.some(b => b.label === 'AI')) {
      badges.push({ label: 'AI', icon: Brain, color: 'from-purple-500 to-pink-500' });
    }
    
    // Check for cybersecurity
    const cyberKeywords = ['cybersecurity', 'cibersegurança', 'cyber'];
    const hasCyber = cyberKeywords.some(keyword => 
      cert.title.toLowerCase().includes(keyword) || 
      cert.skills.some(skill => skill.toLowerCase().includes(keyword))
    );
    
    if (hasCyber && !badges.some(b => b.label === 'Cybersecurity')) {
      badges.push({ label: 'Cybersecurity', icon: Shield, color: 'from-red-500 to-orange-500' });
    }
    
    return badges;
  };

  return (
    <Section
      id="certifications"
      title={{
        title: t.certifications.title,
        subtitle: t.certifications.subtitle,
        gradient: "accent",
        align: "center",
      }}
      background="dark"
      containerWidth="7xl"
      paddingY="lg"
      paddingX="md"
      dataTour="certifications-section"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
          >
            {/* Glow effect - matches certification color */}
            <div 
              className={`absolute -inset-0.5 bg-gradient-to-r ${cert.color} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
            />
            
            {/* Card content */}
            <div className="relative h-full bg-[#0c1324]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] flex flex-col">
              {/* Header with badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${cert.color} shadow-lg flex-shrink-0`}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-1">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/link flex-shrink-0 ml-2"
                    aria-label={t.certifications.viewCredential}
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover/link:text-primary transition-colors" />
                  </a>
                )}
              </div>

              {/* Date - Fixed height */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-400 h-5">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="line-clamp-1">{cert.date}</span>
              </div>

              {/* Technology badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {getTechBadges(cert).map((badge, badgeIndex) => {
                  const BadgeIcon = badge.icon;
                  return (
                    <motion.div
                      key={badge.label}
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1 + badgeIndex * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1 rounded-full bg-gradient-to-r ${badge.color} text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg`}
                    >
                      <BadgeIcon className="w-3 h-3" />
                      {badge.label}
                    </motion.div>
                  );
                })}
              </div>

              {/* Credential ID - Fixed height */}
              <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/5 min-h-[4.5rem]">
                <p className="text-xs text-gray-500 mb-1">{t.certifications.credentialId}</p>
                <p className="text-sm text-gray-300 font-mono break-all">{cert.credentialId}</p>
              </div>

              {/* Skills gained */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  {t.certifications.skillsGained}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-default flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          {t.certifications.footer}
        </p>
      </motion.div>
    </Section>
  );
};
