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

  // Initial animation to zoom in from far away
  useEffect(() => {
    camera.position.z = 50; // Set a very far initial position to create the deep space effect

    gsap.to(camera.position, {
      z: 1, // Move the camera closer over time
      duration: 5,
      ease: "power3.out",
      onComplete: () => {
        setHasZoomed(true);
        onZoomComplete();
      },
    });
  }, [camera, onZoomComplete]);

  // Smooth scrolling effect once zoom is completed
  useEffect(() => {
    if (hasZoomed) {
      gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 3,
        ease: "power2.inOut",
      });
    }
  }, [hasZoomed]);

  return null;
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
        <Stars radius={300} depth={60} count={10000} factor={7} saturation={0} fade speed={1} />

        {/* Floating spheres */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Add multiple spheres at different positions */}
        <Sphere position={[2, 0, -5]} scale={[1.5, 1.5, 1.5]}>
          <meshStandardMaterial attach="material" color="#8e44ad" roughness={0.8} metalness={0.5} />
        </Sphere>
        <Sphere position={[-2, 1, -3]} scale={[1.2, 1.2, 1.2]}>
          <meshStandardMaterial attach="material" color="#ff00ff" roughness={0.5} metalness={0.5} />
        </Sphere>
        <Sphere position={[0, -1, -6]} scale={[1.0, 1.0, 1.0]}>
          <meshStandardMaterial attach="material" color="#3498db" roughness={0.7} metalness={0.5} />
        </Sphere>

        {/* User interaction with orbit control */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
