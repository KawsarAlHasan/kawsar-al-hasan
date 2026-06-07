// ============================================================
// components/sections/experience/TimelineLine.tsx
// The vertical connecting line of the timeline.
// Animates its height from 0 → 100% as the section scrolls
// into view using Framer Motion's pathLength on an SVG line.
// Desktop only — hidden on mobile.
// ============================================================

"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function TimelineLine() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  // Translate progress into a scaleY for the line fill
  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="absolute left-[18px] top-0 hidden h-full w-[2px] md:block"
      aria-hidden="true"
    >
      {/* Track (background) */}
      <div className="h-full w-full rounded-full bg-zinc-200 dark:bg-zinc-800" />

      {/* Fill (animated) */}
      <motion.div
        className="absolute inset-x-0 top-0 origin-top rounded-full"
        style={{
          scaleY,
          height: "100%",
          background:
            "linear-gradient(to bottom, #6366f1, #8b5cf6, #6366f1)",
        }}
      />

      {/* Glow dot that travels down the line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-indigo-500 shadow-[0_0_12px_4px_rgba(99,102,241,0.5)]"
        style={{
          top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
        }}
      />
    </div>
  );
}
