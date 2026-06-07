// ============================================================
// components/sections/experience/TimelineDot.tsx
// The circle marker on the timeline for each experience entry.
// Active (current) entries pulse; past entries are static.
// ============================================================

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineDotProps {
  isActive: boolean;
  index: number;
}

export function TimelineDot({ isActive, index }: TimelineDotProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={cn(
        // Positioned to sit exactly on the timeline line
        "relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full",
        "border-2 bg-white dark:bg-zinc-950",
        isActive
          ? "border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.15)]"
          : "border-zinc-300 dark:border-zinc-700"
      )}
      aria-hidden="true"
    >
      {/* Inner dot */}
      <span
        className={cn(
          "h-3 w-3 rounded-full",
          isActive
            ? "bg-indigo-500"
            : "bg-zinc-400 dark:bg-zinc-600"
        )}
      />

      {/* Pulse rings — current role only */}
      {isActive && (
        <>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-20 [animation-duration:2s]" />
          <span className="absolute inline-flex h-[calc(100%+8px)] w-[calc(100%+8px)] animate-ping rounded-full bg-indigo-400 opacity-10 [animation-duration:2.5s] [animation-delay:0.3s]" />
        </>
      )}
    </motion.div>
  );
}
