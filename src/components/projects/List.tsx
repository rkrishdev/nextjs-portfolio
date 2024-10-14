"use client";

import defaultStyles from "@/styles/default.module.css";
import projectStyles from "@/styles/projects.module.css";
import { medium, montserrat } from "@/styles/fonts/fonts";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useCursor } from "@/context/CursorContext";
import { DistortionCanvas } from "../shared/others/DistortionCanvas";

const projectData = [
  {
    title: "JMJ Housing",
    description:
      "A dynamic real estate website developed using Next.js and MySQL. It uses App Router.",
    imageSrc: "/assets/imgs/projects/jmjhousing.webp",
    buttons: ["Next.js"],
    link: "https://www.jmjhousing.com",
  },
  {
    title: "Yurik Technologies",
    description:
      "Redesigned my currently employed company's entire website with my design input.",
    imageSrc: "/assets/imgs/projects/yuriktechnologies.webp",
    buttons: ["PHP", "CodeIgniter"],
    link: "https://www.yuriktechnologies.com",
  },
  {
    title: "Her Little Pattisserie",
    description:
      "This was a critical project, as I had to develop the website without any UI/UX design.",
    imageSrc: "/assets/imgs/projects/herlittlepattisserie.webp",
    buttons: ["PHP", "Laravel"],
    link: "https://www.herlittlepattisserie.com",
  },
  {
    title: "Photopointy",
    description: `Developed my first full-fledged product using CodeIgniter that allows users to book sessions and
manage appointments.`,
    imageSrc: "/assets/imgs/projects/photopointy.webp",
    buttons: ["PHP", "CodeIgniter"],
    link: "https://www.photopointy.com",
  },
];

export const List = () => {
  const { cursorHandlers } = useCursor();

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

  const renderProject = (project: any) => (
    <div className={projectStyles.listItem} key={project.title}>
      <Link href={project.link} target="_blank">
        <DistortionCanvas
          className={projectStyles.listImage}
          canvasClass={[
            "cursorAnimationTrigger",
            "animation:show-description",
          ].join(" ")}
          altName={project.title}
          imageSrc={project.imageSrc}
          enableHoverEvents={true}
          dataAnimationDescription={`Visit ${project.title || "website"}`}
          onMouseEnter={(e) => cursorHandlers.manageMouseEnter(e, null)}
          onMouseOut={(e) => cursorHandlers.manageMouseOut(e)}
        />
      </Link>
      <div className={projectStyles.itemContent}>
        <h3
          className={[
            medium.className,
            defaultStyles.textLarge,
            defaultStyles.textPrimary,
            defaultStyles.letterSpacingDefault,
            defaultStyles.textSpaceSmall,
            projectStyles.title,
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
            <div
              className={[montserrat.className, projectStyles.btnSmall].join(
                " "
              )}
              key={button}
              aria-label={button}
            >
              {button}
            </div>
          ))}
          <Link
            href={project.link}
            target="_blank"
            className={[
              projectStyles.linkIcon,
              "cursorAnimationTrigger",
              "animation:show-description",
            ].join(" ")}
            data-animation-description={`Visit ${project.title || "website"}`}
            onMouseEnter={(e) => cursorHandlers.manageMouseEnter(e, null)}
            onMouseOut={(e) => cursorHandlers.manageMouseOut(e)}
          >
            <Image
              src={"/assets/imgs/icons/link.svg"}
              width={0}
              height={0}
              sizes="100vw"
              alt="Website URL"
              style={{ pointerEvents: "none" }}
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
