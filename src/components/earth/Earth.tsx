import { Canvas, useLoader } from "@react-three/fiber";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState, useMemo, useCallback } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { motion } from "framer-motion-3d";
import earthStyles from "@/styles/earth.module.css";

export default function Earth() {
  const [earthRotationValue, setEarthRotationValue] = useState<number>(0);
  const [cloudRotationValue, setCloudRotationValue] = useState<number>(0);
  const [scaleValue, setScaleValue] = useState<number>(2.85);
  const scene = useRef<HTMLDivElement | null>(null);
  let scaleAdder = 2.6;

  const { scrollYProgress } = useScroll({
    target: scene,
    offset: ["start end", "end start"],
  });

  const handleScroll = useCallback(
    (latest: number) => {
      const v = latest + 16.15;
      setEarthRotationValue(v * 0.2);
      setCloudRotationValue((v - 5.25) * 0.45);

      if (latest <= 0.5) {
        setScaleValue(scaleAdder + latest * 0.25);
      } else {
        setScaleValue(scaleAdder + (1 - latest) * 0.25);
      }
    },
    [scaleAdder]
  );

  useMotionValueEvent(scrollYProgress, "change", handleScroll);

  const [color, normal, aoMap, cloudMap] = useLoader(
    TextureLoader,
    useMemo(
      () => [
        "/assets/imgs/3d/Earth-texture.jpeg",
        "/assets/imgs/3d/normal.webp",
        "/assets/imgs/3d/occlusion.jpg",
        "/assets/imgs/3d/Earth-clouds.png",
      ],
      []
    )
  );

  return (
    <div ref={scene} className={earthStyles.canvasContainer}>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight
          intensity={2.15}
          position={[1, 0, 1.15]}
          color={"#f5f5f5"}
        />
        <motion.mesh
          scale={scaleValue}
          rotation-y={earthRotationValue}
          rotation-x={0.375}
        >
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
        </motion.mesh>
        <motion.mesh
          scale={scaleValue + 0.025}
          rotation-y={cloudRotationValue}
          rotation-x={0.375}
        >
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial map={cloudMap} transparent opacity={0.6} />
        </motion.mesh>
      </Canvas>
    </div>
  );
}
