"use client";
import { useRef, useEffect, useCallback } from "react";
import lineStyles from "@/styles/svg-line.module.css";
import debounce from "lodash.debounce";

export const Line = () => {
  const parentSvg = useRef<HTMLDivElement | null>(null);
  const svgPath = useRef<SVGPathElement | null>(null);
  const progressRef = useRef<number>(0);
  const xRef = useRef<number>(0.5);
  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
  let time: number = 0;
  let reqAnimationId: number | null = null;

  const setPath = useCallback((progress: number, x: number) => {
    if (parentSvg.current) {
      const w = parentSvg.current.getBoundingClientRect().width;
      if (svgPath.current) {
        svgPath.current.setAttributeNS(
          null,
          "d",
          `M0 250 Q ${w * x} ${250 + progress}, ${w} 250`
        );
      }
    }
  }, []);

  useEffect(() => {
    setPath(progressRef.current, xRef.current);
  }, [setPath]);

  useEffect(() => {
    const handleResize = debounce(() => {
      if (reqAnimationId) {
        cancelAnimationFrame(reqAnimationId);
      }
      setPath(progressRef.current, xRef.current);
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [reqAnimationId, setPath]);

  const handleMouseEnter = () => {
    if (reqAnimationId) {
      cancelAnimationFrame(reqAnimationId);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { movementY, clientX } = e;
    const bound = svgPath.current?.getBoundingClientRect();
    if (bound) {
      xRef.current = (clientX - bound.left) / bound.width;
    }
    progressRef.current += movementY;
    setPath(progressRef.current, xRef.current);
  };

  const animateReset = () => {
    const progress = progressRef.current;
    progressRef.current = lerp(progressRef.current, 0, 0.09);
    time += 0.2;
    setPath(progress, xRef.current);
    if (Math.abs(progressRef.current) > 0.75) {
      reqAnimationId = requestAnimationFrame(animateReset);
    } else {
      resetAnimation();
    }
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      animateReset();
    }, 50);
  };

  const resetAnimation = () => {
    time = 0;
    progressRef.current = 0;
  };

  return (
    <div ref={parentSvg} className={lineStyles.line}>
      <div
        className={lineStyles.lineBox}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      ></div>
      <svg>
        <path ref={svgPath}></path>
      </svg>
    </div>
  );
};
