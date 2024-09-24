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
    size:
      canvasWidth > 1000
        ? Math.random() * 1 + 0.25
        : Math.random() * 0.75 + 0.15,
    velX: Math.random() * 2 + 1,
    velY: -Math.random() * 1.5 - 0.5,
  };
};

export const ParticlesBg = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const numParticles = 200;
  const particles = useRef<Particle[]>([]);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;

      const { width, height } = canvas;
      particles.current = Array.from({ length: numParticles }, () =>
        createParticle(width, height)
      );
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    resizeCanvas();

    const render = () => {
      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

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

      requestAnimationFrame(render);
    };

    render();

    window.addEventListener("resize", resizeCanvas);

    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });
    observer.observe(document.body);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
    };
  }, [numParticles]);

  return (
    <div className={particleStyles.canvasWrapper}>
      <canvas ref={canvasRef} />
    </div>
  );
};
