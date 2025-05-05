"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FaArrowLeft } from "react-icons/fa";
import GlassBackground from "@/components/GlassBackground";
import { Project } from "@/data/projects";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import Image from "next/image";

type ProjectPageClientProps = {
  project: Project;
};

export default function ProjectPageClient({ project }: ProjectPageClientProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const highlightColor = mounted
    ? resolvedTheme === "dark"
      ? "#F2F230"
      : "#3185FC"
    : "#374151";

  // Custom function to handle back to projects navigation
  const handleBackToProjects = () => {
    // Navigate to home page
    router.push("/");

    // Then explicitly scroll to the projects section after navigation
    // Store that we want to scroll to projects after navigation
    if (typeof window !== "undefined") {
      // Set a flag in sessionStorage to indicate we need to scroll to projects
      sessionStorage.setItem("scrollToProjects", "true");
    }
  };

  // Loading state when not mounted
  if (!mounted) {
    return <div className="min-h-screen"></div>;
  }

  return (
    <section className="min-h-screen relative overflow-hidden pt-24">
      <GlassBackground color={highlightColor} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={handleBackToProjects}
            className="flex items-center gap-2 mb-8 group w-fit cursor-pointer"
          >
            <FaArrowLeft
              style={{ color: highlightColor }}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span className="text-lg">Back to projects</span>
          </button>

          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: highlightColor }}
          >
            {project.name}
          </h1>

          <div className="flex flex-wrap gap-3 mb-8">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="rounded-md px-3 py-1 text-sm"
                style={{
                  backgroundColor: `${highlightColor}20`,
                  color: highlightColor,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Project image */}
            <div className="relative cursor-pointer border bg-gray-800/30 rounded-lg aspect-video flex items-center justify-center group overflow-hidden">
              {project.image ? (
                <>
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={1200}
                    height={675}
                    className="w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <a
                    href={project.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10 flex items-center justify-center"
                    aria-label={`View ${project.name} image in full size`}
                  >
                    <span className="sr-only">View full image</span>
                  </a>
                  <div className="absolute top-3 right-3 text-white bg-black/70 p-2 rounded-full opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-500 z-20">
                    <LiaExternalLinkAltSolid size={20} />
                  </div>
                </>
              ) : (
                <div className="text-gray-500">Project Image</div>
              )}
            </div>

            {/* Project details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Year</h2>
                <p
                  className="text-gray-300"
                  style={{ color: "var(--text-color)" }}
                >
                  {project.year}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
                <p
                  className="text-gray-300"
                  style={{ color: "var(--text-color)" }}
                >
                  {project.description ||
                    "This is a showcase of the " + project.name + " project."}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Key Features</h2>
                <ul
                  className="list-disc list-inside space-y-1 text-gray-300"
                  style={{ color: "var(--text-color)" }}
                >
                  {project.features?.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  )) || (
                    <>
                      <li>Feature 1</li>
                      <li>Feature 2</li>
                      <li>Feature 3</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
