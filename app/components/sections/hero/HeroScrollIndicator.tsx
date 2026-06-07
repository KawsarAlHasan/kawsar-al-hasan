// ============================================================
// components/sections/hero/HeroScrollIndicator.tsx
// An animated scroll prompt shown at the bottom of the Hero.
// Fades out when the user scrolls past 80px.
// Uses a mouse SVG icon with a scrolling dot animation.
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroScrollIndicator() {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY < 80);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.4, delay: 1.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-2"
          aria-label="Scroll down to explore"
          role="img"
        >
          {/* Mouse icon */}
          <svg
            width="22"
            height="34"
            viewBox="0 0 22 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-zinc-400 dark:text-zinc-600"
            aria-hidden="true"
          >
            <rect
              x="1"
              y="1"
              width="20"
              height="32"
              rx="10"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Scrolling dot */}
            <motion.rect
              x="9.5"
              y="7"
              width="3"
              height="5"
              rx="1.5"
              fill="currentColor"
              animate={
                reduced
                  ? {}
                  : {
                      y: [7, 15, 7],
                      opacity: [1, 0.3, 1],
                    }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>

          <span className="text-[10px] font-medium tracking-[0.2em] text-zinc-400 dark:text-zinc-600 uppercase">
            Scroll
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
