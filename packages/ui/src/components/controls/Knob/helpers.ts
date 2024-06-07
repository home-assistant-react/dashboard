import { RenderTickOptions, TickOptions } from "./Knob.types";

export const getDeg = (
  startAngle: number,
  endAngle: number,
  cX: number,
  cY: number,
  pts: { x: number; y: number },
) => {
  const x = cX - pts.x;
  const y = cY - pts.y;
  let deg = (Math.atan(y / x) * 180) / Math.PI;
  if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
    deg += 90;
  } else {
    deg += 270;
  }
  return Math.min(Math.max(startAngle, deg), endAngle);
};

export const convertRange = (
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number,
  oldValue: number,
) => {
  return ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
};

export const renderTicks = (options: TickOptions) => {
  const ticks: RenderTickOptions[] = [];
  const margin = options.size * 0.1;

  const incr = options.degrees / options.numTicks;
  const _size = margin + options.size / 2;
  for (let deg = options.startAngle; deg <= options.endAngle; deg += incr) {
    const tick = {
      deg: deg,
      tickStyle: {
        height: _size + 10,
        left: _size - 1,
        top: _size + 2,
        transform: "rotate(" + deg + "deg)",
        transformOrigin: "top",
      },
    };
    ticks.push(tick);
  }
  return ticks;
};
