"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SkillCard } from "./SkillCard";
import { Skill } from "@/data/skills";

interface SkillGridProps {
  skills: Skill[];
  activatedSkillIds: Set<string>;
  onActivate: (skill: Skill) => void;
}

export function SkillGrid({
  skills,
  activatedSkillIds,
  onActivate,
}: SkillGridProps) {
  return (
    <div
      id="skill-grid"
      role="region"
      aria-label="Skill cards — click a card to activate it and see details"
    >
      {/* Instruction hint — fades after mount */}
      <motion.p
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 5 }}
        className="mb-3 text-center font-mono text-[10px] text-zinc-400 dark:text-zinc-600 pointer-events-none select-none"
        aria-hidden="true"
      >
        Click a card to activate · Flip to see details · Unlock combos
      </motion.p>

      <AnimatePresence mode="wait">
        <motion.div
          key={skills.map((s) => s.id).join(",")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {skills.length === 0 ? (
            // Empty state
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-4xl" aria-hidden="true">
                🔍
              </span>
              <p className="mt-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                No skills in this category yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
              <AnimatePresence>
                {skills.map((skill, i) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    index={i}
                    isActivated={activatedSkillIds.has(skill.id)}
                    onActivate={onActivate}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
