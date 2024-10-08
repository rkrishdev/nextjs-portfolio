"use client";

import Image from "next/image";
import defaultStyles from "@/styles/default.module.css";
import footerStyles from "@/styles/footer.module.css";
import { montserrat } from "@/styles/fonts/fonts";
import { Logo } from "../others/Logo";
import useScrollTo from "@/hooks/useScrollTo";
import { useCursor } from "@/context/CursorContext";

export const Footer = () => {
  const { cursorHandlers } = useCursor();
  const { handleScroll } = useScrollTo();

  return (
    <div
      className={[footerStyles.container, defaultStyles.containerSpace].join(
        " "
      )}
    >
      <div className={footerStyles.col1}>
        <Logo />
        <p
          className={[defaultStyles.textNormal, montserrat.className].join(" ")}
        >
          2024 Edition. Designed and developed by Rakshankrishnan S.
        </p>
      </div>
      <button
        type="button"
        className={[
          footerStyles.col2,
          "cursorAnimationTrigger",
          "animation:show-description",
        ].join(" ")}
        data-animation-description="Go to top"
        onMouseEnter={(e) => cursorHandlers.manageMouseEnter(e, null)}
        onMouseOut={(e) => cursorHandlers.manageMouseOut(e)}
        onClick={() => handleScroll("home")}
        aria-label="Go to hero section"
      >
        <Image
          src={"/assets/imgs/others/arrow.svg"}
          width={0}
          height={0}
          sizes="100%"
          alt="Circle with arrow"
          style={{ pointerEvents: "none" }}
        />
        <p
          className={[defaultStyles.textNormal, montserrat.className].join(" ")}
          style={{ pointerEvents: "none" }}
        >
          End of page
        </p>
      </button>
    </div>
  );
};
