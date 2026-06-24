import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { StarsBackground } from './Stars';
import { FallingStars } from './FallingStars';
import Earth from './Earth';
import { Preload } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CameraController = () => {
  const { camera } = useThree();

  useEffect(() => {
    // Initial camera position: Earth will appear on the RIGHT because camera is to the LEFT
    // and looking straight forward (default rotation)
    camera.position.set(-4.5, 0, 8);
    camera.rotation.set(0, 0, 0); 

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // Phase 1: Move camera to X=0 to CENTER Earth and zoom in to Z=5.5
    tl.to(camera.position, {
      x: 0,
      y: -0.5,
      z: 5.5,
      ease: "power1.inOut",
      duration: 2, 
    })
    // Phase 2: Move camera to X=positive to make Earth appear on the LEFT and zoom out
    .to(camera.position, {
      x: 4.5,
      y: 0,
      z: 8.5,
      ease: "power1.inOut",
      duration: 1, 
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [camera]);

  return null;
};

const MainCanvas = ({ isDarkMode = true }: { isDarkMode?: boolean }) => {
  return (
    <div className="canvas-container">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <CameraController />
          <Earth isDarkMode={isDarkMode} />
          <StarsBackground isDarkMode={isDarkMode} />
          <FallingStars isDarkMode={isDarkMode} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default MainCanvas;
