"use client";
import { useState } from "react";
import LoadingScreen from "./components/common/LoadingScreen";
import { HeroSection } from "./components/sections/hero";
import { ExperienceSection } from "./components/sections/experience";
import { AboutSection } from "./components/sections/about";

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
        {/* ── Future sections go here ──────────────────────────
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <TestimonialsSection />
        <ContactSection />
      ─────────────────────────────────────────────────────── */}
      </div>
    </main>
  );
}
