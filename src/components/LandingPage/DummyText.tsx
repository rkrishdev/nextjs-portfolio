import defaultStyles from "../../styles/default.module.css";
import { medium, montserrat } from "../../ui/fonts";

export const DummyText = () => {
  return (
    <>
      <h3 className={[defaultStyles.headingMedium, medium.className].join(" ")}>
        Hi!
      </h3>
      <p
        className={[defaultStyles.headingMedium, montserrat.className].join(
          " "
        )}
      >
        I am Rakshankrishnan
      </p>
      <p className={[defaultStyles.textNormal, montserrat.className].join(" ")}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam vero,
        quae beatae recusandae repudiandae aliquam alias hic molestias, libero
        molestiae esse qui quisquam obcaecati omnis, aperiam explicabo veritatis
        distinctio. Quisquam.
      </p>
      <br />
      <br />
    </>
  );
};
