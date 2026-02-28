"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { PerspectiveCamera, OrbitControls, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from './ThemeProvider';

function FloatingCrystal({ position, rotation, scale }) {
  const meshRef = useRef();
  const { theme } = useTheme();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y += Math.sin(time) * 0.002;
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    meshRef.current.rotation.z = Math.cos(time * 0.3) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={theme === 'dark' ? '#8B5CF6' : '#7C3AED'}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function FloatingParticles({ count = 100 }) {
  const points = useRef();
  const { theme } = useTheme();

  const particlePositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.05;
    points.current.rotation.x = time * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={theme === 'dark' ? '#8B5CF6' : '#7C3AED'}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.15}
        penumbra={1}
        intensity={0.8}
      />

      <group>
        <FloatingCrystal position={[-2, 0, 0]} rotation={[0, Math.PI / 4, 0]} scale={1} />
        <FloatingCrystal position={[2, 0, 0]} rotation={[Math.PI / 4, 0, 0]} scale={1.2} />
        <FloatingCrystal position={[0, 2, -2]} rotation={[Math.PI / 6, Math.PI / 6, 0]} scale={0.8} />
      </group>

      <FloatingParticles count={80} />

      <EffectComposer disableNormalPass>
        <Bloom
          intensity={1.0}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </>
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-screen">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <Scene />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}