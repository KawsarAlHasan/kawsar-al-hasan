// ============================================================
// components/sections/experience/GlobalImpact.tsx
// A full-width strip of 4 career-total impact cards,
// shown above the timeline. Each metric has a count-up animation.
// Gradient border on cards, dark premium surface.
// ============================================================

"use client";

import { motion } from "framer-motion";
import { GlobalImpactCard } from "@/data/experience";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// ── Color maps ───────────────────────────────────────────────
const gradientMap = {
  indigo: "from-indigo-500/20 to-indigo-500/5",
  violet: "from-violet-500/20 to-violet-500/5",
  emerald: "from-emerald-500/20 to-emerald-500/5",
  amber: "from-amber-500/20 to-amber-500/5",
};

const iconBgMap = {
  indigo: "bg-indigo-500/15 dark:bg-indigo-500/20",
  violet: "bg-violet-500/15 dark:bg-violet-500/20",
  emerald: "bg-emerald-500/15 dark:bg-emerald-500/20",
  amber: "bg-amber-500/15 dark:bg-amber-500/20",
};

const numberMap = {
  indigo: "text-indigo-600 dark:text-indigo-400",
  violet: "text-violet-600 dark:text-violet-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  amber: "text-amber-600 dark:text-amber-400",
};

const borderMap = {
  indigo: "border-indigo-200/60 dark:border-indigo-800/40 hover:border-indigo-300 dark:hover:border-indigo-700/60",
  violet: "border-violet-200/60 dark:border-violet-800/40 hover:border-violet-300 dark:hover:border-violet-700/60",
  emerald: "border-emerald-200/60 dark:border-emerald-800/40 hover:border-emerald-300 dark:hover:border-emerald-700/60",
  amber: "border-amber-200/60 dark:border-amber-800/40 hover:border-amber-300 dark:hover:border-amber-700/60",
};

// ── Single impact card ───────────────────────────────────────
function ImpactCard({
  card,
  index,
  inView,
}: {
  card: GlobalImpactCard;
  index: number;
  inView: boolean;
}) {
  const isDecimal = !Number.isInteger(card.value);
  const count = useCountUp({
    target: isDecimal ? Math.floor(card.value) : card.value,
    duration: 1800,
    delay: index * 130,
    enabled: inView,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_OUT }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "group relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-6",
        "bg-white dark:bg-zinc-900",
        "shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.3)]",
        "transition-all duration-300 cursor-default",
        borderMap[card.color]
      )}
      aria-label={`${card.prefix ?? ""}${card.value}${card.suffix} — ${card.label}`}
    >
      {/* Background gradient wash */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-40 dark:opacity-60",
          gradientMap[card.color]
        )}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-xl text-xl transition-transform duration-300 group-hover:scale-110",
          iconBgMap[card.color]
        )}
        aria-hidden="true"
      >
        {card.icon}
      </div>

      {/* Number */}
      <div className="relative flex items-baseline gap-0.5">
        {card.prefix && (
          <span className={cn("font-mono text-base font-bold", numberMap[card.color])}>
            {card.prefix}
          </span>
        )}
        <span
          className={cn(
            "font-mono text-4xl font-extrabold tabular-nums leading-none tracking-tight",
            numberMap[card.color]
          )}
          aria-live="polite"
        >
          {isDecimal && inView ? card.value : count}
        </span>
        <span className={cn("font-mono text-xl font-bold", numberMap[card.color])}>
          {card.suffix}
        </span>
      </div>

      {/* Labels */}
      <div className="relative space-y-1">
        <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100">
          {card.label}
        </p>
        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {card.description}
        </p>
      </div>

      {/* Hover shimmer sweep */}
      <div
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-700 group-hover:translate-x-full dark:via-white/5"
        aria-hidden="true"
      />
    </motion.div>
  );
}

// ── Grid wrapper ─────────────────────────────────────────────
interface GlobalImpactProps {
  cards: GlobalImpactCard[];
}

export function GlobalImpact({ cards }: GlobalImpactProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15, once: true });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      role="region"
      aria-label="Career-wide impact summary"
    >
      {cards.map((card, i) => (
        <ImpactCard key={card.label} card={card} index={i} inView={inView} />
      ))}
    </div>
  );
}
