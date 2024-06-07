import {
  deg2rad,
  getClickPosition,
  polar2xy,
  rad2deg,
  xy2polar,
} from "@home-assistant-react/helpers/src";
import { MouseTouchEvent } from "@home-assistant-react/types/src/ui/events";

export const drawWheel = (ctx: CanvasRenderingContext2D, size: number) => {
  const center = size / 2;
  const brightness = 255; // assuming default brightness is 255

  ctx.clearRect(0, 0, size, size);

  for (let c = 0; c < 360; c += 1) {
    const startAngle = (c - 0.5) * (Math.PI / 180);
    const endAngle = (c + 1.5) * (Math.PI / 180);

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, center, startAngle, endAngle);
    ctx.closePath();

    const gradient = ctx.createRadialGradient(
      center,
      center,
      0,
      center,
      center,
      center,
    );

    // Assuming L function and other utilities give us these RGB values:
    const innerColor = `hsl(${c}, 0%, ${brightness}%)`; // 0% saturation
    const outerColor = `hsl(${c}, 100%, 50%)`; // 100% saturation

    gradient.addColorStop(0, innerColor);
    gradient.addColorStop(1, outerColor);

    ctx.fillStyle = gradient;
    ctx.fill();
  }
};

export const getCoordsFromValue = (
  value: [number, number],
): [number, number] => {
  const phi = deg2rad(value[0]);

  const r = Math.min(value[1], 1);

  const [x, y] = polar2xy(r, phi);

  return [x, y];
};

export const getValueFromCoord = (x: number, y: number): [number, number] => {
  const [r, phi] = xy2polar(x, y);
  const deg = Math.round(rad2deg(phi)) % 360;
  const hue = (deg + 360) % 360;
  const saturation = Math.round(Math.min(r, 1) * 100) / 100;
  return [hue, saturation];
};

export const getPositionFromEvent = (
  canvas?: HTMLCanvasElement | null,
  event?: MouseTouchEvent<HTMLCanvasElement>,
): [number, number] => {
  if (!canvas || !event) return [0, 0];
  const { x, y } = getClickPosition(event);
  const boundingRect = canvas.getBoundingClientRect();
  const offsetX = boundingRect.left;
  const offsetY = boundingRect.top;
  const maxX = canvas.clientWidth;
  const maxY = canvas.clientHeight;

  const _x = (2 * (x - offsetX)) / maxX - 1;
  const _y = (2 * (y - offsetY)) / maxY - 1;

  const [r, phi] = xy2polar(_x, _y);
  return polar2xy(Math.min(1, r), phi);
};
