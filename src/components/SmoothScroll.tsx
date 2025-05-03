"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Handle smooth scrolling
  useEffect(() => {
    let currentScroll = 0;
    let targetScroll = 0;
    let rafId: number;
    let isScrolling = false;

    const updateBodyHeight = () => {
      if (contentRef.current && scrollRef.current) {
        // Set the scroll container height to match content
        scrollRef.current.style.height = `${contentRef.current.scrollHeight}px`;
      }
    };

    const handleScroll = () => {
      targetScroll = window.scrollY;
      isScrolling = true;
    };

    const smoothScroll = () => {
      // Calculate the difference between target and current
      const diff = targetScroll - currentScroll;

      // If we're basically at the target position, just set it directly
      if (Math.abs(diff) < 0.1) {
        currentScroll = targetScroll;
        isScrolling = false;
      } else {
        // Premium smooth easing - adjust these values for different feel
        // Lower values = smoother, laggier feel (0.03-0.08)
        // Higher values = more responsive but less smooth (0.1-0.3)
        const easing = 0.05;

        // Apply easing with additional velocity based on scroll distance
        // This creates more dramatic lag when scrolling quickly
        const velocity = Math.min(Math.abs(diff) * 0.002, 0.2);
        currentScroll += diff * (easing + velocity);
      }

      if (contentRef.current) {
        // Apply the transform with hardware acceleration for smoother animation
        contentRef.current.style.transform = `translate3d(0, ${-currentScroll.toFixed(
          2
        )}px, 0)`;
      }

      // Continue animation loop
      rafId = requestAnimationFrame(smoothScroll);
    };

    // Handle hash links
    const handleHashChange = () => {
      // Get hash from URL
      const hash = window.location.hash;
      if (hash) {
        // Remove the # symbol
        const targetId = hash.substring(1);
        // Find the element with that ID
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Get the element's position relative to the document
          const rect = targetElement.getBoundingClientRect();
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          // Calculate target scroll position (with a small offset for better visibility)
          const targetPosition = rect.top + scrollTop - 120; // 120px offset from top

          // Set the target scroll position
          targetScroll = targetPosition;
          isScrolling = true;

          // Prevent default hash behavior
          return false;
        }
      }
    };

    // Start animation
    updateBodyHeight();
    window.addEventListener("scroll", handleScroll, { passive: true }); // Passive for better performance
    window.addEventListener("resize", updateBodyHeight);
    window.addEventListener("hashchange", handleHashChange);
    rafId = requestAnimationFrame(smoothScroll);

    // Handle initial hash in URL
    setTimeout(handleHashChange, 100);

    // Add mutation observer for dynamic content
    const observer = new MutationObserver(() => {
      // Debounce the height updates to not interfere with scroll performance
      clearTimeout((window as any).resizeTimeout);
      (window as any).resizeTimeout = setTimeout(() => {
        updateBodyHeight();
      }, 200);
    });

    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateBodyHeight);
      window.removeEventListener("hashchange", handleHashChange);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [pathname]);

  // Handle clicks on anchor links
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let anchor = target.closest("a");

      // If we clicked on an anchor with a hash
      if (
        anchor &&
        anchor.hash &&
        anchor.pathname === window.location.pathname
      ) {
        e.preventDefault();

        // Update URL without a full navigation
        window.history.pushState({}, "", anchor.href);

        // Find target element
        const targetId = anchor.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Get position
          const rect = targetElement.getBoundingClientRect();
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          // Scroll to that position (with offset)
          window.scrollTo({
            top: rect.top + scrollTop - 120,
            behavior: "smooth",
          });
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  return (
    <>
      <div ref={scrollRef} style={{ position: "relative", width: "100%" }} />
      <div
        ref={contentRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          willChange: "transform",
          pointerEvents: "auto",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </>
  );
}
