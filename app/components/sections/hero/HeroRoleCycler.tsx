// ============================================================
// components/sections/hero/HeroRoleCycler.tsx
// Cycles through developer roles using a vertical clip animation.
// Each role slides up and out, the next slides up and in.
// Fixed-height container prevents layout shift.
// ============================================================

"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";

interface HeroRoleCyclerProps {
  roles: string[];
  /** Delay (ms) between each role swap */
  interval?: number;
}

export function HeroRoleCycler({
  roles,
  interval = 2800,
}: HeroRoleCyclerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, interval);
    return () => clearInterval(timer);
  }, [roles.length, interval]);

  return (
    <div
      // Fixed height prevents layout shift on role change
      className="relative flex h-8 items-center overflow-hidden"
      aria-live="polite"
      aria-label={`Current role: ${roles[index]}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          className="absolute whitespace-nowrap font-mono text-sm font-medium tracking-[0.15em] text-zinc-500 dark:text-zinc-400 uppercase"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        >
          <span className="text-indigo-500 dark:text-indigo-400 mr-2">▸</span>
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
