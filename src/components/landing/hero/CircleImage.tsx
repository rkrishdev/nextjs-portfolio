import heroStyles from "@/styles/hero.module.css";
import { AnimationControls, useAnimation } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect } from "react";

export const CircleImage = ({ loading }: { loading: boolean }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (!loading) {
      controls.start({ scale: 1 });
    }
  }, [loading, controls]);
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.img
        src={"/assets/img/others/landing-circle-arrow.png"}
        width={0}
        height={0}
        sizes="100%"
        alt="circle arrow"
        className={[heroStyles.circleImage, heroStyles.circleImageDesktop].join(
          " "
        )}
        initial={{ scale: 0 }}
        animate={controls}
        transition={{ duration: 2, ease: "anticipate", delay: 0.1 }}
      />
      <div className={heroStyles.circleImageMobileContainer}>
        <motion.img
          src={"/assets/img/others/landing-circle-arrow-mb.png"}
          width={0}
          height={0}
          sizes="100%"
          alt="circle arrow"
          className={[
            heroStyles.circleImage,
            heroStyles.circleImageMobile,
          ].join(" ")}
        />
      </div>
    </div>
  );
};
