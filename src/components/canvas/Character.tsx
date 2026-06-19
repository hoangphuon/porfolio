import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import characterImg from '../../assets/character.jpg';

const Character = ({ isDarkMode = true }: { isDarkMode?: boolean }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, characterImg);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uTexture: { value: texture },
    },
    vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uScroll;
      void main() {
        vUv = uv;
        vec3 pos = position;
        
        // Squash and stretch based on "breathing" and scroll
        float breathing = sin(uTime * 2.0) * 0.02;
        pos.y += breathing;
        pos.x *= 1.0 + breathing * 0.5 + (uScroll * 0.05);
        
        // Slight wave effect to make it feel alive
        pos.z += sin(pos.y * 5.0 + uTime) * 0.02 * uScroll;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uScroll;
      uniform float uTime;
      void main() {
        vec2 uv = vUv;
        
        // Dynamic "Expression" - slight color warming when scrolling
        vec4 color = texture2D(uTexture, uv);
        
        // Add a subtle glow/blush effect based on scroll
        float dist = distance(uv, vec2(0.5, 0.4)); // Center of face area roughly
        float blush = smoothstep(0.2, 0.0, dist) * uScroll * 0.2;
        color.rgb += vec3(0.1, 0.0, 0.0) * blush;
        
        // Sparkle in eyes effect
        float sparkle = sin(uTime * 5.0) * 0.5 + 0.5;
        if (dist < 0.1) {
           color.rgb += vec3(0.2) * sparkle * uScroll;
        }

        gl_FragColor = color;
      }
    `,
  }), [texture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scrollY = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = height > 0 ? scrollY / height : 0;

    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = t;
        material.uniforms.uScroll.value = scrollPercent;
      }

      // Rotation movement
      mesh.current.rotation.y = Math.sin(scrollPercent * Math.PI) * 0.2;
      mesh.current.position.y = (scrollPercent * 0.2);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={mesh}>
        <planeGeometry args={[1.2, 1.2, 16, 16]} />
        <shaderMaterial 
          args={[shaderArgs]} 
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Background Glow */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial 
          color={isDarkMode ? "#00f3ff" : "#ff00ea"} 
          transparent={true} 
          opacity={0.15}
        />
      </mesh>
    </group>
  );
};

export default Character;
