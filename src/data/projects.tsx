export interface Project {
  name: string;
  slug: string;
  tech: string[];
  year: string;
  url: string;
  image?: string;
  description?: string;
  features?: string[];
  details?: string;
  additionalContent?: React.ReactNode;
}

export const projectsData: Project[] = [
  {
    name: "Personal Portfolio Website",
    slug: "portfolio-website",
    tech: ["Next.js", "TailwindCSS", "Framer Motion"],
    year: "2025",
    url: "",
    image: "/portfolio.png",
    description:
      "A modern, responsive portfolio website built with Next.js and TailwindCSS, featuring smooth animations and dark mode support.",
    features: [
      "Responsive design that works on all devices",
      "Dark mode and light mode themes",
      "Smooth animations and transitions",
      "Performance optimized with Next.js",
    ],
  },
  {
    name: "GanttWise - Capstone Project",
    slug: "ganttwise",
    tech: ["React", "TensorFlow", "Django"],
    year: "2025",
    url: "",
    image: "/ganttwise.png",
    description:
      "A project management tool that leverages machine learning algorithms to create optimized timelines and task assignments.",
    features: [
      "Interactive Gantt charts for project, milestones, and dependencies visualization",
      "Customizable timeline views (Week, Month, Year) for better project tracking",
      "AI-powered scheduling using LLMs, Deep Reinforcement Learning, and heuristic algorithms",
      "Resource allocation optimization tool to assign tasks based on team members' skills and availability",
      "Data Import/Export functionality for easy upload of task and employee data via Excel files",
    ],
  },
  {
    name: "Searchington - Web Search Engine",
    slug: "searchington",
    tech: ["Python", "Redis", "AWS"],
    year: "2024",
    url: "",
    image: "/searchington.png",
    description:
      "A custom search engine with web crawling, spell-checking, query evaluation, and advanced ranking algorithms.",
    features: [
      "Distributed web crawling system with advanced indexing",
      "Spell-checking and query correction using TextBlob",
      "Mathematical expression evaluation in search queries",
      "Scalable architecture with Nginx and Gunicorn on AWS",
    ],
  },
  {
    name: "LibCG - Computer Graphics Library",
    slug: "libcg",
    tech: ["C", "C++", "Visual Studio"],
    year: "2024",
    url: "",
    image: "/libcg.png",
    description:
      "Low-level computer graphics library for real-time rendering applications, focusing on educational assignments and practical implementations of computer graphics concepts.",
    features: [
      "High-performance rendering pipeline leveraging OpenGL and Vulkan",
      "Support for modern shader techniques, including GLSL and Vulkan shaders",
      "Cross-platform compatibility through GLFW and platform-specific implementations",
      "Integration with external libraries like libigl for geometry processing",
      "Extensive documentation and examples for educational purposes",
    ],
  },
  {
    name: "ChromaMap - GIS Map Application",
    slug: "chromamap",
    tech: ["C", "C++", "OpenMaps API"],
    year: "2022",
    image: "/chromamap.png",
    url: "",
    description:
      "A specialized GIS application for visualizing geographic data with custom color mapping and route optimization.",
    features: [
      "Implemented Dijkstra algorithm and A* pathfinding heuristics to solve the travelling salesman problem",
      "Improved browse and load times by over 300% using a Level of Detail tiling scheme for the map",
      "Optimized application speed with multi-threading and performance profiling using stack trace and flame graphs",
      "Custom color schemes for data representation and for visual impairment accessibility",
    ],
  },
];
