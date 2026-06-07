
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";
import { skillCombos, skillsData } from "@/data/skills";

const bgMap: Record<string, string> = {
  indigo: "border-indigo-200/60 bg-indigo-50/50 dark:border-indigo-800/40 dark:bg-indigo-950/30",
  violet: "border-violet-200/60 bg-violet-50/50 dark:border-violet-800/40 dark:bg-violet-950/30",
  emerald: "border-emerald-200/60 bg-emerald-50/50 dark:border-emerald-800/40 dark:bg-emerald-950/30",
  sky: "border-sky-200/60 bg-sky-50/50 dark:border-sky-800/40 dark:bg-sky-950/30",
  amber: "border-amber-200/60 bg-amber-50/50 dark:border-amber-800/40 dark:bg-amber-950/30",
};

const textMap: Record<string, string> = {
  indigo: "text-indigo-700 dark:text-indigo-300",
  violet: "text-violet-700 dark:text-violet-300",
  emerald: "text-emerald-700 dark:text-emerald-300",
  sky: "text-sky-700 dark:text-sky-300",
  amber: "text-amber-700 dark:text-amber-300",
};

const bonusMap: Record<string, string> = {
  indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300",
  violet: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
};

interface SkillComboHintsProps {
  activatedSkillIds: Set<string>;
  unlockedCombos: Set<string>;
}

export function SkillComboHints({
  activatedSkillIds,
  unlockedCombos,
}: SkillComboHintsProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border",
        "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      )}
    >
      {/* Header / toggle */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
        aria-expanded={isOpen}
        aria-controls="combo-hints-content"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Combo Unlocks
          </span>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            {unlockedCombos.size}/{skillCombos.length}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-zinc-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="combo-hints-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-2 px-3 pb-3">
              {skillCombos.map((combo) => {
                const isUnlocked = unlockedCombos.has(combo.id);
                const skills = combo.skillIds.map(
                  (id) => skillsData.find((s) => s.id === id)!
                );

                return (
                  <div
                    key={combo.id}
                    className={cn(
                      "rounded-xl border p-3 transition-all duration-300",
                      isUnlocked
                        ? bgMap[combo.color]
                        : "border-zinc-100 bg-zinc-50/50 dark:border-zinc-800/50 dark:bg-zinc-800/30"
                    )}
                    aria-label={`${combo.name} — ${isUnlocked ? "unlocked" : "locked"}`}
                  >
                    <div className="flex items-start gap-2">
                      {/* Icon */}
                      <span className="text-base flex-shrink-0" aria-hidden="true">
                        {combo.icon}
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={cn(
                              "text-xs font-bold",
                              isUnlocked
                                ? textMap[combo.color]
                                : "text-zinc-500 dark:text-zinc-400"
                            )}
                          >
                            {combo.name}
                          </span>
                          <span
                            className={cn(
                              "rounded-md px-1.5 py-0.5 font-mono text-[9px] font-bold",
                              isUnlocked
                                ? bonusMap[combo.color]
                                : "bg-zinc-100 text-zinc-400 dark:bg-zinc-700 dark:text-zinc-500"
                            )}
                          >
                            +{combo.xpBonus} XP
                          </span>
                          {isUnlocked ? (
                            <Unlock className="h-3 w-3 text-emerald-500" aria-label="Unlocked" />
                          ) : (
                            <Lock className="h-3 w-3 text-zinc-300 dark:text-zinc-600" aria-label="Locked" />
                          )}
                        </div>

                        {/* Required skills */}
                        <div className="mt-1.5 flex flex-wrap gap-1" role="list" aria-label="Required skills">
                          {skills.map((skill) => {
                            const isActive = activatedSkillIds.has(skill.id);
                            return (
                              <span
                                key={skill.id}
                                role="listitem"
                                className={cn(
                                  "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                                  isActive || isUnlocked
                                    ? "bg-white/60 text-zinc-700 dark:bg-black/20 dark:text-zinc-300"
                                    : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                                )}
                              >
                                <span aria-hidden="true">{skill.icon}</span>
                                {skill.name}
                                {(isActive || isUnlocked) && (
                                  <svg viewBox="0 0 8 6" className="h-2 w-2 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                    <path d="M1 3l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
