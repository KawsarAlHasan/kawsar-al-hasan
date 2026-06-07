// ============================================================
// components/sections/hero/HeroCTA.tsx
// Primary + Secondary CTA button pair.
// Primary: gradient accent with shimmer sweep on hover.
// Secondary: ghost/outline with arrow icon.
// Primary button wraps in MagneticButton for desktop feel.
// ============================================================

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { MagneticButton } from "../../common/MagneticButton";

interface HeroCTAProps {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

export function HeroCTA({ primary, secondary }: HeroCTAProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-start gap-3 sm:flex-row sm:items-center"
    >
      {/* ── Primary CTA ──────────────────────────────────────── */}
      <MagneticButton strength={0.3}>
        <a
          href={primary.href}
          className={cn(
            "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-6 py-3.5",
            "bg-gradient-to-r from-indigo-600 to-violet-600",
            "text-sm font-semibold text-white shadow-lg shadow-indigo-500/25",
            "transition-all duration-300",
            "hover:shadow-xl hover:shadow-indigo-500/35 hover:from-indigo-500 hover:to-violet-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950",
            "active:scale-[0.98]"
          )}
          aria-label={primary.label}
        >
          {/* Shimmer sweep overlay */}
          <span
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            aria-hidden="true"
          />

          <Sparkles
            className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
            aria-hidden="true"
          />
          <span>{primary.label}</span>
        </a>
      </MagneticButton>

      {/* ── Secondary CTA ────────────────────────────────────── */}
      <a
        href={secondary.href}
        className={cn(
          "group inline-flex items-center gap-2 rounded-xl px-6 py-3.5",
          "border border-zinc-200 bg-white/60 text-sm font-semibold text-zinc-700 backdrop-blur-sm",
          "dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300",
          "transition-all duration-300",
          "hover:border-indigo-300 hover:bg-white hover:text-indigo-600",
          "dark:hover:border-indigo-700 dark:hover:bg-zinc-900 dark:hover:text-indigo-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950",
          "active:scale-[0.98]"
        )}
        aria-label={secondary.label}
      >
        <span>{secondary.label}</span>
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </a>
    </motion.div>
  );
}
