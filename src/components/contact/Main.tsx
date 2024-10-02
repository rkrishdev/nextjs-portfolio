"use client";

import Image from "next/image";
import { medium, montserrat } from "@/styles/fonts/fonts";
import defaultStyles from "@/styles/default.module.css";
import contactStyles from "@/styles/contact.module.css";
import Link from "next/link";
import { useRevealInView } from "@/hooks/useRevealInView";
import { useCursor } from "@/context/CursorContext";

export const Main = () => {
  const { cursorHandlers } = useCursor();
  const { ref, className } = useRevealInView(
    defaultStyles.textRevealInitial,
    defaultStyles.textRevealAnimation
  );
  return (
    <div className={contactStyles.mainContainer}>
      <div>
        <Image
          src={"/assets/imgs/background/contact-computer.webp"}
          width={0}
          height={0}
          sizes="100vw"
          alt="landing bg"
          className={contactStyles.computerImage}
          priority
          loading="eager"
        />
      </div>
      <div
        ref={ref}
        className={[contactStyles.textContainer, className].join(" ")}
      >
        <div className={contactStyles.textWrapper}>
          <h3
            className={[
              medium.className,
              defaultStyles.textLarge,
              defaultStyles.textPrimary,
              defaultStyles.headingSpace,
              contactStyles.title,
            ].join(" ")}
          >
            Feel free to message me regarding anything!
          </h3>
          <p
            className={[
              montserrat.className,
              defaultStyles.headingStandard,
              defaultStyles.textExtraLarge,
              defaultStyles.textWhite,
              contactStyles.lastTextSpace,
            ].join(" ")}
          >
            I&apos;m also open for opportunities!
          </p>
          <Link
            href={"mailto:rakshank016@gmail.com"}
            className={[
              contactStyles.contactButton,
              defaultStyles.textNormal,
              montserrat.className,
              defaultStyles.defaultButtonHover,
              "cursorAnimationTrigger",
              "animation:show-description",
            ].join(" ")}
            data-animation-description="Click to mail me!"
            onMouseEnter={(e) => cursorHandlers.manageMouseEnter(e)}
            onMouseOut={(e) => cursorHandlers.manageMouseOut(e)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            rakshank016@gmail.com
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </Link>
          <div className={contactStyles.socialsContainer}>
            <Link
              target="_blank"
              href={"https://in.linkedin.com/in/rakshankrishnan-s-899a1219a"}
              className={[
                contactStyles.socialLink,
                defaultStyles.defaultButtonHover,
                "cursorAnimationTrigger",
                "animation:show-description",
              ].join(" ")}
              data-animation-description="new-tab-icon"
              onMouseEnter={(e) => cursorHandlers.manageMouseEnter(e)}
              onMouseOut={(e) => cursorHandlers.manageMouseOut(e)}
            >
              <Image
                src={"/assets/imgs/icons/linkedin.svg"}
                width={0}
                height={0}
                sizes="100vw"
                alt="linked in profile"
                className={contactStyles.socialIcon}
              />
            </Link>
            <Link
              target="_blank"
              href={"https://github.com/rkrishdev"}
              className={[
                contactStyles.socialLink,
                defaultStyles.defaultButtonHover,
                "cursorAnimationTrigger",
                "animation:show-description",
              ].join(" ")}
              data-animation-description="new-tab-icon"
              onMouseEnter={(e) => cursorHandlers.manageMouseEnter(e)}
              onMouseOut={(e) => cursorHandlers.manageMouseOut(e)}
            >
              <Image
                src={"/assets/imgs/icons/github.svg"}
                width={0}
                height={0}
                sizes="100vw"
                alt="landing bg"
                className={contactStyles.socialIcon}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
