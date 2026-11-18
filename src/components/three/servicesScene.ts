import * as THREE from "three";
import { HERO_SERVICES, HERO_STACKS, type HeroService } from "./heroServices";

/**
 * Hero 3D scene for a software & staff-augmentation company:
 * a glowing "Qubryon core" with every service orbiting it as a clickable 3D card,
 * an inner ring of tech stacks, data packets flowing core → service, and ambient particles.
 */

const C = {
  yellow: 0xf4d03f,
  olive: 0x8bae3a,
  oliveDark: 0x2c3a14,
  ink: 0x141b08,
};

export interface ServicesSceneOptions {
  reducedMotion?: boolean;
  onReady?: () => void;
  onSelect?: (service: HeroService) => void;
}

export function createServicesScene(container: HTMLElement, opts: ServicesSceneOptions = {}) {
  const { reducedMotion = false } = opts;
  const fontFamily =
    getComputedStyle(document.documentElement).getPropertyValue("--font-geist").trim() || "system-ui, sans-serif";

  /* ---------- renderer / camera ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);
  Object.assign(renderer.domElement.style, { display: "block", width: "100%", height: "100%" });
  container.appendChild(renderer.domElement);
  const maxAniso = renderer.capabilities.getMaxAnisotropy();

  const scene = new THREE.Scene();
  const FOV = 34;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);

  scene.add(new THREE.HemisphereLight(0xfff4e0, 0x1a2309, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(3, 5, 6);
  scene.add(key);
  const coreLight = new THREE.PointLight(C.yellow, 14, 6, 2);
  scene.add(coreLight);

  /* ---------- disposables ---------- */
  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x);

  const root = new THREE.Group();
  scene.add(root);

  /* ---------- core ---------- */
  const coreGroup = new THREE.Group();
  root.add(coreGroup);

  const coreMat = track(new THREE.MeshPhysicalMaterial({
    color: C.oliveDark, metalness: 0.45, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.1,
    emissive: C.yellow, emissiveIntensity: 0.08, flatShading: true,
  }));
  const core = new THREE.Mesh(track(new THREE.IcosahedronGeometry(0.9, 0)), coreMat);
  coreGroup.add(core);

  const shellGeo = track(new THREE.EdgesGeometry(track(new THREE.IcosahedronGeometry(1.22, 1))));
  const shellMat = track(new THREE.LineBasicMaterial({ color: C.yellow, transparent: true, opacity: 0.55 }));
  const shell = new THREE.LineSegments(shellGeo, shellMat);
  coreGroup.add(shell);

  const glowTex = track(makeGlowTexture());
  const glow = new THREE.Sprite(track(new THREE.SpriteMaterial({
    map: glowTex, color: C.yellow, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending,
  })));
  glow.scale.setScalar(4.2);
  coreGroup.add(glow);

  /* ---------- service orbit ---------- */
  const RX = 2.6;
  const RZ = 2.15;
  const orbit = new THREE.Group();
  orbit.rotation.set(0.12, 0, -0.06);
  root.add(orbit);

  const ellipsePts = new THREE.EllipseCurve(0, 0, RX, RZ, 0, Math.PI * 2).getPoints(160).map((p) => new THREE.Vector3(p.x, 0, p.y));
  const orbitLine = new THREE.LineLoop(
    track(new THREE.BufferGeometry().setFromPoints(ellipsePts)),
    track(new THREE.LineBasicMaterial({ color: C.olive, transparent: true, opacity: 0.35 })),
  );
  orbit.add(orbitLine);

  const TILE_W = 2.4;
  const TILE_H = TILE_W * (240 / 640);
  const linkMat = track(new THREE.LineBasicMaterial({ color: C.olive, transparent: true, opacity: 0.28 }));
  const packetGeo = track(new THREE.SphereGeometry(0.045, 12, 12));
  const packetMat = track(new THREE.MeshBasicMaterial({ color: C.yellow }));

  type Tile = {
    service: HeroService;
    sprite: THREE.Sprite;
    link: THREE.Line;
    packet: THREE.Mesh;
    base: number;
    scale: number;
  };
  const tiles: Tile[] = HERO_SERVICES.map((service, i) => {
    const tex = track(makeServiceTexture(service, fontFamily));
    tex.anisotropy = maxAniso;
    const sprite = new THREE.Sprite(track(new THREE.SpriteMaterial({ map: tex, transparent: true, toneMapped: false })));
    sprite.scale.set(TILE_W, TILE_H, 1);
    sprite.userData.serviceId = service.id;
    orbit.add(sprite);

    const linkGeo = track(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]));
    const link = new THREE.Line(linkGeo, linkMat);
    orbit.add(link);

    const packet = new THREE.Mesh(packetGeo, packetMat);
    orbit.add(packet);

    return { service, sprite, link, packet, base: (i / HERO_SERVICES.length) * Math.PI * 2, scale: 1 };
  });

  /* ---------- inner tech-stack ring ---------- */
  const stackRing = new THREE.Group();
  stackRing.rotation.set(-1.15, 0, 0.35);
  root.add(stackRing);
  const SR = 1.55;
  const stackSprites = HERO_STACKS.map((label, i) => {
    const tex = track(makeChipTexture(label, fontFamily));
    tex.anisotropy = maxAniso;
    const s = new THREE.Sprite(track(new THREE.SpriteMaterial({ map: tex, transparent: true, toneMapped: false })));
    s.scale.set(0.9, 0.9 * (96 / 256), 1);
    stackRing.add(s);
    return { s, base: (i / HERO_STACKS.length) * Math.PI * 2 };
  });

  /* ---------- particles ---------- */
  const N = 160;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const yC = new THREE.Color(C.yellow);
  const oC = new THREE.Color(C.olive);
  for (let i = 0; i < N; i++) {
    const r = 1.5 + Math.random() * 3.4;
    const a = Math.random() * Math.PI * 2;
    pos.set([Math.cos(a) * r, (Math.random() - 0.5) * 4, Math.sin(a) * r], i * 3);
    const c = Math.random() > 0.6 ? yC : oC;
    col.set([c.r, c.g, c.b], i * 3);
  }
  const pGeo = track(new THREE.BufferGeometry());
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const dotTex = track(makeGlowTexture());
  const particles = new THREE.Points(pGeo, track(new THREE.PointsMaterial({
    size: 0.06, map: dotTex, vertexColors: true, transparent: true, opacity: 0.8, depthWrite: false,
  })));
  root.add(particles);

  /* ---------- interaction ---------- */
  const pointer = { x: 0, y: 0 };
  const tilt = { x: 0, y: 0 };
  const local = new THREE.Vector2(-10, -10);
  const raycaster = new THREE.Raycaster();
  let hovered: Tile | null = null;
  let scrollSpin = 0;

  const onWindowPointer = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    const r = container.getBoundingClientRect();
    local.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  const onLeave = () => local.set(-10, -10);
  const onClick = () => {
    if (hovered) opts.onSelect?.(hovered.service);
  };
  const onScroll = () => (scrollSpin = Math.min(window.scrollY / window.innerHeight, 1.5));
  window.addEventListener("pointermove", onWindowPointer, { passive: true });
  container.addEventListener("pointerleave", onLeave);
  container.addEventListener("click", onClick);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- sizing: keep the whole orbit in frame at any aspect ---------- */
  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const halfExtent = RX + TILE_W / 2 + 0.15;
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const dist = halfExtent / (tanHalf * Math.min(camera.aspect, 1)) + 0.4;
    // look down on the orbit (~24°) so the cards spread out instead of stacking
    camera.position.set(0, dist * 0.3, dist * 0.95);
    camera.lookAt(0, 0.55, 0);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  /* ---------- loop ---------- */
  let visible = true;
  let raf = 0;
  let ready = false;
  let elapsed = 0;
  let orbitAngle = 0;
  const clock = new THREE.Clock();
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !reducedMotion) start();
  });
  io.observe(container);

  const tmp = new THREE.Vector3();
  const frame = (dt: number) => {
    elapsed += dt;
    const t = elapsed;

    // hover detection
    raycaster.setFromCamera(local, camera);
    const hit = raycaster.intersectObjects(tiles.map((x) => x.sprite), false)[0];
    hovered = hit ? tiles.find((x) => x.sprite === hit.object) ?? null : null;
    container.style.cursor = hovered ? "pointer" : "";

    // orbit slows to a stop while a card is hovered
    orbitAngle += dt * (hovered ? 0.02 : 0.16);

    tilt.x += (pointer.y * 0.12 - tilt.x) * 0.05;
    tilt.y += (pointer.x * 0.25 - tilt.y) * 0.05;
    root.rotation.x = tilt.x;
    root.rotation.y = tilt.y + scrollSpin * 0.6;

    core.rotation.x = t * 0.25;
    core.rotation.y = t * 0.35;
    shell.rotation.y = -t * 0.18;
    shell.rotation.z = t * 0.1;
    const pulse = 1 + Math.sin(t * 2) * 0.04;
    core.scale.setScalar(pulse);
    coreMat.emissiveIntensity = 0.1 + (Math.sin(t * 2) + 1) * 0.08;
    glow.material.opacity = 0.45 + Math.sin(t * 2) * 0.1;

    tiles.forEach((tile, i) => {
      const a = tile.base + orbitAngle;
      // alternate cards above / below the orbit plane so neighbours never overlap
      const lift = (i % 2 === 0 ? 1 : -1) * 0.95 + Math.sin(t * 0.8 + i) * 0.06;
      tile.sprite.position.set(Math.cos(a) * RX, lift, Math.sin(a) * RZ);
      const target = tile === hovered ? 1.14 : 1;
      tile.scale += (target - tile.scale) * 0.15;
      tile.sprite.scale.set(TILE_W * tile.scale, TILE_H * tile.scale, 1);

      const linkPos = tile.link.geometry.attributes.position as THREE.BufferAttribute;
      linkPos.setXYZ(1, tile.sprite.position.x, tile.sprite.position.y, tile.sprite.position.z);
      linkPos.needsUpdate = true;

      const p = (t * 0.45 + i / tiles.length) % 1;
      tmp.copy(tile.sprite.position).multiplyScalar(p);
      tile.packet.position.copy(tmp);
      tile.packet.scale.setScalar(Math.sin(p * Math.PI) * 1.2 + 0.2);
    });

    stackSprites.forEach(({ s, base }) => {
      const a = base - t * 0.28;
      s.position.set(Math.cos(a) * SR, 0, Math.sin(a) * SR);
    });

    const pa = pGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < N; i++) {
      let y = pa.getY(i) + dt * 0.18;
      if (y > 2) y = -2;
      pa.setY(i, y);
    }
    pa.needsUpdate = true;
    particles.rotation.y = t * 0.03;

    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      opts.onReady?.();
    }
  };

  const loop = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    frame(Math.min(clock.getDelta(), 0.05));
    raf = requestAnimationFrame(loop);
  };
  function start() {
    if (raf) return;
    clock.getDelta();
    raf = requestAnimationFrame(loop);
  }
  const onVis = () => {
    if (!document.hidden && !reducedMotion) start();
  };
  document.addEventListener("visibilitychange", onVis);

  // with reduced motion, render on demand so hover/click feedback still works
  const onReducedMove = () => frame(0);
  if (reducedMotion) {
    elapsed = 0.6;
    frame(0);
    container.addEventListener("pointermove", onReducedMove);
  } else {
    start();
  }

  return {
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onWindowPointer);
      window.removeEventListener("scroll", onScroll);
      container.removeEventListener("pointerleave", onLeave);
      container.removeEventListener("click", onClick);
      container.removeEventListener("pointermove", onReducedMove);
      document.removeEventListener("visibilitychange", onVis);
      container.style.cursor = "";
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}

/* ---------- canvas textures ---------- */

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fitFont(ctx: CanvasRenderingContext2D, text: string, weight: number, size: number, family: string, maxW: number) {
  let s = size;
  do {
    ctx.font = `${weight} ${s}px ${family}`;
    s -= 1;
  } while (ctx.measureText(text).width > maxW && s > 18);
}

function makeServiceTexture(svc: HeroService, family: string) {
  const W = 640;
  const H = 240;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;

  // card with soft shadow
  ctx.save();
  ctx.shadowColor = "rgba(20,27,8,0.28)";
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 10;
  roundRect(ctx, 20, 14, W - 40, H - 44, 44);
  ctx.fillStyle = svc.highlight ? "#F4D03F" : "rgba(255,252,248,0.96)";
  ctx.fill();
  ctx.restore();
  roundRect(ctx, 20, 14, W - 40, H - 44, 44);
  ctx.lineWidth = 2;
  ctx.strokeStyle = svc.highlight ? "rgba(20,27,8,0.25)" : "rgba(20,27,8,0.10)";
  ctx.stroke();

  // icon tile
  const box = 116;
  const bx = 50;
  const by = 14 + (H - 44 - box) / 2;
  roundRect(ctx, bx, by, box, box, 30);
  ctx.fillStyle = "#1A2309";
  ctx.fill();
  const s = 2.7;
  ctx.save();
  ctx.translate(bx + (box - 24 * s) / 2, by + (box - 24 * s) / 2);
  ctx.scale(s, s);
  ctx.strokeStyle = "#F4D03F";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke(new Path2D(svc.icon));
  ctx.restore();

  // text
  const tx = bx + box + 30;
  const maxW = W - 40 - tx;
  ctx.fillStyle = "#141B08";
  ctx.textBaseline = "alphabetic";
  fitFont(ctx, svc.title, 700, 40, family, maxW);
  ctx.fillText(svc.title, tx, by + 52);
  ctx.fillStyle = svc.highlight ? "#4A3F0A" : "#4A5634";
  fitFont(ctx, svc.subtitle, 500, 27, family, maxW);
  ctx.fillText(svc.subtitle, tx, by + 96);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeChipTexture(label: string, family: string) {
  const W = 256;
  const H = 96;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  roundRect(ctx, 6, 10, W - 12, H - 20, (H - 20) / 2);
  ctx.fillStyle = "rgba(26,35,9,0.92)";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(244,208,63,0.45)";
  ctx.stroke();
  ctx.fillStyle = "#F3ECE3";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  fitFont(ctx, label, 600, 34, family, W - 50);
  ctx.fillText(label, W / 2, H / 2 + 1);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.45)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}
