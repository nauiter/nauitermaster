// Environment Navigation Component
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Globe, 
  TestTube, 
  Settings, 
  Eye,
  ArrowRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface EnvironmentSwitcherProps {
  currentEnvironment: 'production' | 'staging';
}

export const EnvironmentSwitcher = ({ currentEnvironment }: EnvironmentSwitcherProps) => {
  const location = useLocation();

  return (
    <Card className="fixed top-4 left-4 z-50 p-3 bg-card/95 backdrop-blur-sm border border-border/50">
      <div className="flex items-center gap-3">
        {/* Current Environment Badge */}
        <div className="flex items-center gap-2">
          {currentEnvironment === 'production' ? (
            <>
              <Globe className="w-4 h-4 text-green-600" />
              <Badge variant="default" className="bg-green-600">
                Production
              </Badge>
            </>
          ) : (
            <>
              <TestTube className="w-4 h-4 text-yellow-600" />
              <Badge variant="secondary" className="bg-yellow-600 text-white">
                Staging
              </Badge>
            </>
          )}
        </div>

        {/* Environment Switcher */}
        <div className="flex items-center gap-1">
          {currentEnvironment === 'staging' ? (
            <Link to="/">
              <Button variant="outline" size="sm" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                View Live
              </Button>
            </Link>
          ) : (
            <Link to="/staging">
              <Button variant="outline" size="sm" className="text-xs">
                <TestTube className="w-3 h-3 mr-1" />
                Staging
              </Button>
            </Link>
          )}
          
          <Link to="/deploy">
            <Button variant="outline" size="sm" className="text-xs">
              <Settings className="w-3 h-3 mr-1" />
              Deploy
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};