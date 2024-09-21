import { useCallback } from "react";
import { useLenis } from "lenis/react";

const useScrollTo = () => {
  const lenis = useLenis();

  const handleScroll = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        const offsetVh = 16,
          duration = 1.4,
          easing = (t: number) => 1 - Math.pow(1 - t, 4);

        const vh = window.innerHeight * (offsetVh / 100);
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY - vh;

        lenis?.scrollTo(elementPosition, { duration, easing });
      }
    },
    [lenis]
  );

  return { handleScroll };
};

export default useScrollTo;
