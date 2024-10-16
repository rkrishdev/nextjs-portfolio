"use client";

import scrollProgressStyles from "@/styles/scroll-progress.module.css";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.0015,
  });

  return (
    <motion.div className={scrollProgressStyles.progress} style={{ scaleX }} />
  );
};
