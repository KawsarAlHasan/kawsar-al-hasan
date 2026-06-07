// ============================================================
// components/sections/hero/HeroTechBadges.tsx
// A subtle trust-strip of tech stack badges shown below CTAs.
// Communicates technical range without a full skills section.
// Scrolls horizontally on mobile with fade masks on edges.
// ============================================================

"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface HeroTechBadgesProps {
  badges: string[];
}

export function HeroTechBadges({ badges }: HeroTechBadgesProps) {
  return (
    <motion.div variants={fadeUp} className="space-y-2.5">
      <p className="text-xs font-medium tracking-[0.12em] text-zinc-400 dark:text-zinc-600 uppercase">
        Core Stack
      </p>

      {/* Scroll container with fade masks on mobile */}
      <div className="relative">
        {/* Left fade mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-white dark:from-[#080808] to-transparent z-10 sm:hidden" />
        {/* Right fade mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-white dark:from-[#080808] to-transparent z-10 sm:hidden" />

        <div className="flex flex-wrap gap-2 sm:flex-wrap overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
          {badges.map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 1.1 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-flex flex-shrink-0 items-center rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 transition-colors duration-200 hover:border-indigo-300 hover:text-indigo-600 dark:hover:border-indigo-700 dark:hover:text-indigo-400"
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
