"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FaArrowLeft } from "react-icons/fa";
import GlassBackground from "@/components/GlassBackground";
import Link from "next/link";
import { Project } from "@/data/projects";

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
          <Link
            href="/#projects"
            className="flex items-center gap-2 mb-8 group w-fit"
          >
            <FaArrowLeft
              style={{ color: highlightColor }}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span className="text-lg">Back to projects</span>
          </Link>

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
            <div className="bg-gray-800/30 rounded-lg aspect-video flex items-center justify-center">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-gray-500">Project Image</div>
              )}
            </div>

            {/* Project details */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
                <p className="text-gray-300">
                  {project.description ||
                    "This is a showcase of the " + project.name + " project."}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Key Features</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
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

              <div className="pt-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300"
                  style={{
                    backgroundColor: highlightColor,
                    color: resolvedTheme === "dark" ? "#111" : "#fff",
                  }}
                >
                  View GitHub Repository
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
