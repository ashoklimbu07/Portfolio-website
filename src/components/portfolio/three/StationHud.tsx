import type { RefObject } from "react";
import { ScrollHint } from "../PortfolioSections";
import { STATIONS } from "./config";

type StationHudProps = {
  active: number;
  /** Scaled by the camera rig every frame to show progress along the route. */
  fillRef: RefObject<HTMLSpanElement | null>;
  hintRef: RefObject<HTMLDivElement | null>;
};

export function StationHud({ active, fillRef, hintRef }: StationHudProps) {
  return (
    <>
      <div className="station-hud" role="navigation" aria-label="Sections">
        <span className="station-hud__rail" aria-hidden>
          <span ref={fillRef} className="station-hud__fill" />
        </span>
        {STATIONS.map((station, i) => (
          <a
            key={station.id}
            href={`#${station.id}`}
            className="station-hud__stop"
            aria-current={i === active ? "true" : undefined}
          >
            <span className="station-hud__label">{station.label}</span>
            <span className="station-hud__pip" />
          </a>
        ))}
      </div>

      <div ref={hintRef} className="scroll-hint-3d" aria-hidden>
        <ScrollHint />
      </div>
    </>
  );
}
