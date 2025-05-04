"use client";

import IntroSection from "@/components/sections/IntroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="scroll-smooth">
      <IntroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
