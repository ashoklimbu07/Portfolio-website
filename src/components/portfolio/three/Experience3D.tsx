"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CameraRig } from "./CameraRig";
import {
  EMPTY_HEIGHTS,
  FOV,
  PALETTES,
  STATIONS,
  computeLayout,
  createRig,
  type StationId,
  type Viewport,
} from "./config";
import { Environment } from "./Environment";
import { SectionPanels } from "./SectionPanels";
import { StationHud } from "./StationHud";
import { useIsDark } from "./useIsDark";

/** Cap on the canvas pixel ratio. Plenty for the scenery; the text is HTML and unaffected. */
const MAX_DPR = 1.5;

/** Reports the canvas size, so the page and drei's <Html> agree to the pixel. */
function ViewportProbe({ onResize }: { onResize: (viewport: Viewport) => void }) {
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);
  useEffect(() => {
    if (width > 0 && height > 0) onResize({ width, height });
  }, [width, height, onResize]);
  return null;
}

export default function Experience3D({ onReady }: { onReady: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef(createRig());

  const [viewport, setViewport] = useState<Viewport | null>(null);
  const [heights, setHeights] = useState(EMPTY_HEIGHTS);
  const [active, setActive] = useState(0);
  const [dprCap, setDprCap] = useState(MAX_DPR);

  const dark = useIsDark();
  const palette = dark ? PALETTES.dark : PALETTES.light;
  const layout = useMemo(() => (viewport ? computeLayout(viewport, heights) : null), [viewport, heights]);

  const handleHeight = useCallback((id: StationId, height: number) => {
    setHeights((current) => (current[id] === height ? current : { ...current, [id]: height }));
  }, []);

  const handleProgress = useCallback((progress: number, scrollPx: number) => {
    if (fillRef.current) fillRef.current.style.transform = `scaleY(${progress.toFixed(4)})`;
    if (hintRef.current) hintRef.current.style.opacity = String(Math.max(0, 0.4 - scrollPx / 500));
  }, []);

  // Every panel has been measured, so the scroll track has its real length.
  const ready = layout !== null && STATIONS.every((station) => heights[station.id] > 0);
  useEffect(() => {
    if (!ready) return;
    // Honour a deep link such as /#projects, which had nothing to scroll to until now.
    const target = window.location.hash.slice(1);
    if (target) document.getElementById(target)?.scrollIntoView({ behavior: "instant" });
    onReady();
  }, [ready, onReady]);

  return (
    <>
      <main className="stage-3d">
        <Canvas
          flat
          // Never render more pixels than the screen has.
          dpr={[1, dprCap]}
          camera={{ fov: FOV.landscape, near: 0.1, far: 240 }}
          gl={{ antialias: true, alpha: false, stencil: false, powerPreference: "high-performance" }}
          // The stage is fixed, so scrolling never moves the canvas.
          resize={{ scroll: false }}
          // Clicks belong to the panels; the cursor is tracked on the window instead.
          style={{ pointerEvents: "none" }}
        >
          <color attach="background" args={[palette.bg]} />
          <fog attach="fog" args={[palette.bg, 16, 96]} />
          <ViewportProbe onResize={setViewport} />
          {/* Trade resolution for frame rate on machines that can't hold it. */}
          <PerformanceMonitor
            factor={1}
            onChange={({ factor }) => setDprCap(Math.round((1 + (MAX_DPR - 1) * factor) * 4) / 4)}
          />

          {layout && (
            <>
              <CameraRig
                layout={layout}
                rigRef={rigRef}
                trackRef={trackRef}
                onStation={setActive}
                onProgress={handleProgress}
              />
              <Environment mobile={layout.mobile} palette={palette} dark={dark} rigRef={rigRef} />
              <SectionPanels layout={layout} rigRef={rigRef} revealed={ready} onHeight={handleHeight} />
            </>
          )}
        </Canvas>
      </main>

      {/* The page's real scroll height. Each slice is the anchor for its section. */}
      <div ref={trackRef} className="scroll-track" aria-hidden>
        {STATIONS.map((station, i) => (
          <section
            key={station.id}
            id={station.id}
            style={{ height: layout ? layout.stations[i].spanPx : "100vh" }}
          />
        ))}
      </div>

      <StationHud active={active} fillRef={fillRef} hintRef={hintRef} />
    </>
  );
}
