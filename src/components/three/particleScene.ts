import * as THREE from "three";
import { landPoints } from "../geo/land";

/**
 * Point-cloud hero: thousands of particles that morph between one shape per service
 * (code, AI network, cloud, team, globe), drift gently, and scatter away from the cursor.
 */

export interface ParticleShapeDef {
  id: string;
  label: string;
  href: string;
}

export const PARTICLE_SHAPES: ParticleShapeDef[] = [
  { id: "code", label: "Custom Software", href: "#service-software" },
  { id: "ai", label: "AI & Machine Learning", href: "#service-ai" },
  { id: "cloud", label: "Cloud & DevOps", href: "#service-cloud" },
  { id: "team", label: "IT Staff Augmentation", href: "#service-staffing" },
  { id: "globe", label: "Global Delivery", href: "#global" },
];

export const SHAPE_DURATION = 5.5; // seconds each shape is shown

interface Options {
  reducedMotion?: boolean;
  onReady?: () => void;
  onShapeChange?: (index: number) => void;
}

const SIZE = 3.9; // world units a 2D glyph spans
const GLOBE_R = 1.75;

export function createParticleScene(container: HTMLElement, opts: Options = {}) {
  const { reducedMotion = false } = opts;
  const narrow = container.clientWidth < 520;
  const N = narrow ? 3800 : 7200;

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

  /* ---------- shape targets ---------- */
  const fontMono =
    getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() || "ui-monospace, monospace";
  const shapes: { pos: Float32Array; spin: boolean }[] = [
    { pos: sampleGlyph(N, (ctx, S) => drawCode(ctx, S, fontMono)), spin: false },
    { pos: sampleGlyph(N, drawNeuralNet), spin: false },
    { pos: sampleGlyph(N, drawCloud), spin: false },
    { pos: sampleGlyph(N, drawTeam), spin: false },
    { pos: sampleGlobe(N), spin: true },
  ];

  /* ---------- particle buffers ---------- */
  const positions = new Float32Array(N * 3);
  const from = new Float32Array(N * 3);
  const disp = new Float32Array(N * 3);
  const delay = new Float32Array(N);
  const phase = new Float32Array(N);
  const scatter = new Float32Array(N * 3);
  const sizes = new Float32Array(N);
  const colors = new Float32Array(N * 3);

  const cWarm = new THREE.Color("#EDE6DA");
  const cYellow = new THREE.Color("#F4D03F");
  const cOlive = new THREE.Color("#B5CF6B");
  for (let i = 0; i < N; i++) {
    // start as a loose cloud so the first shape "assembles" on load
    const r = 2.5 + Math.random() * 2.5;
    const a = Math.random() * Math.PI * 2;
    const b = Math.acos(Math.random() * 2 - 1);
    from[i * 3] = Math.sin(b) * Math.cos(a) * r;
    from[i * 3 + 1] = Math.sin(b) * Math.sin(a) * r;
    from[i * 3 + 2] = Math.cos(b) * r;

    delay[i] = Math.random();
    phase[i] = Math.random() * Math.PI * 2;
    const v = new THREE.Vector3().randomDirection();
    scatter.set([v.x, v.y, v.z], i * 3);
    sizes[i] = 1.4 + Math.random() * 1.9;
    const roll = Math.random();
    const c = roll < 0.1 ? cYellow : roll < 0.16 ? cOlive : cWarm;
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
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * uPixelRatio * uScale * (7.0 / -mv.z);
        vColor = aColor;
        // flat shapes stay bright; the far side of 3D shapes (globe) fades away
        vAlpha = mix(0.1, 1.0, smoothstep(-1.7, -0.15, position.z));
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.1, d) * vAlpha * 0.85;
        gl_FragColor = vec4(vColor, a);
      }
    `,
  });
  const points = new THREE.Points(geo, mat);
  group.add(points);

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
    tilt.ty = (e.clientX / window.innerWidth - 0.5) * 0.5;
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
    const half = 2.35;
    const dist = half / (Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * Math.min(camera.aspect, 1));
    camera.position.set(0, 0, dist);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    // keep dot size consistent relative to the canvas
    mat.uniforms.uScale.value = THREE.MathUtils.clamp(Math.min(w, h) / 560, 0.6, 1.3) * (dist / 7);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  /* ---------- morph state ---------- */
  let current = 0;
  let morphStart = 0;
  let elapsed = 0;
  let spinAngle = 0;
  const MORPH = 2.0;

  const goTo = (index: number) => {
    const next = ((index % shapes.length) + shapes.length) % shapes.length;
    from.set(positions);
    // remove the cursor push from the snapshot so it doesn't get baked in
    for (let i = 0; i < from.length; i++) from[i] -= disp[i];
    current = next;
    morphStart = elapsed;
    if (shapes[next].spin) spinAngle = 0;
    opts.onShapeChange?.(next);
    if (reducedMotion) start();
  };

  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const frame = (dt: number) => {
    elapsed += dt;
    const t = elapsed;

    if (!reducedMotion && t - morphStart > SHAPE_DURATION) goTo(current + 1);

    const shape = shapes[current];
    if (shape.spin) spinAngle += dt * 0.35;
    const cs = Math.cos(spinAngle);
    const sn = Math.sin(spinAngle);

    // cursor position on the z=0 plane, in group space
    let px = 99, py = 99;
    if (pointerInside) {
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        group.worldToLocal(hit);
        px = hit.x;
        py = hit.y;
      }
    }

    const since = t - morphStart;
    const target = shape.pos;
    const R = 0.85;
    for (let i = 0; i < N; i++) {
      const k = i * 3;
      const local = reducedMotion ? 1 : THREE.MathUtils.clamp((since - delay[i] * 0.6) / MORPH, 0, 1);
      const e = ease(local);

      let tx = target[k];
      const ty = target[k + 1];
      let tz = target[k + 2];
      if (shape.spin) {
        const rx = tx * cs - tz * sn;
        tz = tx * sn + tz * cs;
        tx = rx;
      }

      const burst = Math.sin(Math.PI * e) * 0.9;
      const breathe = Math.sin(t * 1.2 + phase[i]) * 0.012;

      let x = from[k] + (tx - from[k]) * e + scatter[k] * burst + breathe;
      let y = from[k + 1] + (ty - from[k + 1]) * e + scatter[k + 1] * burst + breathe;
      let z = from[k + 2] + (tz - from[k + 2]) * e + scatter[k + 2] * burst;

      // cursor repulsion (smoothed)
      const dx = x - px;
      const dy = y - py;
      const d = Math.sqrt(dx * dx + dy * dy);
      let ox = 0, oy = 0, oz = 0;
      if (d < R && d > 0.0001) {
        const f = (1 - d / R) ** 2 * 0.6;
        ox = (dx / d) * f;
        oy = (dy / d) * f;
        oz = f * 0.8;
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
    group.rotation.y = tilt.y + Math.sin(t * 0.35) * 0.18;

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
    // reduced motion: render only on demand (load / shape change), no continuous animation
    if (!reducedMotion) raf = requestAnimationFrame(loop);
  };
  const start = () => {
    if (raf) return;
    clock.getDelta();
    raf = requestAnimationFrame(loop);
  };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) start();
  });
  io.observe(container);
  const onVis = () => !document.hidden && start();
  document.addEventListener("visibilitychange", onVis);

  opts.onShapeChange?.(0);
  start();

  return {
    /** Jump to a shape (e.g. from the caption dots). */
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

/* ======================= shape generators ======================= */

type Draw = (ctx: CanvasRenderingContext2D, S: number) => void;

/** Rasterise a 2D drawing and scatter N particles over its filled pixels, with slight depth. */
function sampleGlyph(N: number, draw: Draw) {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  draw(ctx, S);
  const data = ctx.getImageData(0, 0, S, S).data;
  const filled: number[] = [];
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      if (data[(y * S + x) * 4 + 3] > 128) filled.push(x, y);
    }
  }
  const out = new Float32Array(N * 3);
  const count = filled.length / 2 || 1;
  for (let i = 0; i < N; i++) {
    const j = Math.floor(Math.random() * count) * 2;
    const x = (filled[j] ?? S / 2) + Math.random();
    const y = (filled[j + 1] ?? S / 2) + Math.random();
    out[i * 3] = (x / S - 0.5) * SIZE;
    out[i * 3 + 1] = -(y / S - 0.5) * SIZE;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.45;
  }
  return out;
}

function drawCode(ctx: CanvasRenderingContext2D, S: number, font: string) {
  ctx.font = `700 ${S * 0.42}px ${font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("</>", S / 2, S / 2 + 4);
}

function drawNeuralNet(ctx: CanvasRenderingContext2D, S: number) {
  const layers = [3, 5, 5, 2];
  const xs = layers.map((_, i) => S * (0.14 + (i * 0.72) / (layers.length - 1)));
  const nodes = layers.map((n, li) =>
    Array.from({ length: n }, (_, j) => ({ x: xs[li], y: S * (0.5 + (j - (n - 1) / 2) * 0.17) })),
  );
  ctx.lineWidth = 3;
  for (let l = 0; l < nodes.length - 1; l++) {
    for (const a of nodes[l]) {
      for (const b of nodes[l + 1]) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  for (const layer of nodes) {
    for (const n of layer) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, S * 0.042, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawIcon(ctx: CanvasRenderingContext2D, S: number, path: string, mode: "fill" | "stroke", width = 2.4, scale = 0.86) {
  const s = (S * scale) / 24;
  ctx.save();
  ctx.translate((S - 24 * s) / 2, (S - 24 * s) / 2);
  ctx.scale(s, s);
  const p = new Path2D(path);
  if (mode === "fill") ctx.fill(p);
  else {
    ctx.lineWidth = width;
    ctx.stroke(p);
  }
  ctx.restore();
}

function drawCloud(ctx: CanvasRenderingContext2D, S: number) {
  drawIcon(ctx, S, "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z", "fill");
}

function drawTeam(ctx: CanvasRenderingContext2D, S: number) {
  // three people: two behind, one in front; a cut-out gap keeps silhouettes separate
  type Person = { cx: number; headY: number; r: number; baseY: number; rx: number; ry: number };
  const side: Person[] = [
    { cx: 4.6, headY: 9.6, r: 2.4, baseY: 19, rx: 4.1, ry: 5 },
    { cx: 19.4, headY: 9.6, r: 2.4, baseY: 19, rx: 4.1, ry: 5 },
  ];
  const front: Person = { cx: 12, headY: 8.6, r: 3.2, baseY: 21, rx: 5.8, ry: 6.6 };
  const figure = (p: Person) => {
    const path = new Path2D();
    path.arc(p.cx, p.headY, p.r, 0, Math.PI * 2);
    path.moveTo(p.cx + p.rx, p.baseY);
    path.ellipse(p.cx, p.baseY, p.rx, p.ry, 0, 0, Math.PI, true);
    path.closePath();
    return path;
  };
  const s = (S * 0.92) / 24;
  ctx.save();
  ctx.translate((S - 24 * s) / 2, (S - 24 * s) / 2 - S * 0.03);
  ctx.scale(s, s);
  side.forEach((p) => ctx.fill(figure(p)));
  ctx.globalCompositeOperation = "destination-out";
  ctx.lineWidth = 1.8;
  const f = figure(front);
  ctx.stroke(f);
  ctx.fill(f);
  ctx.globalCompositeOperation = "source-over";
  ctx.fill(f);
  ctx.restore();
}

/** A dotted Earth: dense land, faint ocean shell. */
function sampleGlobe(N: number) {
  const land = landPoints(2.2);
  const out = new Float32Array(N * 3);
  const toXYZ = (lat: number, lon: number, r: number, k: number) => {
    const la = THREE.MathUtils.degToRad(lat);
    const lo = THREE.MathUtils.degToRad(lon);
    out[k] = r * Math.cos(la) * Math.sin(lo);
    out[k + 1] = r * Math.sin(la);
    out[k + 2] = r * Math.cos(la) * Math.cos(lo);
  };
  for (let i = 0; i < N; i++) {
    if (i < N * 0.84 && land.length) {
      const p = land[Math.floor(Math.random() * land.length)];
      toXYZ(p.lat + (Math.random() - 0.5) * 2.2, p.lon + (Math.random() - 0.5) * 2.2, GLOBE_R, i * 3);
    } else {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(GLOBE_R * (0.98 + Math.random() * 0.04));
      out.set([v.x, v.y, v.z], i * 3);
    }
  }
  return out;
}
