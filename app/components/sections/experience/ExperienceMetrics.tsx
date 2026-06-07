// ============================================================
// components/sections/experience/ExperienceMetrics.tsx
// Animated metric cards shown inside each experience entry.
// Numbers count up when the card enters the viewport.
// Color-coded by metric type (indigo / emerald / violet / amber).
// ============================================================

"use client";

import { motion } from "framer-motion";
import { ImpactMetric } from "@/data/experience";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

// ── Color token maps ─────────────────────────────────────────
const bgMap = {
  indigo: "bg-indigo-500/8 dark:bg-indigo-500/12 group-hover:bg-indigo-500/14",
  violet: "bg-violet-500/8 dark:bg-violet-500/12 group-hover:bg-violet-500/14",
  emerald: "bg-emerald-500/8 dark:bg-emerald-500/12 group-hover:bg-emerald-500/14",
  amber: "bg-amber-500/8 dark:bg-amber-500/12 group-hover:bg-amber-500/14",
};

const borderMap = {
  indigo: "hover:border-indigo-300/60 dark:hover:border-indigo-700/50",
  violet: "hover:border-violet-300/60 dark:hover:border-violet-700/50",
  emerald: "hover:border-emerald-300/60 dark:hover:border-emerald-700/50",
  amber: "hover:border-amber-300/60 dark:hover:border-amber-700/50",
};

const numberMap = {
  indigo: "text-indigo-600 dark:text-indigo-400",
  violet: "text-violet-600 dark:text-violet-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  amber: "text-amber-600 dark:text-amber-400",
};

const glowMap = {
  indigo: "hover:shadow-[0_4px_20px_rgba(99,102,241,0.12)] dark:hover:shadow-[0_4px_20px_rgba(99,102,241,0.18)]",
  violet: "hover:shadow-[0_4px_20px_rgba(139,92,246,0.12)] dark:hover:shadow-[0_4px_20px_rgba(139,92,246,0.18)]",
  emerald: "hover:shadow-[0_4px_20px_rgba(16,185,129,0.12)] dark:hover:shadow-[0_4px_20px_rgba(16,185,129,0.18)]",
  amber: "hover:shadow-[0_4px_20px_rgba(245,158,11,0.12)] dark:hover:shadow-[0_4px_20px_rgba(245,158,11,0.18)]",
};

// ── Individual metric card ────────────────────────────────────
interface MetricCardProps {
  metric: ImpactMetric;
  index: number;
  inView: boolean;
}

function MetricCard({ metric, index, inView }: MetricCardProps) {
  // For decimals like 99.9, we count to 99 then display manually
  const isDecimal = !Number.isInteger(metric.value);
  const countTarget = isDecimal ? Math.floor(metric.value) : metric.value;

  const count = useCountUp({
    target: countTarget,
    duration: 1400,
    delay: index * 100,
    enabled: inView,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -3 }}
      className={cn(
        "group relative flex flex-col gap-2.5 rounded-xl p-4",
        "border border-zinc-200/70 bg-white dark:border-zinc-800/70 dark:bg-zinc-900",
        "shadow-[0_1px_6px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_8px_rgba(0,0,0,0.2)]",
        "transition-all duration-300 cursor-default",
        borderMap[metric.color],
        glowMap[metric.color]
      )}
      aria-label={`${metric.value}${metric.suffix} ${metric.label}`}
    >
      {/* Icon badge */}
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-all duration-300",
          bgMap[metric.color]
        )}
        aria-hidden="true"
      >
        {metric.icon}
      </div>

      {/* Animated number */}
      <div className="flex items-baseline gap-0.5">
        {metric.prefix && (
          <span className={cn("font-mono text-sm font-bold", numberMap[metric.color])}>
            {metric.prefix}
          </span>
        )}
        <span
          className={cn("font-mono text-2xl font-bold tabular-nums leading-none", numberMap[metric.color])}
          aria-live="polite"
        >
          {isDecimal && inView ? metric.value : count}
        </span>
        <span className={cn("font-mono text-sm font-bold", numberMap[metric.color])}>
          {metric.suffix}
        </span>
      </div>

      {/* Label & description */}
      <div className="space-y-0.5">
        <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          {metric.label}
        </p>
        <p className="text-[10px] leading-relaxed text-zinc-400 dark:text-zinc-500">
          {metric.description}
        </p>
      </div>

      {/* Hover bottom accent */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-b-xl transition-transform duration-300 group-hover:scale-x-100",
          metric.color === "indigo" && "bg-indigo-500",
          metric.color === "violet" && "bg-violet-500",
          metric.color === "emerald" && "bg-emerald-500",
          metric.color === "amber" && "bg-amber-500"
        )}
        aria-hidden="true"
      />
    </motion.div>
  );
}

// ── Metrics grid ─────────────────────────────────────────────
interface ExperienceMetricsProps {
  metrics: ImpactMetric[];
}

export function ExperienceMetrics({ metrics }: ExperienceMetricsProps) {
  const [ref, inView] = useInView<HTMLDivElement>({
    threshold: 0.2,
    once: true,
  });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-2.5 sm:grid-cols-4"
      role="region"
      aria-label="Impact metrics"
    >
      {metrics.map((metric, i) => (
        <MetricCard key={metric.label} metric={metric} index={i} inView={inView} />
      ))}
    </div>
  );
}
