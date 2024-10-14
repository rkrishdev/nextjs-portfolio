"use client";

import skillsStyles from "@/styles/skills.module.css";
import defaultStyles from "@/styles/default.module.css";
import { medium, montserrat } from "@/styles/fonts/fonts";

export const Others = () => {
  return (
    <div
      className={[defaultStyles.containerSpace, skillsStyles.othersGrid].join(
        " "
      )}
    >
      <div className={skillsStyles.othersGridItem}>
        <h6
          className={[
            medium.className,
            defaultStyles.textNormal,
            defaultStyles.textSpaceLarge,
            skillsStyles.title,
          ].join(" ")}
        >
          Frontend
        </h6>
        <p
          className={[montserrat.className, defaultStyles.textNormal].join(" ")}
        >
          JavaScript, Bootstrap 5, Three.js, jQuery, React, Framer Motion, Material UI
        </p>
      </div>
      <div className={skillsStyles.othersGridItem}>
        <h6
          className={[
            medium.className,
            defaultStyles.textNormal,
            defaultStyles.textSpaceLarge,
            skillsStyles.title,
          ].join(" ")}
        >
          Backend
        </h6>
        <p
          className={[montserrat.className, defaultStyles.textNormal].join(" ")}
        >
          PHP, CodeIgniter, Linux, Websocket, Express.js, MySQL, Docker, Apache
        </p>
      </div>
      <div className={skillsStyles.othersGridItem}>
        <h6
          className={[
            medium.className,
            defaultStyles.textNormal,
            defaultStyles.textSpaceLarge,
            skillsStyles.title,
          ].join(" ")}
        >
          Tools and Platforms
        </h6>
        <p
          className={[montserrat.className, defaultStyles.textNormal].join(" ")}
        >
          TypeScript, Git, GitHub, Vitest, Vercel
        </p>
      </div>
      <div className={skillsStyles.othersGridItem}>
        <h6
          className={[
            medium.className,
            defaultStyles.textNormal,
            defaultStyles.textSpaceLarge,
            skillsStyles.title,
          ].join(" ")}
        >
          Design Tools
        </h6>
        <p
          className={[montserrat.className, defaultStyles.textNormal].join(" ")}
        >
          Photoshop, Figma, Adobe XD
        </p>
      </div>
    </div>
  );
};
