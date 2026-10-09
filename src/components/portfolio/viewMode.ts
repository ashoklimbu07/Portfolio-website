import { useSyncExternalStore } from "react";

/** "boot" is the server render and first paint, before the browser has been asked anything. */
export type ViewMode = "boot" | "3d" | "classic";
type Choice = Exclude<ViewMode, "boot">;

const STORAGE_KEY = "view-mode";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const listeners = new Set<() => void>();
let webgl: boolean | undefined;
let choice: Choice | null | undefined;
let sceneFailed = false;

function supportsWebGL() {
  if (webgl === undefined) {
    try {
      const gl = document.createElement("canvas").getContext("webgl2");
      webgl = gl !== null;
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      webgl = false;
    }
  }
  return webgl;
}

function storedChoice() {
  if (choice === undefined) {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      choice = stored === "3d" || stored === "classic" ? stored : null;
    } catch {
      choice = null;
    }
  }
  return choice;
}

/** Whether this browser can show the 3D scene at all. */
export function canRender3D() {
  return !sceneFailed && supportsWebGL();
}

function getSnapshot(): ViewMode {
  if (!canRender3D()) return "classic";
  // An explicit choice wins; otherwise people who ask for less motion get the 2D page.
  return storedChoice() ?? (window.matchMedia(REDUCED_MOTION).matches ? "classic" : "3d");
}

function subscribe(listener: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  listeners.add(listener);
  media.addEventListener("change", listener);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", listener);
  };
}

const notify = () => listeners.forEach((listener) => listener());

export function useViewMode(): ViewMode {
  return useSyncExternalStore(subscribe, getSnapshot, () => "boot");
}

export function setViewMode(mode: Choice) {
  choice = mode;
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Private mode: the choice still holds for this visit.
  }
  notify();
}

/** The scene crashed or its code failed to load: fall back to 2D for this visit. */
export function reportSceneFailure() {
  sceneFailed = true;
  notify();
}
