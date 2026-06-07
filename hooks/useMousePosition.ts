// ============================================================
// hooks/useMousePosition.ts
// Tracks the cursor position for magnetic button effects and
// parallax interactions. Returns normalized {x, y} coordinates.
// ============================================================

"use client";

import { useEffect, useState, useRef, RefObject } from "react";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Global mouse position (relative to viewport)
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return position;
}

/**
 * Mouse position relative to a specific element.
 * Used for the magnetic button effect — returns offset from element center.
 */
export function useElementMouseOffset(
  ref: RefObject<HTMLElement | null>
): MousePosition {
  const [offset, setOffset] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setOffset({ x: e.clientX - cx, y: e.clientY - cy });
    };

    const reset = () => setOffset({ x: 0, y: 0 });

    el.addEventListener("mousemove", handler);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handler);
      el.removeEventListener("mouseleave", reset);
    };
  }, [ref]);

  return offset;
}
