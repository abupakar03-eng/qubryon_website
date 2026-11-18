import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/**
 * Real-time 3D hero scene: a stylised IoT device in Qubryon brand colours
 * with orbiting data rings, travelling packets, signal pulses and floating particles.
 * Returns a dispose() that frees every GPU resource and listener.
 */

const COLORS = {
  board: 0x1f2a0c,
  boardEdge: 0x2c3a14,
  chip: 0x10150a,
  gold: 0xd4ac2b,
  yellow: 0xf4d03f,
  olive: 0x8bae3a,
  oliveDark: 0x6b8e23,
};

export interface ChipSceneOptions {
  reducedMotion?: boolean;
  /** Called once the first frame has rendered. */
  onReady?: () => void;
}

export function createChipScene(container: HTMLElement, opts: ChipSceneOptions = {}) {
  const { reducedMotion = false } = opts;

  /* ---------- renderer / camera ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 4.6, 8.6);
  camera.lookAt(0, 0.1, 0);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;

  /* ---------- lights ---------- */
  scene.add(new THREE.HemisphereLight(0xfff4e0, 0x1a2309, 0.6));
  const key = new THREE.DirectionalLight(0xfff1d6, 1.6);
  key.position.set(4, 7, 5);
  scene.add(key);
  const rim = new THREE.PointLight(COLORS.yellow, 18, 12, 2);
  rim.position.set(-3.5, 2, -3);
  scene.add(rim);
  const coreLight = new THREE.PointLight(COLORS.yellow, 6, 4, 2);
  coreLight.position.set(0, 0.7, 0);
  scene.add(coreLight);

  /* ---------- disposable tracking ---------- */
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [envTexture];
  const g = <T extends THREE.BufferGeometry>(geo: T) => (geometries.push(geo), geo);
  const m = <T extends THREE.Material>(mat: T) => (materials.push(mat), mat);

  /* ---------- materials ---------- */
  const boardMat = m(new THREE.MeshPhysicalMaterial({ color: COLORS.board, roughness: 0.5, metalness: 0.25, clearcoat: 0.7, clearcoatRoughness: 0.35 }));
  const goldMat = m(new THREE.MeshStandardMaterial({ color: COLORS.gold, roughness: 0.28, metalness: 1 }));
  const chipMat = m(new THREE.MeshPhysicalMaterial({ color: COLORS.chip, roughness: 0.32, metalness: 0.55, clearcoat: 1, clearcoatRoughness: 0.15 }));
  const coreMat = m(new THREE.MeshStandardMaterial({ color: COLORS.yellow, emissive: COLORS.yellow, emissiveIntensity: 2.2, roughness: 0.3 }));
  const componentMat = m(new THREE.MeshStandardMaterial({ color: 0x2a2f22, roughness: 0.6, metalness: 0.3 }));
  const capMat = m(new THREE.MeshStandardMaterial({ color: 0xb9bdb0, roughness: 0.25, metalness: 0.9 }));
  const ledMat = m(new THREE.MeshStandardMaterial({ color: COLORS.olive, emissive: COLORS.olive, emissiveIntensity: 2.5 }));

  /* ---------- the device ---------- */
  const device = new THREE.Group();
  scene.add(device);

  const BOARD = 3.4;
  const board = new THREE.Mesh(g(new RoundedBoxGeometry(BOARD, 0.16, BOARD, 4, 0.12)), boardMat);
  device.add(board);
  const boardTop = 0.08;

  // gold traces: L-shaped routes from the chip to the board edge on every side
  const traceGeoH = g(new THREE.BoxGeometry(1, 0.012, 0.035));
  const addTrace = (x1: number, z1: number, x2: number, z2: number) => {
    const len = Math.hypot(x2 - x1, z2 - z1);
    if (len < 0.01) return;
    const t = new THREE.Mesh(traceGeoH, goldMat);
    t.scale.x = len;
    t.position.set((x1 + x2) / 2, boardTop + 0.006, (z1 + z2) / 2);
    t.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
    device.add(t);
  };
  const viaGeo = g(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 12));
  const addVia = (x: number, z: number) => {
    const v = new THREE.Mesh(viaGeo, goldMat);
    v.position.set(x, boardTop + 0.01, z);
    device.add(v);
  };

  const CHIP = 1.3;
  const half = CHIP / 2 + 0.12;
  const edge = BOARD / 2 - 0.22;
  for (let side = 0; side < 4; side++) {
    for (let i = 0; i < 6; i++) {
      const offset = -0.5 + i * 0.2;
      const bend = 0.25 + ((i * 37) % 5) * 0.12;
      // build on +x side then rotate coordinates
      const pts: [number, number][] = [
        [half, offset],
        [half + bend, offset],
        [half + bend + 0.25, offset * 1.9],
        [edge, offset * 1.9],
      ];
      const rot = (p: [number, number]): [number, number] => {
        const [x, z] = p;
        switch (side) {
          case 0: return [x, z];
          case 1: return [-z, x];
          case 2: return [-x, -z];
          default: return [z, -x];
        }
      };
      const r = pts.map(rot);
      for (let k = 0; k < r.length - 1; k++) addTrace(r[k][0], r[k][1], r[k + 1][0], r[k + 1][1]);
      addVia(r[3][0], r[3][1]);
    }
  }

  // edge connector pins
  const pinGeo = g(new THREE.BoxGeometry(0.08, 0.05, 0.22));
  for (let side = 0; side < 4; side++) {
    for (let i = 0; i < 12; i++) {
      const p = new THREE.Mesh(pinGeo, goldMat);
      const along = -1.32 + i * 0.24;
      const out = BOARD / 2 + 0.06;
      if (side === 0) p.position.set(along, 0, out);
      if (side === 1) p.position.set(along, 0, -out);
      if (side === 2) { p.position.set(out, 0, along); p.rotation.y = Math.PI / 2; }
      if (side === 3) { p.position.set(-out, 0, along); p.rotation.y = Math.PI / 2; }
      device.add(p);
    }
  }

  // central processor
  const chip = new THREE.Mesh(g(new RoundedBoxGeometry(CHIP, 0.24, CHIP, 4, 0.06)), chipMat);
  chip.position.y = boardTop + 0.12;
  device.add(chip);

  // chip legs
  const legGeo = g(new THREE.BoxGeometry(0.05, 0.04, 0.16));
  for (let side = 0; side < 4; side++) {
    for (let i = 0; i < 9; i++) {
      const leg = new THREE.Mesh(legGeo, goldMat);
      const along = -0.52 + i * 0.13;
      const out = CHIP / 2 + 0.06;
      const y = boardTop + 0.03;
      if (side === 0) leg.position.set(along, y, out);
      if (side === 1) leg.position.set(along, y, -out);
      if (side === 2) { leg.position.set(out, y, along); leg.rotation.y = Math.PI / 2; }
      if (side === 3) { leg.position.set(-out, y, along); leg.rotation.y = Math.PI / 2; }
      device.add(leg);
    }
  }

  // glowing core with a hex heat-spreader pattern
  const core = new THREE.Mesh(g(new RoundedBoxGeometry(0.62, 0.05, 0.62, 2, 0.03)), coreMat);
  core.position.y = chip.position.y + 0.13;
  device.add(core);

  const hexGeo = g(new THREE.CylinderGeometry(0.075, 0.075, 0.03, 6));
  for (let row = -2; row <= 2; row++) {
    for (let col = -2; col <= 2; col++) {
      if (Math.abs(row) <= 1 && Math.abs(col) <= 1) continue;
      const h = new THREE.Mesh(hexGeo, chipMat);
      h.position.set(col * 0.19 + (row % 2 ? 0.095 : 0), chip.position.y + 0.135, row * 0.165);
      if (Math.abs(h.position.x) < 0.58 && Math.abs(h.position.z) < 0.58) device.add(h);
    }
  }

  // corner components: capacitors, SMD parts, status LEDs, antenna
  const capGeo = g(new THREE.CylinderGeometry(0.14, 0.14, 0.32, 20));
  const smdGeo = g(new THREE.BoxGeometry(0.28, 0.08, 0.16));
  const ledGeo = g(new THREE.BoxGeometry(0.1, 0.05, 0.07));
  const corners: [number, number][] = [[1.25, 1.25], [-1.25, 1.25], [1.25, -1.25], [-1.25, -1.25]];
  corners.forEach(([x, z], idx) => {
    if (idx === 3) return; // antenna corner
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(x, boardTop + 0.16, z);
    device.add(cap);
    const smd = new THREE.Mesh(smdGeo, componentMat);
    smd.position.set(x - Math.sign(x) * 0.42, boardTop + 0.04, z);
    device.add(smd);
  });
  const leds: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const led = new THREE.Mesh(ledGeo, i === 1 ? coreMat : ledMat);
    led.position.set(-0.3 + i * 0.3, boardTop + 0.03, 1.38);
    device.add(led);
    leds.push(led);
  }
  const antennaBase = new THREE.Mesh(g(new THREE.CylinderGeometry(0.16, 0.2, 0.14, 20)), componentMat);
  antennaBase.position.set(-1.25, boardTop + 0.07, -1.25);
  device.add(antennaBase);
  const antenna = new THREE.Mesh(g(new THREE.CylinderGeometry(0.03, 0.03, 1.1, 10)), capMat);
  antenna.position.set(-1.25, boardTop + 0.68, -1.25);
  device.add(antenna);
  const antennaTip = new THREE.Mesh(g(new THREE.SphereGeometry(0.075, 16, 16)), coreMat);
  antennaTip.position.set(-1.25, boardTop + 1.25, -1.25);
  device.add(antennaTip);

  /* ---------- orbiting data rings with packets ---------- */
  const rings = new THREE.Group();
  device.add(rings);
  const ringSpecs = [
    { radius: 2.55, tiltX: 0.2, tiltZ: 0.1, color: COLORS.olive, speed: 0.35, packets: 3 },
    { radius: 2.95, tiltX: -0.35, tiltZ: 0.25, color: COLORS.yellow, speed: -0.25, packets: 2 },
    { radius: 3.35, tiltX: 0.5, tiltZ: -0.3, color: COLORS.oliveDark, speed: 0.18, packets: 2 },
  ];
  const packetGeo = g(new THREE.SphereGeometry(0.06, 14, 14));
  const ringPivots: { pivot: THREE.Group; speed: number }[] = [];
  ringSpecs.forEach((s) => {
    const pivot = new THREE.Group();
    pivot.rotation.set(Math.PI / 2 + s.tiltX, 0, s.tiltZ);
    pivot.position.y = 0.35;
    const ringMat = m(new THREE.MeshBasicMaterial({ color: s.color, transparent: true, opacity: 0.45 }));
    const ring = new THREE.Mesh(g(new THREE.TorusGeometry(s.radius, 0.008, 8, 160)), ringMat);
    pivot.add(ring);
    const packetMat = m(new THREE.MeshBasicMaterial({ color: s.color === COLORS.oliveDark ? COLORS.olive : s.color }));
    for (let i = 0; i < s.packets; i++) {
      const p = new THREE.Mesh(packetGeo, packetMat);
      const a = (i / s.packets) * Math.PI * 2;
      p.position.set(Math.cos(a) * s.radius, Math.sin(a) * s.radius, 0);
      pivot.add(p);
    }
    rings.add(pivot);
    ringPivots.push({ pivot, speed: s.speed });
  });

  /* ---------- signal pulses expanding from the core ---------- */
  const pulseGeo = g(new THREE.RingGeometry(0.98, 1, 96));
  const pulses: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; offset: number }[] = [];
  for (let i = 0; i < 3; i++) {
    const mat = m(new THREE.MeshBasicMaterial({ color: COLORS.yellow, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }));
    const mesh = new THREE.Mesh(pulseGeo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = boardTop + 0.02;
    device.add(mesh);
    pulses.push({ mesh, mat, offset: i / 3 });
  }

  /* ---------- floating particles ---------- */
  const PARTICLES = 220;
  const positions = new Float32Array(PARTICLES * 3);
  const colors = new Float32Array(PARTICLES * 3);
  const speeds = new Float32Array(PARTICLES);
  const cY = new THREE.Color(COLORS.yellow);
  const cO = new THREE.Color(COLORS.olive);
  for (let i = 0; i < PARTICLES; i++) {
    const r = 1.8 + Math.random() * 3.2;
    const a = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = -1 + Math.random() * 4;
    positions[i * 3 + 2] = Math.sin(a) * r;
    const c = Math.random() > 0.65 ? cY : cO;
    colors.set([c.r, c.g, c.b], i * 3);
    speeds[i] = 0.12 + Math.random() * 0.3;
  }
  const particleGeo = g(new THREE.BufferGeometry());
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const dotTexture = makeDotTexture();
  textures.push(dotTexture);
  const particleMat = m(new THREE.PointsMaterial({ size: 0.07, map: dotTexture, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false, sizeAttenuation: true }));
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  /* ---------- soft contact shadow ---------- */
  const shadowTexture = makeShadowTexture();
  textures.push(shadowTexture);
  const shadow = new THREE.Mesh(g(new THREE.PlaneGeometry(6.5, 6.5)), m(new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false })));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.9;
  scene.add(shadow);

  device.rotation.set(0.08, -0.6, 0);

  /* ---------- interaction ---------- */
  const pointer = { x: 0, y: 0 };
  const tilt = { x: 0, y: 0 };
  let scrollSpin = 0;

  const onPointerMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onScroll = () => {
    scrollSpin = Math.min(window.scrollY / window.innerHeight, 1.5);
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- sizing ---------- */
  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // pull the camera back on narrow/tall containers so the device always fits
    const fit = w / h < 1 ? 1 + (1 - w / h) * 0.9 : 1;
    camera.position.set(0, 4.6 * fit, 8.6 * fit);
    camera.lookAt(0, 0.1, 0);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  /* ---------- loop (paused when off-screen or tab hidden) ---------- */
  let visible = true;
  let raf = 0;
  let readyFired = false;
  const clock = new THREE.Clock();
  let elapsed = 0;

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !reducedMotion) start();
  });
  io.observe(container);

  const renderFrame = (dt: number) => {
    elapsed += dt;
    const t = elapsed;

    // idle spin + scroll-driven turn + pointer tilt
    tilt.x += (pointer.y * 0.18 - tilt.x) * 0.05;
    tilt.y += (pointer.x * 0.35 - tilt.y) * 0.05;
    device.rotation.y = -0.6 + t * 0.12 + scrollSpin * Math.PI * 0.6 + tilt.y;
    device.rotation.x = 0.08 + tilt.x;
    device.position.y = Math.sin(t * 0.9) * 0.08;

    ringPivots.forEach(({ pivot, speed }) => (pivot.rotation.z += speed * dt));

    const glow = 1.8 + Math.sin(t * 2.2) * 0.6;
    coreMat.emissiveIntensity = glow;
    coreLight.intensity = 4 + glow * 1.5;
    leds.forEach((led, i) => led.scale.setScalar(0.85 + Math.max(0, Math.sin(t * 3 + i * 1.7)) * 0.3));

    pulses.forEach((p) => {
      const phase = (t * 0.35 + p.offset) % 1;
      const s = 0.6 + phase * 2.2;
      p.mesh.scale.set(s, s, 1);
      p.mat.opacity = (1 - phase) * 0.55;
    });

    const pos = particleGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < PARTICLES; i++) {
      let y = pos.getY(i) + speeds[i] * dt;
      if (y > 3) y = -1;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    particles.rotation.y = t * 0.03;

    renderer.render(scene, camera);
    if (!readyFired) {
      readyFired = true;
      opts.onReady?.();
    }
  };

  const loop = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    renderFrame(Math.min(clock.getDelta(), 0.05));
    raf = requestAnimationFrame(loop);
  };
  function start() {
    if (raf) return;
    clock.getDelta();
    raf = requestAnimationFrame(loop);
  }
  const onVisibility = () => {
    if (!document.hidden && !reducedMotion) start();
  };
  document.addEventListener("visibilitychange", onVisibility);

  if (reducedMotion) {
    elapsed = 1.2;
    renderFrame(0);
  } else {
    start();
  }

  /* ---------- cleanup ---------- */
  return {
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      geometries.forEach((x) => x.dispose());
      materials.forEach((x) => x.dispose());
      textures.forEach((x) => x.dispose());
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}

function makeDotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.6)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeShadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(20,27,8,0.38)");
  grad.addColorStop(0.55, "rgba(20,27,8,0.12)");
  grad.addColorStop(1, "rgba(20,27,8,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}
