"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import cursorFollowerstyles from "@/styles/cursor-follower.module.css";
import { useEffect } from "react";
import { montserrat } from "@/styles/fonts/fonts";

export const CursorFollower = () => {
  const { allowCursor, cursorFollower, cursorSize, showText } = useCursor();
  const { isHovered } = useCursor();

  const cursorPosition = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 30, stiffness: 300, mass: 0.7 };
  const smoothMouse = {
    x: useSpring(cursorPosition.x, smoothOptions),
    y: useSpring(cursorPosition.y, smoothOptions),
  };

  useEffect(() => {
    const manageMouseMove = (event: MouseEvent) => {
      if (!allowCursor) return;

      const { clientX, clientY } = event;

      if (isHovered === "position:center") {
        cursorPosition.x.set(clientX - (cursorSize * 4) / 2);
        cursorPosition.y.set(clientY - (cursorSize * 4) / 2);
      } else {
        cursorPosition.x.set(clientX + cursorSize / 2);
        cursorPosition.y.set(clientY + cursorSize);
      }
    };

    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [allowCursor, isHovered, cursorPosition.x, cursorPosition.y, cursorSize]);

  return (
    <motion.div
      ref={cursorFollower}
      style={{
        display: allowCursor ? "" : "none",
        left: smoothMouse.x,
        top: smoothMouse.y,
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
      }}
      className={cursorFollowerstyles.cursorFollower}
    >
      <motion.div
        className={[
          montserrat.className,
          cursorFollowerstyles.textContainer,
          "textContainer",
        ].join(" ")}
        initial={{ opacity: 0 }}
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};
