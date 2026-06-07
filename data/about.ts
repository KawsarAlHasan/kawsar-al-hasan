// ============================================================
// data/about.ts
// All About section content — edit this file to update copy.
// Keep implementation details (components) separate from data.
// ============================================================

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: string; // emoji icon
}

export interface PhilosophyItem {
  title: string;
  description: string;
  icon: string;
}

export interface AboutData {
  sectionLabel: string;
  headline: string;
  headlineAccent: string;
  tagline: string;
  bio: string[];
  story: string;
  enjoyBuilding: string[];
  philosophy: PhilosophyItem[];
  stats: StatItem[];
  resumeUrl: string;
}

export const aboutData: AboutData = {
  sectionLabel: "// 01 — About Me",
  headline: "Crafting Digital",
  headlineAccent: "Experiences",
  tagline:
    "A Full Stack Developer who obsesses over clean architecture and delightful user experiences.",

  // Multi-paragraph bio — each string is one paragraph
  bio: [
    "I'm a Full Stack Developer with 2 years of professional experience building modern web applications, SaaS platforms, dashboards, and AI-powered solutions. I thrive at the intersection of robust backend engineering and polished frontend craft.",
    "My journey into software began with a simple curiosity: how do the products I love actually work? That question led me down a path of late-night debugging sessions, open-source contributions, and a genuine love for building things from zero to shipped.",
  ],

  story:
    "What started as tinkering with HTML in a browser's DevTools evolved into shipping production systems that real people rely on every day. I believe the best software is invisible — it just works, elegantly and at scale.",

  // What you enjoy building — shown as a tag cloud / list
  enjoyBuilding: [
    "SaaS Platforms",
    "REST & GraphQL APIs",
    "AI-Powered Tools",
    "Developer Dashboards",
    "Real-time Applications",
    "Design Systems",
    "Open Source Libraries",
    "Performance-Critical UIs",
  ],

  // Development philosophy pillars
  philosophy: [
    {
      icon: "⚡",
      title: "Ship Fast, Iterate Often",
      description:
        "Working software over perfect software. I prefer a 70% solution in production over a 100% solution that never ships.",
    },
    {
      icon: "🏗️",
      title: "Architecture First",
      description:
        "Good systems age gracefully. I invest time upfront in structure so the codebase remains a joy to work in at scale.",
    },
    {
      icon: "🔍",
      title: "Obsess Over Details",
      description:
        "The difference between good and great is the 10% most people skip. I care about every pixel, every millisecond, every edge case.",
    },
    {
      icon: "🤝",
      title: "Collaborate & Communicate",
      description:
        "The best technical solutions emerge from great conversations. I prioritise clear communication as much as clean code.",
    },
  ],

  // Animated statistics — numbers count up on scroll
  stats: [
    {
      value: 2,
      suffix: "+",
      label: "Years Experience",
      description: "Professional full-stack development",
      icon: "🚀",
    },
    {
      value: 15,
      suffix: "+",
      label: "Projects Shipped",
      description: "From MVP to production at scale",
      icon: "📦",
    },
    {
      value: 20,
      suffix: "+",
      label: "Technologies",
      description: "Across the full stack and beyond",
      icon: "⚙️",
    },
    {
      value: 99,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Happy clients, repeat business",
      icon: "⭐",
    },
  ],

  resumeUrl: "/resume.pdf", // Replace with your actual resume path
};
