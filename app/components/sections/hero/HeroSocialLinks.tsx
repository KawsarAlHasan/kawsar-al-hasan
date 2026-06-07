// ============================================================
// components/sections/hero/HeroSocialLinks.tsx
// Row of social icon links with hover glow effects.
// Uses react-icons for brand logos + lucide for mail.
// Each icon has a subtle lift and color transition on hover.
// ============================================================

"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { SocialLink } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  mail: Mail,
};

const colorMap: Record<string, string> = {
  github:
    "hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-500",
  linkedin:
    "hover:text-[#0A66C2] dark:hover:text-[#0A66C2] hover:border-[#0A66C2]/50",
  twitter:
    "hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-500",
  mail: "hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 dark:hover:border-indigo-500",
};

interface HeroSocialLinksProps {
  links: SocialLink[];
}

export function HeroSocialLinks({ links }: HeroSocialLinksProps) {
  return (
    <motion.div
      variants={staggerContainer}
      className="flex items-center gap-3"
      role="list"
      aria-label="Social media links"
    >
      {links.map((link) => {
        const Icon = iconMap[link.icon] ?? Mail;
        return (
          <motion.a
            key={link.icon}
            variants={fadeUp}
            href={link.href}
            target={link.icon !== "mail" ? "_blank" : undefined}
            rel={link.icon !== "mail" ? "noopener noreferrer" : undefined}
            aria-label={link.label}
            role="listitem"
            className={cn(
              "group flex h-9 w-9 items-center justify-center rounded-lg",
              "border border-zinc-200 bg-white/60 text-zinc-500 backdrop-blur-sm",
              "dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400",
              "transition-all duration-200",
              "-translate-y-0 hover:-translate-y-0.5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
              colorMap[link.icon] ?? ""
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </motion.a>
        );
      })}

      {/* Divider */}
      <span
        className="h-5 w-px bg-zinc-200 dark:bg-zinc-800"
        aria-hidden="true"
      />

      {/* "Open to work" text */}
      <motion.span
        variants={fadeUp}
        className="text-xs text-zinc-400 dark:text-zinc-500"
      >
        Let&apos;s connect
      </motion.span>
    </motion.div>
  );
}
