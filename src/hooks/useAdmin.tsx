import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface MentorshipTier {
  id: string;
  tier_key: string;
  name_pt: string;
  name_en: string;
  description_pt: string | null;
  description_en: string | null;
  price_pt: string | null;
  price_en: string | null;
  features_pt: unknown[];
  features_en: unknown[];
  is_available: boolean;
  display_order: number;
}

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

interface LucyKnowledge {
  id: string;
  category: string;
  question_pt: string;
  question_en: string;
  answer_pt: string;
  answer_en: string;
  priority: number;
  is_active: boolean;
}

interface SiteSettings {
  maintenance_mode: { enabled: boolean };
  mentorship_availability: Record<string, boolean>;
  lucy_enabled: { enabled: boolean };
}

export const useAdmin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Data states
  const [tiers, setTiers] = useState<MentorshipTier[]>([]);
  const [leads, setLeads] = useState<MentorshipLead[]>([]);
  const [knowledge, setKnowledge] = useState<LucyKnowledge[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // Check admin status
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        setUserId(session.user.id);

        const { data: hasRole, error } = await supabase
          .rpc("has_role", { _user_id: session.user.id, _role: "admin" });

        if (error) {
          console.error("Error checking admin role:", error);
          setIsAdmin(false);
        } else {
          setIsAdmin(hasRole === true);
        }
      } catch (error) {
        console.error("Admin check error:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch tiers
  const fetchTiers = useCallback(async () => {
    const { data, error } = await supabase
      .from("mentorship_tiers")
      .select("*")
      .order("display_order");
    
    if (error) {
      console.error("Error fetching tiers:", error);
      return;
    }
    
    setTiers(data?.map(t => ({
      ...t,
      features_pt: Array.isArray(t.features_pt) ? t.features_pt : [],
      features_en: Array.isArray(t.features_en) ? t.features_en : [],
    })) || []);
  }, []);

  // Fetch leads
  const fetchLeads = useCallback(async () => {
    const { data, error } = await supabase
      .from("mentorship_leads")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching leads:", error);
      return;
    }
    
    setLeads(data?.map(l => ({
      ...l,
      conversation: Array.isArray(l.conversation) ? l.conversation : [],
    })) || []);
  }, []);

  // Fetch knowledge
  const fetchKnowledge = useCallback(async () => {
    const { data, error } = await supabase
      .from("lucy_knowledge")
      .select("*")
      .order("priority", { ascending: false });
    
    if (error) {
      console.error("Error fetching knowledge:", error);
      return;
    }
    
    setKnowledge(data || []);
  }, []);

  // Fetch settings
  const fetchSettings = useCallback(async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*");
    
    if (error) {
      console.error("Error fetching settings:", error);
      return;
    }
    
    const settingsObj: SiteSettings = {
      maintenance_mode: { enabled: false },
      mentorship_availability: {},
      lucy_enabled: { enabled: true },
    };
    
    data?.forEach(s => {
      if (s.key === "maintenance_mode") settingsObj.maintenance_mode = s.value as { enabled: boolean };
      if (s.key === "mentorship_availability") settingsObj.mentorship_availability = s.value as Record<string, boolean>;
      if (s.key === "lucy_enabled") settingsObj.lucy_enabled = s.value as { enabled: boolean };
    });
    
    setSettings(settingsObj);
  }, []);

  // Update tier
  const updateTier = useCallback(async (id: string, updates: Record<string, unknown>) => {
    const { error } = await supabase
      .from("mentorship_tiers")
      .update(updates as never)
      .eq("id", id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return false;
    }
    
    await fetchTiers();
    toast({ title: "Success", description: "Tier updated successfully" });
    return true;
  }, [fetchTiers]);

  // Update lead status
  const updateLeadStatus = useCallback(async (id: string, status: string) => {
    const updates: Record<string, unknown> = { status };
    if (status === "qualified") {
      updates.qualified_at = new Date().toISOString();
    }
    
    const { error } = await supabase
      .from("mentorship_leads")
      .update(updates as never)
      .eq("id", id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return false;
    }
    
    await fetchLeads();
    toast({ title: "Success", description: "Lead status updated" });
    return true;
  }, [fetchLeads]);

  // Update knowledge
  const updateKnowledge = useCallback(async (id: string, updates: Partial<LucyKnowledge>) => {
    const { error } = await supabase
      .from("lucy_knowledge")
      .update(updates)
      .eq("id", id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return false;
    }
    
    await fetchKnowledge();
    toast({ title: "Success", description: "Knowledge updated" });
    return true;
  }, [fetchKnowledge]);

  // Add knowledge
  const addKnowledge = useCallback(async (item: Omit<LucyKnowledge, "id">) => {
    const { error } = await supabase
      .from("lucy_knowledge")
      .insert(item);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return false;
    }
    
    await fetchKnowledge();
    toast({ title: "Success", description: "Knowledge added" });
    return true;
  }, [fetchKnowledge]);

  // Delete knowledge
  const deleteKnowledge = useCallback(async (id: string) => {
    const { error } = await supabase
      .from("lucy_knowledge")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return false;
    }
    
    await fetchKnowledge();
    toast({ title: "Success", description: "Knowledge deleted" });
    return true;
  }, [fetchKnowledge]);

  // Update settings
  const updateSettings = useCallback(async (key: string, value: { [key: string]: boolean }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jsonValue = value as any;
    const { error } = await supabase
      .from("site_settings")
      .update({ value: jsonValue, updated_by: userId })
      .eq("key", key);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return false;
    }
    
    await fetchSettings();
    toast({ title: "Success", description: "Settings updated" });
    return true;
  }, [userId, fetchSettings]);

  // Logout
  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    navigate("/login");
  }, [navigate]);

  return {
    isAdmin,
    isLoading,
    userId,
    tiers,
    leads,
    knowledge,
    settings,
    fetchTiers,
    fetchLeads,
    fetchKnowledge,
    fetchSettings,
    updateTier,
    updateLeadStatus,
    updateKnowledge,
    addKnowledge,
    deleteKnowledge,
    updateSettings,
    logout,
  };
};
