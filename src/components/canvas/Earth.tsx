import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';

const Earth = () => {
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
            shininess={10}
          />
        </mesh>

        {/* Clouds Layer */}
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[1.02, 64, 64]} />
          <meshPhongMaterial
            map={cloudsTexture}
            transparent={true}
            opacity={0.5}
            depthWrite={false}
          />
        </mesh>

        {/* Atmosphere Glow (Inner) */}
        <mesh>
          <sphereGeometry args={[1.01, 64, 64]} />
          <meshPhongMaterial
            color="#4db5ff"
            transparent={true}
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Atmosphere Glow (Outer) */}
        <mesh>
          <sphereGeometry args={[1.15, 64, 64]} />
          <meshPhongMaterial
            color="#0066ff"
            transparent={true}
            opacity={0.05}
            side={THREE.BackSide}
          />
        </mesh>
      </Float>
      
      {/* Lighting specifically for Earth - Boosted for extra brightness */}
      <pointLight position={[12, 12, 12]} intensity={5} color="#ffffff" />
      <pointLight position={[-12, -12, 10]} intensity={2} color="#ffffff" />
      <pointLight position={[0, 0, 15]} intensity={1.5} color="#ffffff" />
      <ambientLight intensity={0.6} />
    </group>
  );
};

export default Earth;
