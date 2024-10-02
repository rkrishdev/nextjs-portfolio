"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LoadingManager, TextureLoader } from "three";

interface PreloaderContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  initParticles: boolean;
  imagesLoaded: number;
  setImagesLoaded: React.Dispatch<React.SetStateAction<number>>;
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
  const [checkForImageLoad, setCheckForImageLoad] = useState<boolean>(false);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);
  const [initParticles, setInitParticles] = useState<boolean>(false);

  useEffect(() => {
    const manager = new LoadingManager();
    const loader = new TextureLoader(manager);

    manager.onStart = () => {
      setLoading(true);
      setProgress(0);
    };

    manager.onLoad = () => {
      setCheckForImageLoad(true);
    };

    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      setProgress(() =>
        Math.round(Math.min(50, (itemsLoaded / itemsTotal) * 50))
      );
    };

    manager.onError = (url) => {
      console.error(`There was an error loading ${url}`);
    };

    loader.load("/assets/imgs/3d/Earth-texture.jpeg");
    loader.load("/assets/imgs/3d/normal.webp");
    loader.load("/assets/imgs/3d/occlusion.jpg");
    loader.load("/assets/imgs/3d/Earth-clouds.png");
  }, []);

  useEffect(() => {
    console.log("check for image load");
    window.onload = () => {
      const total: number =
        document.querySelectorAll(".checkForload")?.length || 0;
      setTotalImages(total);
      console.log(
        "check for image load",
        document.querySelectorAll(".checkForload")
      );
    };

    return () => {
      window.onload = null;
    };
  }, [checkForImageLoad]);

  useEffect(() => {
    console.log("check image load - imagesLoaded: ", imagesLoaded);
    console.log("check image load - totalImages: ", totalImages);
    if (imagesLoaded && totalImages) {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + (imagesLoaded / totalImages) * 50;
        return Math.round(Math.min(newProgress, 100));
      });

      if (imagesLoaded === totalImages) {
        setTimeout(() => setInitParticles(true), 1000);
        setTimeout(() => setLoading(false), 1500);
      }
    }
  }, [totalImages, imagesLoaded]);

  return (
    <PreloaderContext.Provider
      value={{
        loading,
        setLoading,
        progress,
        setProgress,
        initParticles,
        imagesLoaded,
        setImagesLoaded,
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
