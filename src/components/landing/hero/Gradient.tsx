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
import { useCursor } from "@/context/CursorContext";

export const Gradient = ({
  loading,
  textControls,
}: {
  loading: boolean;
  textControls: AnimationControls;
}) => {
  const { cursorHandlers } = useCursor();
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
            className={[
              heroStyles.bgImage,
              "cursorAnimationTrigger",
              "animation:show-description",
            ].join(" ")}
            style={{
              scale: revealComplete ? scrollScale : scale,
              display: "block",
            }}
            data-animation-description="It's all about the journey!"
            onMouseEnter={(e) => cursorHandlers.manageMouseEnter(e)}
            onMouseOut={(e) => cursorHandlers.manageMouseOut(e)}
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
          I&apos;m a full stack web developer based in India. Exploring my
          journey through tech endeavors.
        </motion.p>
      </div>
    </>
  );
};
