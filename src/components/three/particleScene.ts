import * as THREE from "three";
import { landPoints } from "../geo/land";

/**
 * Hero point-cloud: thousands of particles that morph between flowing 3D forms
 * expressing the Qubryon idea — Quality + Quantum innovation + a future-ready outlook.
 * Particles stream along each form (orbits, strands, knots), the form slowly turns,
 * and the cloud scatters away from the cursor.
 */

export interface ParticleShapeDef {
  id: string;
  label: string;
  href: string;
}

export const PARTICLE_SHAPES: ParticleShapeDef[] = [
  { id: "q", label: "Qubryon — quality meets quantum", href: "#services" },
  { id: "atom", label: "Quantum-grade innovation", href: "#service-ai" },
  { id: "knot", label: "Quality, continuously delivered", href: "#service-software" },
  { id: "helix", label: "Talent that fits your team's DNA", href: "#talent" },
  { id: "globe", label: "Future-ready, delivered worldwide", href: "#global" },
];

export const SHAPE_DURATION = 6; // seconds per form

interface Options {
  reducedMotion?: boolean;
  onReady?: () => void;
  onShapeChange?: (index: number) => void;
}

/** Per-particle random seeds shared by every form. */
interface Seeds {
  a: Float32Array; // 0..1
  b: Float32Array; // 0..1
  c: Float32Array; // 0..1
  jx: Float32Array; // unit-ish jitter vector
  jy: Float32Array;
  jz: Float32Array;
}

/** A form writes particle i's local position at time t into out[k..k+2]. */
type Form = {
  at: (i: number, t: number, s: Seeds, out: Float32Array, k: number) => void;
  /** continuous turn speed (rad/s); 0 = gentle sway only */
  spin: number;
  /** axis of the continuous turn: "y" turns it round, "z" spins it face-on */
  spinAxis?: "y" | "z";
  tiltX: number;
  tiltZ: number;
};

const TAU = Math.PI * 2;

export function createParticleScene(container: HTMLElement, opts: Options = {}) {
  const { reducedMotion = false } = opts;
  const narrow = container.clientWidth < 520;
  const N = narrow ? 4200 : 8000;

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
  const dpr = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  Object.assign(renderer.domElement.style, { display: "block", width: "100%", height: "100%" });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const FOV = 35;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50);
  const group = new THREE.Group();
  scene.add(group);

  /* ---------- seeds ---------- */
  const seeds: Seeds = {
    a: new Float32Array(N),
    b: new Float32Array(N),
    c: new Float32Array(N),
    jx: new Float32Array(N),
    jy: new Float32Array(N),
    jz: new Float32Array(N),
  };
  const tmpV = new THREE.Vector3();
  for (let i = 0; i < N; i++) {
    seeds.a[i] = Math.random();
    seeds.b[i] = Math.random();
    seeds.c[i] = Math.random();
    tmpV.randomDirection().multiplyScalar(Math.cbrt(Math.random()));
    seeds.jx[i] = tmpV.x;
    seeds.jy[i] = tmpV.y;
    seeds.jz[i] = tmpV.z;
  }

  const forms: Form[] = [qMonogram(), quantumAtom(), torusKnot(), doubleHelix(), globe(N)];

  /* ---------- particle buffers ---------- */
  const positions = new Float32Array(N * 3);
  const from = new Float32Array(N * 3);
  const target = new Float32Array(N * 3);
  const disp = new Float32Array(N * 3);
  const delay = new Float32Array(N);
  const scatter = new Float32Array(N * 3);
  const sizes = new Float32Array(N);
  const colors = new Float32Array(N * 3);

  const cCream = new THREE.Color("#F3ECE3");
  const cAqua = new THREE.Color("#7FE6DA");
  const cYellow = new THREE.Color("#F4D03F");
  const cSand = new THREE.Color("#EDC9AF");
  for (let i = 0; i < N; i++) {
    tmpV.randomDirection().multiplyScalar(2.5 + Math.random() * 2.5);
    from.set([tmpV.x, tmpV.y, tmpV.z], i * 3);
    delay[i] = Math.random();
    tmpV.randomDirection();
    scatter.set([tmpV.x, tmpV.y, tmpV.z], i * 3);
    sizes[i] = 1.0 + Math.random() * 1.6 + (Math.random() < 0.04 ? 1.6 : 0); // a few bright "sparks"
    const roll = Math.random();
    const c = roll < 0.62 ? cCream : roll < 0.82 ? cAqua : roll < 0.93 ? cYellow : cSand;
    colors.set([c.r, c.g, c.b], i * 3);
  }
  positions.set(from);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uPixelRatio: { value: dpr }, uScale: { value: 1 } },
    vertexShader: /* glsl */ `
      attribute float aSize;
      attribute vec3 aColor;
      uniform float uPixelRatio;
      uniform float uScale;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vec4 mv = viewMatrix * world;
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * uPixelRatio * uScale * (7.0 / -mv.z);
        vColor = aColor;
        // fade the far side so 3D forms read clearly
        vAlpha = mix(0.12, 1.0, smoothstep(-2.0, 0.6, world.z));
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float core = smoothstep(0.5, 0.0, d);
        float a = (core * core * 0.9 + core * 0.25) * vAlpha;
        gl_FragColor = vec4(vColor, a);
      }
    `,
  });
  group.add(new THREE.Points(geo, mat));

  /* ---------- interaction ---------- */
  const ndc = new THREE.Vector2();
  let pointerInside = false;
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hit = new THREE.Vector3();
  const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

  const onMove = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    pointerInside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
    ndc.set(x * 2 - 1, -(y * 2 - 1));
    tilt.ty = (e.clientX / window.innerWidth - 0.5) * 0.45;
    tilt.tx = (e.clientY / window.innerHeight - 0.5) * 0.25;
  };
  const onLeaveWindow = () => (pointerInside = false);
  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerleave", onLeaveWindow);

  /* ---------- sizing ---------- */
  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const half = 2.5;
    const dist = half / (Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * Math.min(camera.aspect, 1));
    camera.position.set(0, 0, dist);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    mat.uniforms.uScale.value = THREE.MathUtils.clamp(Math.min(w, h) / 560, 0.6, 1.3) * (dist / 7);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  /* ---------- morph state ---------- */
  let current = 0;
  let morphStart = 0;
  let elapsed = 0;
  let formClock = 0; // time since the current form appeared (drives flow + spin)
  const MORPH = 2.2;

  const goTo = (index: number) => {
    const next = ((index % forms.length) + forms.length) % forms.length;
    from.set(positions);
    for (let i = 0; i < from.length; i++) from[i] -= disp[i];
    current = next;
    morphStart = elapsed;
    formClock = 0;
    opts.onShapeChange?.(next);
    if (reducedMotion) start();
  };

  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const euler = new THREE.Euler();
  const rot = new THREE.Matrix4();
  const e = rot.elements;

  const frame = (dt: number) => {
    elapsed += dt;
    formClock += dt;
    if (!reducedMotion && elapsed - morphStart > SHAPE_DURATION) goTo(current + 1);

    const form = forms[current];
    const ft = reducedMotion ? 1.5 : formClock;

    // whole-form orientation: tilt + continuous spin (or sway)
    const sway = Math.sin(ft * 0.6) * 0.45;
    if (form.spinAxis === "z") euler.set(form.tiltX, sway * 0.6, form.tiltZ + ft * form.spin, "YXZ");
    else euler.set(form.tiltX, form.spin ? ft * form.spin : sway, form.tiltZ, "YXZ");
    rot.makeRotationFromEuler(euler);

    // cursor on the z=0 plane in group space
    let px = 99, py = 99;
    if (pointerInside) {
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        group.worldToLocal(hit);
        px = hit.x;
        py = hit.y;
      }
    }

    const since = elapsed - morphStart;
    const R = 0.8;
    for (let i = 0; i < N; i++) {
      const k = i * 3;
      form.at(i, ft, seeds, target, k);
      // rotate target
      const lx = target[k], ly = target[k + 1], lz = target[k + 2];
      const tx = e[0] * lx + e[4] * ly + e[8] * lz;
      const ty = e[1] * lx + e[5] * ly + e[9] * lz;
      const tz = e[2] * lx + e[6] * ly + e[10] * lz;

      const local = reducedMotion ? 1 : THREE.MathUtils.clamp((since - delay[i] * 0.7) / MORPH, 0, 1);
      const m = ease(local);
      const burst = Math.sin(Math.PI * m) * 1.1;

      let x = from[k] + (tx - from[k]) * m + scatter[k] * burst;
      let y = from[k + 1] + (ty - from[k + 1]) * m + scatter[k + 1] * burst;
      let z = from[k + 2] + (tz - from[k + 2]) * m + scatter[k + 2] * burst;

      const dx = x - px;
      const dy = y - py;
      const d = Math.sqrt(dx * dx + dy * dy);
      let ox = 0, oy = 0, oz = 0;
      if (d < R && d > 0.0001) {
        const f = (1 - d / R) ** 2 * 0.65;
        ox = (dx / d) * f;
        oy = (dy / d) * f;
        oz = f * 0.9;
      }
      disp[k] += (ox - disp[k]) * 0.12;
      disp[k + 1] += (oy - disp[k + 1]) * 0.12;
      disp[k + 2] += (oz - disp[k + 2]) * 0.12;

      x += disp[k];
      y += disp[k + 1];
      z += disp[k + 2];
      positions[k] = x;
      positions[k + 1] = y;
      positions[k + 2] = z;
    }
    geo.attributes.position.needsUpdate = true;

    tilt.x += (tilt.tx - tilt.x) * 0.04;
    tilt.y += (tilt.ty - tilt.y) * 0.04;
    group.rotation.x = tilt.x;
    group.rotation.y = tilt.y;

    renderer.render(scene, camera);
  };

  /* ---------- loop ---------- */
  let raf = 0;
  let visible = true;
  let readyFired = false;
  const clock = new THREE.Clock();
  const loop = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    frame(Math.min(clock.getDelta(), 0.05));
    if (!readyFired) {
      readyFired = true;
      opts.onReady?.();
    }
    if (!reducedMotion) raf = requestAnimationFrame(loop);
  };
  function start() {
    if (raf) return;
    clock.getDelta();
    raf = requestAnimationFrame(loop);
  }
  const io = new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible) start();
  });
  io.observe(container);
  const onVis = () => !document.hidden && start();
  document.addEventListener("visibilitychange", onVis);

  opts.onShapeChange?.(0);
  start();

  return {
    goTo,
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeaveWindow);
      document.removeEventListener("visibilitychange", onVis);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}

/* ======================= forms ======================= */

/** "Q" monogram: a glowing ring with a tail; particles stream round the ring. */
function qMonogram(): Form {
  const RING = 1.35;
  return {
    spin: 0,
    tiltX: 0.15,
    tiltZ: 0,
    at(i, t, s, out, k) {
      if (s.a[i] < 0.82) {
        const u = s.b[i] * TAU + t * 0.35;
        const tube = 0.16 * Math.sqrt(s.c[i]);
        const v = s.c[i] * 97.3;
        const r = RING + tube * Math.cos(v);
        out[k] = r * Math.cos(u);
        out[k + 1] = r * Math.sin(u);
        out[k + 2] = tube * Math.sin(v) * 1.4;
      } else {
        // tail: from inside the ring at -45° out past the rim, flowing outward
        const f = (s.b[i] + t * 0.18) % 1;
        const r = 0.7 + f * 1.45;
        const ang = -Math.PI / 4;
        out[k] = Math.cos(ang) * r + s.jx[i] * 0.09;
        out[k + 1] = Math.sin(ang) * r + s.jy[i] * 0.09;
        out[k + 2] = s.jz[i] * 0.12;
      }
    },
  };
}

/** Quantum atom: pulsing nucleus, three tilted electron orbits, racing electrons. */
function quantumAtom(): Form {
  const A = 1.95;
  const B = 0.7;
  return {
    spin: 0.25,
    tiltX: 0.35,
    tiltZ: 0,
    at(i, t, s, out, k) {
      if (s.a[i] < 0.16) {
        const pulse = 1 + Math.sin(t * 3) * 0.08;
        const r = 0.42 * pulse;
        out[k] = s.jx[i] * r;
        out[k + 1] = s.jy[i] * r;
        out[k + 2] = s.jz[i] * r;
        return;
      }
      const orbit = Math.floor(s.c[i] * 3);
      const speed = 0.9 + orbit * 0.25;
      // ~6% of each orbit's particles bunch up into a bright moving "electron"
      const electron = s.b[i] < 0.06;
      const u = electron ? t * speed * 1.6 + orbit * 2.1 + (s.b[i] - 0.03) * 2.2 : s.b[i] * TAU + t * speed * 0.35;
      const j = electron ? 0.05 : 0.035;
      const x0 = A * Math.cos(u) + s.jx[i] * j;
      const y0 = B * Math.sin(u) + s.jy[i] * j;
      const z0 = s.jz[i] * j;
      const ang = (orbit * Math.PI) / 3;
      const ca = Math.cos(ang), sa = Math.sin(ang);
      // rotate the ellipse about Z, then lean it about X so the orbits cross in 3D
      const x1 = x0 * ca - y0 * sa;
      const y1 = x0 * sa + y0 * ca;
      out[k] = x1;
      out[k + 1] = y1 * 0.92 - z0 * 0.38;
      out[k + 2] = y1 * 0.38 + z0 * 0.92;
    },
  };
}

/** (2,3) torus knot: an endless loop of flowing particles. */
function torusKnot(): Form {
  return {
    spin: 0.22,
    spinAxis: "z",
    tiltX: 0.3,
    tiltZ: 0,
    at(i, t, s, out, k) {
      const u = ((s.b[i] + t * 0.05) % 1) * TAU;
      const r = 1.05 + 0.48 * Math.cos(3 * u);
      const tube = 0.17;
      out[k] = (r * Math.cos(2 * u)) * 1.05 + s.jx[i] * tube;
      out[k + 1] = (r * Math.sin(2 * u)) * 1.05 + s.jy[i] * tube;
      out[k + 2] = -Math.sin(3 * u) * 0.55 + s.jz[i] * tube;
    },
  };
}

/** DNA double helix with rungs; strands flow upward. */
function doubleHelix(): Form {
  const H = 3.9;
  const TURNS = 2.1;
  const RAD = 0.9;
  const RUNGS = 16;
  return {
    spin: 0.45,
    tiltX: 0,
    tiltZ: 0.38,
    at(i, t, s, out, k) {
      if (s.a[i] < 0.74) {
        const strand = s.c[i] < 0.5 ? 0 : 1;
        const f = (s.b[i] + t * 0.04) % 1;
        const ang = f * TURNS * TAU + strand * Math.PI;
        out[k] = RAD * Math.cos(ang) + s.jx[i] * 0.07;
        out[k + 1] = (f - 0.5) * H + s.jy[i] * 0.07;
        out[k + 2] = RAD * Math.sin(ang) + s.jz[i] * 0.07;
      } else {
        const rung = Math.floor(s.b[i] * RUNGS);
        const f = (rung + 0.5) / RUNGS;
        const ang = f * TURNS * TAU;
        const along = s.c[i] * 2 - 1;
        out[k] = RAD * Math.cos(ang) * along + s.jx[i] * 0.03;
        out[k + 1] = (f - 0.5) * H + s.jy[i] * 0.03;
        out[k + 2] = RAD * Math.sin(ang) * along + s.jz[i] * 0.03;
      }
    },
  };
}

/** Dotted Earth with an orbiting satellite ring. */
function globe(N: number): Form {
  const R = 1.55;
  const land = landPoints(2.2);
  const base = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    let lat: number, lon: number;
    if (Math.random() < 0.8 && land.length) {
      const p = land[Math.floor(Math.random() * land.length)];
      lat = p.lat + (Math.random() - 0.5) * 2.2;
      lon = p.lon + (Math.random() - 0.5) * 2.2;
    } else {
      lat = Math.asin(Math.random() * 2 - 1) * (180 / Math.PI);
      lon = Math.random() * 360 - 180;
    }
    const la = THREE.MathUtils.degToRad(lat);
    const lo = THREE.MathUtils.degToRad(lon);
    base[i * 3] = R * Math.cos(la) * Math.sin(lo);
    base[i * 3 + 1] = R * Math.sin(la);
    base[i * 3 + 2] = R * Math.cos(la) * Math.cos(lo);
  }
  return {
    spin: 0.32,
    tiltX: 0.25,
    tiltZ: 0,
    at(i, t, s, out, k) {
      if (s.a[i] < 0.12) {
        // satellite ring, tilted, counter-flowing
        const u = s.b[i] * TAU - t * 0.6;
        const rr = 2.15 + s.jx[i] * 0.04;
        const x = rr * Math.cos(u);
        const z = rr * Math.sin(u);
        out[k] = x;
        out[k + 1] = z * 0.42 + s.jy[i] * 0.03;
        out[k + 2] = z * 0.9;
        return;
      }
      out[k] = base[k];
      out[k + 1] = base[k + 1];
      out[k + 2] = base[k + 2];
    },
  };
}
