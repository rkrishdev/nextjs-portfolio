import defaultStyles from "@/styles/default.module.css";
import heroStyles from "@/styles/hero.module.css";
import { montserrat } from "@/styles/fonts/fonts";
import {
  motion,
  AnimationControls,
  useScroll,
  useTransform,
  animate,
} from "framer-motion";
import Image from "next/image";
import { DistortionCanvas } from "@/components/shared/others/DistortionCanvas";
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

  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const scaleRef = useRef(1);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        scaleRef.current = 1.2;
        setScale(1.2);
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
      }, 100);
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
        <div className={[heroStyles.bgImageOverflow].join(" ")}>
          <div
            className={[
              heroStyles.bgImageContainer,
              revealComplete ? heroStyles.revealed : "",
            ].join(" ")}
          >
            <motion.div
              style={{
                scale: revealComplete ? scrollScale : scale,
              }}
              transition={{ duration: 0 }}
            >
              <DistortionCanvas
                className={[heroStyles.bgImage].join(" ")}
                canvasClass={[
                  "cursorAnimationTrigger",
                  "animation:show-description",
                ].join(" ")}
                altName="Landing Background"
                enableHoverEvents={true}
                imageSrc={"/assets/imgs/background/landing-bg.webp"}
                dataAnimationDescription="It's all about the journey!"
              />
            </motion.div>
          </div>
        </div>
        <Image
          src={"/assets/imgs/background/landing-gradient.webp"}
          width={0}
          height={0}
          sizes="100%"
          alt="Landing gradient"
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
