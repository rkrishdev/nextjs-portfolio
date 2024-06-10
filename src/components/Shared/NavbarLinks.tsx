import defaultStyles from "../../styles/default.module.css";
import { montserrat } from "../../ui/fonts";

export const NavbarLinks = () => {
  return (
    <h3
      className={[defaultStyles.headingMedium, montserrat.className].join(" ")}
    >
      NavbarLinks
    </h3>
  );
};
