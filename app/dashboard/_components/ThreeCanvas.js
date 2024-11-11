"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, OrbitControls, Stars } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register ScrollToPlugin with GSAP
gsap.registerPlugin(ScrollToPlugin);

const ZoomCamera = ({ onZoomComplete }) => {
  const { camera } = useThree();
  const [hasZoomed, setHasZoomed] = useState(false);

  // Initial animation to zoom in from very far away, with light speed effect
  useEffect(() => {
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768;
    camera.position.set(0, 0, isSmallScreen ? 5000 : 10000); // Set an even farther initial position to create the deep space effect

    // Start the page scrolled to the bottom to ensure the first view is the deep space
    if (typeof window !== 'undefined') {
      window.scrollTo(0, document.body.scrollHeight);
    }

    // Light speed zoom-in effect, with stars becoming lines
    gsap.to(camera.position, {
      z: isSmallScreen ? 20 : 30, // Move the camera very fast initially
      duration: 5, // Make the light speed animation longer for viewers' pleasure
      ease: "power4.in",
      onUpdate: () => {
        // Make stars look like lines during fast zoom
        const stars = document.querySelector("canvas");
        if (stars) {
          stars.style.filter = "blur(4px) brightness(2)";
        }
      },
      onComplete: () => {
        // Reset star effect
        const stars = document.querySelector("canvas");
        if (stars) {
          stars.style.filter = "none";
        }
        // Slow down to approach the final position
        gsap.to(camera.position, {
          z: isSmallScreen ? 3 : 5,
          duration: 6,
          ease: "power4.out",
          onComplete: () => {
            setHasZoomed(true);
            onZoomComplete();
          },
        });
      },
    });
  }, [camera, onZoomComplete]);

  // Smooth scrolling effect once zoom is completed
  useEffect(() => {
    if (hasZoomed && typeof window !== 'undefined') {
      gsap.to(window, {
        scrollTo: { y: 0 }, // Scroll from the bottom to the top
        duration: 4,
        ease: "power2.inOut",
      });
    }
  }, [hasZoomed]);

  return null;
};

const AnimatedSpheres = () => {
  const sphereRefs = useRef([]);
  const { camera } = useThree();

  useEffect(() => {
    if (sphereRefs.current.length > 0) {
      // Animation for the spheres to move around randomly
      sphereRefs.current.forEach((sphere, index) => {
        gsap.to(sphere.position, {
          x: `random(-10, 10)`,
          y: `random(-10, 10)`,
          z: `random(-10, 10)`,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.5,
        });
      });

      // Camera animation to focus on each sphere sequentially
      let currentSphere = 0;
      const focusOnSphere = () => {
        const sphere = sphereRefs.current[currentSphere];
        if (sphere) {
          gsap.to(camera.position, {
            x: sphere.position.x,
            y: sphere.position.y,
            z: sphere.position.z + 3, // Keep some distance from the sphere
            duration: 3,
            ease: "power2.inOut",
            onComplete: () => {
              currentSphere = (currentSphere + 1) % sphereRefs.current.length;
              setTimeout(focusOnSphere, 2000); // Wait before switching to the next sphere
            },
          });
        }
      };

      focusOnSphere();
    }
  }, [camera]);

  return (
    <>
      {/* Add multiple spheres at different positions */}
      <Sphere ref={(ref) => (sphereRefs.current[0] = ref)} position={[2, 0, -5]} scale={[1.5, 1.5, 1.5]}>
        <meshStandardMaterial attach="material" color="#8e44ad" roughness={0.8} metalness={0.5} />
      </Sphere>
      <Sphere ref={(ref) => (sphereRefs.current[1] = ref)} position={[-2, 1, -3]} scale={[1.2, 1.2, 1.2]}>
        <meshStandardMaterial attach="material" color="#ff00ff" roughness={0.5} metalness={0.5} />
      </Sphere>
      <Sphere ref={(ref) => (sphereRefs.current[2] = ref)} position={[0, -1, -6]} scale={[1.0, 1.0, 1.0]}>
        <meshStandardMaterial attach="material" color="#3498db" roughness={0.7} metalness={0.5} />
      </Sphere>
    </>
  );
};

const FeatureText = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = [
    "GIVE INSTANT INTERVIEW",
    "RECEIVE INSTANT FEEDBACK",
    "BOOTSTRAP YOUR INTERVIEW PREP!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-2xl font-bold">
      {texts[currentTextIndex]}
    </div>
  );
};

const ThreeCanvas = () => {
  const handleZoomComplete = () => {
    console.log("Zoom animation completed");
    // Additional actions after zoom is complete, if needed
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <Canvas className="absolute top-0 left-0 w-full h-full" style={{ zIndex: '-1' }}>
        {/* Zoom camera with a callback on complete */}
        <ZoomCamera onZoomComplete={handleZoomComplete} />

        {/* Adds a starry background */}
        {typeof window !== 'undefined' && (
          <Stars 
            radius={500} 
            depth={100} 
            count={window.innerWidth < 768 ? 7000 : 15000} // Increase the number of stars for a more cinematic effect
            factor={10} 
            saturation={0} 
            fade 
            speed={3} // Increase speed to give stars a warp effect
          />
        )}

        {/* Floating spheres with animations */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSpheres />

        {/* User interaction with orbit control */}
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* Feature Text in Star Wars style */}
      <FeatureText />
    </div>
  );
};

export default ThreeCanvas;
