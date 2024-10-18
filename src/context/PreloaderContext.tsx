"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ImageType = {
  src: string;
  image: HTMLImageElement;
  loaded: boolean;
};

interface PreloaderContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  initParticles: boolean;
  setInitParticles: React.Dispatch<React.SetStateAction<boolean>>;
  totalImages: ImageType[];
  setTotalImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
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
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);
  const [totalImages, setTotalImages] = useState<ImageType[]>([]);
  const [initParticles, setInitParticles] = useState<boolean>(false);
  const [resizeParticles, setResizeParticles] = useState<number>(0);

  useEffect(() => {
    const loadHandler = () => {
      const imgSrc: ImageType[] = [];
      const imgs = document.querySelectorAll(".checkForload");
      imgs?.forEach((i) => {
        const img = i as HTMLImageElement;
        const src = img.getAttribute("data-src");
        const isNew = imgSrc.find((ic) => ic.src === src) === undefined;
        if (img.src && isNew && src) {
          imgSrc.push({
            src: src,
            image: img,
            loaded: false,
          });
        }
      });

      setTotalImages(imgSrc);
    };

    const observer = new MutationObserver(loadHandler);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (totalImages.length > 0) {
      let imagesLoadedCount: number = 0;
      totalImages.map((i) => (i.loaded ? imagesLoadedCount++ : ""));
      setImagesLoaded(imagesLoadedCount);
      if (imagesLoaded >= totalImages.length) {
        setCheckForEarthLoad(true);
      }

      setProgress((prevProgress) => {
        const newProgress =
          prevProgress + (imagesLoaded / totalImages.length) * 75;
        return Math.round(Math.min(newProgress, 100));
      });
    }
  }, [imagesLoaded, totalImages]);

  useEffect(() => {
    if (checkForEarthLoad) {
      setProgress(100);
      closePreloader();
    }
  }, [checkForEarthLoad]);

  const closePreloader = () => {
    setTimeout(() => {
      setInitParticles(true);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const checkIfPreloaderVisible = () => {
      if (progress >= 100 && checkForEarthLoad && loading) {
        closePreloader();
      }
    };
    const intervalId = setInterval(() => checkIfPreloaderVisible(), 2000);

    return () => clearInterval(intervalId);
  }, [checkForEarthLoad, loading, progress]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        totalImages.length >= imagesLoaded &&
        !checkForEarthLoad
      ) {
        setCheckForEarthLoad(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [totalImages, imagesLoaded, checkForEarthLoad]);

  return (
    <PreloaderContext.Provider
      value={{
        loading,
        setLoading,
        progress,
        setProgress,
        initParticles,
        setInitParticles,
        totalImages,
        setTotalImages,
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
