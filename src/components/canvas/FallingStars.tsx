import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const METEOR_COUNT = 60;

const ShootingStar = ({ isDarkMode = true }: { isDarkMode?: boolean }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  const data = useMemo(() => ({
    x: (Math.random() - 0.5) * 20,
    y: Math.random() * 10 + 5,
    z: (Math.random() - 0.5) * 10 - 5,
    speed: Math.random() * 0.05 + 0.02,
    drift: (Math.random() - 0.5) * 0.02,
    scale: Math.random() * 0.03 + 0.01
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      // Fall downwards
      mesh.current.position.y -= data.speed;
      mesh.current.position.x += data.drift;

      // Twinkle effect
      if (mesh.current.material instanceof THREE.MeshBasicMaterial) {
        const baseOpacity = isDarkMode ? 0.4 : 0.08;
        const pulse = isDarkMode ? 0.4 : 0.08;
        mesh.current.material.opacity = baseOpacity + Math.sin(t * 5 + data.x) * pulse;
      }

      // Reset when below view
      if (mesh.current.position.y < -5) {
        mesh.current.position.y = 10;
        mesh.current.position.x = (Math.random() - 0.5) * 20;
      }
    }
  });

  return (
    <mesh ref={mesh} position={[data.x, data.y, data.z]}>
      <sphereGeometry args={[data.scale, 8, 8]} />
      <meshBasicMaterial color={isDarkMode ? "#ffd700" : "#3b82f6"} transparent />
    </mesh>
  );
};

export const FallingStars = ({ isDarkMode = true }: { isDarkMode?: boolean }) => {
  const stars = useMemo(() => Array.from({ length: METEOR_COUNT }), []);

  return (
    <group>
      {stars.map((_, i) => (
        <ShootingStar key={i} isDarkMode={isDarkMode} />
      ))}
    </group>
  );
};
