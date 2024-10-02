"use client";

import defaultStyles from "@/styles/default.module.css";
import { medium, montserrat } from "@/styles/fonts/fonts";
import { List } from "./List";
import projectStyles from "@/styles/projects.module.css";
import { useRevealInView } from "@/hooks/useRevealInView";

export const Projects = () => {
  const { ref, className } = useRevealInView(
    defaultStyles.textRevealInitial,
    defaultStyles.textRevealAnimation
  );
  return (
    <div
      id="projects"
      className={[
        defaultStyles.sectionSpace,
        defaultStyles.containerSpace,
      ].join(" ")}
    >
      <div ref={ref} className={[className].join(" ")}>
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
          Building large-scale internal products like CRM/ERP panels and dynamic
          websites, with exciting new projects on the way!
        </p>
      </div>
      <List />
    </div>
  );
};
