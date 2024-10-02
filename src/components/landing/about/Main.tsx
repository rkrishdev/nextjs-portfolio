"use client";

import defaultStyles from "@/styles/default.module.css";
import aboutStyles from "@/styles/about.module.css";
import Image from "next/image";
import TextContent from "./TextContent";
import { useCursor } from "@/context/CursorContext";

export const About = () => {
  const { cursorHandlers } = useCursor();

  return (
    <div
      id="about"
      className={[
        defaultStyles.containerSpace,
        defaultStyles.sectionSpace,
        aboutStyles.container,
      ].join(" ")}
    >
      <div className={aboutStyles.imageContainer}>
        <Image
          src={"/assets/imgs/others/rk.JPG"}
          width={0}
          height={0}
          sizes="100%"
          alt="circle arrow"
          className={[
            aboutStyles.profileImage,
            "cursorAnimationTrigger",
            "animation:invert-bg",
          ].join(" ")}
          priority
          loading="eager"
          onMouseEnter={(e) => cursorHandlers.manageMouseEnter(e)}
          onMouseOut={(e) => cursorHandlers.manageMouseOut(e)}
        />
      </div>
      <TextContent />
    </div>
  );
};
