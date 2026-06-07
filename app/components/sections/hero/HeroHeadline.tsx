"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface HeroHeadlineProps {
  firstName: string;
  lastName: string;
}

// Splits text into words and animates each with a clip reveal
function AnimatedWord({
  word,
  delay,
  isAccent = false,
}: {
  word: string;
  delay: number;
  isAccent?: boolean;
}) {
  return (
    // The outer span is the "mask" container — overflow hidden clips the reveal
    <span className="inline-block overflow-hidden pb-1 leading-none">
      <motion.span
        className={cn(
          "inline-block",
          isAccent &&
            "bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-300",
        )}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          duration: 0.8,
          delay,
          ease: EASE_OUT_EXPO,
        }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export function HeroHeadline({ firstName, lastName }: HeroHeadlineProps) {
  return (
    <div className="space-y-1">
      {/* Line 1: "Hi, I'm" */}
      <div className="flex items-baseline gap-3">
        <span className="overflow-hidden inline-block">
          <motion.span
            className="inline-block font-mono text-sm font-medium tracking-[0.2em] text-indigo-500 dark:text-indigo-400 uppercase"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
          >
            Hi, I&apos;m
          </motion.span>
        </span>
      </div>

      {/* Line 2: First Name */}
      <h1 className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <AnimatedWord word={firstName} delay={0.3} />
        {/* Last name gets the gradient accent */}
        <AnimatedWord word={lastName} delay={0.42} isAccent />
      </h1>

      {/* Line 3: Descriptor */}
      <div className="flex flex-wrap gap-x-3 pt-1">
        {["—", "I", "build", "things", "that", "scale."].map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className={cn(
                "inline-block",
                word === "—"
                  ? "text-indigo-400 dark:text-indigo-500"
                  : word === "scale."
                    ? "text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-500 dark:text-zinc-400",
              )}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.65,
                delay: 0.55 + i * 0.07,
                ease: EASE_OUT_EXPO,
              }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.375rem)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </div>
    </div>
  );
}
