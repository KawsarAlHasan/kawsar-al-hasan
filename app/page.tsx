"use client";
import { useState } from "react";
import LoadingScreen from "./components/common/LoadingScreen";
import { HeroSection } from "./components/sections/hero";
import { ExperienceSection } from "./components/sections/experience";
import { AboutSection } from "./components/sections/about";
import { SkillsSection } from "./components/sections/skills";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  return (
    <main>
      {!loaded && (
        <LoadingScreen onComplete={() => setLoaded(true)} duration={3400} />
      )}

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s",
        }}
      >
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
         <SkillsSection />
        {/* ── Future sections go here ──────────────────────────


1. HeroSection
2. AboutSection
3. ExperienceSection
4. ProjectsSection
5. SkillsSection
6. EducationSection
7. TestimonialsSection
8. ContactSection

        <ProjectsSection />
       
        <EducationSection />
        <TestimonialsSection />
        <ContactSection />
      ─────────────────────────────────────────────────────── */}
      </div>
    </main>
  );
}
