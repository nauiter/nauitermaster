import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Building2, Calendar, MessageSquare, Search, Download, Copy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface MentorshipLead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  interest_tier: string | null;
  qualification_score: number;
  conversation: unknown[];
  status: string;
  qualified_at: string | null;
  created_at: string;
}

interface LeadsTableProps {
  leads: MentorshipLead[];
  onStatusUpdate: (id: string, status: string) => Promise<boolean>;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  qualified: "bg-green-500/20 text-green-400 border-green-500/30",
  contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  converted: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  archived: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const statusLabels: Record<string, string> = {
  new: "Novo",
  qualified: "Qualificado",
  contacted: "Contatado",
  converted: "Convertido",
  archived: "Arquivado",
};

export const LeadsTable = ({ leads, onStatusUpdate }: LeadsTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<MentorshipLead | null>(null);

  // Filter leads based on search and status
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast({ title: "Email copiado!", description: email });
  };

  const exportToCSV = () => {
    const headers = ["Nome", "Email", "Telefone", "Empresa", "Status", "Score", "Data"];
    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone || "",
      lead.company || "",
      lead.status,
      lead.qualification_score.toString(),
      formatDate(lead.created_at),
    ]);
    
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `leads_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    
    toast({ title: "Exportado!", description: `${filteredLeads.length} leads exportados` });
  };

  const isNewLead = (createdAt: string) => {
    const hourAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return new Date(createdAt) > hourAgo;
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Leads</h2>
          <p className="text-gray-400 text-sm">
            {filteredLeads.length} de {leads.length} leads
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>
          
          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Filtrar status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="new">Novos</SelectItem>
              <SelectItem value="qualified">Qualificados</SelectItem>
              <SelectItem value="contacted">Contatados</SelectItem>
              <SelectItem value="converted">Convertidos</SelectItem>
              <SelectItem value="archived">Arquivados</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={exportToCSV}
            className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
          <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">
            {leads.length === 0 
              ? "Nenhum lead ainda" 
              : "Nenhum lead encontrado com os filtros aplicados"
            }
          </p>
          <p className="text-gray-500 text-sm">
            {leads.length === 0 
              ? "Leads aparecerão aqui quando visitantes interagirem com Lucy"
              : "Tente ajustar sua busca ou filtros"
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLeads.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`bg-white/5 border rounded-xl p-4 ${
                isNewLead(lead.created_at) && lead.status === "new"
                  ? "border-[#7A5FFF]/50 bg-[#7A5FFF]/5"
                  : "border-white/10"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {isNewLead(lead.created_at) && lead.status === "new" && (
                      <Star className="w-4 h-4 text-[#7A5FFF] fill-[#7A5FFF]" />
                    )}
                    <h3 className="text-white font-medium">{lead.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs capitalize border ${statusColors[lead.status] || statusColors.new}`}>
                      {statusLabels[lead.status] || lead.status}
                    </span>
                    {lead.qualification_score > 0 && (
                      <span className="px-2 py-0.5 rounded text-xs bg-[#00C4FF]/20 text-[#00C4FF] border border-[#00C4FF]/30">
                        Score: {lead.qualification_score}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <button
                      onClick={() => copyEmail(lead.email)}
                      className="flex items-center gap-1 hover:text-[#7A5FFF] transition-colors group"
                    >
                      <Mail className="w-4 h-4" />
                      {lead.email}
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    {lead.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {lead.phone}
                      </span>
                    )}
                    {lead.company && (
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {lead.company}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(lead.created_at)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Select
                    value={lead.status}
                    onValueChange={(value) => onStatusUpdate(lead.id, value)}
                  >
                    <SelectTrigger className="w-36 bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Novo</SelectItem>
                      <SelectItem value="qualified">Qualificado</SelectItem>
                      <SelectItem value="contacted">Contatado</SelectItem>
                      <SelectItem value="converted">Convertido</SelectItem>
                      <SelectItem value="archived">Arquivado</SelectItem>
                    </SelectContent>
                  </Select>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-400 hover:text-white"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#0c1324] border-white/10 text-white max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Histórico de Conversa - {lead.name}</DialogTitle>
                      </DialogHeader>
                      <div className="max-h-96 overflow-y-auto space-y-3 mt-4">
                        {lead.conversation.length === 0 ? (
                          <p className="text-gray-400 text-center py-4">Nenhuma conversa registrada</p>
                        ) : (
                          (lead.conversation as Array<{ role: string; content: string }>).map((msg, i) => (
                            <div
                              key={i}
                              className={`p-3 rounded-lg ${
                                msg.role === "user" 
                                  ? "bg-[#7A5FFF]/20 ml-8" 
                                  : "bg-white/5 mr-8"
                              }`}
                            >
                              <p className="text-xs text-gray-500 mb-1 capitalize">
                                {msg.role === "user" ? "Visitante" : "Lucy"}
                              </p>
                              <p className="text-sm text-gray-200">{msg.content}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
