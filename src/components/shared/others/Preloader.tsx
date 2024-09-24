"use client";

import { medium, montserrat } from "@/styles/fonts/fonts";
import defaultStyles from "@/styles/default.module.css";
import preloaderStyles from "@/styles/preloader.module.css";
import { usePreloader } from "@/context/PreloaderContext";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";

export const Preloader = () => {
  const [hide, setHide] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { loading, progress } = usePreloader();
  const lenis = useLenis();

  const [strokeDashoffset, setStrokeDashoffset] = useState<number>(565.48);

  useEffect(() => {
    if (loading) {
      lenis?.stop();
    } else {
      window.scrollTo(0, 0);
      setTimeout(() => {
        lenis?.start();
      }, 1400);

      setTimeout(() => {
        setHide(true);
      }, 650);
    }
  }, [lenis, loading]);

  useEffect(() => {
    const strokeDasharrayPercent = 565.48 / 100;
    const currentProgress = 565.48 - progress * strokeDasharrayPercent;

    setStrokeDashoffset(currentProgress);
  }, [progress]);

  return (
    <motion.div
      className={preloaderStyles.container}
      transition={{ duration: 0.5, ease: "easeOut" }}
      animate={
        !hide
          ? {}
          : {
              translateY: "-100%",
            }
      }
      onAnimationComplete={() => setIsVisible(false)}
      initial={{ translateY: 0 }}
      style={{ display: isVisible ? "flex" : "none" }}
    >
      <svg
        className={[
          preloaderStyles.svgContainer,
          loading ? "" : defaultStyles.textRevealInitial,
        ].join(" ")}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          r="90"
          cx="100"
          cy="100"
          className={preloaderStyles.svgCircleBg}
        ></circle>
        <circle
          r="90"
          cx="100"
          cy="100"
          strokeDashoffset={strokeDashoffset}
          className={preloaderStyles.svgCircleProgress}
        ></circle>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          className={[montserrat.className, preloaderStyles.svgText].join(" ")}
        >
          {progress}%
        </text>
      </svg>
      <h2
        className={[
          medium.className,
          defaultStyles.textPrimary,
          defaultStyles.textNormal,
          preloaderStyles.loadingText,
          loading ? "" : defaultStyles.textRevealInitial,
        ].join(" ")}
      >
        Loading! please wait...
      </h2>
    </motion.div>
  );
};
