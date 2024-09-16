"use client";

import skillsStyles from "@/styles/skills.module.css";
import defaultStyles from "@/styles/default.module.css";
import { medium, montserrat } from "@/ui/fonts";
import { useRevealInView } from "@/hooks/useRevealInView";

export const Others = () => {
  const { ref, className } = useRevealInView(
    defaultStyles.textRevealInitial,
    defaultStyles.textRevealAnimation
  );
  return (
    <div
      ref={ref}
      className={[
        defaultStyles.containerSpace,
        skillsStyles.othersGrid,
        className,
      ].join(" ")}
    >
      <div className={skillsStyles.othersGridItem}>
        <h6
          className={[
            medium.className,
            defaultStyles.textNormal,
            defaultStyles.textSpaceLarge,
          ].join(" ")}
        >
          Frontend
        </h6>
        <p
          className={[montserrat.className, defaultStyles.textNormal].join(" ")}
        >
          HTML 5, CSS 3, JavaScript, Bootstrap 5, Three.js, jQuery, React and
          Material UI
        </p>
      </div>
      <div className={skillsStyles.othersGridItem}>
        <h6
          className={[
            medium.className,
            defaultStyles.textNormal,
            defaultStyles.textSpaceLarge,
          ].join(" ")}
        >
          Backend
        </h6>
        <p
          className={[montserrat.className, defaultStyles.textNormal].join(" ")}
        >
          PHP, CodeIgniter, Linux, Websocket, Express.js, MySQL, Docker and Apache
        </p>
      </div>
      <div className={skillsStyles.othersGridItem}>
        <h6
          className={[
            medium.className,
            defaultStyles.textNormal,
            defaultStyles.textSpaceLarge,
          ].join(" ")}
        >
          Scripting and Testing Tools
        </h6>
        <p
          className={[montserrat.className, defaultStyles.textNormal].join(" ")}
        >
          TypeScript, Git, GitHub and Vitest
        </p>
      </div>
      <div className={skillsStyles.othersGridItem}>
        <h6
          className={[
            medium.className,
            defaultStyles.textNormal,
            defaultStyles.textSpaceLarge,
          ].join(" ")}
        >
          Design Tools
        </h6>
        <p
          className={[montserrat.className, defaultStyles.textNormal].join(" ")}
        >
          Photoshop, Figma and Adobe XD (beginner)
        </p>
      </div>
    </div>
  );
};
