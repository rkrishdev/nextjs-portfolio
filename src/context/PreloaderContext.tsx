"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface PreloaderContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  initParticles: boolean;
  setInitParticles: React.Dispatch<React.SetStateAction<boolean>>;
  imagesLoaded: number;
  setImagesLoaded: React.Dispatch<React.SetStateAction<number>>;
  earthLoaded: boolean;
  setEarthLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  resizeParticles: number;
  setResizeParticles: React.Dispatch<React.SetStateAction<number>>;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(
  undefined
);

export const PreloaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [checkForEarthLoad, setCheckForEarthLoad] = useState<boolean>(false);
  const [earthLoaded, setEarthLoaded] = useState<boolean>(false);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);
  const [initParticles, setInitParticles] = useState<boolean>(false);
  const [resizeParticles, setResizeParticles] = useState<number>(0);

  useEffect(() => {
    const loadHandler = () => {
      const total = document.querySelectorAll(".checkForload").length || 0;
      setTotalImages(total);
    };

    const observer = new MutationObserver(loadHandler);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (totalImages && imagesLoaded && imagesLoaded >= totalImages) {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + (imagesLoaded / totalImages) * 75;
        return Math.round(Math.min(newProgress, 100));
      });

      if (imagesLoaded === totalImages) {
        setCheckForEarthLoad(true);
      }
    }
  }, [totalImages, imagesLoaded]);

  useEffect(() => {
    if (checkForEarthLoad) {
      setProgress(100);
      setTimeout(() => setInitParticles(true), 1000);
      setTimeout(() => setLoading(false), 1500);
    }
  }, [checkForEarthLoad]);

  return (
    <PreloaderContext.Provider
      value={{
        loading,
        setLoading,
        progress,
        setProgress,
        initParticles,
        setInitParticles,
        imagesLoaded,
        setImagesLoaded,
        earthLoaded,
        setEarthLoaded,
        resizeParticles,
        setResizeParticles,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
};

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
}
