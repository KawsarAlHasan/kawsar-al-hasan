// ============================================================
// components/sections/experience/ExperienceTimeline.tsx
// The timeline container. Renders:
//  - A vertical animated progress line (desktop)
//  - Timeline dots for each entry
//  - ExperienceCard for each entry
//
// Layout (desktop):
//   [dot] ——— [card content]
//
// Layout (mobile):
//   [card only — dot hidden, left border accent]
// ============================================================

"use client";

import { useRef } from "react";
import { ExperienceEntry } from "@/data/experience";
import { ExperienceCard } from "./ExperienceCard";
import { TimelineLine } from "./TimelineLine";
import { TimelineDot } from "./TimelineDot";

interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
}

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={timelineRef}
      className="relative"
      role="list"
      aria-label="Professional experience timeline"
    >
      {/* ── Animated vertical line ─────────────────────────── */}
      {/*    Absolutely positioned — only visible on md+ ─────── */}
      <TimelineLine />

      {/* ── Entry list ─────────────────────────────────────── */}
      <div className="flex flex-col gap-10 md:gap-12">
        {entries.map((entry, i) => (
          <div
            key={entry.id}
            role="listitem"
            className="relative flex items-start gap-6 md:gap-8"
          >
            {/* ── Dot — desktop only ─────────────────────── */}
            <div className="hidden md:block flex-shrink-0 pt-7">
              <TimelineDot isActive={entry.current} index={i} />
            </div>

            {/* ── Card — full width on mobile ────────────── */}
            <div className="flex-1 min-w-0">
              {/*
                Mobile left border accent (replaces the dot line on small screens)
                Only visible below md breakpoint
              */}
              <div
                className={`
                  md:hidden absolute left-0 top-0 bottom-0 w-[2px] rounded-full
                  ${entry.current
                    ? "bg-gradient-to-b from-indigo-500 via-violet-500 to-indigo-500/30"
                    : "bg-zinc-200 dark:bg-zinc-800"
                  }
                `}
                aria-hidden="true"
              />

              <div className="pl-4 md:pl-0">
                <ExperienceCard entry={entry} index={i} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
