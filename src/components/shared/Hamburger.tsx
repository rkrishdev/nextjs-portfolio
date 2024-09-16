"use client";

import { HamburgerMenuToggleProps } from "@/types/types";
import navbarStyles from "../../styles/navbar.module.css";
import { motion } from "framer-motion";

export const Hamburger = ({
  isMenuOpen,
  setIsMenuOpen,
}: HamburgerMenuToggleProps) => {
  return (
    <button
      type="button"
      className={navbarStyles.hamburger}
      onClick={(e) => setIsMenuOpen(!isMenuOpen)}
    >
      <motion.span
        animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      ></motion.span>
      <motion.span
        animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
    </button>
  );
};
