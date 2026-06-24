import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';

const Earth = ({ isDarkMode = true }: { isDarkMode?: boolean }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Using public textures for Earth
  const [earthTexture, normalTexture, specularTexture, cloudsTexture] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = time * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.07;
    }
  });

  return (
    <group scale={3.2}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Main Earth Mesh */}
        <mesh ref={earthRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhongMaterial
            map={earthTexture}
            normalMap={normalTexture}
            specularMap={specularTexture}
            shininess={isDarkMode ? 10 : 35}
            emissive={isDarkMode ? "#000000" : "#2e5b8a"}
            emissiveIntensity={isDarkMode ? 0 : 0.75}
          />
        </mesh>

        {/* Clouds Layer */}
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[1.02, 64, 64]} />
          <meshPhongMaterial
            map={cloudsTexture}
            transparent={true}
            opacity={isDarkMode ? 0.5 : 0.8}
            depthWrite={false}
            emissive={isDarkMode ? "#000000" : "#ffffff"}
            emissiveIntensity={isDarkMode ? 0 : 0.3}
          />
        </mesh>

        {/* Atmosphere Glow (Inner) */}
        <mesh>
          <sphereGeometry args={[1.01, 64, 64]} />
          <meshPhongMaterial
            color={isDarkMode ? "#4db5ff" : "#60a5fa"}
            transparent={true}
            opacity={isDarkMode ? 0.15 : 0.3}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Atmosphere Glow (Outer) */}
        <mesh>
          <sphereGeometry args={[1.15, 64, 64]} />
          <meshPhongMaterial
            color={isDarkMode ? "#0066ff" : "#93c5fd"}
            transparent={true}
            opacity={isDarkMode ? 0.05 : 0.15}
            side={THREE.BackSide}
          />
        </mesh>
      </Float>
      
      {/* Lighting specifically for Earth - Boosted for extra brightness */}
      <pointLight position={[12, 12, 12]} intensity={isDarkMode ? 5 : 15} color="#ffffff" />
      <pointLight position={[-12, -12, 10]} intensity={isDarkMode ? 2 : 6} color="#ffffff" />
      <pointLight position={[0, 0, 15]} intensity={isDarkMode ? 1.5 : 5} color="#ffffff" />
      <ambientLight intensity={isDarkMode ? 0.6 : 2.5} />
    </group>
  );
};

export default Earth;
