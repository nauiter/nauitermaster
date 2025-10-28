// Deployment Management Interface
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Rocket, 
  GitCompare, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  History,
  Eye,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

interface DeploymentLog {
  id: string;
  timestamp: Date;
  version: string;
  status: 'success' | 'failed' | 'rollback';
  changes: string[];
}

const Deploy = () => {
  const [deploymentHistory, setDeploymentHistory] = useState<DeploymentLog[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      version: 'v1.2.1',
      status: 'success',
      changes: ['Updated project descriptions', 'Added new skill badges', 'Fixed mobile layout']
    },
    {
      id: '2', 
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      version: 'v1.2.0',
      status: 'success',
      changes: ['Added onboarding tour', 'Updated color scheme', 'Improved accessibility']
    }
  ]);

  const [isDeploying, setIsDeploying] = useState(false);
  const [hasChanges, setHasChanges] = useState(true); // Simulate changes pending
  const { toast } = useToast();

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newDeployment: DeploymentLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      version: `v1.${deploymentHistory.length + 2}.0`,
      status: 'success',
      changes: ['Staging changes deployed to production']
    };
    
    setDeploymentHistory(prev => [newDeployment, ...prev]);
    setIsDeploying(false);
    setHasChanges(false);
    
    toast({
      title: "Deployment Successful! 🚀",
      description: "Your staging changes are now live on production.",
    });
  };

  const handleRollback = async (version: string) => {
    const rollbackDeployment: DeploymentLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      version: `${version}-rollback`,
      status: 'rollback',
      changes: [`Rolled back to ${version}`]
    };
    
    setDeploymentHistory(prev => [rollbackDeployment, ...prev]);
    
    toast({
      title: "Rollback Complete",
      description: `Successfully rolled back to ${version}`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Deployment Center</h1>
          <p className="text-muted-foreground">
            Manage deployments between staging and production environments
          </p>
        </div>

        {/* Environment Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Production Environment</CardTitle>
              <Badge variant="default" className="bg-green-500">Live</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">v1.2.1</p>
                  <p className="text-xs text-muted-foreground">
                    Last deployed 1 day ago
                  </p>
                </div>
                <Link to="/">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Live
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staging Environment</CardTitle>
              <Badge variant="secondary">Testing</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">v1.3.0-staging</p>
                  <p className="text-xs text-muted-foreground">
                    {hasChanges ? "Changes pending deployment" : "Up to date"}
                  </p>
                </div>
                <Link to="/staging">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Staging
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Deployment Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitCompare className="w-5 h-5" />
              Deployment Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasChanges ? (
              <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium">Changes Ready for Deployment</p>
                    <p className="text-sm text-muted-foreground">
                      Staging has updates that haven't been deployed to production
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleDeploy} 
                  disabled={isDeploying}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isDeploying ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 mr-2" />
                      Deploy to Production
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Environments Synchronized</p>
                    <p className="text-sm text-muted-foreground">
                      Production and staging are up to date
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  In Sync
                </Badge>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex gap-3 pt-4">
              <Link to="/staging" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Staging
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View Production
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Deployment History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Deployment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deploymentHistory.map((deployment, index) => (
                <div key={deployment.id}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        deployment.status === 'success' ? 'bg-green-500' : 
                        deployment.status === 'rollback' ? 'bg-blue-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{deployment.version}</span>
                          <Badge variant={
                            deployment.status === 'success' ? 'default' : 
                            deployment.status === 'rollback' ? 'secondary' : 'destructive'
                          }>
                            {deployment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {deployment.timestamp.toLocaleString()}
                        </p>
                        <ul className="text-sm space-y-1">
                          {deployment.changes.map((change, i) => (
                            <li key={i} className="text-muted-foreground">
                              • {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {deployment.status === 'success' && index > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRollback(deployment.version)}
                      >
                        Rollback
                      </Button>
                    )}
                  </div>
                  {index < deploymentHistory.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Deploy;