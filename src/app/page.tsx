import { About } from "@/components/landing/about/Main";
import { MainContent } from "@/components/landing/hero/Main";
import { Quote } from "@/components/landing/quote/Quote";
import { Skills } from "@/components/skills/Main";
import { Projects } from "@/components/projects/Main";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/shared/Footer";
import { LargeGradientBg } from "@/components/shared/LargeGradientBg";
import { Preloader } from "@/components/shared/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <MainContent />
      <About />
      <Quote />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <LargeGradientBg />
    </>
  );
}
