"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function AboutPhoto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // ── Scroll-linked parallax ─────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center lg:justify-start"
    >
      {/* ── Decorative background blob ─────────────────────── */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-3xl bg-gradient-to-br from-indigo-500/8 via-violet-500/5 to-transparent blur-2xl dark:from-indigo-500/12 dark:via-violet-500/8"
        aria-hidden="true"
      />

      {/* ── Corner accent — top-right ──────────────────────── */}
      <div
        className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 rounded-tr-2xl border-r-2 border-t-2 border-indigo-400/40 dark:border-indigo-500/30"
        aria-hidden="true"
      />

      {/* ── Corner accent — bottom-left ────────────────────── */}
      <div
        className="pointer-events-none absolute -bottom-3 -left-3 h-16 w-16 rounded-bl-2xl border-b-2 border-l-2 border-violet-400/40 dark:border-violet-500/30"
        aria-hidden="true"
      />

      {/* ── Parallax wrapper ───────────────────────────────── */}
      <motion.div
        style={prefersReduced ? {} : { y: parallaxY }}
        className="relative"
      >
        {/* ── Gradient border frame ──────────────────────── */}
        <div
          className={cn(
            "relative rounded-2xl p-[1.5px]",
            "bg-gradient-to-br from-indigo-500/60 via-violet-500/40 to-indigo-500/10",
            "shadow-[0_0_60px_rgba(99,102,241,0.12)] dark:shadow-[0_0_80px_rgba(99,102,241,0.18)]",
          )}
        >
          {/* ── Image container ─────────────────────────── */}
          <div className="relative overflow-hidden rounded-[14px] bg-zinc-100 dark:bg-zinc-900">
            <div className="relative h-[420px] w-[340px] sm:h-[480px] sm:w-[390px] lg:h-[520px] lg:w-[420px]">
              <Image
                src="/kawsar2.jpeg"
                alt="[Kawsar Al Hasan] — Full Stack Developer"
                fill
                priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 340px, (max-width: 1024px) 390px, 420px"
              />

              {/* ── END PLACEHOLDER ────────────────────────── */}

              {/* Bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-900/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* ── Floating badge: currently building ─────────── */}
        <motion.div
          className={cn(
            "absolute -right-5 top-10 z-10",
            "flex items-center gap-2.5 rounded-xl px-3.5 py-2.5",
            "border border-zinc-200/80 bg-white/95 shadow-lg backdrop-blur-sm",
            "dark:border-zinc-700/80 dark:bg-zinc-900/95",
          )}
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Currently open to work"
        >
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-base">
            💻
          </div>
          <div>
            <p className="text-[11px] font-semibold leading-none text-zinc-900 dark:text-zinc-50">
              Open to Work
            </p>
            <p className="mt-0.5 text-[10px] leading-none text-zinc-500 dark:text-zinc-400">
              Full-time & Freelance
            </p>
          </div>
        </motion.div>

        {/* ── Floating badge: code quality ───────────────── */}
        <motion.div
          className={cn(
            "absolute -left-5 bottom-20 z-10",
            "flex items-center gap-2.5 rounded-xl px-3.5 py-2.5",
            "border border-zinc-200/80 bg-white/95 shadow-lg backdrop-blur-sm",
            "dark:border-zinc-700/80 dark:bg-zinc-900/95",
          )}
          initial={{ opacity: 0, x: -20, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Clean code advocate"
        >
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-base">
            ✨
          </div>
          <div>
            <p className="text-[11px] font-semibold leading-none text-zinc-900 dark:text-zinc-50">
              Clean Code
            </p>
            <p className="mt-0.5 text-[10px] leading-none text-zinc-500 dark:text-zinc-400">
              Typed • Tested • Documented
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
