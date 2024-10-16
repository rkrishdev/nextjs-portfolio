import { About } from "@/components/landing/about/Main";
import { MainContent } from "@/components/landing/hero/Main";
import { Quote } from "@/components/landing/quote/Quote";
import { Skills } from "@/components/skills/Main";
import { Projects } from "@/components/projects/Main";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/shared/footer/Footer";
import { LargeGradientBg } from "@/components/shared/others/LargeGradientBg";
import { Preloader } from "@/components/shared/others/Preloader";
import { ParticlesBg } from "@/components/shared/others/ParticlesBg";
import { CursorFollower } from "@/components/shared/others/CursorFollower";

export default function Home() {
  return (
    <>
      <Preloader />
      <CursorFollower />
      <div style={{ overflowX: "hidden" }}>
        <MainContent />
        <About />
        <Quote />
        <Skills />
        <Projects />
      </div>
      <Contact />
      <Footer />
      <ParticlesBg />
      <LargeGradientBg />
    </>
  );
}
