import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const Robot = ({ isDarkMode = true }: { isDarkMode?: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const mouth = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Calculate scroll percentage
    const scrollY = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = height > 0 ? scrollY / height : 0;

    if (group.current) {
      // Combined Idle + Scroll movement
      // Robot floats up slightly and rotates based on scroll
      group.current.position.y = -0.5 + Math.sin(t) * 0.1 + (scrollPercent * 0.3);
      group.current.rotation.y = Math.sin(t / 2) * 0.1 + (scrollPercent * Math.PI * 0.5);
      
      // Add a slight tilt as scrolling
      group.current.rotation.z = Math.sin(t * 0.5) * 0.05 + (scrollPercent * 0.1);
    }

    if (head.current) {
      // Head follows scroll slightly and maintains idle animation
      head.current.rotation.x = Math.sin(t) * 0.05 + (scrollPercent * 0.15);
      head.current.rotation.y = Math.sin(t * 0.3) * 0.1 + (Math.sin(scrollPercent * Math.PI) * 0.2);
    }
    
    // Expression animation
    if (leftEye.current && rightEye.current && mouth.current) {
      const blink = Math.sin(t * 4) > 3.8 ? 0.1 : 1;
      leftEye.current.scale.y = blink;
      rightEye.current.scale.y = blink;
      
      // Mouth reacts to scroll - widens slightly
      mouth.current.scale.x = 1 + Math.sin(t * 2) * 0.1 + (scrollPercent * 0.2);
    }
  });

  const bodyColor = isDarkMode ? "#e0e0e0" : "#ffffff";
  const visorColor = "#1a1a1a";
  const glowColor = "#00f3ff";

  return (
    <group ref={group} scale={0.6} position={[0, -0.5, 0]}>
      {/* Main Body - Egg shaped */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={bodyColor} roughness={0.2} metalness={0.2} />
      </mesh>
      {/* Lower body detail */}
      <mesh position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.02, 16, 100]} />
        <meshStandardMaterial color="#ccc" />
      </mesh>

      {/* Head */}
      <group ref={head} position={[0, 1.4, 0]}>
        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial color={bodyColor} roughness={0.2} metalness={0.2} />
        </mesh>
        
        {/* Visor Area - Black face plate */}
        <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshBasicMaterial color={visorColor} />
        </mesh>
        
        {/* Visor Overlay (Pill shape) */}
        <mesh position={[0, 0.05, 0.45]}>
          <boxGeometry args={[0.6, 0.35, 0.1]} />
          <meshStandardMaterial color={visorColor} roughness={0} />
        </mesh>

        {/* Expressions (Eyes) - Smiling arcs like in the image */}
        <group position={[-0.2, 0.1, 0.52]}>
          <mesh ref={leftEye}>
            <torusGeometry args={[0.08, 0.025, 16, 32, Math.PI]} />
            <meshBasicMaterial color="#00ffff" />
            <pointLight distance={1} intensity={5} color="#00ffff" />
          </mesh>
        </group>
        <group position={[0.2, 0.1, 0.52]}>
          <mesh ref={rightEye}>
            <torusGeometry args={[0.08, 0.025, 16, 32, Math.PI]} />
            <meshBasicMaterial color="#00ffff" />
            <pointLight distance={1} intensity={5} color="#00ffff" />
          </mesh>
        </group>

        {/* Mouth (Small smiling arc) */}
        <mesh ref={mouth} position={[0, -0.1, 0.52]}>
          <torusGeometry args={[0.05, 0.02, 16, 32, Math.PI]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>


        {/* Side Ears/Speakers */}
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
            <meshStandardMaterial color={bodyColor} />
          </mesh>
        ))}
      </group>

      {/* Floating Arms */}
      {[ -1, 1 ].map((side) => (
        <Float key={side} speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[side * 0.7, 0.8, 0]}>
            <capsuleGeometry args={[0.1, 0.4, 4, 16]} />
            <meshStandardMaterial color={bodyColor} roughness={0.2} metalness={0.2} />
          </mesh>
        </Float>
      ))}

      {/* Lighting for the robot */}
      <ambientLight intensity={isDarkMode ? 0.4 : 0.8} />
      <directionalLight position={[2, 5, 2]} intensity={isDarkMode ? 1 : 2} />
      <pointLight position={[-2, 2, 2]} color={glowColor} intensity={1} />
    </group>
  );
};

export default Robot;
