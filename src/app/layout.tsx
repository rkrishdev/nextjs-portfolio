import type { Metadata } from "next";
import { Navbar } from "../components/Shared/Navbar";
import defaultStyles from "../styles/default.module.css";
import "../styles/global.css";
import { Footer } from "../components/Shared/Footer";

export const metadata: Metadata = {
  title: "Rakshankrishnan S | Web Developer",
  description: "Rakshankrishnan S, Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={defaultStyles.defaultBg}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
