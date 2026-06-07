"use client";

import { motion } from "framer-motion";
import { SkillLab } from "./SkillLab";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-label="Core Expertise and Skills"
      className="relative w-full overflow-hidden bg-white py-24 dark:bg-[#080808] sm:py-32"
    >
      {/* ── Background texture ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.07),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.012] dark:opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── Top separator ──────────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"
        aria-hidden="true"
      />

      {/* ── Content ────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* ── Section header ─────────────────────────────────── */}
        <div className="mb-12 max-w-2xl">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400"
          >
            // 04 — Core Expertise
          </motion.p>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, ease: EASE_OUT }}
              className="text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-zinc-900 dark:text-zinc-50"
            >
              The{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-300">
                Skill Lab
              </span>
            </motion.h2>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE_OUT }}
            className="mt-4 text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400"
          >
            Not your average skill bars.{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Activate skills to earn XP, unlock combo achievements,
            </span>{" "}
            and explore the full breadth of my technical stack — one card at a
            time.
          </motion.p>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
            style={{ originX: 0 }}
            className="mt-6 h-px w-full bg-gradient-to-r from-indigo-500/40 via-violet-500/20 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* ── Skill Lab game ──────────────────────────────────── */}
        <SkillLab />
      </div>

      {/* ── Bottom separator ───────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
