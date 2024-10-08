import { useRef, useState } from "react";
import debounce from "lodash.debounce";

export const useCursorHandlers = (
  cursorFollower: React.RefObject<HTMLDivElement>,
  defaultSize: number,
  setIsHovered: (value: string) => void,
  setShowText: (value: boolean) => void,
  allowCursor: boolean
) => {
  const revealTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHovering = useRef(false);
  const [isMouseOutActive, setIsMouseOutActive] = useState(false);

  const clearTimeOuts = () => {
    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const resetFollowerToDefault = () => {
    setShowText(false);
    if (cursorFollower.current) {
      const textContainer = cursorFollower.current.querySelector(
        ".textContainer"
      ) as HTMLDivElement;
      textContainer ? (textContainer.innerHTML = "") : "";
      cursorFollower.current.style.width = `${defaultSize}px`;
      cursorFollower.current.style.height = `${defaultSize}px`;
      cursorFollower.current.style.backgroundColor = `var(--cursor-bg)`;
      cursorFollower.current.style.mixBlendMode = `normal`;
      cursorFollower.current.style.color = "";
      cursorFollower.current.style.borderRadius = "";
      cursorFollower.current.style.backdropFilter = "none";
    }
  };

  const handleEnterMouseMove = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target &&
      !target?.classList?.contains("cursorAnimationTrigger") &&
      !target?.closest(".cursorAnimationTrigger") &&
      isHovering.current
    ) {
      manageMouseOut();
    }
  };

  const manageMouseEnter = debounce(
    (
      event: React.MouseEvent<HTMLElement>,
      canvas: HTMLCanvasElement | null
    ) => {
      if (isHovering.current || !allowCursor) return;
      isHovering.current = true;
      clearTimeOuts();
      resetFollowerToDefault();

      window.addEventListener("mousemove", handleEnterMouseMove);

      let target = event.target as HTMLElement | null;

      if (!target && !canvas) {
        return;
      }

      if (
        target &&
        !target?.classList?.contains("cursorAnimationTrigger") &&
        !canvas
      ) {
        return;
      } else if (canvas && canvas.closest(".cursorAnimationTrigger")) {
        target = canvas.closest(".cursorAnimationTrigger") as HTMLElement;
      } else if (!target) {
        return;
      }

      if (cursorFollower.current) {
        if (target.classList.contains("animation:invert-bg")) {
          setIsHovered("position:center");
          cursorFollower.current.style.width = `${defaultSize * 4}px`;
          cursorFollower.current.style.height = `${defaultSize * 4}px`;
          cursorFollower.current.style.backgroundColor = `white`;
          cursorFollower.current.style.mixBlendMode = `difference`;
        } else if (target.classList.contains("animation:show-description")) {
          setIsHovered("position:top-left");
          const textContainer = cursorFollower.current.querySelector(
            ".textContainer"
          ) as HTMLDivElement;

          let animationText =
            target.getAttribute("data-animation-description") || "";

          if (textContainer) {
            if (animationText === "new-tab-icon") {
              textContainer.innerHTML = "";

              const imageElement = document.createElement("img");
              imageElement.src = "/assets/imgs/icons/link.svg";
              imageElement.alt = "link";
              imageElement.style.pointerEvents = "none";
              imageElement.style.width = "0.75vw";
              imageElement.style.height = "0.75vw";

              textContainer.appendChild(imageElement);
            } else {
              textContainer.innerText = animationText;
            }

            const textWidth = textContainer.offsetWidth;
            const textHeight = textContainer.offsetHeight;

            cursorFollower.current.style.width = `${
              textWidth + window.innerWidth * 0.02
            }px`;
            cursorFollower.current.style.height = `${
              textHeight + window.innerWidth * 0.015
            }px`;
            cursorFollower.current.style.borderRadius = "10vw";
            cursorFollower.current.style.backgroundColor =
              "var(--button-bg-white)";
            cursorFollower.current.style.backdropFilter = "blur(6px)";

            revealTimeoutRef.current = setTimeout(() => {
              setShowText(true);
            }, 150);
          }
        }
      }
    },
    isMouseOutActive ? 160 : 0
  );

  const manageMouseOut = () => {
    if (!allowCursor) return;
    clearTimeOuts();
    setShowText(false);
    isHovering.current = false;
    setIsHovered("");
    setIsMouseOutActive(true);

    resetFollowerToDefault();

    window.removeEventListener("mousemove", handleEnterMouseMove);

    hideTimeoutRef.current = setTimeout(() => {
      setIsMouseOutActive(false);
    }, 150);
  };

  return { manageMouseEnter, manageMouseOut };
};
