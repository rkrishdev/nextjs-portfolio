"use client";

import defaultStyles from "@/styles/default.module.css";
import aboutStyles from "@/styles/about.module.css";
import { medium, montserrat } from "@/styles/fonts/fonts";

const TextContent = () => {
  return (
    <div className={[aboutStyles.textContent].join(" ")}>
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
            defaultStyles.textSpaceLarge,
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
            defaultStyles.textSpaceLarge,
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
            defaultStyles.textSpaceLarge,
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
            Driven Achiever
          </b>
        </div>
      </div>
    </div>
  );
};

export default TextContent;
