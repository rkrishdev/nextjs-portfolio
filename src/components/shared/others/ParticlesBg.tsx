"use client";

import particleStyles from "@/styles/particles-bg.module.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const Particles = ({ numParticles }: { numParticles: number }) => {
  const particlesRef = useRef<(THREE.Mesh | null)[]>([]);

  const particlesPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < numParticles; i++) {
      positions.push([
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
      ]);
    }
    return positions;
  }, [numParticles]);

  useFrame(() => {
    particlesRef.current.forEach((particle) => {
      if (!particle) return;
      const vel = 0.0025;
      particle.position.x += vel;
      particle.position.y += vel;
      particle.position.z += vel;

      if (particle.position.z > 7) particle.position.z = -5;
      if (particle.position.x > 7) particle.position.x = -4;
      if (particle.position.y > 7) particle.position.y = -4;
    });
  });

  return (
    <>
      {particlesPositions.map(([x, y, z], i) => (
        <mesh
          key={i}
          ref={(el) => {
            particlesRef.current[i] = el;
          }}
          position={[x, y, z]}
        >
          <sphereGeometry args={[0.0015, 2, 2]} />
          <meshPhongMaterial color={"#ffffff"} />
        </mesh>
      ))}
    </>
  );
};

export const ParticlesBg = () => {
  const numParticles = 1100;

  return (
    <div className={particleStyles.canvasWrapper}>
      <Canvas camera={{ position: [0, 0, 7], fov: 65 }}>
        <ambientLight color={"#ffffff"} intensity={2} />
        <Particles numParticles={numParticles} />
      </Canvas>
    </div>
  );
};
