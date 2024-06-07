import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { parseStringPromise } from "xml2js";
import {
  errCustomIconNotFound,
  errSvgFileSize,
} from "@home-assistant-react/types/src/api/errors";
import { sanitizeId } from "../helpers/strings";
import { CUSTOM_ICONS_PATH, SVG_ICON_MAX_SIZE } from "../const";
import { buildApiError } from "../helpers/buildApiError";
import { parse, RootNode } from "svg-parser";

interface SvgData {
  svg: RootNode;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  file_name?: string;
  icon_name?: string;
  id?: string;
}

export interface ServeIconUploadFilter {
  svgContent: Buffer;
  svgFilename: string;
  iconName?: string;
}

export interface ApiDeleteCustomIconFilter {
  iconId: string;
}

export interface ApiRenameCustomIconFilter {
  iconId: string;
  newName: string;
}

const uploadCustomIcon = async (filters: ServeIconUploadFilter) => {
  const { svgContent, svgFilename, iconName } = filters;

  if (svgContent.length > SVG_ICON_MAX_SIZE) {
    throw buildApiError(
      "5aafc9c2-56d1-4dfd-91d4-68475e1a9392",
      errSvgFileSize,
      { detail: "Uploaded SVG is too large" },
    );
  }

  try {
    const parsedSvg = await parseStringPromise(svgContent.toString());
    if (!parsedSvg.svg) {
      return { error: "Uploaded file is not a valid SVG" };
    }
  } catch (error) {
    return { error: "Error parsing SVG file" };
  }

  const svgData: SvgData = {
    svg: parse(svgContent.toString()),
    file_name: svgFilename,
    icon_name: iconName || path.parse(svgFilename).name,
    id: uuidv4(),
  };

  const svgJsonPath = path.join(CUSTOM_ICONS_PATH, `${svgData["id"]}.svg.json`);
  fs.writeFileSync(svgJsonPath, JSON.stringify(svgData, null, 4));

  return { success: true, svg_data: svgData };
};

const getCustomIcons = async () => {
  const iconFiles = fs.readdirSync(CUSTOM_ICONS_PATH);
  const svgJsonFiles = iconFiles.filter((f) => f.endsWith(".svg.json"));

  const icons: Record<string, unknown> = {};
  for (const filename of svgJsonFiles) {
    const filepath = path.join(CUSTOM_ICONS_PATH, filename);
    icons[filename.replace(".svg.json", "")] = JSON.parse(
      fs.readFileSync(filepath, "utf-8"),
    );
  }

  return icons;
};

const deleteCustomIcon = async (filters: ApiDeleteCustomIconFilter) => {
  const { iconId } = filters;
  const cleanedId = sanitizeId(iconId);
  const filepath = path.join(CUSTOM_ICONS_PATH, `${cleanedId}.svg.json`);

  if (!fs.existsSync(filepath)) {
    throw buildApiError(
      "e1dbb6e2-8870-48ac-9e13-cdfac04b26c2",
      errCustomIconNotFound,
      { detail: "Icon not found" },
    );
  }

  fs.unlinkSync(filepath);
  return { success: true };
};

const renameCustomIcon = async (iconId: string, newName: string) => {
  const cleanedId = sanitizeId(iconId);
  const filepath = path.join(CUSTOM_ICONS_PATH, `${cleanedId}.svg.json`);

  if (!fs.existsSync(filepath)) {
    throw buildApiError(
      "ddd28787-c44f-44e8-a3af-d5affbb3c197",
      errCustomIconNotFound,
      { detail: "Icon not found" },
    );
  }

  const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));
  data["icon_name"] = newName;
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));

  return data;
};

export const CustomIconServices = {
  uploadCustomIcon,
  getCustomIcons,
  deleteCustomIcon,
  renameCustomIcon,
};
