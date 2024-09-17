"use client";

import { medium, montserrat } from "@/ui/fonts";
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
      <span
        className={[
          montserrat.className,
          preloaderStyles.percentText,
          defaultStyles.textPrimary,
          loading ? "" : defaultStyles.textRevealInitial,
        ].join(" ")}
      >
        {progress}%
      </span>
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
