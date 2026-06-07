// ============================================================
// data/experience.ts
// All Experience & Impact section content.
// Edit this file only — components are purely presentational.
// ============================================================

export interface ImpactMetric {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  icon: string;
  color: "indigo" | "violet" | "emerald" | "amber";
}

export interface Responsibility {
  text: string;
  highlight?: string; // optional bolded keyword inside the text
}

export interface ExperienceEntry {
  id: string;
  company: string;
  companyUrl?: string;
  companyLogo: string; // placeholder label e.g. "COMPANY_LOGO_01"
  position: string;
  type: "Full-time" | "Contract" | "Freelance" | "Part-time" | "Internship";
  location: string;
  remote: boolean;
  startDate: string; // "Jan 2023"
  endDate: string;   // "Present" | "Dec 2023"
  current: boolean;
  tagline: string;   // one-line summary of the role
  responsibilities: Responsibility[];
  techStack: string[];
  impactMetrics: ImpactMetric[];
}

export interface GlobalImpactCard {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  icon: string;
  color: "indigo" | "violet" | "emerald" | "amber";
}

// ─── Experience Entries ───────────────────────────────────────
export const experienceData: ExperienceEntry[] = [
  {
    id: "exp-01",
    company: "TechVault Solutions",
    companyUrl: "https://example.com",
    companyLogo: "COMPANY_LOGO_01",
    position: "Full Stack Developer",
    type: "Full-time",
    location: "Dhaka, Bangladesh",
    remote: true,
    startDate: "Mar 2023",
    endDate: "Present",
    current: true,
    tagline:
      "Leading full-stack development of a B2B SaaS analytics platform serving 10,000+ active users.",
    responsibilities: [
      {
        text: "Architected and built a real-time analytics dashboard using Next.js, TypeScript, and WebSockets — reducing data latency from 8s to under 400ms.",
        highlight: "400ms",
      },
      {
        text: "Designed and implemented a multi-tenant REST API with Node.js and PostgreSQL, handling 2M+ daily requests with 99.9% uptime.",
        highlight: "2M+ daily requests",
      },
      {
        text: "Led migration from a monolithic PHP codebase to a microservices architecture, cutting deployment time by 70%.",
        highlight: "70%",
      },
      {
        text: "Integrated OpenAI APIs to build an AI-powered report generation feature, reducing manual reporting effort by 12 hours/week per client.",
        highlight: "12 hours/week",
      },
      {
        text: "Mentored 2 junior developers, conducted code reviews, and established team-wide TypeScript and testing conventions.",
        highlight: "TypeScript",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "OpenAI",
      "Docker",
      "AWS",
      "Tailwind CSS",
    ],
    impactMetrics: [
      {
        value: 10,
        suffix: "K+",
        label: "Active Users",
        description: "Across 200+ business accounts",
        icon: "👥",
        color: "indigo",
      },
      {
        value: 99.9,
        suffix: "%",
        label: "Uptime",
        description: "Production reliability record",
        icon: "⚡",
        color: "emerald",
      },
      {
        value: 70,
        suffix: "%",
        label: "Faster Deploys",
        description: "Post microservices migration",
        icon: "🚀",
        color: "violet",
      },
      {
        value: 40,
        suffix: "%",
        label: "Revenue Growth",
        description: "Attributed to new AI features",
        icon: "📈",
        color: "amber",
      },
    ],
  },
  {
    id: "exp-02",
    company: "Nexora Digital Agency",
    companyUrl: "https://example.com",
    companyLogo: "COMPANY_LOGO_02",
    position: "Junior Full Stack Developer",
    type: "Full-time",
    location: "Dhaka, Bangladesh",
    remote: false,
    startDate: "Jun 2022",
    endDate: "Feb 2023",
    current: false,
    tagline:
      "Built and shipped production web applications for clients across e-commerce, healthcare, and fintech verticals.",
    responsibilities: [
      {
        text: "Developed 8 client-facing web applications end-to-end using React, Next.js, and Express — all delivered on time and within budget.",
        highlight: "8 client-facing web applications",
      },
      {
        text: "Built a custom headless e-commerce storefront with Shopify APIs and Next.js, processing $200K+ in transactions in its first quarter.",
        highlight: "$200K+",
      },
      {
        text: "Created reusable React component libraries used across 5 client projects, reducing UI development time by 35%.",
        highlight: "35%",
      },
      {
        text: "Implemented JWT-based authentication and role-based access control across multiple SaaS applications.",
        highlight: "JWT-based authentication",
      },
      {
        text: "Optimised database queries and introduced caching strategies using Redis, improving API response times by 60%.",
        highlight: "60%",
      },
    ],
    techStack: [
      "React",
      "Next.js",
      "Express",
      "MongoDB",
      "Redis",
      "Shopify APIs",
      "JWT",
      "Stripe",
      "Vercel",
      "SCSS",
    ],
    impactMetrics: [
      {
        value: 8,
        suffix: "",
        label: "Apps Delivered",
        description: "All on time & within budget",
        icon: "📦",
        color: "indigo",
      },
      {
        value: 200,
        prefix: "$",
        suffix: "K+",
        label: "Transactions",
        description: "Via e-commerce storefront",
        icon: "💳",
        color: "emerald",
      },
      {
        value: 60,
        suffix: "%",
        label: "Faster APIs",
        description: "Via Redis caching layer",
        icon: "⚙️",
        color: "violet",
      },
      {
        value: 35,
        suffix: "%",
        label: "Dev Time Saved",
        description: "Through component library",
        icon: "⏱️",
        color: "amber",
      },
    ],
  },
  {
    id: "exp-03",
    company: "Freelance",
    companyUrl: undefined,
    companyLogo: "COMPANY_LOGO_03",
    position: "Freelance Web Developer",
    type: "Freelance",
    location: "Remote",
    remote: true,
    startDate: "Jan 2022",
    endDate: "May 2022",
    current: false,
    tagline:
      "Delivered custom web solutions for startups and small businesses across South Asia.",
    responsibilities: [
      {
        text: "Designed and developed 5 business websites and landing pages with conversion-focused UX, averaging 8% lead conversion rate.",
        highlight: "8% lead conversion",
      },
      {
        text: "Built a custom CMS-powered blog platform for a media startup using Next.js and Sanity.io — growing to 5K monthly readers.",
        highlight: "5K monthly readers",
      },
      {
        text: "Integrated third-party APIs (payment gateways, SMS, maps) across multiple client projects.",
        highlight: "third-party APIs",
      },
    ],
    techStack: [
      "React",
      "Next.js",
      "Sanity.io",
      "Tailwind CSS",
      "Stripe",
      "Firebase",
      "Vercel",
    ],
    impactMetrics: [
      {
        value: 5,
        suffix: "",
        label: "Sites Launched",
        description: "From design to deployment",
        icon: "🌐",
        color: "indigo",
      },
      {
        value: 5,
        suffix: "K",
        label: "Monthly Readers",
        description: "Blog platform audience",
        icon: "📰",
        color: "emerald",
      },
      {
        value: 8,
        suffix: "%",
        label: "Conversion Rate",
        description: "Landing page average",
        icon: "🎯",
        color: "violet",
      },
      {
        value: 100,
        suffix: "%",
        label: "On-Time Delivery",
        description: "All projects delivered",
        icon: "✅",
        color: "amber",
      },
    ],
  },
];

// ─── Global Impact Cards (career-wide totals) ─────────────────
export const globalImpactData: GlobalImpactCard[] = [
  {
    value: 15,
    suffix: "+",
    label: "Projects Delivered",
    description: "Across SaaS, e-commerce, and AI verticals",
    icon: "📦",
    color: "indigo",
  },
  {
    value: 200,
    prefix: "$",
    suffix: "K+",
    label: "Revenue Impact",
    description: "Generated or enabled for clients",
    icon: "💰",
    color: "emerald",
  },
  {
    value: 60,
    suffix: "%",
    label: "Avg. Performance Gain",
    description: "Across optimisation engagements",
    icon: "⚡",
    color: "violet",
  },
  {
    value: 15,
    suffix: "K+",
    label: "Users Served",
    description: "Across all production applications",
    icon: "👥",
    color: "amber",
  },
];
