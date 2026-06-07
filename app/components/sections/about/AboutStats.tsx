// ============================================================
// components/sections/about/AboutStats.tsx
// A row of 4 animated stat cards.
// Numbers count up from 0 when the section enters the viewport.
// Each card has a subtle hover lift with glow.
// Uses useCountUp + useInView for the trigger logic.
// ============================================================

"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { StatItem } from "@/data/about";
import { cn } from "@/lib/utils";

// ── Individual stat card ────────────────────────────────────
interface StatCardProps {
  stat: StatItem;
  index: number;
  inView: boolean;
}

function StatCard({ stat, index, inView }: StatCardProps) {
  const count = useCountUp({
    target: stat.value,
    duration: 1600,
    delay: index * 120,
    enabled: inView,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative flex flex-col gap-2 rounded-2xl p-5",
        "border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900",
        "shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.3)]",
        "transition-shadow duration-300",
        "hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] dark:hover:shadow-[0_8px_30px_rgba(99,102,241,0.18)]",
        "hover:border-indigo-200 dark:hover:border-indigo-800/60",
        "cursor-default"
      )}
      aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
    >
      {/* Top row: icon + glow dot */}
      <div className="flex items-center justify-between">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/8 text-lg dark:bg-indigo-500/12 transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          {stat.icon}
        </span>
        {/* Subtle accent dot */}
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400/40 dark:bg-indigo-500/40" aria-hidden="true" />
      </div>

      {/* Animated number */}
      <div className="flex items-baseline gap-0.5">
        <span
          className="font-mono text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 tabular-nums"
          aria-live="polite"
        >
          {count}
        </span>
        <span className="font-mono text-xl font-bold text-indigo-500 dark:text-indigo-400">
          {stat.suffix}
        </span>
      </div>

      {/* Label + description */}
      <div>
        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          {stat.label}
        </p>
        <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
          {stat.description}
        </p>
      </div>

      {/* Hover gradient bar at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-2xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/60 to-violet-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
    </motion.div>
  );
}

// ── Stats grid ──────────────────────────────────────────────
interface AboutStatsProps {
  stats: StatItem[];
}

export function AboutStats({ stats }: AboutStatsProps) {
  // Single IntersectionObserver trigger for ALL counters to start together
  const [ref, inView] = useInView<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "0px 0px -60px 0px",
    once: true,
  });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4"
      role="region"
      aria-label="Key statistics"
    >
      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
      ))}
    </div>
  );
}
