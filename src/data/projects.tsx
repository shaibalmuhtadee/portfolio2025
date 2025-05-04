export interface Project {
  name: string;
  slug: string;
  tech: string[];
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
    url: "https://github.com/yourusername/portfolio",
    description:
      "A modern, responsive portfolio website built with Next.js and TailwindCSS, featuring smooth animations and dark mode support.",
    features: [
      "Responsive design that works on all devices",
      "Dark mode and light mode themes",
      "Smooth animations and transitions",
      "Performance optimized with Next.js",
    ],
    details:
      "This portfolio website was built using Next.js 14 with the App Router, TailwindCSS for styling, and Framer Motion for animations. The site features a clean, minimalist design with a focus on performance and accessibility.",
  },
  {
    name: "GanttWise - Capstone Project",
    slug: "ganttwise",
    tech: ["React", "TensorFlow", "Django"],
    url: "https://github.com/yourusername/robot-navigation",
    description:
      "A project management tool with smart timeline predictions using machine learning algorithms.",
    features: [
      "Interactive Gantt charts for project visualization",
      "ML-powered timeline predictions",
      "Team collaboration features",
      "Resource allocation optimization",
    ],
  },
  {
    name: "Searchington - Web Search Engine",
    slug: "searchington",
    tech: ["Python", "Redis", "AWS"],
    url: "https://github.com/yourusername/nn-compiler",
    description:
      "A custom search engine with advanced indexing and ranking algorithms.",
    features: [
      "Distributed web crawling system",
      "Real-time indexing with Redis",
      "Custom ranking algorithm",
      "Scalable architecture on AWS",
    ],
  },
  {
    name: "LibCG - Computer Graphics Library",
    slug: "libcg",
    tech: ["C", "C++", "Visual Studio"],
    url: "https://github.com/yourusername/realtime-chat",
    description:
      "A low-level computer graphics library for real-time rendering applications.",
    features: [
      "High-performance rendering pipeline",
      "Support for modern shader techniques",
      "Cross-platform compatibility",
      "Extensive documentation and examples",
    ],
  },
  {
    name: "ChromaMap - GIS Map Application",
    slug: "chromamap",
    tech: ["C", "C++", "OpenMaps API"],
    url: "https://github.com/yourusername/blockchain-analyzer",
    description:
      "A specialized GIS application for visualizing geographic data with custom color mapping.",
    features: [
      "Interactive map visualization",
      "Custom color schemes for data representation",
      "Data import/export functionality",
      "Advanced filtering options",
    ],
  },
];
