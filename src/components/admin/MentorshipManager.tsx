import { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Check, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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

interface MentorshipManagerProps {
  tiers: MentorshipTier[];
  onUpdate: (id: string, updates: Partial<MentorshipTier>) => Promise<boolean>;
}

export const MentorshipManager = ({ tiers, onUpdate }: MentorshipManagerProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<MentorshipTier>>({});

  const startEdit = (tier: MentorshipTier) => {
    setEditingId(tier.id);
    setEditData({
      name_pt: tier.name_pt,
      name_en: tier.name_en,
      description_pt: tier.description_pt || "",
      description_en: tier.description_en || "",
      price_pt: tier.price_pt || "",
      price_en: tier.price_en || "",
      is_available: tier.is_available,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const success = await onUpdate(editingId, editData);
    if (success) {
      setEditingId(null);
      setEditData({});
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Mentorship Tiers</h2>
          <p className="text-gray-400 text-sm">Manage your mentorship programs</p>
        </div>
      </div>

      <div className="space-y-4">
        {tiers.map((tier) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            {editingId === tier.id ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Name (PT)</Label>
                    <Input
                      value={editData.name_pt || ""}
                      onChange={(e) => setEditData({ ...editData, name_pt: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">Name (EN)</Label>
                    <Input
                      value={editData.name_en || ""}
                      onChange={(e) => setEditData({ ...editData, name_en: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Description (PT)</Label>
                    <Textarea
                      value={editData.description_pt || ""}
                      onChange={(e) => setEditData({ ...editData, description_pt: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">Description (EN)</Label>
                    <Textarea
                      value={editData.description_en || ""}
                      onChange={(e) => setEditData({ ...editData, description_en: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Price (PT - R$)</Label>
                    <Input
                      value={editData.price_pt || ""}
                      onChange={(e) => setEditData({ ...editData, price_pt: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="R$ 497"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">Price (EN - US$)</Label>
                    <Input
                      value={editData.price_en || ""}
                      onChange={(e) => setEditData({ ...editData, price_en: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="US$ 97"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Switch
                    checked={editData.is_available}
                    onCheckedChange={(checked) => setEditData({ ...editData, is_available: checked })}
                  />
                  <Label className="text-gray-300">Available</Label>
                </div>

                <div className="flex gap-2">
                  <Button onClick={saveEdit} className="bg-green-500 hover:bg-green-600 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={cancelEdit} variant="ghost" className="text-gray-400 hover:text-white">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{tier.name_pt}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      tier.is_available 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {tier.is_available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{tier.description_pt}</p>
                  <p className="text-[#7A5FFF] font-semibold">{tier.price_pt} / {tier.price_en}</p>
                </div>
                <Button onClick={() => startEdit(tier)} variant="ghost" className="text-gray-400 hover:text-white">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
