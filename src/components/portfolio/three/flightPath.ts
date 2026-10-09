import { Vector3 } from "three";
import { DWELL_DRIFT, PANEL_DISTANCE, type Station } from "./config";

const from = new Vector3();
const to = new Vector3();
const leave = new Vector3();
const arrive = new Vector3();

/** Unit vector the camera looks along at a given heading. */
export function heading(yaw: number, out: Vector3) {
  return out.set(-Math.sin(yaw), 0, -Math.cos(yaw));
}

/** Camera position while parked at a station; it sinks slightly as the content scrolls. */
export function parkedAt(station: Station, dwell: number, out: Vector3) {
  const [x, y, z] = station.position;
  return out.set(x, y - DWELL_DRIFT * dwell, z);
}

/** Centre of the spot a station's panel hangs in. */
export function panelAnchor(station: Station, out: Vector3) {
  const [x, y, z] = station.position;
  return heading(station.yaw, out).multiplyScalar(PANEL_DISTANCE).add(from.set(x, y, z));
}

/**
 * Point on the flight between two stations, f in 0…1.
 * A Hermite curve: the camera pushes straight on through the panel it was
 * reading, swings across, and lines up head-on with the next one.
 */
export function flightPoint(a: Station, b: Station, f: number, out: Vector3, aDwell = 1, bDwell = 0) {
  parkedAt(a, aDwell, from);
  parkedAt(b, bDwell, to);
  const reach = from.distanceTo(to) * 0.9;
  heading(a.yaw, leave).multiplyScalar(reach);
  heading(b.yaw, arrive).multiplyScalar(reach);

  const f2 = f * f;
  const f3 = f2 * f;
  return out
    .copy(from)
    .multiplyScalar(2 * f3 - 3 * f2 + 1)
    .addScaledVector(leave, f3 - 2 * f2 + f)
    .addScaledVector(to, -2 * f3 + 3 * f2)
    .addScaledVector(arrive, f3 - f2);
}
