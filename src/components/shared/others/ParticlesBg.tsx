"use client";

import { useEffect, useRef, useCallback } from "react";
import particleStyles from "@/styles/particles-bg.module.css";
import debounce from "lodash.debounce";

const MAX_PARTICLES_LARGE = 175;
const MAX_PARTICLES_SMALL = 15;
const SIZE_LARGE_MIN = 0.2;
const SIZE_LARGE_MAX = 0.85;
const SIZE_SMALL_MIN = 0.2;
const SIZE_SMALL_MAX = 0.75;

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
  velX: canvasWidth > 1000 ? Math.random() * 5 + 1.5 : Math.random() * 3.5 + 1.5,
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

    const handleResize = debounce(() => {
      const newWidth = window.innerWidth;
      if (prevWidth.current !== newWidth) {
        prevWidth.current = newWidth;
        resizeCanvas();
      }
    }, 250);

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
