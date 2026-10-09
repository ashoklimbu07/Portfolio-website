"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Fragment, useCallback, useEffect, useRef, type FocusEvent, type ReactNode, type RefObject } from "react";
import { MathUtils, Vector3, type Group } from "three";
import {
  AboutContent,
  ContactContent,
  FooterContent,
  HeroContent,
  JourneyContent,
  ProjectsContent,
  SkillsContent,
  StatsContent,
} from "../PortfolioSections";
import {
  DWELL_DRIFT,
  SHORT_PAN_PX,
  STATIONS,
  snapToDevicePixel,
  type Rig,
  type SceneLayout,
  type StationId,
  type StationLayout,
} from "./config";
import { panelAnchor } from "./flightPath";

const ANCHORS = STATIONS.map((station) => panelAnchor(station, new Vector3()));

/** The existing section content, untouched, arranged for a panel. */
function panelContent(id: StationId): ReactNode {
  switch (id) {
    case "hero":
      return (
        <div className="grid items-center gap-16 px-5 md:grid-cols-2 md:px-8 lg:gap-20">
          <HeroContent />
        </div>
      );
    case "about":
      return (
        <>
          <div className="border-b border-[var(--border)]">
            <StatsContent />
          </div>
          <div className="p-6 md:p-12">
            <AboutContent />
          </div>
        </>
      );
    case "journey":
      return (
        <div className="p-6 md:p-10">
          <JourneyContent />
        </div>
      );
    case "skills":
      return (
        <div className="p-6 md:p-10">
          <SkillsContent />
        </div>
      );
    case "projects":
      return (
        <div className="p-6 md:p-10">
          <ProjectsContent />
        </div>
      );
    case "contact":
      return (
        <>
          <ContactContent />
          <div className="border-t border-[var(--border)] px-6 py-5 md:px-8">
            <FooterContent />
          </div>
        </>
      );
  }
}

type PanelProps = {
  station: StationLayout;
  available: number;
  rigRef: RefObject<Rig>;
  register: (index: number, element: HTMLElement | null) => void;
  onHeight: (id: StationId, height: number) => void;
  children: ReactNode;
};

function Panel({ station, available, rigRef, register, onHeight, children }: PanelProps) {
  const ref = useRef<HTMLElement>(null);
  const { id, index } = station;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    register(index, element);
    // Layout height, which the 3D transform doesn't distort.
    const observer = new ResizeObserver(([entry]) => {
      const height = entry.borderBoxSize[0].blockSize;
      if (height > 0) onHeight(id, height);
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      register(index, null);
    };
  }, [id, index, register, onHeight]);

  // The page scroll is what moves the camera, so tabbing to a link at another
  // station, or below the fold of this one, has to scroll there by hand.
  const followFocus = (event: FocusEvent<HTMLElement>) => {
    const target = event.target;
    if (!target.matches(":focus-visible")) return;

    let top = 0;
    for (let node: HTMLElement | null = target; node && node !== ref.current; ) {
      top += node.offsetTop;
      node = node.offsetParent instanceof HTMLElement ? node.offsetParent : null;
    }
    const wanted = MathUtils.clamp(top - available * 0.4, 0, station.overflow);
    const parked = Math.round(rigRef.current.t) === index;
    if (parked && station.overflow === 0) return;

    const within = station.overflow > 0 ? (wanted / station.overflow) * station.dwellPx : 0;
    window.scrollTo({ top: station.start + within });
  };

  return (
    <section
      ref={ref}
      aria-label={station.label}
      className={`panel-3d ${station.bare ? "panel-3d--bare" : "panel-3d--glass"}`}
      style={{ width: station.width }}
      onFocus={followFocus}
    >
      {children}
    </section>
  );
}

/** Panels dissolve as the camera dives through them and resolve as it lines up on the next. */
function panelOpacity(distance: number) {
  return distance >= 0
    ? 1 - MathUtils.smoothstep(distance, 0.02, 0.24)
    : MathUtils.smoothstep(1 + distance, 0.5, 0.92);
}

// drei hides <Html> that falls behind the camera with display:none, which would
// also drop it from the tab order and zero its measured height. Fading covers it.
const keepMounted = () => {};

type SectionPanelsProps = {
  layout: SceneLayout;
  rigRef: RefObject<Rig>;
  /** Flips once the loading veil lifts, so the hero's entrance plays in view. */
  revealed: boolean;
  onHeight: (id: StationId, height: number) => void;
};

export function SectionPanels({ layout, rigRef, revealed, onHeight }: SectionPanelsProps) {
  const slides = useRef<(Group | null)[]>([]);
  const panels = useRef<(HTMLElement | null)[]>([]);
  const shown = useRef<number[]>([]);
  const register = useCallback((index: number, element: HTMLElement | null) => {
    panels.current[index] = element;
    shown.current[index] = -1;
  }, []);

  // Runs after the camera rig and before drei's <Html> turns these into CSS matrices.
  useFrame(() => {
    const rig = rigRef.current;
    const { pxPerUnit, topPad, available, width, height } = layout;

    for (const station of layout.stations) {
      const progress = rig.dwell[station.id];

      // Where the panel's top edge should sit on screen: tall panels scroll from
      // top-aligned to bottom-aligned, short ones stay centred and glide a little.
      const top = snapToDevicePixel(
        station.overflow > 0
          ? topPad - progress * station.overflow
          : topPad + (available - station.height) / 2 + (0.5 - progress) * SHORT_PAN_PX,
      );
      const left = (width - station.width) / 2;
      const belowCentre = top + station.height / 2 - height / 2;
      slides.current[station.index]?.position.set(
        (snapToDevicePixel(left) - left) / pxPerUnit,
        -DWELL_DRIFT * progress - belowCentre / pxPerUnit,
        0,
      );

      const element = panels.current[station.index];
      const opacity = Math.round(panelOpacity(rig.t - station.index) * 1000) / 1000;
      if (element && shown.current[station.index] !== opacity) {
        shown.current[station.index] = opacity;
        element.style.opacity = String(opacity);
        element.style.pointerEvents = opacity > 0.5 ? "" : "none";
      }
    }
  }, -1);

  return (
    <>
      {layout.stations.map((station) => (
        <group key={station.id} position={ANCHORS[station.index]} rotation-y={station.yaw}>
          <group
            ref={(group) => {
              slides.current[station.index] = group;
            }}
          >
            <Html
              transform
              // 400 / distanceFactor CSS px span one world unit.
              distanceFactor={400 / layout.pxPerUnit}
              zIndexRange={[20, 0]}
              onOcclude={keepMounted}
              wrapperClass="panel-layer"
            >
              <Panel
                station={station}
                available={layout.available}
                rigRef={rigRef}
                register={register}
                onHeight={onHeight}
              >
                <Fragment key={station.id === "hero" && !revealed ? "veiled" : "live"}>
                  {panelContent(station.id)}
                </Fragment>
              </Panel>
            </Html>
          </group>
        </group>
      ))}
    </>
  );
}
