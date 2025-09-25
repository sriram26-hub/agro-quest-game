import React from 'react';
import { cn } from '@/lib/utils';
import { Sprout, Droplets } from 'lucide-react';

interface FarmData {
  soilType: string;
  weather: string;
  cropType: string;
  farmSize: string;
  location: string;
  experience: string;
  goals: string;
}

interface FieldState {
  soilPrepared: boolean;
  seedsPlanted: boolean;
  watered: boolean;
  fertilized: boolean;
  pestsControlled: boolean;
  cropGrown: boolean;
}

interface FarmFieldProps {
  farmData: FarmData;
  fieldState: FieldState;
  currentStep: number;
}

export const FarmField: React.FC<FarmFieldProps> = ({ farmData, fieldState, currentStep }) => {
  const getSoilColor = () => {
    switch (farmData.soilType) {
      case 'black': return 'bg-gradient-to-br from-gray-800 to-gray-900';
      case 'red': return 'bg-gradient-to-br from-red-800 to-red-900';
      case 'sandy': return 'bg-gradient-to-br from-yellow-700 to-yellow-800';
      case 'clay': return 'bg-gradient-to-br from-orange-800 to-orange-900';
      case 'alluvial': return 'bg-gradient-to-br from-amber-800 to-amber-900';
      case 'loamy': return 'bg-gradient-to-br from-stone-700 to-stone-800';
      default: return 'bg-gradient-soil';
    }
  };

  const getCropType = () => {
    const crops: Record<string, { emoji: string; height: string }> = {
      rice: { emoji: '🌾', height: 'h-8' },
      wheat: { emoji: '🌾', height: 'h-10' },
      corn: { emoji: '🌽', height: 'h-12' },
      tomato: { emoji: '🍅', height: 'h-8' },
      potato: { emoji: '🥔', height: 'h-6' },
      cotton: { emoji: '☁️', height: 'h-10' },
      sugarcane: { emoji: '🎋', height: 'h-16' },
      pulses: { emoji: '🫘', height: 'h-8' }
    };
    return crops[farmData.cropType] || { emoji: '🌱', height: 'h-8' };
  };

  const renderFieldGrid = () => {
    const gridSize = farmData.farmSize === 'large' ? 8 : farmData.farmSize === 'medium' ? 6 : 4;
    const crop = getCropType();
    
    return Array.from({ length: gridSize * gridSize }, (_, index) => {
      const planted = fieldState.seedsPlanted;
      const watered = fieldState.watered;
      const grown = fieldState.cropGrown;
      
      return (
        <div
          key={index}
          className={cn(
            "relative aspect-square border border-black/20 transition-all duration-500",
            getSoilColor(),
            fieldState.soilPrepared && "border-primary/40",
            watered && "shadow-inner shadow-water/30"
          )}
        >
          {/* Furrows (when soil is prepared) */}
          {fieldState.soilPrepared && (
            <div className="absolute inset-0 opacity-30">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
            </div>
          )}
          
          {/* Seeds/Crops */}
          {planted && (
            <div className="absolute inset-0 flex items-center justify-center">
              {grown ? (
                <div className={cn(
                  "flex items-end justify-center transition-all duration-1000 animate-grow-crop",
                  crop.height
                )}>
                  <span className="text-lg">{crop.emoji}</span>
                </div>
              ) : (
                <Sprout className="h-4 w-4 text-crop animate-pulse" />
              )}
            </div>
          )}
          
          {/* Water drops */}
          {watered && currentStep === 2 && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <Droplets className="h-3 w-3 text-water animate-water-drop" />
            </div>
          )}
          
          {/* Fertilizer effect */}
          {fieldState.fertilized && (
            <div className="absolute inset-0 bg-green-200/20 rounded-sm"></div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Your Virtual Farm</h3>
        <p className="text-sm text-muted-foreground">
          {farmData.soilType} soil • {farmData.weather} climate • {farmData.cropType} crop
        </p>
      </div>
      
      <div className="relative bg-gradient-sky p-6 rounded-lg border border-border/20 shadow-earth">
        {/* Weather indicator */}
        <div className="absolute top-2 right-2 text-2xl">
          {farmData.weather === 'tropical' && '☀️'}
          {farmData.weather === 'temperate' && '⛅'}
          {farmData.weather === 'arid' && '🌵'}
          {farmData.weather === 'monsoon' && '🌧️'}
          {farmData.weather === 'continental' && '❄️'}
        </div>
        
        {/* Farm field grid */}
        <div className={cn(
          "grid gap-1 mx-auto bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-lg shadow-inner",
          farmData.farmSize === 'large' ? 'grid-cols-8 max-w-md' :
          farmData.farmSize === 'medium' ? 'grid-cols-6 max-w-sm' :
          'grid-cols-4 max-w-xs'
        )}>
          {renderFieldGrid()}
        </div>
        
        {/* Field status */}
        <div className="mt-4 text-center space-y-2">
          {fieldState.cropGrown && (
            <div className="text-lg font-bold text-crop">
              🎉 Harvest Ready! 🎉
            </div>
          )}
          {fieldState.watered && !fieldState.cropGrown && (
            <div className="text-sm text-water">
              💧 Well watered - crops are growing!
            </div>
          )}
          {fieldState.soilPrepared && !fieldState.seedsPlanted && (
            <div className="text-sm text-muted-foreground">
              🚜 Soil prepared - ready for planting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};