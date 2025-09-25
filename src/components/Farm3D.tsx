import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

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

interface Farm3DProps {
  farmData: FarmData;
  fieldState: FieldState;
  currentStep: number;
}

// Individual plot component
const FarmPlot: React.FC<{ 
  position: [number, number, number];
  fieldState: FieldState;
  soilColor: string;
  cropType: string;
}> = ({ position, fieldState, soilColor, cropType }) => {
  const plotRef = useRef<THREE.Mesh>(null);
  const cropRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cropRef.current && fieldState.cropGrown) {
      cropRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const getSoilColorHex = (soilType: string) => {
    switch (soilType) {
      case 'black': return '#2d2d2d';
      case 'red': return '#8b4513';
      case 'sandy': return '#c2b280';
      case 'clay': return '#cd853f';
      case 'alluvial': return '#daa520';
      case 'loamy': return '#8b4513';
      default: return '#8b4513';
    }
  };

  const getCropColor = (crop: string) => {
    switch (crop) {
      case 'rice': return '#90EE90';
      case 'wheat': return '#F4A460';
      case 'corn': return '#FFD700';
      case 'tomato': return '#FF6347';
      case 'potato': return '#32CD32';
      case 'cotton': return '#F5F5DC';
      case 'sugarcane': return '#98FB98';
      case 'pulses': return '#228B22';
      default: return '#90EE90';
    }
  };

  return (
    <group position={position}>
      {/* Soil base */}
      <Box
        ref={plotRef}
        args={[0.8, 0.1, 0.8]}
        position={[0, -0.05, 0]}
      >
        <meshStandardMaterial 
          color={getSoilColorHex(soilColor)}
          roughness={fieldState.soilPrepared ? 0.8 : 0.6}
        />
      </Box>

      {/* Furrows when soil is prepared */}
      {fieldState.soilPrepared && (
        <>
          <Box args={[0.8, 0.02, 0.1]} position={[0, 0.01, -0.2]}>
            <meshStandardMaterial color="#654321" />
          </Box>
          <Box args={[0.8, 0.02, 0.1]} position={[0, 0.01, 0]}>
            <meshStandardMaterial color="#654321" />
          </Box>
          <Box args={[0.8, 0.02, 0.1]} position={[0, 0.01, 0.2]}>
            <meshStandardMaterial color="#654321" />
          </Box>
        </>
      )}

      {/* Seeds/Crops */}
      {fieldState.seedsPlanted && (
        <group ref={cropRef} position={[0, 0.1, 0]}>
          {fieldState.cropGrown ? (
            // Mature crop
            <>
              <Box args={[0.02, 0.3, 0.02]} position={[0, 0.15, 0]}>
                <meshStandardMaterial color="#8B4513" />
              </Box>
              <Sphere args={[0.1]} position={[0, 0.35, 0]}>
                <meshStandardMaterial color={getCropColor(cropType)} />
              </Sphere>
              {cropType === 'corn' && (
                <Box args={[0.05, 0.15, 0.05]} position={[0, 0.4, 0]}>
                  <meshStandardMaterial color="#FFD700" />
                </Box>
              )}
            </>
          ) : (
            // Small sprouts
            <>
              <Box args={[0.01, 0.1, 0.01]} position={[-0.1, 0.05, -0.1]}>
                <meshStandardMaterial color="#90EE90" />
              </Box>
              <Box args={[0.01, 0.08, 0.01]} position={[0.1, 0.04, 0.1]}>
                <meshStandardMaterial color="#90EE90" />
              </Box>
              <Box args={[0.01, 0.12, 0.01]} position={[0, 0.06, 0]}>
                <meshStandardMaterial color="#90EE90" />
              </Box>
            </>
          )}
        </group>
      )}

      {/* Water droplets when watered */}
      {fieldState.watered && (
        <Sphere args={[0.02]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
        </Sphere>
      )}

      {/* Fertilizer glow when fertilized */}
      {fieldState.fertilized && (
        <Sphere args={[0.4]} position={[0, 0.2, 0]}>
          <meshStandardMaterial 
            color="#90EE90" 
            transparent 
            opacity={0.2} 
            emissive="#90EE90" 
            emissiveIntensity={0.1}
          />
        </Sphere>
      )}
    </group>
  );
};

// Weather effects component
const WeatherEffects: React.FC<{ weather: string }> = ({ weather }) => {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const particleCount = weather === 'monsoon' ? 1000 : 200;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, [weather]);

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= weather === 'monsoon' ? 0.1 : 0.02;
        
        if (positions[i + 1] < -2) {
          positions[i + 1] = 8;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (weather !== 'monsoon' && weather !== 'continental') return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={weather === 'monsoon' ? '#87CEEB' : '#FFFFFF'}
        size={weather === 'monsoon' ? 0.02 : 0.05}
        transparent
        opacity={0.6}
      />
    </points>
  );
};

export const Farm3D: React.FC<Farm3DProps> = ({ farmData, fieldState, currentStep }) => {
  const gridSize = farmData.farmSize === 'large' ? 6 : farmData.farmSize === 'medium' ? 4 : 3;

  const plots = useMemo(() => {
    const plotArray = [];
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        plotArray.push({
          position: [x - gridSize/2 + 0.5, 0, z - gridSize/2 + 0.5] as [number, number, number],
          key: `${x}-${z}`
        });
      }
    }
    return plotArray;
  }, [gridSize]);

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border border-border/20 bg-gradient-sky">
      <Canvas camera={{ position: [5, 8, 5], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Sky */}
        <mesh position={[0, 20, 0]} scale={[50, 50, 50]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial 
            color={
              farmData.weather === 'monsoon' ? '#4682B4' :
              farmData.weather === 'arid' ? '#FFB347' :
              '#87CEEB'
            } 
            side={THREE.BackSide} 
          />
        </mesh>

        {/* Ground */}
        <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>

        {/* Farm plots */}
        {plots.map((plot) => (
          <FarmPlot
            key={plot.key}
            position={plot.position}
            fieldState={fieldState}
            soilColor={farmData.soilType}
            cropType={farmData.cropType}
          />
        ))}

        {/* Weather effects */}
        <WeatherEffects weather={farmData.weather} />

        {/* Progress indicator */}
        <Text
          position={[0, 6, 0]}
          fontSize={0.5}
          color="#333"
          anchorX="center"
          anchorY="middle"
        >
          {fieldState.cropGrown ? '🎉 Harvest Ready!' : 
           fieldState.watered ? '💧 Growing...' :
           fieldState.seedsPlanted ? '🌱 Planted' :
           fieldState.soilPrepared ? '🚜 Ready to Plant' :
           '🌾 Farm Ready'}
        </Text>

        <OrbitControls 
          enablePan={false} 
          maxPolarAngle={Math.PI / 2} 
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
};