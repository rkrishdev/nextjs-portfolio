"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LoadingManager, TextureLoader } from "three";

interface PreloaderContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
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

  useEffect(() => {
    const manager = new LoadingManager();
    const loader = new TextureLoader(manager);

    manager.onStart = () => {
      setLoading(true);
      setProgress(0);
    };

    manager.onLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      setProgress((itemsLoaded / itemsTotal) * 100);
    };

    manager.onError = (url) => {
      console.error(`There was an error loading ${url}`);
    };

    loader.load("/assets/imgs/3d/1659628176600.jpg");
    loader.load("/assets/imgs/3d/normal.png");
    loader.load("/assets/imgs/3d/occlusion.jpg");
    loader.load("/assets/imgs/3d/Earth-clouds.png");
  }, []);

  return (
    <PreloaderContext.Provider
      value={{ loading, setLoading, progress, setProgress }}
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
