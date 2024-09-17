import { medium, montserrat } from "@/ui/fonts";
import defaultStyles from "@/styles/default.module.css";
import navbarStyles from "@/styles/navbar.module.css";
import useScrollTo from "@/hooks/useScrollTo";
import Link from "next/link";
import Image from "next/image";
import { HamburgerMenuToggleProps } from "@/types/types";
import { motion } from "framer-motion";

export const NavbarLinksMobile = ({
  isMenuOpen,
  setIsMenuOpen,
  currentSection,
}: HamburgerMenuToggleProps) => {
  const { handleScroll } = useScrollTo();

  const delayMultiplier = 0.05;

  const itemAnimation = (delay: number) => ({
    animate: isMenuOpen ? { y: 0 } : { y: 50 },
    transition: { ease: "easeOut", duration: 0.3, delay },
  });

  const buttonClassName = [
    defaultStyles.textSmall,
    montserrat.className,
    navbarStyles.navLinks,
  ].join(" ");

  const links = [
    {
      label: "About",
      elementId: "about",
      onClick: () => {
        handleScroll("about");
        setIsMenuOpen(!isMenuOpen);
      },
      delay: 1 * delayMultiplier,
    },
    {
      label: "Skills",
      elementId: "skills",
      onClick: () => {
        handleScroll("skills");
        setIsMenuOpen(!isMenuOpen);
      },
      delay: 2 * delayMultiplier,
    },
    {
      label: "Projects",
      elementId: "projects",
      onClick: () => {
        handleScroll("projects");
        setIsMenuOpen(!isMenuOpen);
      },
      delay: 3 * delayMultiplier,
    },
    {
      label: "Contact",
      elementId: "contact",
      onClick: () => {
        handleScroll("contact");
        setIsMenuOpen(!isMenuOpen);
      },
      delay: 4 * delayMultiplier,
    },
  ];

  const socialIcons = [
    {
      target: "_self",
      href: "mailto:rakshank016@gmail.com",
      src: "/assets/imgs/icons/mail.svg",
      alt: "Mail",
      delay: 5 * delayMultiplier,
    },
    {
      target: "_blank",
      href: "https://in.linkedin.com/in/rakshankrishnan-s-899a1219a",
      src: "/assets/imgs/icons/linkedin.svg",
      alt: "LinkedIn",
      delay: 6 * delayMultiplier,
    },
    {
      target: "_blank",
      href: "https://github.com/rkrishdev",
      src: "/assets/imgs/icons/github.svg",
      alt: "GitHub",
      delay: 7 * delayMultiplier,
    },
  ];

  return (
    <>
      <div
        className={navbarStyles.mobileMenuBg}
        onClick={(e) => setIsMenuOpen(!isMenuOpen)}
        style={{ display: isMenuOpen ? "block" : "none" }}
      ></div>
      <motion.div
        style={{ transformOrigin: "right" }}
        animate={
          isMenuOpen
            ? { opacity: 1, scale: 1, zIndex: 99999 }
            : { opacity: 0, scale: 0.75, transitionEnd: { zIndex: -1 } }
        }
        initial={{ opacity: 0, scale: 0.75, zIndex: -1 }}
        transition={{ duration: 0.2 }}
        className={[navbarStyles.navbarMobile, defaultStyles.textWhite].join(
          " "
        )}
      >
        <h5
          className={[
            medium.className,
            defaultStyles.textNormal,
            defaultStyles.headingSpace,
          ].join(" ")}
        >
          Quick Links
        </h5>
        <ul
          className={[navbarStyles.links, navbarStyles.linksMobile].join(" ")}
        >
          {links.map(({ label, elementId, onClick, delay }) => (
            <li key={label}>
              <motion.button
                type="button"
                className={[
                  buttonClassName,
                  currentSection === elementId ? defaultStyles.textPrimary : "",
                ].join(" ")}
                onClick={onClick}
                {...itemAnimation(delay)}
              >
                {label}
              </motion.button>
            </li>
          ))}
          <li>
            <motion.div {...itemAnimation(0.225)} style={{ width: "100%" }}>
              <Link
                target="_blank"
                href={
                  "https://drive.google.com/file/d/1D5EHgki6xmE53fYcXiz7DEaaZoSlYoYS/view?usp=sharing"
                }
                className={buttonClassName}
              >
                Resume
              </Link>
            </motion.div>
          </li>
        </ul>
        <div className={navbarStyles.socialIconsWrapper}>
          <h5
            className={[
              medium.className,
              defaultStyles.textNormal,
              defaultStyles.headingSpace,
            ].join(" ")}
          >
            Socials
          </h5>
          <div className={navbarStyles.socialIcons}>
            {socialIcons.map(({ target, href, src, alt, delay }) => (
              <motion.div
                key={alt}
                {...itemAnimation(delay)}
                style={{ width: "100%" }}
              >
                <Link target={target} href={href}>
                  <Image
                    src={src}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt={alt}
                    className={navbarStyles.socialIcon}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};
