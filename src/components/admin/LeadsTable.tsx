import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Building2, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  new: "bg-blue-500/20 text-blue-400",
  qualified: "bg-green-500/20 text-green-400",
  contacted: "bg-yellow-500/20 text-yellow-400",
  converted: "bg-purple-500/20 text-purple-400",
  archived: "bg-gray-500/20 text-gray-400",
};

export const LeadsTable = ({ leads, onStatusUpdate }: LeadsTableProps) => {
  const [selectedLead, setSelectedLead] = useState<MentorshipLead | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Leads</h2>
          <p className="text-gray-400 text-sm">
            {leads.length} total leads
          </p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
          <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No leads yet</p>
          <p className="text-gray-500 text-sm">Leads will appear here when visitors interact with Lucy</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-medium">{lead.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs capitalize ${statusColors[lead.status] || statusColors.new}`}>
                      {lead.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {lead.email}
                    </span>
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
                    <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
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
                        <DialogTitle>Conversation History - {lead.name}</DialogTitle>
                      </DialogHeader>
                      <div className="max-h-96 overflow-y-auto space-y-3 mt-4">
                        {lead.conversation.length === 0 ? (
                          <p className="text-gray-400 text-center py-4">No conversation recorded</p>
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
                              <p className="text-xs text-gray-500 mb-1 capitalize">{msg.role}</p>
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
