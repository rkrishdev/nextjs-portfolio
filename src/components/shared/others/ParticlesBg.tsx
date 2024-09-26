"use client";

import { useEffect, useRef, useCallback } from "react";
import particleStyles from "@/styles/particles-bg.module.css";
import debounce from "lodash.debounce";
import { usePreloader } from "@/context/PreloaderContext";

const MAX_PARTICLES_LARGE = 175;
const MAX_PARTICLES_SMALL = 15;
const SIZE_LARGE_MIN = 0.25;
const SIZE_LARGE_MAX = 1;
const SIZE_SMALL_MIN = 0.2;
const SIZE_SMALL_MAX = 1;

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
): Particle => ({
  x: Math.random() * canvasWidth,
  y: Math.random() * canvasHeight,
  size:
    canvasWidth > 1000
      ? Math.random() * (SIZE_LARGE_MAX - SIZE_LARGE_MIN) + SIZE_LARGE_MIN
      : Math.random() * (SIZE_SMALL_MAX - SIZE_SMALL_MIN) + SIZE_SMALL_MIN,
  velX:
    canvasWidth > 1000 ? Math.random() * 5 + 1.5 : Math.random() * 2.75 + 0.5,
  velY:
    canvasWidth > 1000
      ? -Math.random() * 2.5 - 0.75
      : -Math.random() * 2 - 0.75,
});

export const ParticlesBg = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const prevWidth = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const { loading } = usePreloader();

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

      const numParticles =
        width > 1000 ? MAX_PARTICLES_LARGE : MAX_PARTICLES_SMALL;
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

    particles.current.forEach((particle) => {
      particle.x += particle.velX;
      particle.y += particle.velY;

      if (particle.x > width) {
        particle.x = 0;
        particle.y = Math.random() * height;
      } else if (particle.y < 0) {
        particle.x = Math.random() * width;
        particle.y = height;
      } else if (particle.y > height) {
        particle.x = Math.random() * width;
        particle.y = 0;
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

    const handleResize = debounce(() => {
      const newWidth = window.innerWidth;
      if (prevWidth.current !== newWidth) {
        prevWidth.current = newWidth;
        resizeCanvas();
      }
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [render]);

  useEffect(() => {
    if (!loading) {
      render();
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [render, loading]);

  return (
    <div className={particleStyles.canvasWrapper}>
      <canvas ref={canvasRef} />
    </div>
  );
};
