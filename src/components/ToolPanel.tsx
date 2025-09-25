import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Shovel, 
  Sprout, 
  Droplets, 
  Zap, 
  Bug, 
  Scissors,
  Sparkles 
} from 'lucide-react';

interface FieldState {
  soilPrepared: boolean;
  seedsPlanted: boolean;
  watered: boolean;
  fertilized: boolean;
  pestsControlled: boolean;
  cropGrown: boolean;
}

interface ToolPanelProps {
  currentTool: string;
  onToolUse: (tool: string) => void;
  fieldState: FieldState;
}

interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  active: boolean;
  completed: boolean;
}

export const ToolPanel: React.FC<ToolPanelProps> = ({ currentTool, onToolUse, fieldState }) => {
  const tools: Tool[] = [
    {
      id: 'plow',
      name: 'Plow',
      icon: <Shovel className="h-6 w-6" />,
      description: 'Prepare soil for planting',
      active: currentTool === 'plow',
      completed: fieldState.soilPrepared
    },
    {
      id: 'seeds',
      name: 'Seeds',
      icon: <Sprout className="h-6 w-6" />,
      description: 'Plant crop seeds',
      active: currentTool === 'seeds',
      completed: fieldState.seedsPlanted
    },
    {
      id: 'water',
      name: 'Irrigation',
      icon: <Droplets className="h-6 w-6" />,
      description: 'Water the crops',
      active: currentTool === 'water',
      completed: fieldState.watered
    },
    {
      id: 'fertilizer',
      name: 'Fertilizer',
      icon: <Zap className="h-6 w-6" />,
      description: 'Add nutrients to soil',
      active: currentTool === 'fertilizer',
      completed: fieldState.fertilized
    },
    {
      id: 'pesticide',
      name: 'Pest Control',
      icon: <Bug className="h-6 w-6" />,
      description: 'Protect from pests',
      active: currentTool === 'pesticide',
      completed: fieldState.pestsControlled
    },
    {
      id: 'harvest',
      name: 'Harvest',
      icon: <Scissors className="h-6 w-6" />,
      description: 'Collect mature crops',
      active: currentTool === 'harvest',
      completed: fieldState.cropGrown
    }
  ];

  const getToolVariant = (tool: Tool) => {
    if (tool.completed) return 'secondary';
    if (tool.active) return 'farm';
    return 'outline';
  };

  const getToolDescription = (toolId: string) => {
    switch (toolId) {
      case 'plow':
        return 'Break up the soil and create furrows for proper water drainage and root penetration.';
      case 'seeds':
        return 'Plant seeds at the correct depth and spacing for optimal growth.';
      case 'water':
        return 'Apply water efficiently using the recommended irrigation method.';
      case 'fertilizer':
        return 'Provide essential nutrients while maintaining soil health.';
      case 'pesticide':
        return 'Use integrated pest management to protect crops naturally.';
      case 'harvest':
        return 'Carefully collect mature crops to maximize yield and quality.';
      default:
        return '';
    }
  };

  return (
    <Card className="shadow-tool">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Farming Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool) => (
            <div key={tool.id} className="space-y-2">
              <Button
                variant={getToolVariant(tool)}
                size="lg"
                onClick={() => onToolUse(tool.id)}
                disabled={!tool.active && !tool.completed}
                className={cn(
                  "w-full h-auto flex-col gap-2 p-4 transition-all duration-300",
                  tool.active && "animate-tool-bounce ring-2 ring-primary/50",
                  tool.completed && "opacity-75"
                )}
              >
                <div className={cn(
                  "transition-transform duration-200",
                  tool.active && "scale-110"
                )}>
                  {tool.icon}
                </div>
                <div className="text-center">
                  <div className="font-medium">{tool.name}</div>
                  <div className="text-xs opacity-75">{tool.description}</div>
                </div>
                {tool.completed && (
                  <Badge variant="secondary" className="mt-1">
                    ✓ Done
                  </Badge>
                )}
              </Button>
              
              {tool.active && (
                <div className="text-xs text-muted-foreground p-2 bg-muted/50 rounded-md">
                  {getToolDescription(tool.id)}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-medium text-primary mb-2">🌟 Current Task</h4>
          <p className="text-sm text-muted-foreground">
            Click the highlighted tool to perform the current farming action!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};