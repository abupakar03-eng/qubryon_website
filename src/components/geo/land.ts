/**
 * Coarse world land mask: longitude ranges for each 6° latitude band (top edge given).
 * Shared by the 2D delivery map, the hero mini-globe and the particle globe.
 */
export const LAND_BANDS: { top: number; ranges: [number, number][] }[] = [
  { top: 78, ranges: [[-120, -80], [-70, -20], [60, 140]] },
  { top: 72, ranges: [[-165, -140], [-140, -65], [-55, -22], [15, 30], [30, 180]] },
  { top: 66, ranges: [[-165, -140], [-140, -60], [-50, -40], [-24, -14], [5, 30], [30, 180]] },
  { top: 60, ranges: [[-135, -60], [-6, 0], [8, 30], [30, 160]] },
  { top: 54, ranges: [[-128, -55], [-10, 2], [2, 40], [40, 140]] },
  { top: 48, ranges: [[-125, -65], [-5, 45], [45, 90], [90, 135], [140, 145]] },
  { top: 42, ranges: [[-124, -75], [-9, 45], [45, 120], [126, 142]] },
  { top: 36, ranges: [[-120, -80], [-10, 35], [35, 60], [60, 122], [130, 140]] },
  { top: 30, ranges: [[-115, -80], [-15, 35], [35, 57], [57, 122]] },
  { top: 24, ranges: [[-110, -87], [-84, -75], [-17, 40], [40, 58], [68, 90], [92, 110]] },
  { top: 18, ranges: [[-100, -84], [-17, 44], [44, 52], [72, 82], [95, 110], [120, 124]] },
  { top: 12, ranges: [[-85, -60], [-15, 50], [75, 82], [98, 105], [122, 126]] },
  { top: 6, ranges: [[-80, -50], [-10, 45], [100, 118]] },
  { top: 0, ranges: [[-80, -35], [10, 40], [100, 140]] },
  { top: -6, ranges: [[-78, -35], [12, 40], [106, 115], [140, 150]] },
  { top: -12, ranges: [[-76, -38], [12, 40], [44, 50], [125, 145]] },
  { top: -18, ranges: [[-70, -40], [12, 35], [44, 48], [114, 150]] },
  { top: -24, ranges: [[-70, -48], [15, 32], [114, 153]] },
  { top: -30, ranges: [[-72, -52], [18, 28], [116, 150]] },
  { top: -36, ranges: [[-73, -62], [140, 148], [172, 178]] },
  { top: -42, ranges: [[-75, -65], [168, 174]] },
  { top: -48, ranges: [[-75, -68]] },
];

export function isLand(lat: number, lon: number) {
  const band = LAND_BANDS.find((b) => lat <= b.top && lat > b.top - 6);
  return !!band && band.ranges.some(([a, b]) => lon >= a && lon <= b);
}

/** Land sample points on a regular lat/lon grid. */
export function landPoints(step: number) {
  const pts: { lat: number; lon: number }[] = [];
  for (let lat = 78 - step / 2; lat > -54; lat -= step) {
    for (let lon = -180 + step / 2; lon < 180; lon += step) {
      if (isLand(lat, lon)) pts.push({ lat, lon });
    }
  }
  return pts;
}
