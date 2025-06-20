
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import Navbar from '@/components/Navbar';

// Farm marker component
function FarmMarker({ position, name, onClick }: { position: [number, number, number], name: string, onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <group position={position} onClick={onClick}>
      <Sphere ref={meshRef} args={[0.3]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#22c55e" />
      </Sphere>
      <Box args={[0.5, 2, 0.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b5cf6" />
      </Box>
      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}

// House component
function House({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Box args={[1, 1, 1]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#d97706" />
      </Box>
      <Box args={[1.2, 0.8, 1.2]} position={[0, 1.4, 0]}>
        <meshStandardMaterial color="#dc2626" />
      </Box>
    </group>
  );
}

// Terrain component
function Terrain() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[50, 50, 32, 32]} />
      <meshStandardMaterial color="#10b981" wireframe={false} />
    </mesh>
  );
}

const ThreeDMap = () => {
  const farms = [
    { name: "Green Valley", position: [5, 0, 3] as [number, number, number] },
    { name: "Sunrise Farm", position: [-3, 0, -5] as [number, number, number] },
    { name: "Heritage Crops", position: [8, 0, -2] as [number, number, number] },
    { name: "Organic Fields", position: [-6, 0, 4] as [number, number, number] },
  ];

  const houses = [
    [2, 0, 1] as [number, number, number],
    [-4, 0, -2] as [number, number, number],
    [6, 0, -4] as [number, number, number],
    [-2, 0, 6] as [number, number, number],
    [10, 0, 2] as [number, number, number],
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="h-screen relative">
        <div className="absolute top-20 left-4 z-10 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 text-white">
          <h2 className="text-xl font-bold mb-2">3D Satellite Map</h2>
          <p className="text-sm text-gray-300 mb-2">Interactive farm locations</p>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Active Farms</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-600 rounded"></div>
              <span>Houses</span>
            </div>
          </div>
        </div>

        <Canvas camera={{ position: [15, 10, 15], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[0, 10, 0]} intensity={0.5} />
          
          <Terrain />
          
          {farms.map((farm, index) => (
            <FarmMarker
              key={index}
              position={farm.position}
              name={farm.name}
              onClick={() => console.log(`Clicked on ${farm.name}`)}
            />
          ))}
          
          {houses.map((position, index) => (
            <House key={index} position={position} />
          ))}
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={30}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeDMap;
