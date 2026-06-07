"use client";

import { motion } from "framer-motion";
import { slideDown } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface HeroAvailabilityBadgeProps {
  available: boolean;
  text: string;
}

export function HeroAvailabilityBadge({
  available,
  text,
}: HeroAvailabilityBadgeProps) {
  return (
    <motion.div
      variants={slideDown}
      className="inline-flex items-center gap-2"
      role="status"
      aria-label={available ? text : "Not currently available"}
    >
      <span
        className={cn(
          "relative inline-flex h-8 items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wide",
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400",
          "shadow-[0_0_12px_rgba(16,185,129,0.1)] dark:shadow-[0_0_16px_rgba(52,211,153,0.1)]",
          "transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/15",
        )}
      >
        {/* Pulsing dot */}
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              available ? "bg-emerald-400" : "bg-gray-400",
            )}
            style={{ animationDuration: "2s" }}
          />
          <span
            className={cn(
              "relative inline-flex h-2 w-2 rounded-full",
              available ? "bg-emerald-500" : "bg-gray-500",
            )}
          />
        </span>
        {text}
      </span>
    </motion.div>
  );
}
