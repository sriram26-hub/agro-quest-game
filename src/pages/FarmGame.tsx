import React, { useState } from 'react';
import { FarmSetupForm } from '@/components/FarmSetupForm';
import { FarmGameplay } from '@/components/FarmGameplay';

interface FarmData {
  soilType: string;
  weather: string;
  cropType: string;
  farmSize: string;
  location: string;
  experience: string;
  goals: string;
}

const FarmGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [farmData, setFarmData] = useState<FarmData | null>(null);

  const handleFormSubmit = (data: FarmData) => {
    setFarmData(data);
    setGameStarted(true);
  };

  const handleBackToSetup = () => {
    setGameStarted(false);
    setFarmData(null);
  };

  if (gameStarted && farmData) {
    return <FarmGameplay farmData={farmData} onBack={handleBackToSetup} />;
  }

  return <FarmSetupForm onSubmit={handleFormSubmit} />;
};

export default FarmGame;