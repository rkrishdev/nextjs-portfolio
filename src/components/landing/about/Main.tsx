"use client";

import defaultStyles from "@/styles/default.module.css";
import aboutStyles from "@/styles/about.module.css";
import TextContent from "./TextContent";
import { DistortionCanvas } from "@/components/shared/others/DistortionCanvas";

export const About = () => {
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
        <DistortionCanvas
          className={[aboutStyles.profileImage].join(" ")}
          canvasClass={["cursorAnimationTrigger", "animation:invert-bg"].join(
            " "
          )}
          altName="Rakshankrishnan S"
          enableHoverEvents={true}
          imageSrc={"/assets/imgs/others/rk.jpg"}
        />
      </div>
      <TextContent />
    </div>
  );
};
