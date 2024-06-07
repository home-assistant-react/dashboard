import { angle2Rad } from "../numbers/angle2Rad";
import {
  addVector,
  createRotateMatrix,
  rotateVector,
} from "../numbers/createRotateMatrix";

export type ArcOptions = {
  x: number;
  y: number;
  r: number;
  start: number;
  end: number;
  rotate?: number;
};

export const svgArc = (options: ArcOptions) => {
  const { x, y, r, start, end, rotate = 0 } = options;
  const cx = x;
  const cy = y;
  const rx = r;
  const ry = r;
  const t1 = angle2Rad(start);
  const t2 = angle2Rad(end);
  const delta = (t2 - t1) % (2 * Math.PI);
  const phi = angle2Rad(rotate);

  const rotMatrix = createRotateMatrix(phi);
  const [sX, sY] = addVector(
    rotateVector(rotMatrix, [rx * Math.cos(t1), ry * Math.sin(t1)]),
    [cx, cy],
  );
  const [eX, eY] = addVector(
    rotateVector(rotMatrix, [
      rx * Math.cos(t1 + delta),
      ry * Math.sin(t1 + delta),
    ]),
    [cx, cy],
  );
  const fA = delta > Math.PI ? 1 : 0;
  const fS = delta > 0 ? 1 : 0;

  return [
    "M",
    sX,
    sY,
    "A",
    rx,
    ry,
    (phi / (2 * Math.PI)) * 360,
    fA,
    fS,
    eX,
    eY,
  ].join(" ");
};
