import React from "react";

export interface LightLineChartData {
  value: number;
}

export interface LightLineChartProps {
  data: LightLineChartData[];
  width: number;
  height: number;
  padding?: number;
  bottomPadding?: number;
  topPadding?: number;
  fill?: string;
  stroke?: string;
}

export const LightLineChart: React.FC<LightLineChartProps> = ({
  data: controlledData,
  width,
  height,
  padding: _padding,
  bottomPadding: _bottomPadding = 20,
  topPadding: _topPadding,
  fill,
  stroke,
}) => {
  if (!Array.isArray(controlledData) || controlledData.length === 0)
    return null;

  const data = [...controlledData];
  if (data.length === 1) data.push({ value: data[0].value });

  const maxValue = Math.max(...data.map((item) => item.value));
  const minValue = Math.min(...data.map((item) => item.value));

  const padding = _padding || 0;
  const extraBottomPadding = _bottomPadding;
  const extraTopPadding = _topPadding || 5;

  const xScale = (index: number) =>
    padding + (index * (width - 2 * padding)) / (data.length - 1);
  const yScale = (value: number) => {
    if (minValue === maxValue) return height - extraBottomPadding;
    return (
      height -
      extraBottomPadding -
      ((value - minValue) * (height - padding - extraBottomPadding)) /
        (maxValue - minValue) +
      extraTopPadding
    );
  };

  // Handle single data point by drawing a horizontal line
  let linePathD, fillPathD;
  // Path for the line (with stroke)
  linePathD = `M ${xScale(0)},${yScale(data[0].value)}`;
  // Path for the fill (no stroke, just fill)
  fillPathD = linePathD;

  // Generate the curve for multiple data points
  for (let i = 1; i < data.length; i++) {
    const x0 = xScale(i - 1);
    const y0 = yScale(data[i - 1].value);
    const x1 = xScale(i);
    const y1 = yScale(data[i].value);
    const xc = (x0 + x1) / 2;
    const yc = (y0 + y1) / 2;
    const cp1x = (x0 + xc) / 2;
    const cp1y = y0;
    const cp2x = (x1 + xc) / 2;
    const cp2y = y1;

    linePathD += ` Q ${cp1x},${cp1y} ${xc},${yc}`;
    linePathD += ` Q ${cp2x},${cp2y} ${x1},${y1}`;
    fillPathD =
      linePathD +
      ` L ${xScale(data.length - 1)},${height - padding} L ${xScale(0)},${height - padding} Z`;
  }

  return (
    <svg width={width} height={height} style={{ border: "none" }}>
      <path d={fillPathD} fill={fill || "lightblue"} />
      <path
        d={linePathD}
        fill="none"
        stroke={stroke || "blue"}
        strokeWidth="3"
      />
    </svg>
  );
};
