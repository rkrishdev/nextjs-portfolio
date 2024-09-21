"use client";

import Image from "next/image";
import defaultStyles from "@/styles/default.module.css";
import footerStyles from "@/styles/footer.module.css";
import { montserrat } from "@/styles/fonts/fonts";
import { Logo } from "../others/Logo";
import useScrollTo from "@/hooks/useScrollTo";

export const Footer = () => {
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
          2024 Edition.
          Designed and developed by Rakshankrishnan S.
        </p>
      </div>
      <button
        type="button"
        className={footerStyles.col2}
        onClick={() => handleScroll("home")}
      >
        <Image
          src={"/assets/imgs/others/arrow.svg"}
          width={0}
          height={0}
          sizes="100%"
          alt="circle arrow"
        />
        <p
          className={[defaultStyles.textNormal, montserrat.className].join(" ")}
        >
          End of page
        </p>
      </button>
    </div>
  );
};
