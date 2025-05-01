"use client";

import IntroPage from "./intro/page";
import ProjectsPage from "./projects/page";
import ExperiencePage from "./experience/page";
import SkillsPage from "./skills/page";
import ContactPage from "./contact/page";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="scroll-smooth">
      <IntroPage />
      <ProjectsPage />
      <ExperiencePage />
      <SkillsPage />
      <ContactPage />
      <Footer />
    </div>
  );
}
