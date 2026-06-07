"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Skill,
  SkillCategory,
  SkillCombo,
  skillsData,
  skillCombos,
  getRank,
} from "@/data/skills";

export interface ComboNotification {
  id: string;
  combo: SkillCombo;
  timestamp: number;
}

export interface SkillGameState {
  activeCategory: SkillCategory | "All";
  activatedSkillIds: Set<string>;
  hoveredSkillId: string | null;
  xp: number;
  unlockedCombos: Set<string>;
  comboNotification: ComboNotification | null;
  filteredSkills: Skill[];
  rank: ReturnType<typeof getRank>;
  progressPercent: number;
  totalActivated: number;
}

export interface SkillGameActions {
  setCategory: (cat: SkillCategory | "All") => void;
  activateSkill: (skill: Skill) => void;
  setHovered: (id: string | null) => void;
  resetGame: () => void;
  dismissNotification: () => void;
}

const TOTAL_XP =
  skillsData.reduce((a, s) => a + s.xpValue, 0) +
  skillCombos.reduce((a, c) => a + c.xpBonus, 0);

export function useSkillGame(): [SkillGameState, SkillGameActions] {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">(
    "All",
  );
  const [activatedIds, setActivatedIds] = useState<Set<string>>(new Set());
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [xp, setXp] = useState(0);
  const [unlockedCombos, setUnlockedCombos] = useState<Set<string>>(new Set());
  const [comboNotification, setComboNotification] =
    useState<ComboNotification | null>(null);
  const notifTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  const rank = getRank(xp);
  const progressPercent = Math.min((xp / TOTAL_XP) * 100, 100);

  const activateSkill = useCallback(
    (skill: Skill) => {
      if (activatedIds.has(skill.id)) {
        setActivatedIds((prev) => {
          const n = new Set(prev);
          n.delete(skill.id);
          return n;
        });
        setXp((prev) => Math.max(0, prev - skill.xpValue));
        return;
      }
      const nextIds = new Set(activatedIds);
      nextIds.add(skill.id);
      setActivatedIds(nextIds);
      setXp((prev) => prev + skill.xpValue);

      for (const combo of skillCombos) {
        if (unlockedCombos.has(combo.id)) continue;
        const allActive = combo.skillIds.every((id) => nextIds.has(id));
        if (allActive) {
          setUnlockedCombos((prev) => new Set([...prev, combo.id]));
          setXp((prev) => prev + combo.xpBonus);
          if (notifTimer.current) clearTimeout(notifTimer.current);
          setComboNotification({ id: combo.id, combo, timestamp: Date.now() });
          notifTimer.current = setTimeout(
            () => setComboNotification(null),
            4000,
          );
        }
      }
    },
    [activatedIds, unlockedCombos],
  );

  const resetGame = useCallback(() => {
    setActivatedIds(new Set());
    setXp(0);
    setUnlockedCombos(new Set());
    setComboNotification(null);
    if (notifTimer.current) clearTimeout(notifTimer.current);
  }, []);

  const dismissNotification = useCallback(() => {
    setComboNotification(null);
    if (notifTimer.current) clearTimeout(notifTimer.current);
  }, []);

  useEffect(
    () => () => {
      if (notifTimer.current) clearTimeout(notifTimer.current);
    },
    [],
  );

  return [
    {
      activeCategory,
      activatedSkillIds: activatedIds,
      hoveredSkillId: hoveredId,
      xp,
      unlockedCombos,
      comboNotification,
      filteredSkills,
      rank,
      progressPercent,
      totalActivated: activatedIds.size,
    },
    {
      setCategory: setActiveCategory,
      activateSkill,
      setHovered: setHoveredId,
      resetGame,
      dismissNotification,
    },
  ];
}
