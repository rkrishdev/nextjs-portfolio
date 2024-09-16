"use client";

import ReactLenis from "lenis/react";

export const SmoothScrolling = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.15 }}>
      {children}
    </ReactLenis>
  );
};
