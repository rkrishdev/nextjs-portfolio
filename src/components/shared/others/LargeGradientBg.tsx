"use client";

import { usePreloader } from "@/context/PreloaderContext";
import { useEffect, useState } from "react";

export const LargeGradientBg = () => {
  const { loading } = usePreloader();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsLoaded(true);
    }
  }, [loading]);

  if (!isLoaded) {
    return null;
  }

  return <div className="footerGradientBg"></div>;
};
