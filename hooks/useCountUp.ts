// ============================================================
// hooks/useCountUp.ts
// Animates a number from 0 to a target value when triggered.
// Uses requestAnimationFrame for smooth 60fps counting.
// Respects prefers-reduced-motion — skips animation if set.
// ============================================================

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseCountUpOptions {
  target: number;
  duration?: number; // ms — default 1800
  delay?: number;    // ms — default 0
  enabled?: boolean; // start counting only when true (e.g. in viewport)
}

export function useCountUp({
  target,
  duration = 1800,
  delay = 0,
  enabled = false,
}: UseCountUpOptions): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasRun = useRef(false);

  // Check reduced-motion preference
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const animate = useCallback(
    (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for a natural deceleration feel
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target); // ensure exact final value
      }
    },
    [target, duration]
  );

  useEffect(() => {
    if (!enabled || hasRun.current) return;
    hasRun.current = true;

    if (prefersReduced) {
      setCount(target);
      return;
    }

    const timeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, animate, delay, target, prefersReduced]);

  return count;
}
