"use client";

import { motion } from "framer-motion";
import { heroData } from "@/data/hero";
import { heroStagger, fadeUp } from "@/lib/animations";
import { HeroBackground } from "./HeroBackground";
import { HeroAvailabilityBadge } from "./HeroAvailabilityBadge";
import { HeroHeadline } from "./HeroHeadline";
import { HeroRoleCycler } from "./HeroRoleCycler";
import { HeroCTA } from "./HeroCTA";
import { HeroSocialLinks } from "./HeroSocialLinks";
import { HeroTechBadges } from "./HeroTechBadges";
import { HeroProfile } from "./HeroProfile";
import { HeroScrollIndicator } from "./HeroScrollIndicator";

export function HeroSection() {
  const {
    firstName,
    lastName,
    bio,
    roles,
    availability,
    availabilityText,
    ctaPrimary,
    ctaSecondary,
    socialLinks,
    techBadges,
  } = heroData;

  return (
    <section
      id="hero"
      aria-label="Hero — Introduction"
      className="
        relative flex min-h-[100svh] w-full flex-col
        bg-white dark:bg-[#080808]
        overflow-hidden
      "
    >
      {/* ── Ambient animated background ──────────────────────── */}
      <HeroBackground />

      {/* ── Main content wrapper ─────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 sm:px-8 lg:px-12">

        {/* ── Content grid ─────────────────────────────────────── */}
        <div className="flex flex-1 flex-col items-center justify-center lg:flex-row lg:items-center lg:gap-16 xl:gap-24 pt-24 pb-16 lg:pt-0 lg:pb-0">

          {/* ─────────────────────────────────────────────────── */}
          {/*   LEFT COLUMN — Text content                        */}
          {/* ─────────────────────────────────────────────────── */}
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left gap-6 lg:gap-7 max-w-2xl"
          >
            {/* Availability badge */}
            <HeroAvailabilityBadge
              available={availability}
              text={availabilityText}
            />

            {/* Main headline — H1 with word-clip animation */}
            <div
              className="
                text-[clamp(3rem,7vw,5.5rem)] font-bold tracking-[-0.03em]
                text-zinc-900 dark:text-zinc-50
                leading-[1.05]
              "
            >
              <HeroHeadline firstName={firstName} lastName={lastName} />
            </div>

            {/* Role cycler */}
            <HeroRoleCycler roles={roles} interval={2600} />

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              className="text-base text-zinc-500 dark:text-zinc-400 leading-[1.75] max-w-lg"
            >
              {bio}
            </motion.p>

            {/* CTA buttons */}
            <HeroCTA primary={ctaPrimary} secondary={ctaSecondary} />

            {/* Social links */}
            <motion.div variants={fadeUp}>
              <HeroSocialLinks links={socialLinks} />
            </motion.div>

            {/* Tech badges strip */}
            <motion.div variants={fadeUp} className="w-full max-w-lg">
              <HeroTechBadges badges={techBadges} />
            </motion.div>
          </motion.div>

          {/* ─────────────────────────────────────────────────── */}
          {/*   RIGHT COLUMN — Profile image                      */}
          {/* ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex-shrink-0 mt-12 lg:mt-0"
          >
            <HeroProfile />
          </motion.div>
        </div>

        {/* ── Scroll indicator — pinned to bottom ──────────────── */}
        <div className="flex justify-center pb-8">
          <HeroScrollIndicator />
        </div>
      </div>

      {/* ── Bottom section separator ─────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
