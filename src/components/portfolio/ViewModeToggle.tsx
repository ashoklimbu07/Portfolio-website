"use client";

import { canRender3D, setViewMode, useViewMode } from "./viewMode";

/** Switches between the 3D scene and the classic 2D page. */
export function ViewModeToggle() {
  const mode = useViewMode();
  // Nothing to offer until the browser has been checked, or if it can't do WebGL.
  if (mode === "boot" || (mode === "classic" && !canRender3D())) return null;

  const next = mode === "3d" ? "classic" : "3d";
  const label = next === "3d" ? "Switch to 3D view" : "Switch to 2D view";

  return (
    <button
      onClick={() => {
        // The two views scroll to different lengths, so start the other one from
        // the top, and drop any #section that would send it somewhere else.
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        setViewMode(next);
        window.scrollTo({ top: 0, behavior: "instant" });
      }}
      aria-label={label}
      title={label}
      className="font-mono flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[0.65rem] font-semibold text-[var(--fg-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      {next === "3d" ? "3D" : "2D"}
    </button>
  );
}
