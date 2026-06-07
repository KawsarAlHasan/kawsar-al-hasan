"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/data/about";
import { AboutPhoto } from "./AboutPhoto";
import { AboutBio } from "./AboutBio";
import { AboutPhilosophy } from "./AboutPhilosophy";
import { AboutBuilds } from "./AboutBuilds";
import { AboutStats } from "./AboutStats";

export function AboutSection() {
  const {
    sectionLabel,
    headline,
    headlineAccent,
    tagline,
    bio,
    story,
    enjoyBuilding,
    philosophy,
    stats,
    resumeUrl,
  } = aboutData;

  return (
    <section
      id="about"
      aria-label="About Me"
      className="relative w-full overflow-hidden bg-white py-24 dark:bg-[#080808] sm:py-32"
    >
      {/* ── Subtle section background texture ──────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* ── Top separator ──────────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"
        aria-hidden="true"
      />

      {/* ── Main content container ─────────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* ══════════════════════════════════════════════════
            PRIMARY GRID: Photo | Content
        ══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[420px_1fr] lg:gap-20 xl:gap-24">
          {/* ── LEFT: Photo ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-28" // Sticky on desktop so photo stays in frame
          >
            <AboutPhoto />
          </motion.div>

          {/* ── RIGHT: Content stack ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-10"
          >
            {/* 1. Bio text + resume CTA */}
            <AboutBio
              sectionLabel={sectionLabel}
              headline={headline}
              headlineAccent={headlineAccent}
              tagline={tagline}
              bio={bio}
              story={story}
              resumeUrl={resumeUrl}
            />

            {/* ── Horizontal divider ─────────────────────── */}
            <div
              className="h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"
              aria-hidden="true"
            />

            {/* 2. What I build — tag cloud */}
            <AboutBuilds items={enjoyBuilding} />

            {/* ── Horizontal divider ─────────────────────── */}
            <div
              className="h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"
              aria-hidden="true"
            />

            {/* 3. Philosophy cards */}
            <AboutPhilosophy items={philosophy} />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════
            STATS ROW — full width, below the main grid
        ══════════════════════════════════════════════════ */}
        <div className="mt-16 sm:mt-20">
          {/* Stats section label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center gap-3"
          >
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              By the Numbers
            </h3>
            <div
              className="h-px flex-1 bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800"
              aria-hidden="true"
            />
          </motion.div>

          <AboutStats stats={stats} />
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
