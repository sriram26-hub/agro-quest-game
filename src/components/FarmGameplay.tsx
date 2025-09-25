import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Droplets, 
  Sprout, 
  Shovel, 
  Sun, 
  Bug, 
  Award,
  ArrowRight,
  Zap
} from 'lucide-react';
import { FarmField } from './FarmField';
import { ToolPanel } from './ToolPanel';
import { Farm3D } from './Farm3D';
import { Tools3D } from './Tools3D';

interface FarmData {
  soilType: string;
  weather: string;
  cropType: string;
  farmSize: string;
  location: string;
  experience: string;
  goals: string;
}

interface GameStep {
  id: string;
  title: string;
  description: string;
  tool: string;
  completed: boolean;
  instruction: string;
}

interface FarmGameplayProps {
  farmData: FarmData;
  onBack: () => void;
}

export const FarmGameplay: React.FC<FarmGameplayProps> = ({ farmData, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [gameProgress, setGameProgress] = useState(0);
  const [fieldState, setFieldState] = useState({
    soilPrepared: false,
    seedsPlanted: false,
    watered: false,
    fertilized: false,
    pestsControlled: false,
    cropGrown: false
  });
  const [rewards, setRewards] = useState(0);

  const gameSteps: GameStep[] = [
    {
      id: 'prepare',
      title: 'Prepare the Soil',
      description: 'Use the plow to prepare your soil for planting',
      tool: 'plow',
      completed: fieldState.soilPrepared,
      instruction: `For ${farmData.soilType} soil: Break up the soil and create furrows for proper drainage and aeration.`
    },
    {
      id: 'plant',
      title: 'Plant Seeds',
      description: 'Sow your crop seeds in prepared soil',
      tool: 'seeds',
      completed: fieldState.seedsPlanted,
      instruction: `Plant ${farmData.cropType} seeds with proper spacing. In ${farmData.weather} climate, ensure adequate depth.`
    },
    {
      id: 'irrigate',
      title: 'Smart Irrigation',
      description: 'Apply water using the recommended irrigation method',
      tool: 'water',
      completed: fieldState.watered,
      instruction: 'Use drip irrigation for water conservation and targeted watering. Monitor soil moisture levels.'
    },
    {
      id: 'fertilize',
      title: 'Apply Fertilizer',
      description: 'Provide nutrients for healthy crop growth',
      tool: 'fertilizer',
      completed: fieldState.fertilized,
      instruction: 'Apply organic fertilizer suitable for your soil type. Avoid over-fertilization to protect soil health.'
    },
    {
      id: 'protect',
      title: 'Pest Control',
      description: 'Protect your crops from pests and diseases',
      tool: 'pesticide',
      completed: fieldState.pestsControlled,
      instruction: 'Use integrated pest management. Apply natural deterrents and monitor crop health regularly.'
    },
    {
      id: 'harvest',
      title: 'Harvest Crops',
      description: 'Collect your mature crops',
      tool: 'harvest',
      completed: fieldState.cropGrown,
      instruction: 'Harvest at optimal maturity for best quality and yield. Handle crops carefully to minimize losses.'
    }
  ];

  const handleToolUse = (tool: string) => {
    const step = gameSteps[currentStep];
    if (step.tool === tool) {
      const newFieldState = { ...fieldState };
      
      switch (tool) {
        case 'plow':
          newFieldState.soilPrepared = true;
          break;
        case 'seeds':
          newFieldState.seedsPlanted = true;
          break;
        case 'water':
          newFieldState.watered = true;
          break;
        case 'fertilizer':
          newFieldState.fertilized = true;
          break;
        case 'pesticide':
          newFieldState.pestsControlled = true;
          break;
        case 'harvest':
          newFieldState.cropGrown = true;
          break;
      }
      
      setFieldState(newFieldState);
      setRewards(prev => prev + 10);
      
      if (currentStep < gameSteps.length - 1) {
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setGameProgress(((currentStep + 1) / gameSteps.length) * 100);
        }, 1000);
      }
    }
  };

  const getIrrigationRecommendation = () => {
    const { soilType, weather, cropType } = farmData;
    
    if (soilType === 'sandy' || weather === 'arid') {
      return 'Drip Irrigation - Conserves water and provides targeted watering for sandy soils and dry climates';
    } else if (cropType === 'rice' || soilType === 'clay') {
      return 'Flood Irrigation - Suitable for rice cultivation and clay soils that retain water well';
    } else {
      return 'Sprinkler Irrigation - Balanced approach for moderate water needs and mixed soil conditions';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <div className="bg-background/95 border-b border-border/20 p-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              ← Back to Setup
            </Button>
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-crop" />
              <h1 className="text-2xl font-bold">Virtual Farm Simulator</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              {rewards} Points
            </Badge>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Progress:</span>
              <Progress value={gameProgress} className="w-32" />
              <span className="text-sm text-muted-foreground">{Math.round(gameProgress)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        {/* Irrigation Recommendation */}
        <Card className="mb-6 border-water/20 bg-water/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-water">
              <Droplets className="h-5 w-5" />
              Recommended Irrigation Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium text-water">
              {getIrrigationRecommendation()}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              This recommendation is based on your soil type ({farmData.soilType}), 
              climate ({farmData.weather}), and crop choice ({farmData.cropType}).
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Instructions Panel */}
          <div className="space-y-6">
            <Card className="shadow-earth">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-primary" />
                  Step {currentStep + 1}: {gameSteps[currentStep]?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-lg">{gameSteps[currentStep]?.description}</p>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium text-primary mb-2">💡 Pro Tip:</p>
                    <p className="text-sm">{gameSteps[currentStep]?.instruction}</p>
                  </div>
                  
                  {currentStep === gameSteps.length - 1 && fieldState.cropGrown && (
                    <div className="p-4 bg-gradient-harvest rounded-lg text-center">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-warning-foreground" />
                      <h3 className="text-xl font-bold text-warning-foreground">Congratulations!</h3>
                      <p className="text-warning-foreground">You've successfully completed your farming cycle!</p>
                      <p className="text-sm text-warning-foreground/80 mt-2">
                        Total Rewards: {rewards} points
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Progress Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Farm Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {gameSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                        ${step.completed ? 'bg-crop text-crop-foreground' : 
                          index === currentStep ? 'bg-primary text-primary-foreground' : 
                          'bg-muted text-muted-foreground'}
                      `}>
                        {step.completed ? '✓' : index + 1}
                      </div>
                      <span className={`
                        ${step.completed ? 'text-crop font-medium' : 
                          index === currentStep ? 'text-primary font-medium' : 
                          'text-muted-foreground'}
                      `}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Field */}
          <div className="space-y-6">
            {/* 3D Farm View */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-center">3D Farm Simulator</h3>
              <Farm3D 
                farmData={farmData}
                fieldState={fieldState}
                currentStep={currentStep}
              />
            </div>
            
            {/* 3D Tools Panel */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Farming Tools</h4>
              <div className="grid grid-cols-3 gap-4 justify-items-center">
                {gameSteps.map((step, index) => (
                  <Tools3D
                    key={step.tool}
                    toolType={step.tool}
                    isActive={step.tool === gameSteps[currentStep]?.tool}
                    onUse={() => handleToolUse(step.tool)}
                  />
                ))}
              </div>
            </div>
            
            {/* Original 2D fallback (hidden by default, can be toggled) */}
            <details className="mt-6">
              <summary className="cursor-pointer text-sm text-muted-foreground">
                View 2D Version
              </summary>
              <div className="mt-4 space-y-4">
                <FarmField 
                  farmData={farmData}
                  fieldState={fieldState}
                  currentStep={currentStep}
                />
                
                <ToolPanel 
                  currentTool={gameSteps[currentStep]?.tool}
                  onToolUse={handleToolUse}
                  fieldState={fieldState}
                />
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};