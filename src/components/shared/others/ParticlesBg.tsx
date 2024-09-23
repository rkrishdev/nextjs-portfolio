"use client";

import { useEffect, useRef } from "react";
import particleStyles from "@/styles/particles-bg.module.css";

interface Particle {
  x: number;
  y: number;
  size: number;
  velX: number;
  velY: number;
}

const createParticle = (
  canvasWidth: number,
  canvasHeight: number
): Particle => {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    size: Math.random() * 0.75 + 0.25,
    velX: Math.random() * 2 + 1,
    velY: -Math.random() * 2 - 1,
  };
};

export const ParticlesBg = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const numParticles = 150;

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    resizeCanvas();
    const { width, height } = canvas;
    const particles: Particle[] = Array.from({ length: numParticles }, () =>
      createParticle(width, height)
    );

    const render = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.velX;
        particle.y += particle.velY;

        if (particle.x > width) {
          particles[index] = createParticle(width, height);
          particles[index].x = 0;
          particles[index].y = Math.random() * height;
        } else if (particle.y < 0) {
          particles[index] = createParticle(width, height);
          particles[index].x = Math.random() * width;
          particles[index].y = height;
        } else if (particle.y > height) {
          particles[index] = createParticle(width, height);
          particles[index].x = Math.random() * width;
          particles[index].y = 0;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = "#ffffff";
        context.fill();
      });

      requestAnimationFrame(render);
    };

    render();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [numParticles]);

  return (
    <div className={particleStyles.canvasWrapper}>
      <canvas ref={canvasRef} />
    </div>
  );
};
