import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/shared/navbar/Navbar";
import defaultStyles from "@/styles/default.module.css";
import "@/styles/global.css";
import { SmoothScrolling } from "@/components/shared/others/SmoothScrolling";
import { PreloaderProvider } from "@/context/PreloaderContext";
import { CursorProvider } from "@/context/CursorContext";
import { ScrollProgress } from "@/components/shared/others/ScrollProgress";

export const metadata: Metadata = {
  icons: "/assets/imgs/favicon/favicon.png",
  title: "Rakshankrishnan S • Full Stack Web Developer",
  description: `Hi! I'm Rakshankrishnan, a full-stack web developer from Coimbatore, India. 
  I specialize in creating dynamic websites, excelling in both frontend and backend development.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
          <CursorProvider>
            <SmoothScrolling>
              <ScrollProgress />
              <Navbar />
              <main>{children}</main>
            </SmoothScrolling>
          </CursorProvider>
        </PreloaderProvider>
      </body>
    </html>
  );
}
