import * as THREE from 'three';
import { useState, useRef } from 'react';
import { useFrame, type ThreeElements } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-expect-error maath does not have type definitions
import * as random from 'maath/random/dist/maath-random.esm';

export const StarsBackground = ({ isDarkMode = true, ...props }: { isDarkMode?: boolean } & Omit<ThreeElements['points'], 'ref'>) => {
  const ref = useRef<THREE.Points>(null!);
  // Increase particle count and radius for a more "infinite" feel
  const [sphere] = useState(() => random.inSphere(new Float32Array(8000), { radius: 2.5 }) as Float32Array);


  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={isDarkMode ? "#00f3ff" : "#2563eb"}
          size={isDarkMode ? 0.003 : 0.004}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isDarkMode ? 0.6 : 0.12}
        />
      </Points>
    </group>
  );
};
