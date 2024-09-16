"use client";

import useScrollTo from "@/hooks/useScrollTo";
import defaultStyles from "../../styles/default.module.css";
import navbarStyles from "../../styles/navbar.module.css";
import { montserrat } from "../../ui/fonts";
import Link from "next/link";

export const NavbarLinks = ({ currentSection }: { currentSection: string }) => {
  const { handleScroll } = useScrollTo();

  const navItemClassName = [
    defaultStyles.textSmall,
    montserrat.className,
    navbarStyles.navLinks,
  ].join(" ");

  const navLinks = [
    {
      label: "About",
      elementId: "about",
      onClick: () => handleScroll("about"),
    },
    {
      label: "Skills",
      elementId: "skills",
      onClick: () => handleScroll("skills"),
    },
    {
      label: "Projects",
      elementId: "projects",
      onClick: () => handleScroll("projects"),
    },
    {
      label: "Contact",
      elementId: "contact",
      onClick: () => handleScroll("contact"),
    },
  ];

  return (
    <ul className={[navbarStyles.links, navbarStyles.linksDesktop].join(" ")}>
      {navLinks.map(({ label, elementId, onClick }) => (
        <li key={label}>
          <button
            type="button"
            className={[
              navItemClassName,
              currentSection === elementId ? navbarStyles.active : "",
            ].join(" ")}
            onClick={onClick}
          >
            {label}
          </button>
        </li>
      ))}
      <li>
        <Link
          target="_blank"
          href={"https://google.com"}
          className={navItemClassName}
        >
          Resume
        </Link>
      </li>
    </ul>
  );
};
