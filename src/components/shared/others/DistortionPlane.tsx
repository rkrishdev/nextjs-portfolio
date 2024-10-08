import * as THREE from "three";
import { fragmentShader, vertexShader } from "./DistortionShaders";
import { useCursor } from "@/context/CursorContext";
import { useFrame, useThree, Vector3 } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";

interface PlaneProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imageRef: React.RefObject<HTMLImageElement>;
  meshClassName?: string;
  handleMouseEnter?: MouseEvent;
  handleMouseOut?: MouseEvent;
  enableHoverEvents?: boolean;
}

const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t;
};

export const DistortionPlane = ({
  imageRef,
  canvasRef,
  enableHoverEvents,
}: PlaneProps) => {
  const { cursorHandlers } = useCursor();
  const image = useRef<THREE.Mesh>(null);
  const texture = useRef(new THREE.Texture());
  const { viewport } = useThree();

  useEffect(() => {
    if (imageRef.current) {
      texture.current.image = imageRef.current;
      texture.current.minFilter = THREE.LinearFilter;
      texture.current.magFilter = THREE.LinearFilter;
      texture.current.needsUpdate = true;
    }
  }, [imageRef]);

  const width = imageRef.current?.naturalWidth || 1;
  const height = imageRef.current?.naturalHeight || 1;
  const aspectRatio = width / height;

  const scaleWidth = viewport.width;
  const scaleHeight = scaleWidth / aspectRatio;

  const scale: Vector3 = [scaleWidth, scaleHeight, 1];

  const uniforms = useRef({
    uTexture: { value: texture.current },
    uOffset: { value: new THREE.Vector2(0, 0) },
    uRgbOffset: { value: new THREE.Vector2(0, 0) },
    uAlpha: { value: 1.0 },
    uRgbShiftIntensity: { value: 1 },
    uMaxOffset: { value: 0.05 },
    uMaxRGBOffset: { value: 0.02 },
    uScale: { value: new THREE.Vector3(scaleWidth, scaleHeight, 1) },
  });

  const [targetScrollY, setTargetScrollY] = useState(0);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const ease = 0.075;

  useEffect(() => {
    const handleScroll = () => {
      setTargetScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame(() => {
    const newScrollY = lerp(currentScrollY, targetScrollY, ease);
    setCurrentScrollY(newScrollY);

    const scrollDelta = newScrollY - currentScrollY;
    const widthScale = scaleWidth;
    const heightScale = scaleHeight;

    const normalizedHeight = heightScale / viewport.height;
    const normalizedWidth = widthScale / viewport.width;

    const offsetAmount =
      scrollDelta *
      normalizedHeight *
      normalizedWidth *
      (scaleWidth < scaleHeight ? 0.0055 : 0.01);

    const rgbOffsetAmount = scrollDelta * 0.001;

    uniforms.current.uOffset.value.set(0, offsetAmount);
    uniforms.current.uRgbOffset.value.set(0, rgbOffsetAmount);
  });

  const handlePointerEnter = (event: THREE.Event) => {
    if (enableHoverEvents) {
      cursorHandlers.manageMouseEnter(
        event as unknown as React.MouseEvent<HTMLElement>,
        canvasRef.current
      );
    }
  };

  const handlePointerOut = (event: THREE.Event) => {
    if (enableHoverEvents) {
      cursorHandlers.manageMouseOut(
        event as unknown as React.MouseEvent<HTMLElement>
      );
    }
  };

  return (
    <mesh
      ref={image}
      scale={scale}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerOut}
    >
      <planeGeometry args={[1, 1, 15, 15]} />
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};
