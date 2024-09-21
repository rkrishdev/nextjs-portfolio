import { medium } from "@/styles/fonts/fonts";
import defaultStyles from "@/styles/default.module.css";
import contactStyles from "@/styles/contact.module.css";
import { Line } from "./Line";
import { Main } from "./Main";

export const Contact = () => {
  return (
    <div
      id="contact"
      className={[
        defaultStyles.sectionSpace,
        defaultStyles.containerSpace,
      ].join(" ")}
    >
      <div className={contactStyles.headingContainer}>
        <div>
          <h3
            className={[
              medium.className,
              defaultStyles.headingStandard,
              defaultStyles.textPrimary,
              defaultStyles.letterSpacingDefault,
            ].join(" ")}
          >
            Contact
          </h3>
        </div>
        <Line />
      </div>
      <Main />
    </div>
  );
};
