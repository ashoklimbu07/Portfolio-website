"use client";

import { useEffect } from "react";

export function ScrollBackgroundFx() {
  useEffect(() => {
    const root = document.documentElement;
    const sectionTargets = () => Array.from(document.querySelectorAll<HTMLElement>(".scroll-section-fx"));
    let lastY = window.scrollY;
    let rafId = 0;

    const updateVars = () => {
      const y = window.scrollY;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(y / maxScroll, 0), 1);
      const direction = y >= lastY ? "down" : "up";
      const speed = Math.min(Math.abs(y - lastY) / 120, 1);
      const tilt = progress * 8 - 4;
      const heroProgress = Math.min(Math.max(y / Math.max(window.innerHeight * 0.9, 1), 0), 1);
      const heroScale = 1 - heroProgress * 0.06;

      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty("--scroll-offset", `${Math.round(y * 0.12)}px`);
      root.style.setProperty("--scroll-speed", speed.toFixed(3));
      root.style.setProperty("--scroll-tilt", `${tilt.toFixed(2)}deg`);
      root.style.setProperty("--hero-progress", heroProgress.toFixed(4));
      root.style.setProperty("--hero-scale", heroScale.toFixed(4));
      root.dataset.scrollDir = direction;

      const viewportHeight = window.innerHeight;
      const sections = sectionTargets();

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const start = viewportHeight * 0.94;
        const end = -rect.height * 0.16;
        const sectionProgress = Math.min(Math.max((start - rect.top) / Math.max(start - end, 1), 0), 1);
        const sectionScale = 1.02 - sectionProgress * 0.03;
        const sectionShift = (1 - sectionProgress) * 12 - 6;
        const sectionFade = 0.92 + sectionProgress * 0.08;

        section.style.setProperty("--section-progress", sectionProgress.toFixed(4));
        section.style.setProperty("--section-scale", sectionScale.toFixed(4));
        section.style.setProperty("--section-shift", `${sectionShift.toFixed(2)}px`);
        section.style.setProperty("--section-fade", sectionFade.toFixed(4));
      });

      lastY = y;
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateVars);
    };

    updateVars();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
      root.style.removeProperty("--scroll-progress");
      root.style.removeProperty("--scroll-offset");
      root.style.removeProperty("--scroll-speed");
      root.style.removeProperty("--scroll-tilt");
      root.style.removeProperty("--hero-progress");
      root.style.removeProperty("--hero-scale");
      delete root.dataset.scrollDir;

      sectionTargets().forEach((section) => {
        section.style.removeProperty("--section-progress");
        section.style.removeProperty("--section-scale");
        section.style.removeProperty("--section-shift");
        section.style.removeProperty("--section-fade");
      });
    };
  }, []);

  return null;
}
