// Content Management System for Staging/Production Workflow
import { useState, useEffect } from 'react';

export interface ContentVersion {
  id: string;
  timestamp: Date;
  version: string;
  content: any;
  environment: 'staging' | 'production';
}

export const useContentManagement = () => {
  const [stagingContent, setStagingContent] = useState<any>(null);
  const [productionContent, setProductionContent] = useState<any>(null);
  const [versions, setVersions] = useState<ContentVersion[]>([]);

  // Initialize with current content
  useEffect(() => {
    const savedVersions = localStorage.getItem('content-versions');
    if (savedVersions) {
      setVersions(JSON.parse(savedVersions));
    }

    // Initialize production content if not exists
    const savedProduction = localStorage.getItem('production-content');
    if (!savedProduction) {
      const initialContent = {
        projects: [
          {
            id: '1',
            title: 'AI Content Automation System',
            description: 'Automated content generation pipeline using GPT-4 and custom prompts',
            impact: 'Reduced manual processing time by 80% and improved accuracy to 99.2%',
            tools: ['GPT-4', 'Python', 'Automation'],
            imageUrl: '/placeholder.svg'
          },
          {
            id: '2', 
            title: 'Creative Asset Generator',
            description: 'AI-powered design system for marketing materials',
            impact: 'Generated 500+ unique assets, saving $15K in design costs',
            tools: ['DALL-E', 'Creative'],
            imageUrl: '/placeholder.svg'
          },
          {
            id: '3',
            title: 'Document Analysis Pipeline', 
            description: 'Intelligent document processing and insight extraction',
            impact: 'Analyzed 10K+ documents in hours instead of weeks',
            tools: ['Claude', 'Analysis'],
            imageUrl: '/placeholder.svg'
          }
        ],
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('production-content', JSON.stringify(initialContent));
      setProductionContent(initialContent);
    } else {
      setProductionContent(JSON.parse(savedProduction));
    }

    // Initialize staging content (copy from production if not exists)
    const savedStaging = localStorage.getItem('staging-content');
    if (!savedStaging) {
      const productionData = JSON.parse(savedProduction || '{}');
      localStorage.setItem('staging-content', JSON.stringify(productionData));
      setStagingContent(productionData);
    } else {
      setStagingContent(JSON.parse(savedStaging));
    }
  }, []);

  const saveVersion = (content: any, environment: 'staging' | 'production') => {
    const version: ContentVersion = {
      id: Date.now().toString(),
      timestamp: new Date(),
      version: `v1.${versions.length + 1}.0`,
      content: { ...content },
      environment
    };

    const newVersions = [version, ...versions].slice(0, 10); // Keep last 10 versions
    setVersions(newVersions);
    localStorage.setItem('content-versions', JSON.stringify(newVersions));
  };

  const updateStagingContent = (content: any) => {
    const updatedContent = { ...content, lastUpdated: new Date().toISOString() };
    setStagingContent(updatedContent);
    localStorage.setItem('staging-content', JSON.stringify(updatedContent));
    saveVersion(updatedContent, 'staging');
  };

  const deployToProduction = () => {
    if (!stagingContent) return false;

    const deployedContent = { 
      ...stagingContent, 
      deployedAt: new Date().toISOString() 
    };
    
    setProductionContent(deployedContent);
    localStorage.setItem('production-content', JSON.stringify(deployedContent));
    saveVersion(deployedContent, 'production');
    
    return true;
  };

  const rollbackToVersion = (versionId: string) => {
    const version = versions.find(v => v.id === versionId);
    if (!version) return false;

    if (version.environment === 'production') {
      setProductionContent(version.content);
      localStorage.setItem('production-content', JSON.stringify(version.content));
    } else {
      setStagingContent(version.content);
      localStorage.setItem('staging-content', JSON.stringify(version.content));
    }

    return true;
  };

  const hasChanges = () => {
    if (!stagingContent || !productionContent) return false;
    return JSON.stringify(stagingContent) !== JSON.stringify(productionContent);
  };

  const getContentForEnvironment = (environment: 'staging' | 'production') => {
    return environment === 'staging' ? stagingContent : productionContent;
  };

  const syncFromProduction = () => {
    if (productionContent) {
      setStagingContent({ ...productionContent });
      localStorage.setItem('staging-content', JSON.stringify(productionContent));
    }
  };

  return {
    stagingContent,
    productionContent,
    versions,
    updateStagingContent,
    deployToProduction,
    rollbackToVersion,
    hasChanges: hasChanges(),
    getContentForEnvironment,
    syncFromProduction
  };
};