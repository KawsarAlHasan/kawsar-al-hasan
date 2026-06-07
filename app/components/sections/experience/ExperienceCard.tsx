// ============================================================
// components/sections/experience/ExperienceCard.tsx
// A single experience entry card. Contains:
//  - Company header (logo placeholder, name, type badge, dates)
//  - Position title + tagline
//  - Responsibilities list with optional keyword highlights
//  - Tech stack pill row
//  - Impact metrics grid (ExperienceMetrics)
// Slides in from the right on scroll entry.
// ============================================================

"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink, Calendar, Briefcase } from "lucide-react";
import { ExperienceEntry } from "@/data/experience";
import { cn } from "@/lib/utils";
import { ExperienceMetrics } from "./ExperienceMetrics";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// ── Type badge color map ─────────────────────────────────────
const typeBadgeMap: Record<string, string> = {
  "Full-time":
    "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-400",
  Contract:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800/60 dark:bg-violet-950/50 dark:text-violet-400",
  Freelance:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/60 dark:bg-amber-950/50 dark:text-amber-400",
  "Part-time":
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-400",
  Internship:
    "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
};

// ── Responsibility item ──────────────────────────────────────
function ResponsibilityItem({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  if (!highlight) {
    return (
      <li className="flex items-start gap-2.5 text-sm leading-[1.75] text-zinc-600 dark:text-zinc-400">
        <span
          className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400/60 dark:bg-indigo-500/50"
          aria-hidden="true"
        />
        {text}
      </li>
    );
  }

  // Split text around the highlight keyword and bold it
  const parts = text.split(highlight);
  return (
    <li className="flex items-start gap-2.5 text-sm leading-[1.75] text-zinc-600 dark:text-zinc-400">
      <span
        className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400/60 dark:bg-indigo-500/50"
        aria-hidden="true"
      />
      <span>
        {parts[0]}
        <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
          {highlight}
        </strong>
        {parts[1]}
      </span>
    </li>
  );
}

// ── Main card ────────────────────────────────────────────────
interface ExperienceCardProps {
  entry: ExperienceEntry;
  index: number;
}

export function ExperienceCard({ entry, index }: ExperienceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 24, y: 16 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: EASE_OUT,
      }}
      className={cn(
        "group relative flex flex-col gap-6 rounded-2xl p-6 sm:p-7",
        "border bg-white dark:bg-zinc-900",
        entry.current
          ? "border-indigo-200/80 dark:border-indigo-800/50"
          : "border-zinc-200/80 dark:border-zinc-800",
        "shadow-[0_2px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.3)]",
        "transition-shadow duration-300",
        "hover:shadow-[0_8px_40px_rgba(99,102,241,0.1)] dark:hover:shadow-[0_8px_40px_rgba(99,102,241,0.15)]"
      )}
      aria-label={`${entry.position} at ${entry.company}`}
    >
      {/* ── Current role indicator strip ─────────────────── */}
      {entry.current && (
        <div
          className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400"
          aria-hidden="true"
        />
      )}

      {/* ════════════════════════════════════════════════════
          HEADER: Logo | Company | Badges | Dates
      ════════════════════════════════════════════════════ */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          {/* Company logo placeholder */}
          <div
            className={cn(
              "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl",
              "border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800",
              "font-mono text-[10px] font-bold text-zinc-400 dark:text-zinc-500"
            )}
            aria-label={`${entry.company} logo — ${entry.companyLogo}`}
            title={`Replace with: ${entry.companyLogo}`}
          >
            {/*
              ── LOGO PLACEHOLDER ──────────────────────────────
              Replace this div's contents with:
              <Image
                src={`/images/logos/${entry.companyLogo}.svg`}
                alt={`${entry.company} logo`}
                width={32}
                height={32}
                className="object-contain"
              />
              ──────────────────────────────────────────────────
            */}
            <span className="text-center leading-tight text-[9px]">
              {entry.company
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 3)}
            </span>
          </div>

          {/* Company info */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              {entry.companyUrl ? (
                <a
                  href={entry.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1 text-base font-bold text-zinc-900 transition-colors hover:text-indigo-600 dark:text-zinc-50 dark:hover:text-indigo-400"
                  aria-label={`Visit ${entry.company} website`}
                >
                  {entry.company}
                  <ExternalLink
                    className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover/link:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <span className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                  {entry.company}
                </span>
              )}

              {/* Employment type badge */}
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
                  typeBadgeMap[entry.type] ?? typeBadgeMap["Full-time"]
                )}
              >
                {entry.type}
              </span>

              {/* Current badge */}
              {entry.current && (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 [animation-duration:2s]" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Current
                </span>
              )}
            </div>

            {/* Location + remote */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {entry.location}
                {entry.remote && " · Remote"}
              </span>
            </div>
          </div>
        </div>

        {/* Date range */}
        <div className="flex flex-shrink-0 items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-col sm:items-end sm:gap-0.5">
          <Calendar className="h-3.5 w-3.5 sm:hidden" aria-hidden="true" />
          <span className="font-medium">{entry.startDate}</span>
          <span className="hidden sm:block text-zinc-300 dark:text-zinc-700">↓</span>
          <span className="hidden sm:hidden">–</span>
          <span
            className={cn(
              "font-medium",
              entry.current && "text-indigo-500 dark:text-indigo-400"
            )}
          >
            {entry.endDate}
          </span>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════
          POSITION + TAGLINE
      ════════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 flex-shrink-0 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            {entry.position}
          </h3>
        </div>
        <p className="ml-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {entry.tagline}
        </p>
      </div>

      {/* ════════════════════════════════════════════════════
          RESPONSIBILITIES
      ════════════════════════════════════════════════════ */}
      <section aria-label="Responsibilities">
        <ul className="flex flex-col gap-2.5" role="list">
          {entry.responsibilities.map((resp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.45,
                delay: i * 0.06,
                ease: EASE_OUT,
              }}
            >
              <ResponsibilityItem
                text={resp.text}
                highlight={resp.highlight}
              />
            </motion.div>
          ))}
        </ul>
      </section>

      {/* ════════════════════════════════════════════════════
          TECH STACK
      ════════════════════════════════════════════════════ */}
      <section aria-label="Technologies used">
        <div className="flex flex-wrap gap-1.5" role="list">
          {entry.techStack.map((tech) => (
            <span
              key={tech}
              role="listitem"
              className={cn(
                "inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-medium",
                "border-zinc-200 bg-zinc-50 text-zinc-600",
                "dark:border-zinc-700/80 dark:bg-zinc-800/60 dark:text-zinc-400",
                "transition-colors duration-150 hover:border-indigo-300 hover:text-indigo-600",
                "dark:hover:border-indigo-700/60 dark:hover:text-indigo-400"
              )}
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          IMPACT METRICS
      ════════════════════════════════════════════════════ */}
      <section aria-label="Impact metrics">
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-500 dark:text-indigo-400">
            Impact
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-indigo-200 to-transparent dark:from-indigo-800/60" aria-hidden="true" />
        </div>
        <ExperienceMetrics metrics={entry.impactMetrics} />
      </section>
    </motion.article>
  );
}
