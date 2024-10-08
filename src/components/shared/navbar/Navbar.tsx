"use client";

import { Logo } from "../others/Logo";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarTime } from "./NavbarTime";
import navbarStyles from "@/styles/navbar.module.css";
import { Hamburger } from "./Hamburger";
import useScrollTo from "@/hooks/useScrollTo";
import { useEffect, useRef, useState } from "react";
import { NavbarLinksMobile } from "./NavbarLinksMobile";
import { useInView, UseInViewOptions } from "framer-motion";

export const Navbar = () => {
  const { handleScroll } = useScrollTo();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<string>("");

  const homeRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const skillsRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    homeRef.current = document.getElementById("home");
    aboutRef.current = document.getElementById("about");
    skillsRef.current = document.getElementById("skills");
    projectsRef.current = document.getElementById("projects");
    contactRef.current = document.getElementById("contact");
  }, []);

  const inViewOptions: UseInViewOptions = {
    margin: "0px",
    amount: 0.4,
  };

  const homeIsInView = useInView(homeRef, inViewOptions);
  const aboutIsInView = useInView(aboutRef, inViewOptions);
  const skillsIsInView = useInView(skillsRef, inViewOptions);
  const projectsIsInView = useInView(projectsRef, inViewOptions);
  const contactIsInView = useInView(contactRef, inViewOptions);

  useEffect(() => {
    const sectionsInView = [
      { name: "home", isInView: homeIsInView },
      { name: "about", isInView: aboutIsInView },
      { name: "skills", isInView: skillsIsInView },
      { name: "projects", isInView: projectsIsInView },
      { name: "contact", isInView: contactIsInView },
    ];

    for (const section of sectionsInView) {
      if (section.isInView) {
        setCurrentSection(section.name);
      }
    }
  }, [
    homeIsInView,
    aboutIsInView,
    skillsIsInView,
    projectsIsInView,
    contactIsInView,
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header>
      <nav
        className={[
          navbarStyles.primaryNavbar,
          navbarStyles.containerSpace,
        ].join(" ")}
      >
        <div className={navbarStyles.firstColumn}>
          <button
            onClick={() => handleScroll("home")}
            className={navbarStyles.logoButton}
            aria-label="Go to hero section"
          >
            <Logo />
          </button>
          <NavbarLinks currentSection={currentSection} />
        </div>
        <NavbarTime />
        <Hamburger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </nav>
      <NavbarLinksMobile
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        currentSection={currentSection}
      />
    </header>
  );
};
