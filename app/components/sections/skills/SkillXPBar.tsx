"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Zap } from "lucide-react";
import { skillsData } from "@/data/skills";
import { cn } from "@/lib/utils";

interface SkillXPBarProps {
  xp: number;
  progressPercent: number;
  rank: { label: string; color: string };
  totalActivated: number;
  onReset: () => void;
}

export function SkillXPBar({
  xp,
  progressPercent,
  rank,
  totalActivated,
  onReset,
}: SkillXPBarProps) {
  const total = skillsData.length;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-4 sm:p-5",
        "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900",
        "shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.3)]",
      )}
      role="status"
      aria-label={`Skill Lab progress: ${xp} XP, rank ${rank.label}`}
    >
      {/* Subtle top glow strip */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: rank + XP */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15">
            <Zap
              className="h-5 w-5 text-indigo-500 dark:text-indigo-400"
              aria-hidden="true"
            />
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className={cn("font-mono text-base font-bold", rank.color)}>
                {rank.label}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={xp}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-mono text-sm font-medium text-zinc-400 dark:text-zinc-500"
                >
                  {xp} XP
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
              {totalActivated} / {total} skills activated
            </p>
          </div>
        </div>

        {/* Right: progress bar + reset */}
        <div className="flex flex-1 items-center gap-3 sm:max-w-xs">
          <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
            {/* Shimmer on the fill */}
            {progressPercent > 0 && (
              <motion.div
                className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-200%", "400%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1,
                }}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Reset button */}
          <button
            onClick={onReset}
            className={cn(
              "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg",
              "border border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500",
              "transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-500",
              "dark:hover:border-red-800 dark:hover:bg-red-950/30 dark:hover:text-red-400",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
            )}
            aria-label="Reset skill selections"
            title="Reset"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
