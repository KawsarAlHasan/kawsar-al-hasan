"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── Base gradient ───────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.2),transparent)]" />

      {/* ── Dot grid pattern ────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Glow orb — top left ─────────────────────────────── */}
      <motion.div
        className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-600/15"
        animate={
          reduced
            ? {}
            : {
                scale: [1, 1.08, 1],
                opacity: [0.6, 1, 0.6],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── Glow orb — bottom right ─────────────────────────── */}
      <motion.div
        className="absolute -bottom-60 -right-40 h-[700px] w-[700px] rounded-full bg-violet-500/10 blur-[140px] dark:bg-violet-600/15"
        animate={
          reduced
            ? {}
            : {
                scale: [1, 1.06, 1],
                opacity: [0.5, 0.9, 0.5],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* ── Glow orb — center accent ────────────────────────── */}
      <motion.div
        className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/5 blur-[100px] dark:bg-indigo-500/10"
        animate={
          reduced
            ? {}
            : {
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.8, 0.4],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* ── Noise texture overlay ────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Top gradient fade ────────────────────────────────── */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* ── Bottom gradient fade ─────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-[#080808] to-transparent" />
    </div>
  );
}
