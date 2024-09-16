"use client";

import defaultStyles from "@/styles/default.module.css";
import heroStyles from "@/styles/hero.module.css";
import { TextContent } from "./TextContent";
import { Gradient } from "./Gradient";
import { CircleImage } from "./CircleImage";
import { usePreloader } from "@/context/PreloaderContext";
import { useEffect } from "react";
import { useAnimation } from "framer-motion";

export const MainContent = () => {
  const { loading } = usePreloader();
  const textControls = useAnimation();

  useEffect(() => {
    if (!loading) {
      textControls.start({ y: 0 });
    }
  }, [loading, textControls]);

  return (
    <div
      id="home"
      className={[heroStyles.container, defaultStyles.relative].join(" ")}
    >
      <TextContent loading={loading} textControls={textControls} />
      <Gradient loading={loading} textControls={textControls} />
      <CircleImage loading={loading} />
    </div>
  );
};
