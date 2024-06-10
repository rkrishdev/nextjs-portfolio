import defaultStyles from "../../styles/default.module.css";
import { montserrat } from "../../ui/fonts";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <div>
      <Logo />
      <h3
        className={[defaultStyles.headingMedium, montserrat.className].join(
          " "
        )}
      >
        Footer
      </h3>
    </div>
  );
};
