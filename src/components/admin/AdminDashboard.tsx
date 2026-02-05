import { motion } from "framer-motion";
import { Users, UserPlus, TrendingUp, Target, Clock, CheckCircle } from "lucide-react";

interface MentorshipLead {
  id: string;
  name: string;
  email: string;
  status: string;
  qualification_score: number;
  created_at: string;
}

interface AdminDashboardProps {
  leads: MentorshipLead[];
}

export const AdminDashboard = ({ leads }: AdminDashboardProps) => {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  // Calculate stats
  const totalLeads = leads.length;
  const newLeadsThisWeek = leads.filter(l => new Date(l.created_at) > weekAgo).length;
  const qualifiedLeads = leads.filter(l => l.status === "qualified").length;
  const convertedLeads = leads.filter(l => l.status === "converted").length;
  const contactedLeads = leads.filter(l => l.status === "contacted").length;
  const pendingLeads = leads.filter(l => l.status === "new").length;
  
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
  const qualificationRate = totalLeads > 0 ? Math.round((qualifiedLeads / totalLeads) * 100) : 0;

  // Status breakdown
  const statusCounts = {
    new: pendingLeads,
    qualified: qualifiedLeads,
    contacted: contactedLeads,
    converted: convertedLeads,
    archived: leads.filter(l => l.status === "archived").length,
  };

  const statCards = [
    {
      title: "Total Leads",
      value: totalLeads,
      icon: Users,
      color: "from-[#7A5FFF] to-[#00C4FF]",
      subtitle: `${newLeadsThisWeek} esta semana`,
    },
    {
      title: "Novos",
      value: pendingLeads,
      icon: UserPlus,
      color: "from-blue-500 to-blue-400",
      subtitle: "Aguardando contato",
    },
    {
      title: "Taxa de Qualificação",
      value: `${qualificationRate}%`,
      icon: Target,
      color: "from-green-500 to-emerald-400",
      subtitle: `${qualifiedLeads} qualificados`,
    },
    {
      title: "Taxa de Conversão",
      value: `${conversionRate}%`,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-400",
      subtitle: `${convertedLeads} convertidos`,
    },
  ];

  // Recent leads (last 5)
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) return "Agora mesmo";
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7) return `${diffDays} dias atrás`;
    return d.toLocaleDateString("pt-BR");
  };

  const statusColors: Record<string, string> = {
    new: "bg-blue-500",
    qualified: "bg-green-500",
    contacted: "bg-yellow-500",
    converted: "bg-purple-500",
    archived: "bg-gray-500",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-gray-400 text-sm">Visão geral dos leads e métricas</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-500 text-xs mt-1">{stat.subtitle}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-xl p-5"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#7A5FFF]" />
            Leads por Status
          </h3>
          <div className="space-y-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
                <span className="text-gray-300 capitalize flex-1">{status}</span>
                <span className="text-white font-medium">{count}</span>
                <div className="w-24 bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${statusColors[status]}`}
                    style={{ width: `${totalLeads > 0 ? (count / totalLeads) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Leads */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-xl p-5"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#00C4FF]" />
            Leads Recentes
          </h3>
          {recentLeads.length === 0 ? (
            <p className="text-gray-400 text-center py-4">Nenhum lead ainda</p>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${statusColors[lead.status] || "bg-gray-500"}`} />
                    <div>
                      <p className="text-white text-sm font-medium">{lead.name}</p>
                      <p className="text-gray-500 text-xs">{lead.email}</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">{formatDate(lead.created_at)}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bg-gradient-to-r from-[#7A5FFF]/10 to-[#00C4FF]/10 border border-[#7A5FFF]/20 rounded-xl p-5"
      >
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#7A5FFF]" />
          Próximos Passos
        </h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A5FFF]" />
            {pendingLeads > 0 
              ? `Você tem ${pendingLeads} lead(s) novo(s) aguardando contato`
              : "Todos os leads foram contatados!"
            }
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C4FF]" />
            {contactedLeads > 0 
              ? `${contactedLeads} lead(s) em processo de qualificação`
              : "Nenhum lead em processo no momento"
            }
          </li>
        </ul>
      </motion.div>
    </div>
  );
};
