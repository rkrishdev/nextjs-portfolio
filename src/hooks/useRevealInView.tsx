import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export const useRevealInView = (initialClass: string, activeClass: string) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [className, setClassName] = useState(initialClass);
  const [enable, setEnable] = useState<boolean>(false);
  const isInView = useInView(ref, { margin: "0px", amount: 0.75, once: true });

  useEffect(() => {
    checkWindowWidth();
    window.addEventListener("resize", function () {
      checkWindowWidth();
    });
  }, []);

  function checkWindowWidth() {
    if (window.innerWidth > 1000) {
      setEnable(true);
    } else {
      setEnable(false);
    }
  }

  useEffect(() => {
    if (isInView || !enable) {
      setClassName(initialClass + " " + activeClass);
    } else {
      setClassName(initialClass);
    }
  }, [enable, isInView, activeClass, initialClass]);

  return { ref, className };
};
