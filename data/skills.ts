export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Cloud & DevOps"
  | "AI Tools"
  | "UI Engineering";

export type ProficiencyLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon: string;
  proficiency: ProficiencyLevel;
  xpValue: number;
  yearsUsed: number;
  description: string;
  usedIn: number;
  featured?: boolean;
}

export interface SkillCombo {
  id: string;
  skillIds: string[];
  name: string;
  description: string;
  icon: string;
  color: string;
  xpBonus: number;
}

export const proficiencyLabel: Record<ProficiencyLevel, string> = {
  1: "Learning",
  2: "Familiar",
  3: "Proficient",
  4: "Advanced",
  5: "Expert",
};

export const categoryMeta: Record<
  SkillCategory,
  { icon: string; color: string; description: string }
> = {
  Frontend: {
    icon: "🖥️",
    color: "indigo",
    description: "Client-side interfaces & frameworks",
  },
  Backend: {
    icon: "⚙️",
    color: "violet",
    description: "Server-side logic, APIs & runtimes",
  },
  Database: {
    icon: "🗄️",
    color: "cyan",
    description: "Data modeling, querying & persistence",
  },
  "Cloud & DevOps": {
    icon: "☁️",
    color: "sky",
    description: "Infrastructure, CI/CD & deployment",
  },
  "AI Tools": {
    icon: "🤖",
    color: "emerald",
    description: "AI/ML SDKs, LLMs & automation",
  },
  "UI Engineering": {
    icon: "🎨",
    color: "rose",
    description: "Design systems, motion & accessibility",
  },
};

export const skillsData: Skill[] = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    icon: "⚛️",
    proficiency: 5,
    xpValue: 50,
    yearsUsed: 2,
    description:
      "Component architecture, hooks, context, and performance patterns.",
    usedIn: 12,
    featured: true,
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    icon: "▲",
    proficiency: 5,
    xpValue: 50,
    yearsUsed: 2,
    description:
      "App Router, SSR, SSG, ISR, Server Actions, and edge middleware.",
    usedIn: 10,
    featured: true,
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    icon: "🔷",
    proficiency: 5,
    xpValue: 45,
    yearsUsed: 2,
    description: "Strict typing, generics, utility types, and type-safe APIs.",
    usedIn: 11,
    featured: true,
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Frontend",
    icon: "🟨",
    proficiency: 5,
    xpValue: 40,
    yearsUsed: 2,
    description: "ES2022+, async/await, closures, and browser APIs.",
    usedIn: 12,
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    category: "Frontend",
    icon: "🎬",
    proficiency: 4,
    xpValue: 35,
    yearsUsed: 1,
    description: "Production animations, gestures, and layout transitions.",
    usedIn: 6,
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    icon: "🟢",
    proficiency: 4,
    xpValue: 45,
    yearsUsed: 2,
    description:
      "Event loop, streams, worker threads, and REST/WebSocket APIs.",
    usedIn: 9,
    featured: true,
  },
  {
    id: "express",
    name: "Express.js",
    category: "Backend",
    icon: "🚂",
    proficiency: 4,
    xpValue: 35,
    yearsUsed: 2,
    description: "Middleware chains, routing, auth, and REST API patterns.",
    usedIn: 7,
  },
  {
    id: "nestjs",
    name: "NestJS",
    category: "Backend",
    icon: "🐱",
    proficiency: 3,
    xpValue: 30,
    yearsUsed: 1,
    description: "Modules, DI containers, guards, and enterprise architecture.",
    usedIn: 3,
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "Backend",
    icon: "◈",
    proficiency: 3,
    xpValue: 30,
    yearsUsed: 1,
    description: "Schema design, resolvers, Apollo Server, and subscriptions.",
    usedIn: 4,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    icon: "🐘",
    proficiency: 4,
    xpValue: 40,
    yearsUsed: 2,
    description: "Complex queries, indexes, transactions, and JSONB columns.",
    usedIn: 7,
    featured: true,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    icon: "🍃",
    proficiency: 4,
    xpValue: 35,
    yearsUsed: 2,
    description: "Aggregation pipelines, Atlas, and schema design patterns.",
    usedIn: 6,
  },
  {
    id: "prisma",
    name: "Prisma",
    category: "Database",
    icon: "💎",
    proficiency: 4,
    xpValue: 30,
    yearsUsed: 1,
    description: "Type-safe ORM, migrations, relations, and raw queries.",
    usedIn: 5,
  },
  {
    id: "redis",
    name: "Redis",
    category: "Database",
    icon: "🔴",
    proficiency: 3,
    xpValue: 30,
    yearsUsed: 1,
    description: "Caching strategies, pub/sub, rate limiting, and sessions.",
    usedIn: 4,
  },
  {
    id: "docker",
    name: "Docker",
    category: "Cloud & DevOps",
    icon: "🐳",
    proficiency: 4,
    xpValue: 35,
    yearsUsed: 1,
    description: "Containerisation, multi-stage builds, and Compose stacks.",
    usedIn: 6,
    featured: true,
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud & DevOps",
    icon: "☁️",
    proficiency: 3,
    xpValue: 35,
    yearsUsed: 1,
    description: "EC2, S3, RDS, Lambda, CloudFront, and IAM configuration.",
    usedIn: 4,
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "Cloud & DevOps",
    icon: "🌿",
    proficiency: 5,
    xpValue: 30,
    yearsUsed: 2,
    description:
      "Branching strategies, CI workflows, and code review practices.",
    usedIn: 15,
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Cloud & DevOps",
    icon: "▲",
    proficiency: 5,
    xpValue: 25,
    yearsUsed: 2,
    description: "Edge deployments, preview environments, and Analytics.",
    usedIn: 8,
  },
  {
    id: "openai",
    name: "OpenAI API",
    category: "AI Tools",
    icon: "🤖",
    proficiency: 4,
    xpValue: 40,
    yearsUsed: 1,
    description: "GPT-4o, embeddings, function calling, and RAG pipelines.",
    usedIn: 4,
    featured: true,
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "AI Tools",
    icon: "🔗",
    proficiency: 3,
    xpValue: 30,
    yearsUsed: 1,
    description: "Chains, agents, memory, and vector store integrations.",
    usedIn: 2,
  },
  {
    id: "vercel-ai",
    name: "Vercel AI SDK",
    category: "AI Tools",
    icon: "⚡",
    proficiency: 4,
    xpValue: 30,
    yearsUsed: 1,
    description: "Streaming AI responses, tool calling, and useChat hook.",
    usedIn: 3,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "UI Engineering",
    icon: "💨",
    proficiency: 5,
    xpValue: 40,
    yearsUsed: 2,
    description: "Design tokens, dark mode, animation utilities, and config.",
    usedIn: 11,
    featured: true,
  },
  {
    id: "shadcn",
    name: "shadcn/ui",
    category: "UI Engineering",
    icon: "🎛️",
    proficiency: 5,
    xpValue: 30,
    yearsUsed: 1,
    description: "Accessible Radix primitives with Tailwind composition.",
    usedIn: 7,
  },
  {
    id: "figma",
    name: "Figma",
    category: "UI Engineering",
    icon: "🎨",
    proficiency: 3,
    xpValue: 25,
    yearsUsed: 2,
    description: "Component libraries, auto-layout, dev mode handoff.",
    usedIn: 6,
  },
];

export const skillCombos: SkillCombo[] = [
  {
    id: "combo-fullstack",
    skillIds: ["react", "nodejs", "postgresql"],
    name: "Full Stack Unlocked",
    description: "React + Node + Postgres — the classic production trio.",
    icon: "🏆",
    color: "indigo",
    xpBonus: 150,
  },
  {
    id: "combo-nextpro",
    skillIds: ["nextjs", "typescript", "tailwind"],
    name: "Next.js Pro",
    description: "The modern frontend power stack. Ship faster.",
    icon: "⚡",
    color: "violet",
    xpBonus: 120,
  },
  {
    id: "combo-aibuilder",
    skillIds: ["openai", "nextjs", "vercel-ai"],
    name: "AI Builder",
    description: "You assemble AI-powered products with elite tooling.",
    icon: "🤖",
    color: "emerald",
    xpBonus: 140,
  },
  {
    id: "combo-devops",
    skillIds: ["docker", "aws", "git"],
    name: "DevOps Ready",
    description: "Container to cloud to shipped. You own the full pipeline.",
    icon: "🚀",
    color: "sky",
    xpBonus: 130,
  },
  {
    id: "combo-datamancer",
    skillIds: ["postgresql", "mongodb", "redis"],
    name: "Data Mancer",
    description: "SQL, NoSQL, cache — you pick the right store every time.",
    icon: "🗄️",
    color: "amber",
    xpBonus: 100,
  },
];

export const xpRanks = [
  { min: 0, label: "Recruit", color: "text-zinc-400" },
  { min: 100, label: "Developer", color: "text-emerald-400" },
  { min: 250, label: "Engineer", color: "text-indigo-400" },
  { min: 450, label: "Architect", color: "text-violet-400" },
  { min: 700, label: "Principal", color: "text-amber-400" },
  { min: 1000, label: "Staff Engineer", color: "text-rose-400" },
] as const;

export function getRank(xp: number) {
  return [...xpRanks].reverse().find((r) => xp >= r.min) ?? xpRanks[0];
}

export const TOTAL_POSSIBLE_XP =
  skillsData.reduce((acc, s) => acc + s.xpValue, 0) +
  skillCombos.reduce((acc, c) => acc + c.xpBonus, 0);
