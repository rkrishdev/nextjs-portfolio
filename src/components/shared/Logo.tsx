import { medium } from "../../ui/fonts";
import navbarStyles from "../../styles/navbar.module.css";

export const Logo = () => {
  return (
    <h1 className={[navbarStyles.textLogo, medium.className].join(" ")}>
      R<span>.</span>
    </h1>
  );
};
