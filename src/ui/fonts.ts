import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

export const medium = localFont({
  src: "../../public/assets/fonts/medium/medium.otf",
  display: "swap",
  variable: "--medium",
});

export const montserrat = Montserrat({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--montserrat",
  style: ["normal", "italic"],
});
