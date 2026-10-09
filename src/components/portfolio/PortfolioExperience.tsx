"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useState, type ReactNode } from "react";
import {
  AboutSection,
  ContactSection,
  Footer,
  HeroSection,
  JourneySection,
  ProjectsSection,
  SkillsSection,
  StatsBar,
} from "./PortfolioSections";
import { ScrollBackgroundFx } from "./ScrollBackgroundFx";
import { reportSceneFailure, useViewMode } from "./viewMode";

// three.js only downloads for visitors who actually get the 3D scene.
const Experience3D = dynamic(() => import("./three/Experience3D"), { ssr: false });

/** The original 2D page. Also what crawlers and no-JS visitors receive. */
function ClassicPortfolio() {
  return (
    <>
      <ScrollBackgroundFx />
      <main>
        <HeroSection />
        <StatsBar />
        <AboutSection />
        <JourneySection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

/** If the scene throws (lost WebGL context, failed chunk), drop back to the 2D page. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    reportSceneFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function PortfolioExperience() {
  const mode = useViewMode();
  const [sceneReady, setSceneReady] = useState(false);
  const handleReady = useCallback(() => setSceneReady(true), []);

  // Lets CSS pin the navbar while the page itself is the 3D stage.
  useEffect(() => {
    document.documentElement.dataset.view = mode;
    return () => {
      delete document.documentElement.dataset.view;
    };
  }, [mode]);

  const veiled = mode === "boot" || (mode === "3d" && !sceneReady);

  return (
    <>
      {mode === "3d" ? (
        <SceneBoundary>
          <Experience3D onReady={handleReady} />
        </SceneBoundary>
      ) : (
        <ClassicPortfolio />
      )}

      {/* Covers the swap from the server-rendered 2D page to the 3D scene. */}
      <div className="boot-veil" data-hidden={!veiled} aria-hidden>
        <span className="font-heading text-2xl font-bold tracking-tight text-[var(--fg)]">
          HSL<span className="text-[var(--accent)]">.</span>
        </span>
        <span className="boot-veil__bar" />
      </div>
      <noscript>
        <style>{".boot-veil{display:none}"}</style>
      </noscript>
    </>
  );
}
