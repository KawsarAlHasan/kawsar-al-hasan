"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { scaleIn } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function HeroProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // 3D tilt effect
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [8, -8]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-8, 8]),
    springConfig,
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      variants={scaleIn}
      className="relative flex justify-center lg:justify-end"
    >
      {/* ── Outer glow ───────────────────────────────────────── */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent blur-2xl"
        aria-hidden="true"
      />

      {/* ── Tilt container ───────────────────────────────────── */}
      <motion.div
        ref={ref}
        style={
          reduced ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-default"
      >
        {/* ── Gradient border frame ────────────────────────────── */}
        <div
          className={cn(
            "relative rounded-2xl p-[1.5px]",
            "bg-gradient-to-br from-indigo-500/50 via-violet-500/30 to-transparent",
          )}
        >
          {/* ── Image container ──────────────────────────────── */}
          <div className="relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
            {/*
              ── REPLACE WITH YOUR ACTUAL IMAGE ──────────────────
              Change `src` to your real image path.
              Recommended: 480×560px, webp format.
              The placeholder below renders a styled fallback.
            */}
            <div className="relative h-[360px] w-[300px] sm:h-[440px] sm:w-[360px] lg:h-[480px] lg:w-[380px]">
              {/* Placeholder background — REMOVE when you add your real image */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-zinc-900 to-violet-900/40"
                aria-hidden="true"
              >
                {/* Decorative grid inside placeholder */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  {/* Avatar silhouette */}
                  <div className="h-24 w-24 rounded-full bg-indigo-500/20 border-2 border-indigo-500/30 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-12 w-12 text-indigo-400/50"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                  <span className="text-xs font-mono text-indigo-400/60 tracking-wider">
                    YOUR_PROFILE_IMAGE
                  </span>
                </div>
              </div>

              <Image
                src="/kawsar.jpg"
                alt="Kawsar Al Hasan — Full Stack Developer"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 380px"
              />
            </div>

            {/* ── Bottom gradient overlay ────────────────────── */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-100 dark:from-zinc-900 to-transparent" />
          </div>
        </div>

        {/* ── Floating badge: Years of experience ──────────── */}
        <motion.div
          className={cn(
            "absolute -left-4 top-8 flex items-center gap-2 rounded-xl border px-3 py-2 shadow-lg",
            "border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/90",
          )}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10">
            <span className="text-base" role="img" aria-label="rocket">
              🚀
            </span>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 leading-none">
              2+ Years
            </p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-none mt-0.5">
              Experience
            </p>
          </div>
        </motion.div>

        {/* ── Floating badge: Projects shipped ─────────────── */}
        <motion.div
          className={cn(
            "absolute -right-4 bottom-16 flex items-center gap-2 rounded-xl border px-3 py-2 shadow-lg",
            "border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/90",
          )}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
            <span className="text-base" role="img" aria-label="lightning">
              ⚡
            </span>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 leading-none">
              15+ Projects
            </p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-none mt-0.5">
              Shipped
            </p>
          </div>
        </motion.div>

        {/* ── Online status indicator ───────────────────────── */}
        <div
          className={cn(
            "absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border px-2.5 py-1",
            "border-emerald-500/20 bg-emerald-500/10 dark:border-emerald-400/20 dark:bg-emerald-400/10",
          )}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
              style={{ animationDuration: "2s" }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
            Online
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
