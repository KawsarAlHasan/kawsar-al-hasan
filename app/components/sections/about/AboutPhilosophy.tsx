// ============================================================
// components/sections/about/AboutPhilosophy.tsx
// Four philosophy/values cards arranged in a 2×2 grid.
// Each card reveals with a staggered scroll animation.
// Hover: card lifts with a soft accent border glow.
// ============================================================

"use client";

import { motion } from "framer-motion";
import { PhilosophyItem } from "@/data/about";
import { cn } from "@/lib/utils";

interface AboutPhilosophyProps {
  items: PhilosophyItem[];
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function AboutPhilosophy({ items }: AboutPhilosophyProps) {
  return (
    <section aria-labelledby="philosophy-heading">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="mb-6 flex items-center gap-3"
      >
        <h3
          id="philosophy-heading"
          className="text-base font-semibold text-zinc-900 dark:text-zinc-100"
        >
          How I Work
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800" aria-hidden="true" />
      </motion.div>

      {/* 2×2 grid */}
      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        role="list"
        aria-label="Development philosophy"
      >
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            role="listitem"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.55,
              delay: i * 0.08,
              ease: EASE_OUT,
            }}
            whileHover={{ y: -3 }}
            className={cn(
              "group relative flex flex-col gap-3 rounded-2xl p-4",
              "border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900",
              "shadow-[0_1px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_8px_rgba(0,0,0,0.25)]",
              "transition-all duration-300",
              "hover:border-indigo-200/80 dark:hover:border-indigo-800/60",
              "hover:shadow-[0_6px_24px_rgba(99,102,241,0.1)] dark:hover:shadow-[0_6px_24px_rgba(99,102,241,0.15)]",
              "cursor-default"
            )}
          >
            {/* Icon */}
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-lg dark:bg-zinc-800 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            >
              {item.icon}
            </div>

            {/* Title */}
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-xs leading-[1.7] text-zinc-500 dark:text-zinc-400">
              {item.description}
            </p>

            {/* Hover accent — bottom bar */}
            <div
              className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-b-2xl bg-gradient-to-r from-indigo-500/80 to-violet-500/80 transition-transform duration-300 group-hover:scale-x-100"
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
