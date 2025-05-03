"use client";

import { useEffect, useRef } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

    // Start animation
    updateBodyHeight();
    window.addEventListener("scroll", handleScroll, { passive: true }); // Passive for better performance
    window.addEventListener("resize", updateBodyHeight);
    rafId = requestAnimationFrame(smoothScroll);

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
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
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
          pointerEvents: "auto", // Ensure clicks work
          zIndex: 1, // Keep above scroll container
        }}
      >
        {children}
      </div>
    </>
  );
}
