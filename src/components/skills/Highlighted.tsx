"use client";

import skillsStyles from "@/styles/skills.module.css";
import defaultStyles from "@/styles/default.module.css";
import { montserrat } from "@/styles/fonts/fonts";
import Image from "next/image";
import { useRevealInView } from "@/hooks/useRevealInView";

export const Highlighted = () => {
  const { ref, className } = useRevealInView(
    defaultStyles.textRevealInitial,
    defaultStyles.textRevealAnimation
  );
  return (
    <div className={[skillsStyles.highlight].join(" ")}>
      <div
        ref={ref}
        className={[
          defaultStyles.containerSpace,
          className,
          skillsStyles.grid,
        ].join(" ")}
      >
        <div className={skillsStyles.gridItem}>
          <Image
            className={skillsStyles.gridItemLogo}
            src={"/assets/imgs/logos/nextjs.webp"}
            width={0}
            height={0}
            sizes="100vw"
            alt="next.js"
          />
          <h6
            className={[montserrat.className, defaultStyles.text2XL].join(" ")}
          >
            Next.js
          </h6>
        </div>
        <div className={skillsStyles.gridItem}>
          <Image
            className={skillsStyles.gridItemLogo}
            src={"/assets/imgs/logos/nodejs.webp"}
            width={0}
            height={0}
            sizes="100vw"
            alt="node.js"
          />
          <h6
            className={[montserrat.className, defaultStyles.text2XL].join(" ")}
          >
            Node.js
          </h6>
        </div>
        <div className={skillsStyles.gridItem}>
          <Image
            className={skillsStyles.gridItemLogo}
            src={"/assets/imgs/logos/laravel.webp"}
            width={0}
            height={0}
            sizes="100vw"
            alt="laravel"
          />
          <h6
            className={[montserrat.className, defaultStyles.text2XL].join(" ")}
          >
            Laravel
          </h6>
        </div>
        <div className={skillsStyles.gridItem}>
          <Image
            className={skillsStyles.gridItemLogo}
            src={"/assets/imgs/logos/sass.webp"}
            width={0}
            height={0}
            sizes="100vw"
            alt="node.js"
          />
          <h6
            className={[montserrat.className, defaultStyles.text2XL].join(" ")}
          >
            SASS
          </h6>
        </div>
        <div className={skillsStyles.gridItem}>
          <Image
            className={skillsStyles.gridItemLogo}
            src={"/assets/imgs/logos/tailwind.webp"}
            width={0}
            height={0}
            sizes="100vw"
            alt="tailwind"
          />
          <h6
            className={[montserrat.className, defaultStyles.text2XL].join(" ")}
          >
            TailwindCSS
          </h6>
        </div>
      </div>
    </div>
  );
};
