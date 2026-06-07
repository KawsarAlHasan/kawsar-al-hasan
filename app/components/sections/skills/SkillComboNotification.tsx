
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { ComboNotification } from "@/hooks/useSkillGame";
import { cn } from "@/lib/utils";

const comboColorMap: Record<string, string> = {
  indigo: "from-indigo-500/15 to-indigo-500/5 border-indigo-400/40 dark:from-indigo-500/20 dark:to-indigo-500/5 dark:border-indigo-600/40",
  violet: "from-violet-500/15 to-violet-500/5 border-violet-400/40 dark:from-violet-500/20 dark:to-violet-500/5 dark:border-violet-600/40",
  emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-400/40 dark:from-emerald-500/20 dark:to-emerald-500/5 dark:border-emerald-600/40",
  sky: "from-sky-500/15 to-sky-500/5 border-sky-400/40 dark:from-sky-500/20 dark:to-sky-500/5 dark:border-sky-600/40",
  amber: "from-amber-500/15 to-amber-500/5 border-amber-400/40 dark:from-amber-500/20 dark:to-amber-500/5 dark:border-amber-600/40",
};

const comboTextMap: Record<string, string> = {
  indigo: "text-indigo-700 dark:text-indigo-300",
  violet: "text-violet-700 dark:text-violet-300",
  emerald: "text-emerald-700 dark:text-emerald-300",
  sky: "text-sky-700 dark:text-sky-300",
  amber: "text-amber-700 dark:text-amber-300",
};

interface SkillComboNotificationProps {
  notification: ComboNotification | null;
  onDismiss: () => void;
}

export function SkillComboNotification({
  notification,
  onDismiss,
}: SkillComboNotificationProps) {
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative overflow-hidden rounded-2xl border bg-gradient-to-r p-4",
            comboColorMap[notification.combo.color] ?? comboColorMap.indigo
          )}
          role="alert"
          aria-live="assertive"
          aria-label={`Combo unlocked: ${notification.combo.name}`}
        >
          {/* Shimmer sweep */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            aria-hidden="true"
          />

          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/40 text-xl dark:bg-black/20">
              {notification.combo.icon}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Sparkles
                  className={cn("h-3.5 w-3.5", comboTextMap[notification.combo.color])}
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
                  Combo Unlocked
                </span>
                <span
                  className={cn(
                    "rounded-full bg-white/40 px-2 py-0.5 font-mono text-[10px] font-bold dark:bg-black/20",
                    comboTextMap[notification.combo.color]
                  )}
                >
                  +{notification.combo.xpBonus} XP
                </span>
              </div>
              <p className={cn("mt-0.5 text-sm font-bold", comboTextMap[notification.combo.color])}>
                {notification.combo.name}
              </p>
              <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                {notification.combo.description}
              </p>
            </div>

            {/* Dismiss */}
            <button
              onClick={onDismiss}
              className="flex-shrink-0 rounded-lg p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Dismiss combo notification"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Auto-dismiss progress line */}
          <motion.div
            className={cn(
              "absolute inset-x-0 bottom-0 h-[2px]",
              notification.combo.color === "indigo" && "bg-indigo-500",
              notification.combo.color === "violet" && "bg-violet-500",
              notification.combo.color === "emerald" && "bg-emerald-500",
              notification.combo.color === "sky" && "bg-sky-500",
              notification.combo.color === "amber" && "bg-amber-500",
            )}
            initial={{ scaleX: 1, originX: 0 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 4, ease: "linear" }}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
