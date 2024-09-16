import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import defaultStyles from "@/styles/default.module.css";
import "@/styles/global.css";
import { SmoothScrolling } from "@/components/shared/SmoothScrolling";
import { PreloaderProvider } from "@/context/PreloaderContext";

export const metadata: Metadata = {
  icons: "/assets/img/favicon/favicon.png",
  title: "Rakshankrishnan S • Full Stack Web Developer",
  description: `Hi! I'm Rakshankrishnan, a full-stack web developer from Coimbatore, India. 
  I specialize in creating creative and dynamic websites, excelling in both frontend and backend development.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={defaultStyles.defaultBg}>
        <PreloaderProvider>
          <SmoothScrolling>
            <Navbar />
            <main>{children}</main>
          </SmoothScrolling>
        </PreloaderProvider>
      </body>
    </html>
  );
}
