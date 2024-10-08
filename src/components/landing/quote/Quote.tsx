"use client";

import defaultStyles from "@/styles/default.module.css";
import { medium, montserrat } from "@/styles/fonts/fonts";
import earthStyles from "@/styles/earth.module.css";
import dynamic from "next/dynamic";
import aboutStyles from "@/styles/about.module.css";

const Earth = dynamic(() => import("@/components/earth/Earth"), {
  ssr: false,
});

export const Quote = () => {
  return (
    <div
      className={[defaultStyles.containerSpace, earthStyles.container].join(
        " "
      )}
    >
      <div className={earthStyles.row}>
        <div className={[earthStyles.quoteContainer].join(" ")}>
          <div className={aboutStyles.quoteTitle}>
            <h4
              className={[
                medium.className,
                earthStyles.largeHeading,
                defaultStyles.headingSpace,
                defaultStyles.letterSpacingDefault,
              ].join(" ")}
            >
              Always learning and upskilling
            </h4>
          </div>
          <p
            className={[
              montserrat.className,
              defaultStyles.textExtraLarge,
              defaultStyles.fstItalic,
            ].join(" ")}
          >
            In the vast expanse of our digital Earth, every line of code is just
            a brick in the global village of technology.
          </p>
        </div>
        <Earth />
      </div>
    </div>
  );
};
