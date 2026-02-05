import { motion } from "framer-motion";
import { Settings, Wrench, Sparkles, Crown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SiteSettings {
  maintenance_mode: { enabled: boolean };
  mentorship_availability: Record<string, boolean>;
  lucy_enabled: { enabled: boolean };
}

interface SettingsPanelProps {
  settings: SiteSettings | null;
  onUpdate: (key: string, value: unknown) => Promise<boolean>;
}

export const SettingsPanel = ({ settings, onUpdate }: SettingsPanelProps) => {
  if (!settings) {
    return (
      <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
        <Settings className="w-12 h-12 text-gray-500 mx-auto mb-4 animate-spin" />
        <p className="text-gray-400">Loading settings...</p>
      </div>
    );
  }

  const toggleMaintenanceMode = async () => {
    await onUpdate("maintenance_mode", { enabled: !settings.maintenance_mode.enabled });
  };

  const toggleLucy = async () => {
    await onUpdate("lucy_enabled", { enabled: !settings.lucy_enabled.enabled });
  };

  const toggleTierAvailability = async (tierKey: string) => {
    const newAvailability = {
      ...settings.mentorship_availability,
      [tierKey]: !settings.mentorship_availability[tierKey],
    };
    await onUpdate("mentorship_availability", newAvailability);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Site Settings</h2>
          <p className="text-gray-400 text-sm">Configure global settings</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Maintenance Mode */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-orange-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Maintenance Mode</h3>
                  <p className="text-gray-400 text-sm">
                    When enabled, visitors will see a maintenance page
                  </p>
                </div>
                <Switch
                  checked={settings.maintenance_mode.enabled}
                  onCheckedChange={toggleMaintenanceMode}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lucy AI */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#7A5FFF]/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#7A5FFF]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Lucy AI Assistant</h3>
                  <p className="text-gray-400 text-sm">
                    Show the Lucy chat assistant to visitors
                  </p>
                </div>
                <Switch
                  checked={settings.lucy_enabled.enabled}
                  onCheckedChange={toggleLucy}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mentorship Availability */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Crown className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">Mentorship Availability</h3>
              <p className="text-gray-400 text-sm">
                Toggle availability for each mentorship tier
              </p>
            </div>
          </div>

          <div className="space-y-4 pl-16">
            {Object.entries(settings.mentorship_availability).map(([key, isAvailable]) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <Label className="text-gray-300 capitalize">
                  {key.replace(/_/g, " ")}
                </Label>
                <Switch
                  checked={isAvailable}
                  onCheckedChange={() => toggleTierAvailability(key)}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
