// Remove "use client" directive

import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import ProjectPageClient from "./ProjectPageClient";

// Add generateStaticParams function to pre-render all project routes at build time
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Properly await the params Promise
  const { slug } = await params;

  // Find the project that matches the slug
  const project = projectsData.find((p) => p.slug === slug);

  // If project not found, show 404 page
  if (!project) {
    notFound();
  }

  // Pass the project data to the client component
  return <ProjectPageClient project={project} />;
}
