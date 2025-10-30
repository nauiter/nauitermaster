import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, X, Globe, Upload, Edit2 } from "lucide-react";
import { z } from "zod";

const urlSchema = z.string().url().max(2048).refine(
  (url) => url.startsWith('http://') || url.startsWith('https://'),
  { message: 'Only HTTP/HTTPS URLs allowed' }
);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface Project {
  id: string;
  title: string;
  description: string;
  impact: string;
  tools: string[];
  imageUrl?: string;
  websiteUrl?: string;
  isCustomImage?: boolean;
}

interface ProjectEditorProps {
  projects: Project[];
  onProjectsChange: (projects: Project[]) => void;
}

export const ProjectEditor = ({ projects, onProjectsChange }: ProjectEditorProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    impact: '',
    tools: '',
    websiteUrl: '',
    imageUrl: ''
  });
  
  // Disable editing controls completely in production
  const isEditing = false; // Set to true only during development

  const handleUrlFetch = async () => {
    if (!formData.websiteUrl) return;
    
    // Validate URL format
    try {
      urlSchema.parse(formData.websiteUrl);
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid HTTP or HTTPS URL (max 2048 characters)",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
    
    setIsLoading(true);
    try {
      if (import.meta.env.DEV) {
        console.log('Fetching metadata for:', formData.websiteUrl);
      }
      
      // Get metadata and screenshot with better parameters for full page capture
      const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(formData.websiteUrl)}&screenshot=true&screenshot.fullPage=true&screenshot.waitFor=3000&viewport.width=1920&viewport.height=1080&viewport.deviceScaleFactor=2`);
      const data = await response.json();
      
      if (import.meta.env.DEV) {
        console.log('API Response:', data);
      }
      
      if (data.status === 'success' && data.data) {
        const { title, description, screenshot, image, logo } = data.data;
        
        if (import.meta.env.DEV) {
          console.log('Extracted data:', { title, description, screenshot: screenshot?.url, image: image?.url });
        }
        
        setFormData(prev => ({
          ...prev,
          title: prev.title || title || '',
          description: prev.description || description || '',
          imageUrl: screenshot?.url || image?.url || logo?.url || ''
        }));
        
        toast({
          title: "Success",
          description: `Fetched: ${title ? 'title' : ''}${description ? ', description' : ''}${screenshot?.url ? ', high-quality screenshot' : ''}`,
          duration: 3000,
        });
      } else {
        throw new Error(data.message || 'No data received from website');
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('URL fetch error:', error);
      }
      toast({
        title: "Error",
        description: "Failed to fetch website data. You can still add project details manually.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
          duration: 5000,
        });
        event.target.value = ''; // Reset input
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          imageUrl: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const toolsArray = formData.tools.split(',').map(tool => tool.trim()).filter(Boolean);
    
    const newProject: Project = {
      id: editingProject?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      impact: formData.impact,
      tools: toolsArray,
      imageUrl: formData.imageUrl,
      websiteUrl: formData.websiteUrl || undefined,
      isCustomImage: !formData.websiteUrl
    };

    if (editingProject) {
      onProjectsChange(projects.map(p => p.id === editingProject.id ? newProject : p));
    } else {
      onProjectsChange([...projects, newProject]);
    }

    resetForm();
    setIsOpen(false);
    
    toast({
      title: "Success",
      description: editingProject ? "Project updated!" : "Project added!",
      duration: 3000,
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      impact: '',
      tools: '',
      websiteUrl: '',
      imageUrl: ''
    });
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      impact: project.impact,
      tools: project.tools.join(', '),
      websiteUrl: project.websiteUrl || '',
      imageUrl: project.imageUrl || ''
    });
    setIsOpen(true);
  };

  const handleDelete = (projectId: string) => {
    onProjectsChange(projects.filter(p => p.id !== projectId));
    toast({
      title: "Success",
      description: "Project deleted!",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <div>
          <h2 className="text-3xl font-bold">Showcase Projects</h2>
          <p className="text-muted-foreground mt-1">
            Real-world applications demonstrating measurable impact and innovation
          </p>
        </div>
        {isEditing && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {editingProject ? 'Update your project details' : 'Create a new project by entering a URL or manually adding details'}
                </p>
              </DialogHeader>
              
              <div className="flex-1 overflow-y-auto px-1">
                <form onSubmit={handleSubmit} className="space-y-4 pb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website URL (Optional)</label>
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleUrlFetch}
                      disabled={!formData.websiteUrl || isLoading}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      {isLoading ? 'Fetching...' : 'Fetch'}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Auto-populate title, description, and screenshot from website
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Custom Image Upload</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-accent-foreground hover:file:bg-accent/90"
                    />
                    <Upload className="w-4 h-4 text-muted-foreground" />
                  </div>
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img 
                        src={formData.imageUrl} 
                        alt="Website preview" 
                        className="w-full h-auto max-h-80 object-contain rounded-lg border bg-muted"
                        style={{ aspectRatio: '1.91/1' }}
                      />
                      <p className="text-xs text-muted-foreground mt-1 text-center">
                        Preview as it appears in social media and search results
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Title *</label>
                  <Input
                    required
                    placeholder="Amazing AI Project"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description *</label>
                  <Textarea
                    required
                    placeholder="Brief description of what this project does..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    maxLength={500}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Impact Statement</label>
                  <Input
                    placeholder="e.g., Reduced processing time by 80% and improved accuracy to 99.2%"
                    value={formData.impact}
                    onChange={(e) => setFormData(prev => ({ ...prev, impact: e.target.value }))}
                    maxLength={200}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tools Used</label>
                  <Input
                    placeholder="GPT-4, Python, React (comma-separated)"
                    value={formData.tools}
                    onChange={(e) => setFormData(prev => ({ ...prev, tools: e.target.value }))}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto">
        {projects.map((project) => (
          <Card key={project.id} className="relative rounded-2xl overflow-hidden shadow-xl bg-white/40 backdrop-blur-lg border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group">
            <div className="relative">
              <div className="h-64 bg-muted flex items-center justify-center overflow-hidden relative group">
                {project.imageUrl ? (
                  <>
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </>
                ) : (
                  <div className="text-center">
                    <span className="text-placeholder-foreground text-sm">No Image</span>
                    <p className="text-xs text-placeholder-foreground/70 mt-1">Add URL or upload image</p>
                  </div>
                )}
              </div>
              {isEditing && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(project)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(project.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-[#0B1623] text-xl line-clamp-2">{project.title}</h3>
                {project.websiteUrl && (
                  <a 
                    href={project.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 ml-2 flex-shrink-0"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
              
              {project.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>
              )}
              
              {project.tools.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tools.map((tool, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              )}
              
              <p className="text-sm text-muted-foreground">
                {project.impact && (
                  <>
                    <span className="font-medium">Impact:</span> {project.impact}
                  </>
                )}
              </p>
            </div>
            </Card>
          ))}
        </div>
    </div>
  );
};