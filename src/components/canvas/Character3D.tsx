import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const Character3D = ({ isDarkMode = true }: { isDarkMode?: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scrollY = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = height > 0 ? scrollY / height : 0;

    if (group.current) {
      // Floating animation + scroll rotation
      group.current.position.y = Math.sin(t) * 0.05 + (scrollPercent * 0.5);
      group.current.rotation.y = Math.sin(t * 0.5) * 0.1 + (scrollPercent * Math.PI * 0.5);
    }

    if (head.current) {
      // Head follows scroll slightly
      head.current.rotation.x = Math.sin(t) * 0.05 + (scrollPercent * 0.2);
      head.current.rotation.z = Math.sin(t * 0.3) * 0.05;
    }

    if (leftEye.current && rightEye.current) {
       // Blink logic
       const blink = Math.sin(t * 3) > 2.8 ? 0.1 : 1;
       leftEye.current.scale.y = blink;
       rightEye.current.scale.y = blink;
    }
  });

  const skinColor = "#ffdbac";
  const hoodieColor = "#3b82f6";
  const capColor = "#b91c1c";
  const hairColor = "#4b2c20";
  const shirtColor = "#15803d";

  return (
    <group ref={group} scale={0.7} position={[0, -0.8, 0]}>
      {/* Body - Hoodie */}
      <mesh position={[0, 0.4, 0]}>
        <capsuleGeometry args={[0.4, 0.6, 4, 16]} />
        <meshStandardMaterial color={hoodieColor} roughness={0.7} />
      </mesh>
      
      {/* Inner Shirt Detail */}
      <mesh position={[0, 0.7, 0.1]}>
        <sphereGeometry args={[0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      {/* Head Group */}
      <group ref={head} position={[0, 1.2, 0]}>
        {/* Face */}
        <mesh>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial color={skinColor} roughness={0.3} />
        </mesh>

        {/* Hair - Simplified as spheres/blobs */}
        <group position={[0, 0.1, -0.1]}>
          {[-0.3, 0, 0.3].map((x, i) => (
            <mesh key={i} position={[x, 0.2, 0]}>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
          ))}
          {[-0.4, 0.4].map((x, i) => (
            <mesh key={i} position={[x, -0.2, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
          ))}
        </group>

        {/* Cap */}
        <group position={[0, 0.25, 0]} rotation={[-0.2, 0, 0]}>
          {/* Main Cap Part */}
          <mesh>
            <sphereGeometry args={[0.47, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={capColor} />
          </mesh>
          {/* Cap Brim */}
          <mesh position={[0, 0, 0.4]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.6, 0.05, 0.4]} />
            <meshStandardMaterial color={capColor} />
          </mesh>
        </group>

        {/* Eyes */}
        <group position={[0, 0.05, 0.38]}>
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.18, 0, 0]}>
              {/* White part */}
              <mesh ref={side === -1 ? leftEye : rightEye}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="white" />
              </mesh>
              {/* Pupil */}
              <mesh position={[0, 0, 0.08]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color={hairColor} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Nose */}
        <mesh position={[0, -0.05, 0.43]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>

        {/* Smile */}
        <mesh position={[0, -0.2, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.1, 0.02, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#c57b7d" />
        </mesh>
      </group>

      {/* Floating Arms */}
      {[-1, 1].map((side) => (
        <Float key={side} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={[side * 0.6, 0.6, 0]} rotation={[0, 0, side * 0.2]}>
            <capsuleGeometry args={[0.08, 0.3, 4, 16]} />
            <meshStandardMaterial color={hoodieColor} />
          </mesh>
        </Float>
      ))}

      {/* Lighting */}
      <ambientLight intensity={isDarkMode ? 0.5 : 0.8} />
      <pointLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, 5, 5]} color={hoodieColor} intensity={1} />
    </group>
  );
};

export default Character3D;
