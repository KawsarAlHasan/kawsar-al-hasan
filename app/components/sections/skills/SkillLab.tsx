// ============================================================
// components/sections/skills/SkillLab.tsx
// The game canvas — wires the game state to all sub-components.
//
// Layout (desktop):
//   ┌──────────────────────────────┬──────────────────┐
//   │  XP Bar (full width)         │                  │
//   ├──────────────────────────────┤  Combo Hints     │
//   │  Category Tabs               │  Panel           │
//   ├──────────────────────────────┤                  │
//   │  Combo Notification          │                  │
//   ├──────────────────────────────┤                  │
//   │  Skill Grid                  │                  │
//   └──────────────────────────────┴──────────────────┘
//
// On mobile: stacked, combo hints collapsed below grid.
// ============================================================
 
"use client";

import { motion } from "framer-motion";
import { useSkillGame } from "@/hooks/useSkillGame";
import { SkillXPBar } from "./SkillXPBar";
import { SkillCategoryTabs } from "./SkillCategoryTabs";
import { SkillGrid } from "./SkillGrid";
import { SkillComboNotification } from "./SkillComboNotification";
import { SkillComboHints } from "./SkillComboHints";

export function SkillLab() {
  const [state, actions] = useSkillGame();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6"
    >
      {/* ── LEFT / MAIN column ─────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-4 min-w-0">
        {/* XP HUD bar */}
        <SkillXPBar
          xp={state.xp}
          progressPercent={state.progressPercent}
          rank={state.rank}
          totalActivated={state.totalActivated}
          onReset={actions.resetGame}
        />

        {/* Category tabs */}
        <SkillCategoryTabs
          activeCategory={state.activeCategory}
          onCategoryChange={actions.setCategory}
        />

        {/* Combo notification banner */}
        <SkillComboNotification
          notification={state.comboNotification}
          onDismiss={actions.dismissNotification}
        />

        {/* Skill card grid */}
        <SkillGrid
          skills={state.filteredSkills}
          activatedSkillIds={state.activatedSkillIds}
          onActivate={actions.activateSkill}
        />
      </div>

      {/* ── RIGHT / SIDEBAR column ─────────────────────────── */}
      <div className="w-full flex-shrink-0 lg:w-72 xl:w-80">
        <SkillComboHints
          activatedSkillIds={state.activatedSkillIds}
          unlockedCombos={state.unlockedCombos}
        />
      </div>
    </motion.div>
  );
}
