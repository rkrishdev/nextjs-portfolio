"use client";

import defaultStyles from "@/styles/default.module.css";
import { medium, montserrat } from "@/styles/fonts/fonts";
import { List } from "./List";
import projectStyles from "@/styles/projects.module.css";

export const Projects = () => {
  return (
    <div
      id="projects"
      className={[
        defaultStyles.sectionSpace,
        defaultStyles.containerSpace,
      ].join(" ")}
    >
      <h3
        className={[
          medium.className,
          defaultStyles.headingStandard,
          defaultStyles.textPrimary,
          defaultStyles.letterSpacingDefault,
          defaultStyles.textCenter,
          defaultStyles.textSpaceLarge,
        ].join(" ")}
      >
        Projects
      </h3>
      <p
        className={[
          montserrat.className,
          defaultStyles.textLarge,
          defaultStyles.textCenter,
          projectStyles.titleText,
        ].join(" ")}
      >
        Built large-scale internal products like CRM/ERP panels and dynamic
        websites. Exciting new Node.js projects are on the way!
      </p>
      <List />
    </div>
  );
};
