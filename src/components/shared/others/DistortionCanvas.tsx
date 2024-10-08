import { Canvas } from "@react-three/fiber";
import { useRef, useEffect, useState, useMemo } from "react";
import distortionCanvasStyles from "@/styles/distortion-canvas.module.css";
import { usePreloader } from "@/context/PreloaderContext";
import debounce from "lodash.debounce";
import { DistortionPlane } from "./DistortionPlane";
import { motion } from "framer-motion";

interface WaveDistortionSceneProps
  extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  altName: string;
  meshClassName?: string;
  canvasClass?: string;
  dataAnimationDescription?: string;
  enableHoverEvents?: boolean;
}

export const DistortionCanvas = ({
  imageSrc,
  altName,
  className,
  canvasClass,
  dataAnimationDescription,
  enableHoverEvents = false,
}: WaveDistortionSceneProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [renderCanvas, setRenderCanvas] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { totalImages, setResizeParticles } = usePreloader();

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = debounce(() => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width > 1000) {
        setRenderCanvas(true);
        setResizeParticles((s) => s + 1);
      } else {
        setRenderCanvas(false);
      }
    }, 100);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setResizeParticles]);

  useEffect(() => {
    if (imageRef.current) {
      if (windowWidth > 1000) setRenderCanvas(true);
    }
  }, [windowWidth, imageRef]);

  useEffect(() => {
    if (
      imageRef.current &&
      imageRef.current.complete &&
      totalImages.length > 0
    ) {
      totalImages.filter((i) => {
        if (!i.loaded && i.src === imageRef.current?.getAttribute("data-src")) {
          i.loaded = true;
        }
      });
    }
  }, [totalImages, imageRef]);

  return (
    <>
      <motion.img
        className={[
          "checkForload",
          className,
          distortionCanvasStyles.image,
        ].join(" ")}
        ref={imageRef}
        src={imageSrc}
        data-src={imageSrc}
        alt={altName}
        loading="eager"
      />

      {renderCanvas && (
        <div
          className={[className, distortionCanvasStyles.canvasContainer].join(
            " "
          )}
        >
          <Canvas
            ref={canvasRef}
            className={canvasClass}
            data-animation-description={dataAnimationDescription}
            style={{ width: "100%", height: "100%" }}
          >
            <DistortionPlane
              canvasRef={canvasRef}
              imageRef={imageRef}
              enableHoverEvents={enableHoverEvents}
            />
          </Canvas>
        </div>
      )}
    </>
  );
};
