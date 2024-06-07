import { PluginInfo } from "@home-assistant-react/types/src/providers/plugins-state";
import fs from "fs";
import afs from "node:fs/promises";
import * as JSZip from "jszip";
import path from "path";
import { PLUGINS_PATH } from "../const";
import {
  errPluginNotValid,
  errPluginPreviewNotFound,
  errPluginsFolderNotFound,
  errUnzipFailed,
} from "@home-assistant-react/types/src/api/errors";
import { buildApiError } from "../helpers/buildApiError";
import { extractZip } from "../helpers/zip";

const _loadPluginInfo = async (plguinName: string) => {
  if (!fs.existsSync(PLUGINS_PATH)) {
    throw buildApiError(
      "b8e54d69-6c17-4272-866e-75986d48b24b",
      errPluginsFolderNotFound,
      {
        detail: "Plugins container folder not found.",
      },
    );
  }

  const pluginPath = path.join(PLUGINS_PATH, plguinName);

  if (!fs.existsSync(pluginPath)) {
    throw buildApiError(
      "909e26dd-24b2-44e1-9481-94404501c59a",
      errPluginsFolderNotFound,
      {
        detail: "Plugin folder not found.",
      },
    );
  }

  const pluginInfoFile = path.join(pluginPath, "plugin.json");

  if (!fs.existsSync(pluginInfoFile)) {
    throw buildApiError(
      "392764a4-f317-47f0-9e61-168c8223d5a8",
      errPluginNotValid,
      {
        detail: "Plugin info file is missing.",
      },
    );
  }

  const pluginInfo: PluginInfo = JSON.parse(
    fs.readFileSync(pluginInfoFile, "utf-8"),
  );

  if (!pluginInfo?.id) {
    throw buildApiError(
      "5f76bd48-a135-431a-8eab-8f8ec95a5d69",
      errPluginNotValid,
      {
        detail: "Plugin ID is missing.",
      },
    );
  }

  if (!pluginInfo?.name) {
    throw buildApiError(
      "fd95f2c4-049e-4b77-8d25-7d2bb498df5b",
      errPluginNotValid,
      {
        detail: "Plugin name is missing.",
      },
    );
  }

  return pluginInfo;
};

const getPluginsList = async () => {
  const pluginFolders = fs.readdirSync(PLUGINS_PATH);
  const plugins: Record<string, PluginInfo> = {};

  for (const pluginFolder of pluginFolders) {
    const isDisabled = fs.existsSync(
      path.join(PLUGINS_PATH, pluginFolder, "disabled"),
    );

    const pluginInfo = await _loadPluginInfo(pluginFolder);

    if (pluginInfo.id) {
      pluginInfo.disabled = isDisabled;
      plugins[pluginInfo.id] = pluginInfo;
    }
  }

  return plugins;
};

const getPluginPreviewPath = async (pluginName: string) => {
  await _loadPluginInfo(pluginName);
  const previewImagePath = path.join(PLUGINS_PATH, pluginName, "preview.png");

  if (!fs.existsSync(previewImagePath)) {
    throw buildApiError(
      "5ba0bb74-25e4-4273-afa1-2724a038217d",
      errPluginPreviewNotFound,
      {
        detail: "Plugin preview image is missing.",
      },
    );
  }

  return previewImagePath;
};

const disablePlugin = async (pluginName: string) => {
  await _loadPluginInfo(pluginName);
  const pluginPath = path.join(PLUGINS_PATH, pluginName);

  fs.writeFileSync(path.join(pluginPath, "disabled"), "");

  return true;
};

const enablePlugin = async (pluginName: string) => {
  await _loadPluginInfo(pluginName);
  const pluginPath = path.join(PLUGINS_PATH, pluginName);

  if (fs.existsSync(path.join(pluginPath, "disabled"))) {
    fs.unlinkSync(path.join(pluginPath, "disabled"));
  }

  return true;
};

const uninstallPlugin = async (pluginName: string) => {
  await _loadPluginInfo(pluginName);
  const pluginPath = path.join(PLUGINS_PATH, pluginName);

  if (fs.existsSync(pluginPath)) {
    await afs.rm(pluginPath, { recursive: true, force: true });
  }

  return true;
};

const uploadPlugin = async (pluginContent: Buffer) => {
  const zip = await JSZip.loadAsync(pluginContent);
  const infoFile = await zip.file("plugin.json")?.async("text"); // Read as text

  if (!infoFile) {
    throw buildApiError(
      "d132e48f-1e98-4588-a159-69c0d51a4225",
      errPluginNotValid,
      {
        detail: "No plugin.json file found in the zip archive.",
      },
    );
  }

  let pluginInfo: PluginInfo | undefined;

  try {
    pluginInfo = JSON.parse(infoFile);
  } catch (error) {
    throw buildApiError(
      "f82f4b69-f9e0-465e-b9e3-66aa7d975c37",
      errPluginNotValid,
      {
        detail: "Error parsing plugin.json file.",
        errors: error,
      },
    );
  }

  if (!pluginInfo?.id) {
    throw buildApiError(
      "2b83e32f-aabd-4f1a-87a8-81803a5006b8",
      errPluginNotValid,
      {
        detail: "Plugin ID is missing.",
      },
    );
  }

  if (!pluginInfo?.main) {
    throw buildApiError(
      "2b83e32f-aabd-4f1a-87a8-81803a5006b8",
      errPluginNotValid,
      {
        detail: "Plugin main file definition is missing.",
      },
    );
  }

  const mainFileName = pluginInfo.main;

  const mainFile = await zip.file(mainFileName)?.async("text");

  if (!mainFile) {
    throw buildApiError(
      "2b83e32f-aabd-4f1a-87a8-81803a5006b8",
      errPluginNotValid,
      {
        detail: "Main file not found in the zip archive.",
      },
    );
  }

  const savePath = path.join(PLUGINS_PATH, pluginInfo.id);

  if (fs.existsSync(savePath)) {
    await afs.rm(savePath, { recursive: true, force: true });
  }

  await afs.mkdir(savePath, { recursive: true });

  try {
    await extractZip(pluginContent, savePath);
  } catch (error) {
    throw buildApiError(
      "1818c64c-1385-4285-9f23-3df9deea4594",
      errUnzipFailed,
      {
        detail: "Something went wrong extracting the zip archive.",
        errors: error,
      },
    );
  }

  return {
    status: "success",
    message: "Plugin successfully uploaded and verified.",
    id: pluginInfo["id"],
    main: mainFileName,
  };
};

const getPluginSourcePath = async (pluginName: string) => {
  const pluginInfo = await _loadPluginInfo(pluginName);
  return path.join(PLUGINS_PATH, pluginName, pluginInfo.main);
};

export const PluginsServices = {
  getPluginsList,
  getPluginPreviewPath,
  disablePlugin,
  enablePlugin,
  uninstallPlugin,
  uploadPlugin,
  getPluginSourcePath,
};
