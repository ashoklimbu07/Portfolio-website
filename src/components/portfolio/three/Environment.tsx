"use client";

import { Grid } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  MathUtils,
  NormalBlending,
  Object3D,
  Quaternion,
  Vector3,
  type Group,
  type InstancedMesh,
  type PerspectiveCamera,
  type ShaderMaterial,
} from "three";
import { STATIONS, type Palette, type Rig } from "./config";
import { flightPoint, panelAnchor } from "./flightPath";

/* Everything here is one draw call per kind of object, so the scene stays cheap. */
const DENSITY = {
  desktop: { stars: 3200, shards: 64, frames: 26 },
  mobile: { stars: 1400, shards: 28, frames: 12 },
} as const;

/** The stretch of -Z the scenery fills, a little past both ends of the journey. */
const FIELD = { near: 30, far: -200 };
/** How far the scenery slides against the cursor, in world units. */
const CURSOR_SHIFT = { x: 0.9, y: 0.55 };

/** Small deterministic PRNG, so the scenery is identical on every visit. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Sideways position of the camera's route at a given depth. */
function routeX(z: number) {
  for (let i = 0; i < STATIONS.length - 1; i++) {
    const [ax, , az] = STATIONS[i].position;
    const [bx, , bz] = STATIONS[i + 1].position;
    if (z <= az && z >= bz) return MathUtils.mapLinear(z, az, bz, ax, bx);
  }
  return z > 0 ? STATIONS[0].position[0] : STATIONS[STATIONS.length - 1].position[0];
}

/** A random spot around the route, no closer to it than `clearance`. */
function scatter(rand: () => number, clearance: number, spread: number) {
  const z = MathUtils.lerp(FIELD.near, FIELD.far, rand());
  const radius = clearance + spread * Math.pow(rand(), 0.8);
  const angle = rand() * Math.PI * 2;
  return [routeX(z) + Math.cos(angle) * radius, Math.sin(angle) * radius * 0.62, z] as const;
}

const STAR_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aTint;
  uniform float uTime;
  uniform float uScale;
  varying float vAlpha;
  varying float vTint;

  void main() {
    vec3 p = position;
    p.x += cos(uTime * 0.21 + aPhase * 1.7) * 0.45;
    p.y += sin(uTime * 0.27 + aPhase) * 0.6;
    vec4 view = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * view;

    float depth = -view.z;
    float twinkle = 0.7 + 0.3 * sin(uTime * 1.4 + aPhase * 6.0);
    gl_PointSize = min(aSize * twinkle * uScale / depth, 48.0);
    // Fade in out of the fog, and out again just before a star would hit the lens.
    vAlpha = smoothstep(105.0, 45.0, depth) * smoothstep(0.6, 5.0, depth);
    vTint = aTint;
  }
`;

const STAR_FRAGMENT = /* glsl */ `
  uniform vec3 uStar;
  uniform vec3 uAccent;
  uniform vec3 uSecondary;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vTint;

  void main() {
    float glow = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5));
    vec3 color = vTint < 0.6 ? uStar : (vTint < 0.85 ? uAccent : uSecondary);
    gl_FragColor = vec4(color, glow * glow * vAlpha * uOpacity);
    #include <colorspace_fragment>
  }
`;

type Themed = { palette: Palette; dark: boolean };

function Starfield({ count, palette, dark }: Themed & { count: number }) {
  const materialRef = useRef<ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const rand = seeded(7);
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const tints = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions.set(scatter(rand, 2.5, 62), i * 3);
      sizes[i] = 0.07 + rand() * rand() * 0.24;
      phases[i] = rand() * Math.PI * 2;
      tints[i] = rand();
    }
    const stars = new BufferGeometry();
    stars.setAttribute("position", new BufferAttribute(positions, 3));
    stars.setAttribute("aSize", new BufferAttribute(sizes, 1));
    stars.setAttribute("aPhase", new BufferAttribute(phases, 1));
    stars.setAttribute("aTint", new BufferAttribute(tints, 1));
    return stars;
  }, [count]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScale: { value: 1 },
      uOpacity: { value: 1 },
      uStar: { value: new Color() },
      uAccent: { value: new Color() },
      uSecondary: { value: new Color() },
    }),
    [],
  );

  useFrame((state, delta) => {
    const live = materialRef.current?.uniforms;
    if (!live) return;
    live.uTime.value += delta;
    // Converts a star's world-space size into pixels at unit distance.
    const camera = state.camera as PerspectiveCamera;
    live.uScale.value =
      (state.size.height * state.viewport.dpr) / (2 * Math.tan(MathUtils.degToRad(camera.fov) / 2));
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        uniforms-uStar-value={palette.star}
        uniforms-uAccent-value={palette.accent}
        uniforms-uSecondary-value={palette.secondary}
        uniforms-uOpacity-value={dark ? 0.95 : 0.7}
        vertexShader={STAR_VERTEX}
        fragmentShader={STAR_FRAGMENT}
        transparent
        depthWrite={false}
        blending={dark ? AdditiveBlending : NormalBlending}
      />
    </points>
  );
}

type Tumbler = {
  position: readonly [number, number, number];
  scale: number;
  spin: readonly [number, number];
  bob: number;
  phase: number;
};

function makeTumblers(count: number, seed: number, clearance: number, size: readonly [number, number]) {
  const rand = seeded(seed);
  return Array.from({ length: count }, (): Tumbler => ({
    position: scatter(rand, clearance, 26),
    scale: MathUtils.lerp(size[0], size[1], rand() * rand()),
    spin: [(rand() - 0.5) * 0.5, (rand() - 0.5) * 0.5],
    bob: 0.2 + rand() * 0.35,
    phase: rand() * Math.PI * 2,
  }));
}

const dummy = new Object3D();

/** Slowly tumble and bob a set of instances. */
function useTumble(meshRef: RefObject<InstancedMesh | null>, tumblers: Tumbler[]) {
  const clock = useRef(0);
  useFrame((_, delta) => {
    const instances = meshRef.current;
    if (!instances) return;
    clock.current += delta;
    const time = clock.current;
    tumblers.forEach((item, i) => {
      const [x, y, z] = item.position;
      dummy.position.set(x, y + Math.sin(time * item.bob + item.phase) * 0.7, z);
      dummy.rotation.set(time * item.spin[0] + item.phase, time * item.spin[1], 0);
      dummy.scale.setScalar(item.scale);
      dummy.updateMatrix();
      instances.setMatrixAt(i, dummy.matrix);
    });
    instances.instanceMatrix.needsUpdate = true;
  });
}

/** Faceted low-poly crystals, lit by the two coloured key lights. */
function Shards({ count, palette, dark }: Themed & { count: number }) {
  const mesh = useRef<InstancedMesh>(null);
  const tumblers = useMemo(() => makeTumblers(count, 21, 9, [0.35, 1.7]), [count]);
  useTumble(mesh, tumblers);

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={palette.shard}
        emissive={palette.accent}
        emissiveIntensity={dark ? 0.07 : 0}
        roughness={0.35}
        metalness={dark ? 0.55 : 0.1}
        flatShading
        transparent={!dark}
        opacity={dark ? 1 : 0.55}
      />
    </instancedMesh>
  );
}

/** Neon wireframe octahedra drifting further out. */
function Frames({ count, palette, dark }: Themed & { count: number }) {
  const mesh = useRef<InstancedMesh>(null);
  const tumblers = useMemo(() => makeTumblers(count, 53, 12, [0.9, 2.6]), [count]);
  useTumble(mesh, tumblers);

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={palette.accent} wireframe transparent opacity={dark ? 0.32 : 0.45} />
    </instancedMesh>
  );
}

/** Far enough along each flight to stay clear of the panel the camera is parked at. */
const GATE_STOPS = [0.46, 0.6, 0.74];
const GATE_COUNT = (STATIONS.length - 1) * GATE_STOPS.length;
const Z_AXIS = new Vector3(0, 0, 1);

/** Hexagonal rings strung along each flight; the camera threads them between stations. */
function Gates({ palette, dark }: Themed) {
  const mesh = useRef<InstancedMesh>(null);

  const gates = useMemo(() => {
    const ahead = new Vector3();
    const behind = new Vector3();
    return STATIONS.slice(0, -1).flatMap((station, leg) =>
      GATE_STOPS.map((f, i) => {
        const next = STATIONS[leg + 1];
        const position = flightPoint(station, next, f, new Vector3());
        const tangent = flightPoint(station, next, f + 0.01, ahead)
          .sub(flightPoint(station, next, f - 0.01, behind))
          .normalize();
        return {
          position,
          facing: new Quaternion().setFromUnitVectors(Z_AXIS, tangent),
          scale: i === 1 ? 1.25 : 1,
          spin: (leg + i) % 2 === 0 ? 0.12 : -0.12,
        };
      }),
    );
  }, []);

  const clock = useRef(0);
  useFrame((_, delta) => {
    const instances = mesh.current;
    if (!instances) return;
    clock.current += delta;
    gates.forEach((gate, i) => {
      dummy.position.copy(gate.position);
      dummy.quaternion.copy(gate.facing);
      dummy.rotateZ(clock.current * gate.spin);
      dummy.scale.setScalar(gate.scale);
      dummy.updateMatrix();
      instances.setMatrixAt(i, dummy.matrix);
    });
    instances.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, GATE_COUNT]} frustumCulled={false}>
      <torusGeometry args={[3.8, 0.022, 6, 6]} />
      <meshBasicMaterial color={palette.accent} transparent opacity={dark ? 0.55 : 0.5} />
    </instancedMesh>
  );
}

/** Soft colour washes behind each panel, echoing the glow blobs of the 2D page. */
function Glows({ palette, dark }: Themed) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.4, "rgba(255,255,255,0.28)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    return new CanvasTexture(canvas);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);

  const spots = useMemo(
    () =>
      STATIONS.map((station, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        const spot = panelAnchor(station, new Vector3());
        return spot.set(spot.x + side * 15, spot.y + side * -5, spot.z - 14);
      }),
    [],
  );

  return (
    <>
      {spots.map((spot, i) => (
        <sprite key={STATIONS[i].id} position={spot} scale={46}>
          <spriteMaterial
            map={texture}
            color={i % 2 === 0 ? palette.accent : palette.secondary}
            opacity={palette.glow * 0.4}
            transparent
            depthWrite={false}
            fog={false}
            blending={dark ? AdditiveBlending : NormalBlending}
          />
        </sprite>
      ))}
    </>
  );
}

const right = new Vector3();
const up = new Vector3();

type EnvironmentProps = Themed & { mobile: boolean; rigRef: RefObject<Rig> };

export function Environment({ mobile, palette, dark, rigRef }: EnvironmentProps) {
  const scenery = useRef<Group>(null);
  const density = mobile ? DENSITY.mobile : DENSITY.desktop;

  // Slide the scenery against the cursor. Near objects cross more of the
  // screen than far ones, which is what reads as depth.
  useFrame((state) => {
    const group = scenery.current;
    if (!group) return;
    const { pointer } = rigRef.current;
    right.set(1, 0, 0).applyQuaternion(state.camera.quaternion);
    up.set(0, 1, 0).applyQuaternion(state.camera.quaternion);
    group.position
      .set(0, 0, 0)
      .addScaledVector(right, -pointer.x * CURSOR_SHIFT.x)
      .addScaledVector(up, -pointer.y * CURSOR_SHIFT.y);
  });

  return (
    <>
      <ambientLight intensity={dark ? 0.6 : 1.6} />
      <directionalLight position={[-6, 8, 6]} color={palette.accent} intensity={dark ? 2.4 : 1.2} />
      <directionalLight position={[8, -4, -6]} color={palette.secondary} intensity={dark ? 1.8 : 0.9} />

      <Grid
        position={[0, -13, 0]}
        infiniteGrid
        followCamera
        cellSize={2.5}
        sectionSize={12.5}
        cellThickness={0.6}
        sectionThickness={1.1}
        cellColor={palette.grid}
        sectionColor={palette.accent}
        fadeDistance={90}
        fadeStrength={2.4}
      />

      <group ref={scenery}>
        <Starfield key={density.stars} count={density.stars} palette={palette} dark={dark} />
        <Shards key={`shards-${density.shards}`} count={density.shards} palette={palette} dark={dark} />
        <Frames key={`frames-${density.frames}`} count={density.frames} palette={palette} dark={dark} />
        <Gates palette={palette} dark={dark} />
        <Glows palette={palette} dark={dark} />
      </group>
    </>
  );
}
