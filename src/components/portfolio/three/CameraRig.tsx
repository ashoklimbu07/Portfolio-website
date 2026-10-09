"use client";

import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type RefObject } from "react";
import { MathUtils, type PerspectiveCamera } from "three";
import { snapToDevicePixel, type Rig, type SceneLayout } from "./config";
import { flightPoint, parkedAt } from "./flightPath";

gsap.registerPlugin(ScrollTrigger);
// Mobile browsers resize the window as the address bar hides; that isn't a layout change.
ScrollTrigger.config({ ignoreMobileResize: true });

/** Higher = the camera sticks closer to the scrollbar. */
const SCROLL_DAMPING = 9;
const POINTER_DAMPING = 4;
/** How far the cursor can slide the camera, in screen px. */
const PARALLAX_PX = { x: 16, y: 10 };
/** Roll into each turn, in radians. */
const BANK = 0.07;

type CameraRigProps = {
  layout: SceneLayout;
  rigRef: RefObject<Rig>;
  trackRef: RefObject<HTMLDivElement | null>;
  onStation: (index: number) => void;
  onProgress: (progress: number, scrollPx: number) => void;
};

export function CameraRig({ layout, rigRef, trackRef, onStation, onProgress }: CameraRigProps) {
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const scroll = useRef({ target: 0, smooth: 0, started: false });
  const cursor = useRef({ x: 0, y: 0 });
  const station = useRef(-1);

  // The choreography: a stop and a flight per station, laid end to end so that
  // one second of timeline is one pixel of scroll.
  useEffect(() => {
    const track = trackRef.current;
    const rig = rigRef.current;
    if (!track) return;

    rig.t = 0;
    for (const stop of layout.stations) rig.dwell[stop.id] = 0;

    const tl = gsap.timeline({ paused: true });
    layout.stations.forEach((stop, i) => {
      tl.addLabel(stop.id);
      tl.fromTo(
        rig.dwell,
        { [stop.id]: 0 },
        { [stop.id]: 1, duration: stop.dwellPx, ease: "none", immediateRender: false },
      );
      if (i < layout.stations.length - 1) {
        tl.fromTo(
          rig,
          { t: i },
          { t: i + 1, duration: layout.travelPx, ease: "power2.inOut", immediateRender: false },
        );
      }
    });
    timeline.current = tl;

    const readScroll = (self: ScrollTrigger) => {
      scroll.current.target = MathUtils.clamp(self.scroll() - self.start, 0, layout.totalPx);
    };
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onUpdate: readScroll,
      onRefresh: readScroll,
    });
    readScroll(trigger);

    return () => {
      trigger.kill();
      tl.kill();
      timeline.current = null;
    };
  }, [layout, rigRef, trackRef]);

  useEffect(() => {
    const track = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cursor.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      cursor.current.y = 1 - (event.clientY / window.innerHeight) * 2;
    };
    const recentre = () => {
      cursor.current.x = 0;
      cursor.current.y = 0;
    };
    window.addEventListener("pointermove", track, { passive: true });
    document.documentElement.addEventListener("mouseleave", recentre);
    return () => {
      window.removeEventListener("pointermove", track);
      document.documentElement.removeEventListener("mouseleave", recentre);
    };
  }, []);

  // Runs before the panels and drei's <Html> read the camera.
  useFrame((state, delta) => {
    const tl = timeline.current;
    if (!tl) return;
    const rig = rigRef.current;
    const camera = state.camera as PerspectiveCamera;
    const dt = Math.min(delta, 0.1);

    // Ease the playhead toward the scrollbar. On a reload mid-page, start in
    // place instead of flying in from the top.
    const s = scroll.current;
    s.smooth = s.started ? MathUtils.damp(s.smooth, s.target, SCROLL_DAMPING, dt) : s.target;
    if (Math.abs(s.target - s.smooth) < 0.1) s.smooth = s.target;
    s.started = true;
    tl.time(s.smooth);

    rig.pointer.x = MathUtils.damp(rig.pointer.x, cursor.current.x, POINTER_DAMPING, dt);
    rig.pointer.y = MathUtils.damp(rig.pointer.y, cursor.current.y, POINTER_DAMPING, dt);

    if (camera.fov !== layout.fov) {
      camera.fov = layout.fov;
      camera.updateProjectionMatrix();
    }

    const { stations } = layout;
    const index = Math.min(Math.floor(rig.t), stations.length - 1);
    const f = rig.t - index;
    const here = stations[index];
    const next = stations[index + 1];
    const flying = next !== undefined && f > 0;

    let yaw = here.yaw;
    let roll = 0;
    if (flying) {
      flightPoint(here, next, f, camera.position, rig.dwell[here.id], rig.dwell[next.id]);
      const turn = next.yaw - here.yaw;
      yaw += turn * MathUtils.smootherstep(f, 0, 1);
      roll = Math.sin(Math.PI * f) * BANK * Math.sign(turn);
    } else {
      parkedAt(here, rig.dwell[here.id], camera.position);
    }
    camera.rotation.set(0, yaw, roll, "YXZ");

    // Cursor parallax: the camera slides, it never tilts, so parked panels stay
    // square to the screen. Parked offsets land on whole device pixels to keep text sharp.
    const settle = flying ? (px: number) => px : snapToDevicePixel;
    camera.translateX(settle(rig.pointer.x * PARALLAX_PX.x) / layout.pxPerUnit);
    camera.translateY(settle(rig.pointer.y * PARALLAX_PX.y) / layout.pxPerUnit);

    const active = Math.round(rig.t);
    if (active !== station.current) {
      station.current = active;
      onStation(active);
    }
    onProgress(layout.totalPx > 0 ? s.smooth / layout.totalPx : 0, s.smooth);
  }, -2);

  return null;
}
