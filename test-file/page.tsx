// ============================================================
// app/page.tsx
// Root page — Hero + About + Experience.
// ============================================================

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />

      {/* ── Coming next ──────────────────────────────────────
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <TestimonialsSection />
        <ContactSection />
      ──────────────────────────────────────────────────────── */}
    </main>
  );
}
