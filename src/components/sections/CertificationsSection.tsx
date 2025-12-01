import { Section } from "@/components/ui/section";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import { Award, Calendar, CheckCircle2, ExternalLink } from "lucide-react";

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
            {/* Glow effect */}
            <div 
              className={`absolute -inset-0.5 bg-gradient-to-r ${cert.color} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
            />
            
            {/* Card content */}
            <div className="relative h-full bg-[#0c1324]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]">
              {/* Header with badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${cert.color} shadow-lg`}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/link"
                    aria-label={t.certifications.viewCredential}
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover/link:text-primary transition-colors" />
                  </a>
                )}
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{cert.date}</span>
              </div>

              {/* Credential ID */}
              {cert.credentialId && (
                <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">{t.certifications.credentialId}</p>
                  <p className="text-sm text-gray-300 font-mono">{cert.credentialId}</p>
                </div>
              )}

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
