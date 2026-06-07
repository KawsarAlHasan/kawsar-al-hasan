"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skill, proficiencyLabel, ProficiencyLevel } from "@/data/skills";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// ── Signal bars (replaces traditional progress bar) ──────────
function SignalBars({ level }: { level: ProficiencyLevel }) {
  return (
    <div
      className="flex items-end gap-[3px]"
      role="img"
      aria-label={`Proficiency: ${proficiencyLabel[level]} (${level} of 5)`}
    >
      {[1, 2, 3, 4, 5].map((bar) => (
        <div
          key={bar}
          className={cn(
            "w-[5px] rounded-sm transition-all duration-300",
            bar <= level
              ? "bg-indigo-500 dark:bg-indigo-400"
              : "bg-zinc-200 dark:bg-zinc-700",
          )}
          style={{ height: `${6 + bar * 3}px` }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

// ── Card back face ───────────────────────────────────────────
function CardBack({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-between rounded-2xl p-4"
      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
            {skill.name}
          </p>
          <p className="mt-0.5 text-[10px] font-mono text-indigo-500 dark:text-indigo-400">
            {proficiencyLabel[skill.proficiency]}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="flex-shrink-0 rounded-md p-0.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500"
          aria-label="Close skill detail"
        >
          <svg
            viewBox="0 0 12 12"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M2 2l8 8M10 2l-8 8" />
          </svg>
        </button>
      </div>

      {/* Signal bars */}
      <div className="flex flex-col gap-1.5">
        <SignalBars level={skill.proficiency} />
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
          {skill.description}
        </p>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between">
        <div className="text-center">
          <p className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-50">
            {skill.usedIn}
          </p>
          <p className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
            Projects
          </p>
        </div>
        <div
          className="h-6 w-px bg-zinc-200 dark:bg-zinc-700"
          aria-hidden="true"
        />
        <div className="text-center">
          <p className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-50">
            {skill.yearsUsed}yr{skill.yearsUsed > 1 ? "s" : ""}
          </p>
          <p className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
            Experience
          </p>
        </div>
        <div
          className="h-6 w-px bg-zinc-200 dark:bg-zinc-700"
          aria-hidden="true"
        />
        <div className="text-center">
          <p className="font-mono text-sm font-bold text-indigo-500 dark:text-indigo-400">
            +{skill.xpValue}
          </p>
          <p className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
            XP
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main card ────────────────────────────────────────────────
interface SkillCardProps {
  skill: Skill;
  index: number;
  isActivated: boolean;
  onActivate: (skill: Skill) => void;
}

export function SkillCard({
  skill,
  index,
  isActivated,
  onActivate,
}: SkillCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Each card gets a unique phase offset so the float is staggered
  const floatDelay = (index % 7) * 0.4;
  const floatDuration = 3 + (index % 4) * 0.5;

  const handleClick = () => {
    if (isFlipped) return; // card detail is open, don't re-activate
    setIsFlipped(true);
    if (!isActivated) onActivate(skill);
  };

  const handleClose = () => {
    setIsFlipped(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: EASE_OUT,
      }}
      // Ambient float
      whileInView={
        isFlipped || isHovered
          ? {}
          : {
              y: [0, -6, 0],
              transition: {
                duration: floatDuration,
                delay: floatDelay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
      }
      className={cn(
        "relative h-[130px] cursor-pointer select-none",
        "[perspective:800px]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-pressed={isActivated}
      aria-label={`${skill.name} — click to ${isActivated ? "deactivate" : "activate"} and view details`}
    >
      {/* ── 3D flip container ─────────────────────────────── */}
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ════════════════ FRONT FACE ════════════════════════ */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-2xl border p-3",
            "transition-all duration-300",
            isActivated
              ? [
                  "border-indigo-400/60 bg-gradient-to-br from-indigo-50 to-violet-50/50",
                  "dark:border-indigo-600/50 dark:from-indigo-950/60 dark:to-violet-950/40",
                  "shadow-[0_0_24px_rgba(99,102,241,0.2)] dark:shadow-[0_0_30px_rgba(99,102,241,0.25)]",
                ]
              : [
                  "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900",
                  isHovered &&
                    "border-indigo-300/60 shadow-[0_4px_20px_rgba(99,102,241,0.12)] dark:border-indigo-700/50 dark:shadow-[0_4px_20px_rgba(99,102,241,0.18)]",
                ],
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Activated glow orb */}
          {isActivated && (
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/8"
              aria-hidden="true"
            />
          )}

          {/* Icon */}
          <motion.div
            animate={isActivated ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.4 }}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl text-2xl",
              isActivated
                ? "bg-indigo-500/10 dark:bg-indigo-500/15"
                : "bg-zinc-100 dark:bg-zinc-800",
            )}
            aria-hidden="true"
          >
            {skill.icon}
          </motion.div>

          {/* Name */}
          <p
            className={cn(
              "text-center text-xs font-semibold leading-tight",
              isActivated
                ? "text-indigo-700 dark:text-indigo-300"
                : "text-zinc-700 dark:text-zinc-300",
            )}
          >
            {skill.name}
          </p>

          {/* Activated checkmark */}
          <AnimatePresence>
            {isActivated && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 10 8"
                  className="h-2.5 w-2.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M1 4l3 3 5-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover hint */}
          <AnimatePresence>
            {isHovered && !isActivated && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute bottom-2 text-[9px] font-medium text-indigo-400 dark:text-indigo-500"
              >
                click to activate
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* ════════════════ BACK FACE ═════════════════════════ */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl border",
            "border-indigo-300/60 bg-white dark:border-indigo-700/50 dark:bg-zinc-900",
            "shadow-[0_0_30px_rgba(99,102,241,0.2)] dark:shadow-[0_0_30px_rgba(99,102,241,0.25)]",
          )}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <CardBack skill={skill} onClose={handleClose} />
        </div>
      </motion.div>
    </motion.div>
  );
}
