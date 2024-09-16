"use client";

import defaultStyles from "@/styles/default.module.css";
import aboutStyles from "@/styles/about.module.css";
import Image from "next/image";
import TextContent from "./TextContent";

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
        <Image
          src={"/assets/img/others/rk.JPG"}
          width={0}
          height={0}
          sizes="100%"
          alt="circle arrow"
          className={aboutStyles.profileImage}
          priority
        />
      </div>
      <TextContent />
    </div>
  );
};
