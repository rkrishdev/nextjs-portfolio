"use client";

import defaultStyles from "@/styles/default.module.css";
import projectStyles from "@/styles/project.module.css";
import { medium, montserrat } from "@/ui/fonts";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const projectData = [
  {
    title: "JMJ Housing",
    description:
      "A popular real estate website in India. This was my first React application. It uses Next.js app router.",
    imageSrc: "/assets/imgs/projects/jmjhousing.webp",
    buttons: ["Next.js"],
    link: "https://jmjhousing.com",
  },
  {
    title: "Yurik Technologies",
    description:
      "Redesigned my currently employed company's website with my design input.",
    imageSrc: "/assets/imgs/projects/yuriktechnologies.webp",
    buttons: ["PHP", "CodeIgniter"],
    link: "https://yuriktechnologies.com",
  },
  {
    title: "Her Little Pattisserie",
    description:
      "This was a critical project, as I had to develop the website without any UI/UX design.",
    imageSrc: "/assets/imgs/projects/herlittlepattisserie.webp",
    buttons: ["PHP", "Laravel"],
    link: "https://herlittlepattisserie.com",
  },
  {
    title: "Photopointy",
    description:
      "This was my first ever product developed entirely by myself. It is a photography booking app.",
    imageSrc: "/assets/imgs/projects/photopointy.webp",
    buttons: ["PHP", "CodeIgniter"],
    link: "https://photopointy.com",
  },
];

export const List = () => {
  const [col1TransformValue, setCol1TransformValue] = useState<string[]>([
    "0vw",
    "7vw",
  ]);
  const [col2TransformValue, setCol2TransformValue] = useState<string[]>([
    "7vw",
    "0vw",
  ]);

  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: col1Ref,
    offset: ["start end", "end start"],
  });
  const isTabScreen = useMediaQuery({ maxWidth: 1000 });

  useEffect(() => {
    if (isTabScreen) {
      setCol1TransformValue(["0vw", "0vw"]);
      setCol2TransformValue(["0vw", "0vw"]);
    } else {
      setCol1TransformValue(["0vw", "7vw"]);
      setCol2TransformValue(["7vw", "0vw"]);
    }
  }, [isTabScreen]);

  const col1TranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    col1TransformValue
  );
  const col2TranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    col2TransformValue
  );

  // Render the project list dynamically
  const renderProject = (project: any) => (
    <div className={projectStyles.listItem} key={project.title}>
      <Image
        className={projectStyles.listImage}
        src={project.imageSrc}
        width={0}
        height={0}
        sizes="100vw"
        alt={project.title}
      />
      <div className={projectStyles.itemContent}>
        <h3
          className={[
            medium.className,
            defaultStyles.textLarge,
            defaultStyles.textPrimary,
            defaultStyles.letterSpacingDefault,
            defaultStyles.textSpaceSmall,
          ].join(" ")}
        >
          {project.title}
        </h3>
        <p
          className={[
            montserrat.className,
            defaultStyles.textNormal,
            defaultStyles.textSpace,
          ].join(" ")}
        >
          {project.description}
        </p>
        <div className={projectStyles.buttonContainer}>
          {project.buttons.map((button: string) => (
            <button
              className={[montserrat.className, projectStyles.btnSmall].join(
                " "
              )}
              key={button}
            >
              {button}
            </button>
          ))}
          <Link
            href={project.link}
            target="_blank"
            className={projectStyles.linkIcon}
          >
            <Image
              src={"/assets/imgs/icons/link.svg"}
              width={0}
              height={0}
              sizes="100vw"
              alt="link"
            />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className={projectStyles.listContainer}>
      <motion.div
        className={projectStyles.listCols}
        ref={col1Ref}
        style={{ translateY: col1TranslateY }}
      >
        {projectData.slice(0, 2).map(renderProject)}
      </motion.div>
      <motion.div
        className={projectStyles.listCols}
        ref={col2Ref}
        style={{ translateY: col2TranslateY }}
      >
        {projectData.slice(2, 4).map(renderProject)}
      </motion.div>
    </div>
  );
};
