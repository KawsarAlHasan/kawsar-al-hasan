// ============================================================
// components/sections/about/AboutBio.tsx
// Biography text block with:
//  - Section label + headline reveal
//  - Staggered paragraph animations
//  - Highlighted "story" quote with left-border accent
//  - Resume download CTA button
// ============================================================

"use client";

import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "../../common/SectionLabel";

interface AboutBioProps {
  sectionLabel: string;
  headline: string;
  headlineAccent: string;
  tagline: string;
  bio: string[];
  story: string;
  resumeUrl: string;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function AboutBio({
  sectionLabel,
  headline,
  headlineAccent,
  tagline,
  bio,
  story,
  resumeUrl,
}: AboutBioProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* ── Section label ─────────────────────────────────── */}
      <SectionLabel label={sectionLabel} />

      {/* ── Headline ──────────────────────────────────────── */}
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "110%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
          className={cn(
            "text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em]",
            "text-zinc-900 dark:text-zinc-50"
          )}
        >
          {headline}{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-300">
            {headlineAccent}
          </span>
        </motion.h2>
      </div>

      {/* ── Tagline ───────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
        className="text-base font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed"
      >
        {tagline}
      </motion.p>

      {/* ── Divider ───────────────────────────────────────── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
        style={{ originX: 0 }}
        className="h-px w-full bg-gradient-to-r from-indigo-500/30 via-violet-500/20 to-transparent"
        aria-hidden="true"
      />

      {/* ── Bio paragraphs ────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        {bio.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.6,
              delay: 0.15 + i * 0.12,
              ease: EASE_OUT,
            }}
            className="text-[15px] leading-[1.8] text-zinc-600 dark:text-zinc-400"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      {/* ── Story quote block ─────────────────────────────── */}
      <motion.blockquote
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.65, delay: 0.3, ease: EASE_OUT }}
        className={cn(
          "relative rounded-r-xl border-l-2 border-indigo-500 py-3 pl-5 pr-4",
          "bg-indigo-500/5 dark:bg-indigo-500/8"
        )}
        aria-label="Developer story"
      >
        {/* Large decorative quote mark */}
        <span
          className="pointer-events-none absolute -left-0.5 -top-1 font-serif text-4xl leading-none text-indigo-400/30 select-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="text-sm font-medium italic leading-relaxed text-zinc-600 dark:text-zinc-300">
          {story}
        </p>
      </motion.blockquote>

      {/* ── Resume CTA ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.4, ease: EASE_OUT }}
        className="flex flex-wrap items-center gap-3 pt-1"
      >
        <a
          href={resumeUrl}
          download
          className={cn(
            "group inline-flex items-center gap-2 rounded-xl px-5 py-2.5",
            "bg-zinc-900 text-sm font-semibold text-white",
            "dark:bg-zinc-50 dark:text-zinc-900",
            "transition-all duration-200 hover:bg-zinc-700 dark:hover:bg-zinc-200",
            "shadow-sm hover:shadow-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
            "active:scale-[0.98]"
          )}
          aria-label="Download resume PDF"
        >
          <Download
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
          Download Resume
        </a>

        <a
          href="#contact"
          className={cn(
            "group inline-flex items-center gap-1.5 text-sm font-medium",
            "text-indigo-600 dark:text-indigo-400",
            "transition-colors duration-200 hover:text-indigo-500 dark:hover:text-indigo-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-sm"
          )}
          aria-label="Get in touch"
        >
          Or get in touch
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </motion.div>
    </div>
  );
}
