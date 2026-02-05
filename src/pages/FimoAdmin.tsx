import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  LogOut,
  Menu,
  X,
  Crown,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/useAdmin";
import { MentorshipManager } from "@/components/admin/MentorshipManager";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { LucyKnowledgeEditor } from "@/components/admin/LucyKnowledgeEditor";
import { SettingsPanel } from "@/components/admin/SettingsPanel";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

type TabId = "overview" | "mentorship" | "leads" | "knowledge" | "settings";

const tabs = [
  { id: "overview" as TabId, label: "Dashboard", icon: BarChart3 },
  { id: "mentorship" as TabId, label: "Mentorship", icon: Crown },
  { id: "leads" as TabId, label: "Leads", icon: Users },
  { id: "knowledge" as TabId, label: "Knowledge Base", icon: BookOpen },
  { id: "settings" as TabId, label: "Settings", icon: Settings },
];

const FimoAdmin = () => {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { 
    logout, 
    fetchTiers, 
    fetchLeads, 
    fetchKnowledge, 
    fetchSettings,
    tiers,
    leads,
    knowledge,
    settings,
    updateTier,
    updateLeadStatus,
    updateKnowledge,
    addKnowledge,
    deleteKnowledge,
    updateSettings,
  } = useAdmin();

  useEffect(() => {
    fetchTiers();
    fetchLeads();
    fetchKnowledge();
    fetchSettings();
  }, [fetchTiers, fetchLeads, fetchKnowledge, fetchSettings]);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminDashboard leads={leads} />;
      case "mentorship":
        return <MentorshipManager tiers={tiers} onUpdate={updateTier} />;
      case "leads":
        return <LeadsTable leads={leads} onStatusUpdate={updateLeadStatus} />;
      case "knowledge":
        return (
          <LucyKnowledgeEditor 
            knowledge={knowledge} 
            onUpdate={updateKnowledge}
            onAdd={addKnowledge}
            onDelete={deleteKnowledge}
          />
        );
      case "settings":
        return <SettingsPanel settings={settings} onUpdate={updateSettings} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1324] flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-white/10 text-white"
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0a0f1a] border-r border-white/10 flex flex-col transition-transform lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#7A5FFF] to-[#00C4FF] flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold">FIMO Admin</h1>
              <p className="text-gray-500 text-xs">Control Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeTab === tab.id
                  ? "bg-[#7A5FFF]/20 text-[#7A5FFF] border border-[#7A5FFF]/30"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-8 lg:ml-0 mt-16 lg:mt-0">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default FimoAdmin;
