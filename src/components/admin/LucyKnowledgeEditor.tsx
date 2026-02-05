import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Save, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

interface LucyKnowledgeEditorProps {
  knowledge: LucyKnowledge[];
  onUpdate: (id: string, updates: Partial<LucyKnowledge>) => Promise<boolean>;
  onAdd: (item: Omit<LucyKnowledge, "id">) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

const emptyItem: Omit<LucyKnowledge, "id"> = {
  category: "",
  question_pt: "",
  question_en: "",
  answer_pt: "",
  answer_en: "",
  priority: 0,
  is_active: true,
};

export const LucyKnowledgeEditor = ({ knowledge, onUpdate, onAdd, onDelete }: LucyKnowledgeEditorProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState(emptyItem);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<LucyKnowledge>>({});

  const startEdit = (item: LucyKnowledge) => {
    setEditingId(item.id);
    setEditData(item);
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

  const handleAdd = async () => {
    const success = await onAdd(newItem);
    if (success) {
      setIsAdding(false);
      setNewItem(emptyItem);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Lucy Knowledge Base</h2>
          <p className="text-gray-400 text-sm">Manage Lucy's responses</p>
        </div>
        <Button 
          onClick={() => setIsAdding(true)}
          className="bg-[#7A5FFF] hover:bg-[#7A5FFF]/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Entry
        </Button>
      </div>

      {/* Add new item form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#7A5FFF]/10 border border-[#7A5FFF]/30 rounded-xl p-6 mb-6"
        >
          <h3 className="text-white font-medium mb-4">New Knowledge Entry</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Category</Label>
                <Input
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  placeholder="e.g., services, pricing"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Priority</Label>
                <Input
                  type="number"
                  value={newItem.priority}
                  onChange={(e) => setNewItem({ ...newItem, priority: parseInt(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Question (PT)</Label>
                <Textarea
                  value={newItem.question_pt}
                  onChange={(e) => setNewItem({ ...newItem, question_pt: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Question (EN)</Label>
                <Textarea
                  value={newItem.question_en}
                  onChange={(e) => setNewItem({ ...newItem, question_en: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Answer (PT)</Label>
                <Textarea
                  value={newItem.answer_pt}
                  onChange={(e) => setNewItem({ ...newItem, answer_pt: e.target.value })}
                  rows={4}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Answer (EN)</Label>
                <Textarea
                  value={newItem.answer_en}
                  onChange={(e) => setNewItem({ ...newItem, answer_en: e.target.value })}
                  rows={4}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={() => { setIsAdding(false); setNewItem(emptyItem); }} variant="ghost" className="text-gray-400 hover:text-white">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Knowledge list */}
      {knowledge.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
          <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No knowledge entries yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {knowledge.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              {editingId === item.id ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 mb-2 block">Category</Label>
                      <Input
                        value={editData.category || ""}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <Switch
                        checked={editData.is_active}
                        onCheckedChange={(checked) => setEditData({ ...editData, is_active: checked })}
                      />
                      <Label className="text-gray-300">Active</Label>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 mb-2 block">Question (PT)</Label>
                      <Textarea
                        value={editData.question_pt || ""}
                        onChange={(e) => setEditData({ ...editData, question_pt: e.target.value })}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 mb-2 block">Question (EN)</Label>
                      <Textarea
                        value={editData.question_en || ""}
                        onChange={(e) => setEditData({ ...editData, question_en: e.target.value })}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 mb-2 block">Answer (PT)</Label>
                      <Textarea
                        value={editData.answer_pt || ""}
                        onChange={(e) => setEditData({ ...editData, answer_pt: e.target.value })}
                        rows={4}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 mb-2 block">Answer (EN)</Label>
                      <Textarea
                        value={editData.answer_en || ""}
                        onChange={(e) => setEditData({ ...editData, answer_en: e.target.value })}
                        rows={4}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
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
                      <span className="px-2 py-1 rounded bg-[#7A5FFF]/20 text-[#7A5FFF] text-xs">
                        {item.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.is_active 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-gray-500/20 text-gray-400"
                      }`}>
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                      <span className="text-gray-500 text-xs">Priority: {item.priority}</span>
                    </div>
                    <p className="text-white font-medium mb-1">{item.question_pt}</p>
                    <p className="text-gray-400 text-sm line-clamp-2">{item.answer_pt}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => startEdit(item)} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-[#0c1324] border-white/10">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">Delete Entry</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            Are you sure you want to delete this knowledge entry? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => onDelete(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
