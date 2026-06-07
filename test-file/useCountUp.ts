// ============================================================
// hooks/useCountUp.ts
// Animates a number from 0 to target on trigger.
// Uses requestAnimationFrame — smooth 60fps, ease-out-cubic.
// Respects prefers-reduced-motion.
// ============================================================

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseCountUpOptions {
  target: number;
  duration?: number;
  delay?: number;
  enabled?: boolean;
}

export function useCountUp({
  target,
  duration = 1600,
  delay = 0,
  enabled = false,
}: UseCountUpOptions): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const hasRun = useRef(false);

  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const animate = useCallback(
    (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    },
    [target, duration]
  );

  useEffect(() => {
    if (!enabled || hasRun.current) return;
    hasRun.current = true;
    if (prefersReduced) { setCount(target); return; }
    const t = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, delay);
    return () => {
      clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, animate, delay, target, prefersReduced]);

  return count;
}
