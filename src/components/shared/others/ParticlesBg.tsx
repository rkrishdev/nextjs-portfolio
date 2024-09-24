"use client";

import { useEffect, useRef, useCallback } from "react";
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
    size:
      canvasWidth > 1000
        ? Math.random() * 0.85 + 0.2
        : Math.random() * 0.65 + 0.2,
    velX:
      canvasWidth > 1000 ? Math.random() * 5 + 1.5 : Math.random() * 1.5 + 0.25,
    velY:
      canvasWidth > 1000
        ? -Math.random() * 2.5 - 0.75
        : -Math.random() * 2 - 0.5,
  };
};

export const ParticlesBg = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const prevWidth = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const width =
        document.body.clientWidth > 1000
          ? document.body.clientWidth
          : window.innerWidth;
      const height =
        document.body.clientWidth > 1000
          ? document.body.clientHeight
          : window.innerHeight;

      canvas.width = width;
      canvas.height = height;

      const numParticles = width > 1000 ? 175 : 15;
      particles.current = Array.from({ length: numParticles }, () =>
        createParticle(width, height)
      );
    }
  };

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const { width, height } = canvas;
    context.clearRect(0, 0, width, height);

    particles.current.forEach((particle, index) => {
      particle.x += particle.velX;
      particle.y += particle.velY;

      if (particle.x > width) {
        particles.current[index] = createParticle(width, height);
        particles.current[index].x = 0;
        particles.current[index].y = Math.random() * height;
      } else if (particle.y < 0) {
        particles.current[index] = createParticle(width, height);
        particles.current[index].x = Math.random() * width;
        particles.current[index].y = height;
      } else if (particle.y > height) {
        particles.current[index] = createParticle(width, height);
        particles.current[index].x = Math.random() * width;
        particles.current[index].y = 0;
      }

      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fillStyle = "#ffffff";
      context.fill();
    });

    animationFrameId.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    resizeCanvas();
    render();

    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (prevWidth.current !== newWidth) {
        prevWidth.current = newWidth;
        resizeCanvas();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [render]);

  return (
    <div className={particleStyles.canvasWrapper}>
      <canvas ref={canvasRef} />
    </div>
  );
};
