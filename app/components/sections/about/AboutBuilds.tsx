// ============================================================
// components/sections/about/AboutBuilds.tsx
// "What I Enjoy Building" tag cloud.
// Tags animate in with a staggered scatter effect.
// Hover: individual tag glows with the accent gradient.
// Accessible as a list of items.
// ============================================================

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AboutBuildsProps {
  items: string[];
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function AboutBuilds({ items }: AboutBuildsProps) {
  return (
    <section aria-labelledby="builds-heading">
      {/* Heading row */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
        className="mb-4 flex items-center gap-3"
      >
        <h3
          id="builds-heading"
          className="text-base font-semibold text-zinc-900 dark:text-zinc-100"
        >
          What I Build
        </h3>
        <div
          className="h-px flex-1 bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800"
          aria-hidden="true"
        />
      </motion.div>

      {/* Tag cloud */}
      <ul
        className="flex flex-wrap gap-2"
        role="list"
        aria-label="Types of projects I enjoy building"
      >
        {items.map((item, i) => (
          <motion.li
            key={item}
            role="listitem"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.45,
              delay: i * 0.055,
              ease: EASE_OUT,
            }}
            whileHover={{ scale: 1.06, y: -2 }}
            className={cn(
              "group inline-flex cursor-default select-none items-center gap-1.5 rounded-full px-3.5 py-1.5",
              "border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900",
              "text-xs font-medium text-zinc-600 dark:text-zinc-400",
              "transition-all duration-200",
              "hover:border-indigo-300/70 hover:bg-indigo-50/80 hover:text-indigo-600",
              "dark:hover:border-indigo-700/60 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
            )}
          >
            {/* Small accent dot */}
            <span
              className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400/50 transition-colors duration-200 group-hover:bg-indigo-500"
              aria-hidden="true"
            />
            {item}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
