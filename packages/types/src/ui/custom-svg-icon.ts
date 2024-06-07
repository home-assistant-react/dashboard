import { Dict } from "../common";

export interface CustomSVGElement extends Dict {
  tag: string;
  children?: CustomSVGElement[];
  properties?: Dict;
}

export interface CustomSvgIcon {
  id: string;
  icon_name: string;
  file_name: string;
  viewBox: string;
  fill?: string;
  stroke?: string;
  svg: CustomSVGElement;
}

export type CustomSvgIcons = Record<string, CustomSvgIcon>;
