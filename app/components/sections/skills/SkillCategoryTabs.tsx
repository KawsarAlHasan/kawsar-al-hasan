"use client";

import { motion } from "framer-motion";
import { SkillCategory, categoryMeta, skillsData } from "@/data/skills";
import { cn } from "@/lib/utils";

type Category = SkillCategory | "All";

const ALL_CATEGORIES: Category[] = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Cloud & DevOps",
  "AI Tools",
  "UI Engineering",
];

const colorMap: Record<string, string> = {
  indigo: "text-indigo-600 dark:text-indigo-400",
  violet: "text-violet-600 dark:text-violet-400",
  cyan: "text-cyan-600 dark:text-cyan-400",
  sky: "text-sky-600 dark:text-sky-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  rose: "text-rose-600 dark:text-rose-400",
};

const activeBgMap: Record<string, string> = {
  All: "bg-zinc-900 dark:bg-zinc-50",
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  cyan: "bg-cyan-500",
  sky: "bg-sky-500",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
};

function getSkillCount(cat: Category): number {
  if (cat === "All") return skillsData.length;
  return skillsData.filter((s) => s.category === cat).length;
}

interface SkillCategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (cat: Category) => void;
}

export function SkillCategoryTabs({
  activeCategory,
  onCategoryChange,
}: SkillCategoryTabsProps) {
  return (
    <div className="relative" role="tablist" aria-label="Skill categories">
      {/* Scroll container */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {ALL_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const meta = cat !== "All" ? categoryMeta[cat] : null;
          const color = meta?.color ?? "All";
          const activeBg =
            cat === "All"
              ? activeBgMap.All
              : (activeBgMap[color] ?? activeBgMap.All);
          const count = getSkillCount(cat);

          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              aria-controls="skill-grid"
              onClick={() => onCategoryChange(cat)}
              className={cn(
                "relative flex flex-shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                isActive
                  ? "text-white dark:text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
              )}
            >
              {/* Sliding background pill */}
              {isActive && (
                <motion.span
                  layoutId="skill-tab-bg"
                  className={cn("absolute inset-0 rounded-xl", activeBg)}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  aria-hidden="true"
                />
              )}

              {/* Content */}
              <span className="relative flex items-center gap-1.5">
                {meta && (
                  <span className="text-base leading-none" aria-hidden="true">
                    {meta.icon}
                  </span>
                )}
                <span>{cat}</span>
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
                    isActive
                      ? "bg-white/20 text-white dark:bg-black/15 dark:text-zinc-900"
                      : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
                  )}
                >
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom border */}
      <div
        className="mt-1 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
