// ============================================================
// data/hero.ts
// All Hero section content — edit this file to update copy
// ============================================================

import { HeroData } from "@/types";

export const heroData: HeroData = {
  name: "Kawsar Al Hasan",
  firstName: "Kawsar",
  lastName: "Al Hasan",

  tagline: "Full Stack Developer",

  // These cycle in the HeroRoleCycler component
  roles: [
    "Full Stack Developer",
    "SaaS Architect",
    "API Engineer",
    "Product Builder",
    "AI Integrator",
  ],

  bio: "I design and engineer scalable web applications, SaaS platforms, and AI-powered products — turning complex problems into clean, performant software that ships.",

  availability: true,
  availabilityText: "Available for new projects",

  ctaPrimary: {
    label: "Let's Build Together",
    href: "#contact",
  },

  ctaSecondary: {
    label: "View My Work",
    href: "#projects",
  },

  socialLinks: [
    { label: "GitHub", href: "https://github.com", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
    { label: "Email", href: "mailto:hello@alexmorgan.dev", icon: "mail" },
  ],

  // Shown as a subtle trust-strip beneath CTAs
  techBadges: [
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "Docker",
    "AWS",
  ],
};
