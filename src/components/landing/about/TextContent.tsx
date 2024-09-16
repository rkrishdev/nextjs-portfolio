"use client";

import defaultStyles from "@/styles/default.module.css";
import aboutStyles from "@/styles/about.module.css";
import { medium, montserrat } from "@/ui/fonts";
import { useRevealInView } from "@/hooks/useRevealInView";

const TextContent = () => {
  const { ref, className } = useRevealInView(
    defaultStyles.textRevealInitial,
    defaultStyles.textRevealAnimation
  );

  return (
    <div ref={ref} className={[aboutStyles.textContent, className].join(" ")}>
      <div>
        <h3
          className={[
            medium.className,
            defaultStyles.headingStandard,
            defaultStyles.textPrimary,
            defaultStyles.letterSpacingDefault,
            defaultStyles.headingSpace,
          ].join(" ")}
        >
          About Me
        </h3>
        <p
          className={[
            montserrat.className,
            defaultStyles.textLarge,
            defaultStyles.textSpace,
          ].join(" ")}
        >
          I&apos;m working at a
          <span className={defaultStyles.textPrimary}> product-based </span>
          company in{" "}
          <span className={defaultStyles.textPrimary}>Coimbatore</span>. I
          mostly develop panel-based products, but this doesn&apos;t stop my
          love for creative websites. I used my free time to work on this
          portfolio. It&apos;s all about the effort I put to reach my goals.
        </p>
        <p
          className={[
            montserrat.className,
            defaultStyles.textLarge,
            defaultStyles.textSpace,
          ].join(" ")}
        >
          In my current role, I have been leading and guiding a small team of
          developers after my{" "}
          <span className={defaultStyles.textPrimary}>promotion</span> in mid
          2023.
        </p>
        <p
          className={[
            montserrat.className,
            defaultStyles.textLarge,
            defaultStyles.textSpace,
          ].join(" ")}
        >
          Now, I&apos;m interested in any opportunites. So, in short, I&apos;m:
        </p>

        <div className={aboutStyles.aboutMeShort}>
          <b
            className={[
              montserrat.className,
              aboutStyles.boldItalicText,
              defaultStyles.textLarge,
            ].join(" ")}
          >
            Versatile
          </b>
          <span className={aboutStyles.smallDash}></span>
          <b
            className={[
              montserrat.className,
              aboutStyles.boldItalicText,
              defaultStyles.textLarge,
            ].join(" ")}
          >
            Team Player
          </b>
        </div>
      </div>
    </div>
  );
};

export default TextContent;
