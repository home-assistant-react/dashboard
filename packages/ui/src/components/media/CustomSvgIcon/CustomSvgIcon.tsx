import React from "react";
import { CustomSvgIconProps } from "./CustomSvgIcon.types";
import { CustomSVGElement } from "@home-assistant-react/types/src";

function convertStyleStringToObject(styleString: string): React.CSSProperties {
  const styleObject: React.CSSProperties = {};

  if (!styleString) return styleObject;

  const stylePairs = styleString
    .split(";")
    .filter((pair) => pair.trim() !== "");

  stylePairs.forEach((pair) => {
    const [key, value] = pair.split(":");
    const trimmedKey = key.trim();
    const trimmedValue = value.trim();
    const camelCaseKey = trimmedKey.replace(/-([a-z])/g, (match) =>
      match[1].toUpperCase(),
    );
    styleObject[camelCaseKey as keyof React.CSSProperties] = trimmedValue;
  });

  return styleObject;
}

const getStrokeFillValue = (value: string | null | undefined) => {
  if (value === undefined || value === "none") return value;
  if (value === "null") return undefined;
  return "currentColor";
};

const SvgElement: React.FC<{ element: CustomSVGElement }> = ({ element }) => {
  const { tagName, children, properties } = element;
  if (!tagName) return null;
  return React.createElement(
    tagName,
    {
      ...properties,
      style: properties?.style
        ? convertStyleStringToObject(properties?.style || "")
        : undefined,
      fill: getStrokeFillValue(properties?.fill),
      stroke: getStrokeFillValue(properties?.stroke),
    },
    children?.map((child, key) => <SvgElement key={key} element={child} />),
  );
};

export const CustomSvgIcon = React.forwardRef<
  SVGSVGElement,
  CustomSvgIconProps
>(({ icon, width, height }, ref) => {
  const svgElement = icon.svg.children?.[0];

  if (!svgElement) return null;

  return (
    <svg
      viewBox={svgElement.properties?.viewBox}
      width={width || 64}
      height={height || 64}
      fill={getStrokeFillValue(svgElement.properties?.fill)}
      stroke={getStrokeFillValue(svgElement.properties?.stroke)}
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
    >
      {svgElement.children?.map((element, elementIndex) => (
        <SvgElement element={element} key={elementIndex} />
      ))}
    </svg>
  );
});

CustomSvgIcon.displayName = "CustomSvgIcon";
