"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const pathname = usePathname();
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Add a function to handle scrolling with offset
  const scrollToElementWithOffset = (elementId: string) => {
    const element = document.getElementById(elementId);

    if (!element) return;

    // Get the height of navbar plus some padding (adjust this value as needed)
    const offset = 120; // Navbar height + extra padding

    // Calculate position
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    // Scroll to the calculated position
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Check if we should scroll to projects section
    const shouldScrollToProjects =
      typeof window !== "undefined" &&
      sessionStorage.getItem("scrollToProjects") === "true";

    if (shouldScrollToProjects) {
      // Clear the flag
      sessionStorage.removeItem("scrollToProjects");

      // Give the page a moment to render before scrolling
      setTimeout(() => {
        scrollToElementWithOffset("projects");
      }, 500);
    }
  }, [pathname]);

  useEffect(() => {
    // Logic for managing session and scroll events
    if (typeof window === "undefined") return;

    // Handle browser back/forward navigation
    const handlePopState = () => {
      if (window.location.hash) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const id = window.location.hash.substring(1);
          scrollToElementWithOffset(id);
        }, 100);
      }
    };

    // Initial scroll if hash exists in URL
    if (window.location.hash) {
      handlePopState();
    }

    window.addEventListener("popstate", handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    // Intercept scroll attempts from internal links
    const handleLinkClick = (e: MouseEvent) => {
      // Use proper type for the target
      const target = e.target as HTMLElement;

      // Find closest anchor element
      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      // Skip external links, non-hash links, or same-page links without hash
      if (
        !href ||
        href.startsWith("http") ||
        !href.includes("#") ||
        href === "#" ||
        link.target === "_blank"
      ) {
        return;
      }

      // Handle links to sections on the same page
      if (
        href.startsWith("#") ||
        (pathname === "/" && href.startsWith("/#")) ||
        (pathname !== "/" && href.includes("/#"))
      ) {
        e.preventDefault();

        let targetId: string;

        if (href.startsWith("#")) {
          targetId = href.slice(1);
        } else {
          targetId = href.split("#")[1];
        }

        if (!targetId) return;

        // Update URL without refreshing the page
        if (pathname === "/" || href.startsWith("#")) {
          window.history.pushState(null, "", `/#${targetId}`);
        }

        // Use our custom scroll function with offset
        scrollToElementWithOffset(targetId);

        // Reset timer if one is already running
        if (scrollTimeout) clearTimeout(scrollTimeout);

        // Set a new timeout for any cleanup needed after scrolling
        const timeout = setTimeout(() => {
          // Timeout logic (if needed)
        }, 1000);

        setScrollTimeout(timeout);
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [pathname, scrollTimeout]);

  return <>{children}</>;
};

export default SmoothScroll;
