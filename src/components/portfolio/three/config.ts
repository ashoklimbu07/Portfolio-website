import { navLinks } from "../data";

export type StationId = "hero" | "about" | "journey" | "skills" | "projects" | "contact";

export type Station = {
  id: StationId;
  label: string;
  /** Where the camera parks for this section. */
  position: readonly [number, number, number];
  /** Camera heading in radians (rotation about +Y). */
  yaw: number;
  /** Widest the panel may grow, in CSS px. */
  maxWidth: number;
  /** Render the content straight onto the scene, without the glass frame. */
  bare?: boolean;
};

const labelFor = (id: StationId, fallback: string) =>
  navLinks.find((link) => link.href === `#${id}`)?.label ?? fallback;

/** The camera slaloms down -Z, stopping once per section. */
export const STATIONS: readonly Station[] = [
  { id: "hero", label: "Home", position: [0, 0, 0], yaw: 0, maxWidth: 1152, bare: true },
  { id: "about", label: labelFor("about", "About"), position: [7, 1.5, -30], yaw: -0.42, maxWidth: 940 },
  { id: "journey", label: labelFor("journey", "Journey"), position: [-8, -1, -62], yaw: 0.5, maxWidth: 980 },
  { id: "skills", label: labelFor("skills", "Skills"), position: [9, 2, -94], yaw: -0.35, maxWidth: 1152 },
  { id: "projects", label: labelFor("projects", "Projects"), position: [-7, 0, -126], yaw: 0.4, maxWidth: 1200 },
  { id: "contact", label: labelFor("contact", "Contact"), position: [0, 1, -160], yaw: 0, maxWidth: 1000 },
];

/** World units between a parked camera and the panel it is reading. */
export const PANEL_DISTANCE = 10;
/** How far the camera sinks while a station's content scrolls past. */
export const DWELL_DRIFT = 0.9;
/** Panels that fit on screen still glide this many px, so scrolling never feels dead. */
export const SHORT_PAN_PX = 36;

export const FOV = { landscape: 50, portrait: 64 } as const;

/* Scene colours. Keep in step with the --bg / --accent tokens in globals.css. */
export const PALETTES = {
  dark: {
    bg: "#0c0c10",
    accent: "#00d4a0",
    secondary: "#3d8bff",
    star: "#dfe9ff",
    shard: "#1b2130",
    grid: "#1c3a3a",
    glow: 0.5,
  },
  light: {
    bg: "#f5f5f0",
    accent: "#00a37a",
    secondary: "#3b6fd9",
    star: "#5b6478",
    shard: "#dcdcd6",
    grid: "#c4d6d0",
    glow: 0.3,
  },
} as const;

export type Palette = (typeof PALETTES)[keyof typeof PALETTES];

export type Viewport = { width: number; height: number };
export type PanelHeights = Record<StationId, number>;

export const EMPTY_HEIGHTS: PanelHeights = { hero: 0, about: 0, journey: 0, skills: 0, projects: 0, contact: 0 };

export type StationLayout = Station & {
  index: number;
  /** Panel size in CSS px. */
  width: number;
  height: number;
  /** How much of the panel doesn't fit on screen. */
  overflow: number;
  /** Scroll distance spent parked here. */
  dwellPx: number;
  /** Scroll offset at which the camera arrives. */
  start: number;
  /** Height of this station's slice of the scroll track. */
  spanPx: number;
};

export type SceneLayout = Viewport & {
  mobile: boolean;
  fov: number;
  /** CSS px per world unit at PANEL_DISTANCE, i.e. panels render at exactly 1:1. */
  pxPerUnit: number;
  topPad: number;
  /** Vertical room a panel has between the navbar and the bottom edge. */
  available: number;
  /** Scroll distance of one flight between stations. */
  travelPx: number;
  /** Scroll distance of the whole journey. */
  totalPx: number;
  stations: StationLayout[];
};

/**
 * Turn the viewport and the measured panel heights into scroll distances.
 * Panels sit at a distance where one CSS px covers one screen px, so they are
 * as sharp as ordinary HTML; anything taller than the screen scrolls in place.
 */
export function computeLayout(viewport: Viewport, heights: PanelHeights): SceneLayout {
  const { width, height } = viewport;
  const mobile = width < 768;
  const fov = width / height < 0.85 ? FOV.portrait : FOV.landscape;
  const pxPerUnit = height / (2 * PANEL_DISTANCE * Math.tan((fov * Math.PI) / 360));

  const gutter = mobile ? 12 : width < 1280 ? 36 : 64;
  const topPad = mobile ? 76 : 92;
  const bottomPad = mobile ? 24 : 40;
  const available = height - topPad - bottomPad;
  const holdPx = Math.round(height * 0.5);
  const travelPx = Math.round(height);

  let start = 0;
  const stations = STATIONS.map((station, index): StationLayout => {
    const last = index === STATIONS.length - 1;
    const panelHeight = heights[station.id];
    const overflow = Math.max(0, Math.ceil(panelHeight - available));
    const dwellPx = Math.max(holdPx, overflow);
    const layout = {
      ...station,
      index,
      width: Math.min(station.maxWidth, Math.floor(width - gutter * 2)),
      height: panelHeight,
      overflow,
      dwellPx,
      start,
      // The last slice is padded so the page can scroll all the way to its end.
      spanPx: dwellPx + (last ? Math.ceil(height) : travelPx),
    };
    start += dwellPx + (last ? 0 : travelPx);
    return layout;
  });

  return { width, height, mobile, fov, pxPerUnit, topPad, available, travelPx, totalPx: start, stations };
}

/** Round a CSS px offset to the device pixel grid, where text renders sharpest. */
export function snapToDevicePixel(px: number) {
  const ratio = window.devicePixelRatio || 1;
  return Math.round(px * ratio) / ratio;
}

/** Scroll-driven state. GSAP writes it, the render loop reads it. */
export type Rig = {
  /** Journey position: 2 is parked at the third station, 2.5 is halfway to the fourth. */
  t: number;
  /** 0 → 1 as each station's content scrolls past. */
  dwell: PanelHeights;
  /** Smoothed cursor, -1…1 on both axes, +y up. */
  pointer: { x: number; y: number };
};

export const createRig = (): Rig => ({ t: 0, dwell: { ...EMPTY_HEIGHTS }, pointer: { x: 0, y: 0 } });
