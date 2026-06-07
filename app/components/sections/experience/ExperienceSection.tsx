// ============================================================
// components/sections/experience/ExperienceSection.tsx
// Experience & Impact section — orchestrates:
//  1. Section header (label + headline + description)
//  2. Global impact cards (career-wide totals)
//  3. Timeline of experience entries
//
// Section uses a contained max-width layout consistent with
// Hero and About. Background is a shade warmer than the
// About section to provide subtle visual rhythm.
// ============================================================

"use client";

import { motion } from "framer-motion";
import { experienceData, globalImpactData } from "@/data/experience";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { GlobalImpact } from "./GlobalImpact";


const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Experience and Impact"
      className="relative w-full overflow-hidden bg-zinc-50/80 py-24 dark:bg-[#0a0a0a] sm:py-32"
    >
      {/* ── Background texture ─────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Subtle radial gradient top-center */}
        <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(99,102,241,0.06),transparent)] dark:bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(99,102,241,0.1),transparent)]" />
        {/* Very faint dot grid */}
        <div
          className="absolute inset-0 opacity-[0.012] dark:opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Top separator ──────────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"
        aria-hidden="true"
      />

      {/* ── Content container ──────────────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* ════════════════════════════════════════════════════
            SECTION HEADER
        ════════════════════════════════════════════════════ */}
        <div className="mb-16 max-w-2xl sm:mb-20">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400"
          >
            // 02 — Experience & Impact
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
              Where I&apos;ve{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-300">
                Made an Impact
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
            Two years of professional experience across product companies and
            agencies — building systems that ship, scale, and create measurable
            business value.
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

        {/* ════════════════════════════════════════════════════
            GLOBAL IMPACT CARDS
        ════════════════════════════════════════════════════ */}
        <div className="mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="mb-6 flex items-center gap-3"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-zinc-500 dark:text-zinc-400">
              Career Highlights
            </h3>
            <div
              className="h-px flex-1 bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800"
              aria-hidden="true"
            />
          </motion.div>

          <GlobalImpact cards={globalImpactData} />
        </div>

        {/* ════════════════════════════════════════════════════
            EXPERIENCE TIMELINE
        ════════════════════════════════════════════════════ */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="mb-8 flex items-center gap-3"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-zinc-500 dark:text-zinc-400">
              Work History
            </h3>
            <div
              className="h-px flex-1 bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800"
              aria-hidden="true"
            />
          </motion.div>

          {/* Timeline — left padded on desktop to accommodate the line + dots */}
          <div className="md:pl-14">
            <ExperienceTimeline entries={experienceData} />
          </div>
        </div>
      </div>

      {/* ── Bottom separator ───────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
