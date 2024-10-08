"use client";

import { useCursorHandlers } from "@/components/shared/others/CursorHandlers";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

interface CursorContextType {
  cursorHandlers: {
    manageMouseEnter: (
      event: React.MouseEvent<HTMLElement>,
      canvas: HTMLCanvasElement | null
    ) => void;
    manageMouseOut: (event: React.MouseEvent<HTMLElement>) => void;
  };
  cursorFollower: React.RefObject<HTMLDivElement>;
  cursorSize: number;
  showText: boolean;
  isHovered: string;
  allowCursor: boolean;
}

const CursorContext = createContext<CursorContextType | null>(null);

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const cursorFollower = useRef<HTMLDivElement | null>(null);
  const [cursorSize, setCursorSize] = useState<number>(0);
  const [defaultSize, setDefaultSize] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<string>("");
  const [showText, setShowText] = useState<boolean>(false);
  const [allowCursor, setAllowCursor] = useState<boolean>(false);

  const cursorHandlers = useCursorHandlers(
    cursorFollower,
    defaultSize,
    setIsHovered,
    setShowText,
    allowCursor
  );

  useEffect(() => {
    const handleResize = () => {
      if (!isMobile) {
        const size = window.innerWidth * 0.0115;
        setDefaultSize(size);
        setCursorSize(size);
      }

      if (window.innerWidth < 1000 || isMobile) {
        setAllowCursor(false);
      } else if (!allowCursor) {
        setAllowCursor(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [allowCursor]);

  return (
    <CursorContext.Provider
      value={{
        cursorHandlers,
        cursorFollower,
        cursorSize,
        showText,
        isHovered,
        allowCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};
