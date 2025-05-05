"use client";

import { useEffect, useState } from "react";
import IntroSection from "@/components/sections/IntroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/Footer";

// Custom hook to ensure client rendering
function useClientRendered() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

export default function HomePage() {
  const isClient = useClientRendered();

  useEffect(() => {
    // Only run this code on the client and after component has mounted
    if (isClient) {
      const shouldScrollToProjects =
        sessionStorage.getItem("scrollToProjects") === "true";

      if (shouldScrollToProjects) {
        // Clear the flag
        sessionStorage.removeItem("scrollToProjects");

        // Give the page a bit of time to fully render
        setTimeout(() => {
          const projectsSection = document.getElementById("projects");
          if (projectsSection) {
            // Get the position of the projects section
            const rect = projectsSection.getBoundingClientRect();
            const scrollTop =
              window.pageYOffset || document.documentElement.scrollTop;

            // Calculate target position with an appropriate offset
            const targetPosition = rect.top + scrollTop - 100;

            // Scroll to the projects section
            window.scrollTo({
              top: targetPosition,
              behavior: "auto", // Use auto to avoid conflicts with smooth scroll
            });

            // Small nudge to ensure smooth scroll works for subsequent scrolling
            setTimeout(() => {
              window.scrollBy(0, 1);
              window.scrollBy(0, -1);
            }, 50);
          }
        }, 500);
      }
    }
  }, [isClient]); // Only re-run if isClient changes

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
