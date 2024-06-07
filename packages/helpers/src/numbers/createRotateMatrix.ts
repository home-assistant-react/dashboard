type Vector = [number, number];
type Matrix = [Vector, Vector];

export const addVector = ([a1, a2]: Vector, [b1, b2]: Vector): Vector => [
  a1 + b1,
  a2 + b2,
];

export const rotateVector = (
  [[a, b], [c, d]]: Matrix,
  [x, y]: Vector,
): Vector => [a * x + b * y, c * x + d * y];

export const createRotateMatrix = (x: number): Matrix => [
  [Math.cos(x), -Math.sin(x)],
  [Math.sin(x), Math.cos(x)],
];
