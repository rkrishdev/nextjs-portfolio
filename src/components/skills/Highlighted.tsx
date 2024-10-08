"use client";

import skillsStyles from "@/styles/skills.module.css";
import defaultStyles from "@/styles/default.module.css";
import { montserrat } from "@/styles/fonts/fonts";
import Image from "next/image";
import { usePreloader } from "@/context/PreloaderContext";
import { useEffect, useRef, useState } from "react";

const techLogos = [
  { src: "/assets/imgs/logos/nextjs.webp", alt: "Next.js", name: "Next.js" },
  { src: "/assets/imgs/logos/nodejs.webp", alt: "Node.js", name: "Node.js" },
  { src: "/assets/imgs/logos/laravel.webp", alt: "Laravel", name: "Laravel" },
  { src: "/assets/imgs/logos/sass.webp", alt: "SASS", name: "SASS" },
  {
    src: "/assets/imgs/logos/tailwind.webp",
    alt: "Tailwind",
    name: "Tailwind CSS",
  },
];

export const Highlighted = () => {
  const [imageLoadedCount, setImageLoadedCount] = useState(0);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const { totalImages } = usePreloader();

  const handleOnLoad = () => {
    setImageLoadedCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (imageLoadedCount === techLogos.length && totalImages.length > 0) {
      techLogos.forEach(({ src }) => {
        totalImages.filter((i) => {
          if (!i.loaded && i.src === src) {
            i.loaded = true;
          }
        });
      });
    }
  }, [imageLoadedCount, totalImages]);

  return (
    <div className={skillsStyles.highlight}>
      <div
        className={[defaultStyles.containerSpace, skillsStyles.grid].join(" ")}
      >
        {techLogos.map(({ src, alt, name }, index) => (
          <div key={name} className={skillsStyles.gridItem}>
            <Image
              ref={(el) => {
                if (el) {
                  imageRefs.current[index] = el;
                }
              }}
              className={[skillsStyles.gridItemLogo, "checkForload"].join(" ")}
              src={src}
              width={0}
              height={0}
              sizes="100vw"
              alt={alt}
              loading="eager"
              onLoad={handleOnLoad}
              onError={(e) => {
                console.error("Image failed to load", e);
                handleOnLoad();
              }}
              data-src={src}
            />
            <h6 className={`${montserrat.className} ${defaultStyles.text2XL}`}>
              {name}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
};
