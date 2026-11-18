/** Poster-style "artworks" painted on canvas for the 3D gallery rooms. */

type Ctx = CanvasRenderingContext2D;

const INK = "#141B08";
const YELLOW = "#F4D03F";
const CREAM = "#F3ECE3";

function wrap(ctx: Ctx, text: string, maxW: number, maxLines: number) {
  const words = text.split(" ");
  let lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines = [...lines.slice(0, maxLines - 1), lines.slice(maxLines - 1).join(" ")];
  }
  // ellipsis if the last line still overflows
  const last = lines.length - 1;
  while (last >= 0 && ctx.measureText(lines[last]).width > maxW && lines[last].length > 3) {
    lines[last] = lines[last].slice(0, -2).trimEnd() + "…";
  }
  return lines;
}

function rings(ctx: Ctx, cx: number, cy: number, color: string, count: number, gap: number) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  for (let i = 1; i <= count; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, i * gap, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function dotGrid(ctx: Ctx, x: number, y: number, cols: number, rows: number, gap: number, color: string) {
  ctx.fillStyle = color;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.beginPath();
      ctx.arc(x + c * gap, y + r * gap, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export interface ServiceArt {
  title: string;
  subtitle: string;
  icon: string;
  highlight?: boolean;
}

export function drawServicePoster(svc: ServiceArt, index: number, family: string, mono: string) {
  return (ctx: Ctx, W: number, H: number) => {
    const dark = !svc.highlight;
    const bg = dark ? "#052226" : YELLOW;
    const fg = dark ? CREAM : INK;
    const accent = dark ? YELLOW : INK;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // generative backdrop
    rings(ctx, W * 0.78, H * 0.62, dark ? "rgba(244,208,63,0.10)" : "rgba(20,27,8,0.10)", 9, 46);
    dotGrid(ctx, W * 0.6, 60, 8, 3, 34, dark ? "rgba(243,236,227,0.16)" : "rgba(20,27,8,0.18)");

    // big icon
    const s = 13;
    ctx.save();
    ctx.translate(W * 0.78 - 12 * s, H * 0.62 - 12 * s);
    ctx.scale(s, s);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.25;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke(new Path2D(svc.icon));
    ctx.restore();

    // index + eyebrow
    ctx.fillStyle = fg;
    ctx.globalAlpha = 0.6;
    ctx.font = `500 30px ${mono}`;
    ctx.textBaseline = "top";
    ctx.fillText(String(index + 1).padStart(2, "0"), 64, 60);
    ctx.globalAlpha = 1;

    // title
    ctx.font = `700 78px ${family}`;
    const lines = wrap(ctx, svc.title, W * 0.56, 3);
    let y = H - 120 - lines.length * 86;
    for (const l of lines) {
      ctx.fillText(l, 64, y);
      y += 86;
    }
    ctx.globalAlpha = 0.7;
    ctx.font = `400 32px ${family}`;
    ctx.fillText(svc.subtitle, 64, H - 100);
    ctx.globalAlpha = 1;
  };
}

export interface CaseArt {
  badge: string;
  title: string;
  impactMetric: string;
}

const CASE_PALETTES = [
  { bg: "#052226", fg: CREAM, accent: YELLOW },
  { bg: YELLOW, fg: INK, accent: INK },
  { bg: "#FBF3EA", fg: INK, accent: "#0C5A63" },
  { bg: "#0F4E57", fg: CREAM, accent: "#EDC9AF" },
];

export function drawCasePoster(c: CaseArt, index: number, family: string, mono: string) {
  return (ctx: Ctx, W: number, H: number) => {
    const p = CASE_PALETTES[index % CASE_PALETTES.length];
    ctx.fillStyle = p.bg;
    ctx.fillRect(0, 0, W, H);

    // data-bar artwork in the lower right
    const bars = 14;
    const bw = 22;
    for (let i = 0; i < bars; i++) {
      const hgt = 60 + ((Math.sin(i * 1.7 + index) + 1) / 2) * 220 + i * 8;
      ctx.fillStyle = i === bars - 1 ? p.accent : p.fg;
      ctx.globalAlpha = i === bars - 1 ? 1 : 0.14;
      ctx.fillRect(W - 64 - (bars - i) * (bw + 10), H - 64 - hgt, bw, hgt);
    }
    ctx.globalAlpha = 1;

    // badge
    ctx.fillStyle = p.fg;
    ctx.globalAlpha = 0.65;
    ctx.font = `500 26px ${mono}`;
    ctx.textBaseline = "top";
    ctx.fillText(c.badge.toUpperCase(), 64, 60);
    ctx.globalAlpha = 1;

    // headline metric: first token large, remainder below
    const [head, ...rest] = c.impactMetric.split(" ");
    ctx.fillStyle = p.accent;
    let size = 200;
    do {
      ctx.font = `700 ${size}px ${family}`;
      size -= 4;
    } while (ctx.measureText(head).width > W * 0.62 && size > 90);
    ctx.fillText(head, 58, 140);
    ctx.fillStyle = p.fg;
    ctx.font = `600 44px ${family}`;
    const restLines = wrap(ctx, rest.join(" "), W * 0.5, 2);
    let y = 140 + size + 20;
    for (const l of restLines) {
      ctx.fillText(l, 64, y);
      y += 52;
    }

    // project title
    ctx.globalAlpha = 0.75;
    ctx.font = `400 30px ${family}`;
    const tl = wrap(ctx, c.title, W * 0.5, 2);
    let ty = H - 64 - tl.length * 38;
    for (const l of tl) {
      ctx.fillText(l, 64, ty);
      ty += 38;
    }
    ctx.globalAlpha = 1;
  };
}
