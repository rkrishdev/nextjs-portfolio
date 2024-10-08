import skillsStyles from "@/styles/skills.module.css";
import defaultStyles from "@/styles/default.module.css";
import { medium } from "@/styles/fonts/fonts";
import Image from "next/image";
import { Highlighted } from "./Highlighted";
import { Others } from "./Others";

export const Skills = () => {
  return (
    <div id="skills" className={[skillsStyles.container].join(" ")}>
      <Image
        src={"/assets/imgs/background/skills-gradient.svg"}
        width={0}
        height={0}
        sizes="100vw"
        alt="Gradient Background"
        className={skillsStyles.bgImage}
        quality={100}
        priority
      />
      <div className={defaultStyles.containerSpace}>
        <h3
          className={[
            medium.className,
            defaultStyles.headingStandard,
            defaultStyles.textPrimary,
            defaultStyles.letterSpacingDefault,
          ].join(" ")}
        >
          My Skills
        </h3>
      </div>
      <Highlighted />
      <Others />
    </div>
  );
};
