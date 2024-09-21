"use client";

import defaultStyles from "@/styles/default.module.css";
import { medium, montserrat } from "@/styles/fonts/fonts";
import earthStyles from "@/styles/earth.module.css";
import dynamic from "next/dynamic";
import { useRevealInView } from "@/hooks/useRevealInView";

const Earth = dynamic(() => import("@/components/earth/Earth"), {
  ssr: false,
});

export const Quote = () => {
  const { ref, className } = useRevealInView(
    defaultStyles.textRevealInitial,
    defaultStyles.textRevealAnimation
  );
  return (
    <div
      className={[defaultStyles.containerSpace, earthStyles.container].join(
        " "
      )}
    >
      <div className={earthStyles.row}>
        <div
          ref={ref}
          className={[earthStyles.quoteContainer, className].join(" ")}
        >
          <h4
            className={[
              medium.className,
              earthStyles.largeHeading,
              defaultStyles.headingSpace,
              defaultStyles.letterSpacingDefault,
            ].join(" ")}
            style={{ textWrap: "nowrap" }}
          >
            Always learning <br />
            and upskilling
          </h4>
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
