import defaultStyles from "@/styles/default.module.css";
import heroStyles from "@/styles/hero.module.css";
import { montserrat } from "@/styles/fonts/fonts";
import {
  motion,
  useScroll,
  useTransform,
  animate,
  AnimationControls,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const Gradient = ({
  loading,
  textControls,
}: {
  loading: boolean;
  textControls: AnimationControls;
}) => {
  const { scrollYProgress } = useScroll();
  const [revealComplete, setRevealComplete] = useState(false);

  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);

  const scaleRef = useRef(1.3);
  const [scale, setScale] = useState(1.3);

  useEffect(() => {
    if (!loading) {
      const controls = animate(scaleRef.current, 1, {
        duration: 1,
        delay: 0.5,
        ease: "anticipate",
        onUpdate: (latest) => {
          setScale(latest);
          scaleRef.current = latest;
        },
        onComplete: () => {
          setRevealComplete(true);
        },
      });

      return () => controls.stop();
    }
  }, [loading]);

  return (
    <>
      <div
        className={[
          heroStyles.imageContainer,
          defaultStyles.containerSpace,
        ].join(" ")}
      >
        <div
          className={defaultStyles.textSpaceLarge}
          style={{ overflow: "hidden" }}
        >
          <motion.img
            src={"/assets/imgs/background/landing-bg.webp"}
            width={0}
            height={0}
            sizes="100vw"
            alt="landing bg"
            className={heroStyles.bgImage}
            style={{
              scale: revealComplete ? scrollScale : scale,
              display: "block",
            }}
          />
        </div>
        <Image
          src={"/assets/imgs/background/landing-gradient.webp"}
          width={0}
          height={0}
          sizes="100%"
          alt="landing gradient"
          quality={100}
          className={heroStyles.gradientImage}
          priority
        />
      </div>
      <div
        className={heroStyles.firstTextMobileWrapper}
        style={{ overflow: "hidden" }}
      >
        <motion.p
          className={[
            defaultStyles.textLarge,
            montserrat.className,
            heroStyles.firstTextMobile,
            defaultStyles.containerSpace,
          ].join(" ")}
          initial={{ y: 100 }}
          animate={textControls}
          transition={{ duration: 2, ease: "anticipate", delay: 0.1 }}
        >
          Full Stack Developer, exploring web technologies in my fascinating
          journey through endeavors
        </motion.p>
      </div>
    </>
  );
};
