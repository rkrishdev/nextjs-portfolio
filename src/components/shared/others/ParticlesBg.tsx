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
        : Math.random() * 0.9 + 0.25,
    velX: Math.random() * 2 + 1,
    velY: -Math.random() * 1.5 - 0.5,
  };
};

export const ParticlesBg = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const numParticles = 200;
  const particles = useRef<Particle[]>([]);
  const screenHeight = useRef<number | null>(null);
  const screenWidth = useRef<number | null>(null);
  const prevWidth = useRef<number | null>(null);
  const prevHeight = useRef<number | null>(null);

  const resizeCanvas = () => {
    console.log("resize canvas");
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width =
        document.body.clientWidth > 1000
          ? document.body.clientWidth
          : window.innerWidth;
      canvas.height =
        document.body.clientWidth > 1000
          ? document.body.clientHeight
          : window.innerHeight;

      const { width, height } = canvas;
      particles.current = Array.from(
        { length: canvas.width > 1000 ? numParticles : 10 },
        () => createParticle(width, height)
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

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      if (prevWidth.current !== newWidth) {
        prevWidth.current = newWidth;
        prevHeight.current = newHeight;

        resizeCanvas();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [numParticles]);

  useEffect(() => {
    screenWidth.current = window.innerWidth;
    screenHeight.current = window.innerHeight;
    prevWidth.current = window.innerWidth;
    prevHeight.current = window.innerHeight;
  }, []);

  return (
    <div className={particleStyles.canvasWrapper}>
      <canvas ref={canvasRef} />
    </div>
  );
};
