"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionLabel({
  label,
  className,
  align = "left",
}: SectionLabelProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "font-mono text-xs font-medium tracking-[0.18em] uppercase",
        "text-indigo-500 dark:text-indigo-400",
        align === "center" && "text-center",
        className,
      )}
    >
      {label}
    </motion.p>
  );
}
