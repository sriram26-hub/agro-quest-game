import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Tool3DProps {
  toolType: string;
  isActive: boolean;
  onUse: () => void;
}

const Tool3DModel: React.FC<{ toolType: string; isActive: boolean }> = ({ toolType, isActive }) => {
  const toolRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (toolRef.current && isActive) {
      toolRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.2;
      toolRef.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.1;
    }
  });

  const getToolModel = () => {
    switch (toolType) {
      case 'plow':
        return (
          <group ref={toolRef}>
            {/* Plow handle */}
            <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
              <cylinderGeometry args={[0.02, 0.02, 1]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Plow blade */}
            <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.3, 0.1, 0.05]} />
              <meshStandardMaterial color="#C0C0C0" />
            </mesh>
          </group>
        );
      
      case 'seeds':
        return (
          <group ref={toolRef}>
            {/* Seed bag */}
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.15, 0.1, 0.3]} />
              <meshStandardMaterial color="#DEB887" />
            </mesh>
            {/* Seeds scattered */}
            <mesh position={[0.1, 0.4, 0.1]}>
              <sphereGeometry args={[0.02]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[-0.1, 0.4, -0.1]}>
              <sphereGeometry args={[0.02]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
          </group>
        );
      
      case 'water':
        return (
          <group ref={toolRef}>
            {/* Watering can */}
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.12, 0.15, 0.25]} />
              <meshStandardMaterial color="#4169E1" />
            </mesh>
            {/* Spout */}
            <mesh position={[0.2, 0.25, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <cylinderGeometry args={[0.02, 0.03, 0.2]} />
              <meshStandardMaterial color="#4169E1" />
            </mesh>
            {/* Water drops */}
            {isActive && (
              <>
                <mesh position={[0.3, 0.1, 0]}>
                  <sphereGeometry args={[0.01]} />
                  <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
                </mesh>
                <mesh position={[0.25, 0.05, 0.02]}>
                  <sphereGeometry args={[0.01]} />
                  <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
                </mesh>
              </>
            )}
          </group>
        );
      
      case 'fertilizer':
        return (
          <group ref={toolRef}>
            {/* Fertilizer spreader */}
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.2]} />
              <meshStandardMaterial color="#32CD32" />
            </mesh>
            {/* Handle */}
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.3]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Particles */}
            {isActive && (
              <>
                <mesh position={[0.1, 0.05, 0.1]}>
                  <sphereGeometry args={[0.005]} />
                  <meshStandardMaterial color="#90EE90" />
                </mesh>
                <mesh position={[-0.1, 0.05, -0.1]}>
                  <sphereGeometry args={[0.005]} />
                  <meshStandardMaterial color="#90EE90" />
                </mesh>
              </>
            )}
          </group>
        );
      
      case 'pesticide':
        return (
          <group ref={toolRef}>
            {/* Spray bottle */}
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[0.08, 0.1, 0.25]} />
              <meshStandardMaterial color="#FF6B35" />
            </mesh>
            {/* Nozzle */}
            <mesh position={[0, 0.35, 0]}>
              <cylinderGeometry args={[0.02, 0.03, 0.1]} />
              <meshStandardMaterial color="#FFD700" />
            </mesh>
            {/* Spray effect */}
            {isActive && (
              <mesh position={[0, 0.4, 0]}>
                <sphereGeometry args={[0.05]} />
                <meshStandardMaterial color="#98FB98" transparent opacity={0.3} />
              </mesh>
            )}
          </group>
        );
      
      case 'harvest':
        return (
          <group ref={toolRef}>
            {/* Sickle handle */}
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.3]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Sickle blade */}
            <mesh position={[0, 0.3, 0]} rotation={[0, Math.PI / 4, 0]}>
              <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI]} />
              <meshStandardMaterial color="#C0C0C0" />
            </mesh>
          </group>
        );
      
      default:
        return (
          <group ref={toolRef}>
            <mesh>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial color="#888888" />
            </mesh>
          </group>
        );
    }
  };

  return getToolModel();
};

export const Tools3D: React.FC<Tool3DProps> = ({ toolType, isActive, onUse }) => {
  const getToolName = () => {
    switch (toolType) {
      case 'plow': return 'Plow';
      case 'seeds': return 'Seeds';
      case 'water': return 'Irrigation';
      case 'fertilizer': return 'Fertilizer';
      case 'pesticide': return 'Pest Control';
      case 'harvest': return 'Harvest';
      default: return 'Tool';
    }
  };

  return (
    <div 
      className={`h-32 w-32 rounded-lg border cursor-pointer transition-all duration-300 ${
        isActive 
          ? 'border-primary bg-primary/10 shadow-lg scale-105' 
          : 'border-border/20 bg-background hover:bg-muted/50'
      }`}
      onClick={onUse}
    >
      <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        
        <Tool3DModel toolType={toolType} isActive={isActive} />
        
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.1}
          color={isActive ? '#10b981' : '#666'}
          anchorX="center"
          anchorY="middle"
        >
          {getToolName()}
        </Text>
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};