import * as THREE from "three";

/**
 * A round "gallery room": panels hang on the inside of a curved wall, each under an
 * arched light niche with a name tag below. The camera walks around the ring as the
 * position changes (driven by page scroll / drag / arrows from the React wrapper).
 */

export interface GalleryArtwork {
  /** Paint the artwork onto a canvas of the given size. */
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
  /** width / height */
  aspect: number;
  tagTitle: string;
  tagSub: string;
}

interface Options {
  onSelect?: (index: number) => void;
  onReady?: () => void;
  fontFamily?: string;
}

const R = 7.5; // wall radius
const STEP = 0.62; // radians between panels
const EYE = 1.7;
const PANEL_H = 2.35;
const PANEL_Y = 1.95;

export function createGalleryScene(container: HTMLElement, items: GalleryArtwork[], opts: Options = {}) {
  const family = opts.fontFamily || "system-ui, sans-serif";
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  Object.assign(renderer.domElement.style, { display: "block", width: "100%", height: "100%" });
  container.appendChild(renderer.domElement);
  const aniso = renderer.capabilities.getMaxAnisotropy();

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf3eee6, 10, 22);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);

  const disposables: { dispose: () => void }[] = [];
  const keep = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x);

  /* ---------- room ---------- */
  const wallTex = keep(gradientTexture(["#F1ECE4", "#E6DFD4", "#DCD4C7"]));
  const wall = new THREE.Mesh(
    keep(new THREE.CylinderGeometry(R, R, 7, 160, 1, true)),
    keep(new THREE.MeshBasicMaterial({ map: wallTex, side: THREE.BackSide })),
  );
  wall.position.y = 3.5;
  scene.add(wall);

  const floorTex = keep(radialTexture("#EDE7DE", "#CFC7BA"));
  const floor = new THREE.Mesh(keep(new THREE.CircleGeometry(R, 120)), keep(new THREE.MeshBasicMaterial({ map: floorTex })));
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // skirting line where wall meets floor
  const skirt = new THREE.Mesh(
    keep(new THREE.CylinderGeometry(R - 0.01, R - 0.01, 0.06, 160, 1, true)),
    keep(new THREE.MeshBasicMaterial({ color: 0xcac1b3, side: THREE.BackSide })),
  );
  skirt.position.y = 0.03;
  scene.add(skirt);

  /* ---------- artworks ---------- */
  const archTex = keep(archTexture());
  const shadowTex = keep(shadowTexture());
  const archMat = keep(new THREE.MeshBasicMaterial({ map: archTex, transparent: true, depthWrite: false }));
  const shadowMat = keep(new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));

  type Panel = { mesh: THREE.Mesh; group: THREE.Group; scale: number };
  const panels: Panel[] = items.map((item, i) => {
    const g = new THREE.Group();
    const a = i * STEP;
    g.position.set(Math.sin(a) * R, 0, -Math.cos(a) * R);
    g.lookAt(0, 0, 0);
    scene.add(g);

    const w = PANEL_H * item.aspect;

    // draw order is explicit: niche light → wall shadow → artwork → name tag
    const arch = new THREE.Mesh(keep(new THREE.PlaneGeometry(w + 1.6, 4.9)), archMat);
    arch.position.set(0, 2.45, 0.42);
    arch.renderOrder = 1;
    g.add(arch);

    const shadow = new THREE.Mesh(keep(new THREE.PlaneGeometry(w + 0.5, PANEL_H + 0.5)), shadowMat);
    shadow.position.set(0.06, PANEL_Y - 0.1, 0.46);
    shadow.renderOrder = 2;
    g.add(shadow);

    const tex = keep(paintTexture(item.draw, item.aspect));
    tex.anisotropy = aniso;
    const mesh = new THREE.Mesh(
      keep(new THREE.PlaneGeometry(w, PANEL_H)),
      keep(new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })),
    );
    mesh.position.set(0, PANEL_Y, 0.52);
    mesh.userData.index = i;
    mesh.renderOrder = 3;
    g.add(mesh);

    const tagTex = keep(tagTexture(item.tagTitle, item.tagSub, family));
    tagTex.anisotropy = aniso;
    const tag = new THREE.Mesh(
      keep(new THREE.PlaneGeometry(1.5, 0.375)),
      keep(new THREE.MeshBasicMaterial({ map: tagTex, transparent: true, toneMapped: false })),
    );
    tag.position.set(-w / 2 + 0.75, PANEL_Y - PANEL_H / 2 - 0.36, 0.5);
    tag.renderOrder = 4;
    g.add(tag);

    return { mesh, group: g, scale: 1 };
  });

  /* ---------- camera walk ---------- */
  let target = 0;
  let pos = 0;
  const setPosition = (p: number) => {
    target = THREE.MathUtils.clamp(p, 0, Math.max(items.length - 1, 0));
  };

  const placeCamera = () => {
    const a = pos * STEP;
    const back = camera.aspect < 1 ? 0.6 : 1.4;
    camera.position.set(-Math.sin(a) * back, EYE, Math.cos(a) * back);
    // aim a little low so the artwork sits in the upper part of the frame, clear of the caption
    camera.lookAt(Math.sin(a) * R, PANEL_Y - 0.55, -Math.cos(a) * R);
  };

  /* ---------- hover / click ---------- */
  const ndc = new THREE.Vector2(-10, -10);
  const raycaster = new THREE.Raycaster();
  let hovered = -1;
  let downX = 0;
  let downY = 0;
  const onMove = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  const onLeave = () => ndc.set(-10, -10);
  const onDown = (e: PointerEvent) => {
    downX = e.clientX;
    downY = e.clientY;
  };
  const onClick = (e: MouseEvent) => {
    if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6) return; // it was a drag
    if (hovered >= 0) opts.onSelect?.(hovered);
  };
  container.addEventListener("pointermove", onMove);
  container.addEventListener("pointerleave", onLeave);
  container.addEventListener("pointerdown", onDown);
  container.addEventListener("click", onClick);

  /* ---------- sizing ---------- */
  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 1 ? 62 : 42;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  /* ---------- loop ---------- */
  let raf = 0;
  let visible = true;
  let ready = false;
  const frame = () => {
    pos += (target - pos) * 0.09;
    if (Math.abs(target - pos) < 0.0005) pos = target;
    placeCamera();

    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(panels.map((p) => p.mesh), false)[0];
    hovered = hit ? (hit.object.userData.index as number) : -1;
    container.style.cursor = hovered >= 0 ? "pointer" : "";
    panels.forEach((p, i) => {
      const s = i === hovered ? 1.035 : 1;
      p.scale += (s - p.scale) * 0.15;
      p.mesh.scale.setScalar(p.scale);
    });

    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      opts.onReady?.();
    }
  };
  const loop = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    frame();
    raf = requestAnimationFrame(loop);
  };
  const start = () => {
    if (!raf) raf = requestAnimationFrame(loop);
  };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) start();
  });
  io.observe(container);
  const onVis = () => !document.hidden && start();
  document.addEventListener("visibilitychange", onVis);
  start();

  return {
    setPosition,
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      container.removeEventListener("pointerdown", onDown);
      container.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVis);
      container.style.cursor = "";
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}

/* ======================= textures ======================= */

function canvasTex(w: number, h: number, paint: (ctx: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  paint(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function gradientTexture(stops: string[]) {
  return canvasTex(8, 256, (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    stops.forEach((s, i) => g.addColorStop(i / (stops.length - 1), s));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 8, 256);
  });
}

function radialTexture(inner: string, outer: string) {
  return canvasTex(256, 256, (ctx) => {
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
  });
}

/** Soft white arch-shaped light pool, like a lit gallery niche. */
function archTexture() {
  return canvasTex(256, 416, (ctx) => {
    ctx.filter = "blur(26px)";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    const x = 52, y = 46, w = 152, h = 330;
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.lineTo(x, y + w / 2);
    ctx.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
    ctx.fill();
  });
}

function shadowTexture() {
  return canvasTex(256, 256, (ctx) => {
    ctx.filter = "blur(14px)";
    ctx.fillStyle = "rgba(30,26,18,0.35)";
    ctx.fillRect(34, 40, 188, 184);
  });
}

function paintTexture(draw: GalleryArtwork["draw"], aspect: number) {
  const H = 768;
  const W = Math.round(H * aspect);
  return canvasTex(W, H, (ctx) => draw(ctx, W, H));
}

function tagTexture(title: string, sub: string, family: string) {
  return canvasTex(640, 160, (ctx) => {
    ctx.fillStyle = "#2A2A22";
    ctx.textBaseline = "top";
    let size = 40;
    do {
      ctx.font = `600 ${size}px ${family}`;
      size -= 1;
    } while (ctx.measureText(title).width > 620 && size > 20);
    ctx.fillText(title, 0, 18);
    ctx.fillStyle = "#77705F";
    ctx.font = `400 30px ${family}`;
    ctx.fillText(sub, 0, 80);
  });
}
