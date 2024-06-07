import { ImageUploadInput } from "@home-assistant-react/types/src/api/schemas/custom-images";
import fileUpload from "express-fileupload";
import {
  errDisablingPlugin,
  errDownloadingPluginPreview,
  errEnablingPlugin,
  errGettingPluginScriptCode,
  errNoUploadedPlugin,
  errPluginNameNotProvided,
  errPluginUploadFailed,
  errUninstallingPlugin,
} from "@home-assistant-react/types/src/api/errors";
import { buildApiError } from "../helpers/buildApiError";
import { defineController } from "../helpers/defineController";
import { sanitizeId } from "../helpers/strings";
import { PluginsServices } from "../services/plugins.services";

const uploadPlugin = defineController<ImageUploadInput>(async ({ request }) => {
  try {
    if (!request!.files || !request!.files.plugin_file) {
      throw buildApiError(
        "ee532961-ef94-41e2-8679-01ddbce7d3f6",
        errNoUploadedPlugin,
      );
    }
    const pluginFile = request!.files.plugin_file as fileUpload.UploadedFile;
    return await PluginsServices.uploadPlugin(pluginFile.data);
  } catch (error) {
    throw buildApiError(
      "e2effb3e-8ee1-47b0-85dc-c67142da5b5c",
      errPluginUploadFailed,
      {
        detail: "Something went wrong uploading the plugin",
        errors: error,
      },
    );
  }
});

const getPlugins = defineController(async () => {
  const plugins = await PluginsServices.getPluginsList();
  return { plugins };
});

const getPluginPreview = defineController(async ({ request, response }) => {
  try {
    const pluginName = sanitizeId(request?.params?.pluginName);
    if (!pluginName) {
      throw buildApiError(
        "046eaed3-7742-4bac-97e4-33f10d6efffc",
        errPluginNameNotProvided,
      );
    }

    const path = await PluginsServices.getPluginPreviewPath(pluginName);
    response?.download(path);
  } catch (err) {
    throw buildApiError(
      "13cc7692-d707-43cd-bb33-a636fe03bca6",
      errDownloadingPluginPreview,
      {
        detail: "Something went wrong while downloading the plugin preview",
        errors: err,
      },
    );
  }
});

const disablePlugin = defineController(async ({ request }) => {
  try {
    const pluginName = sanitizeId(request?.params.pluginName);
    await PluginsServices.disablePlugin(pluginName);
    return { success: true };
  } catch (error) {
    throw buildApiError(
      "e5d591e5-3f77-40e4-972e-089f750057f5",
      errDisablingPlugin,
      {
        detail: "Something went wrong disabling the plugin",
        errors: error,
      },
    );
  }
});

const enablePlugin = defineController(async ({ request }) => {
  try {
    const pluginName = sanitizeId(request?.params.pluginName);
    await PluginsServices.enablePlugin(pluginName);
    return { success: true };
  } catch (error) {
    throw buildApiError(
      "f04e00d2-34e8-460f-a3aa-ea277830fa74",
      errEnablingPlugin,
      {
        detail: "Something went wrong enabling the plugin",
        errors: error,
      },
    );
  }
});

const getPluginCode = defineController(async ({ request, response }) => {
  try {
    const pluginName = sanitizeId(request?.params.pluginName);
    const scriptUrl = await PluginsServices.getPluginSourcePath(pluginName);
    response?.download(scriptUrl);
  } catch (error) {
    throw buildApiError(
      "d4cb1ed1-a00f-4d6b-8ea5-989f0aff1fdf",
      errGettingPluginScriptCode,
      {
        detail: "Something went wrong getting the plugin code",
        errors: error,
      },
    );
  }
});

const uninstallPlugin = defineController(async ({ request }) => {
  try {
    const pluginName = sanitizeId(request?.params.pluginName);
    await PluginsServices.uninstallPlugin(pluginName);
    return { success: true };
  } catch (error) {
    throw buildApiError(
      "71095a54-c75e-4993-b685-78148e171e4f",
      errUninstallingPlugin,
      {
        detail: "Something went wrong uninstalling the plugin",
        errors: error,
      },
    );
  }
});

export const PluginsControllers = {
  uploadPlugin,
  getPlugins,
  getPluginPreview,
  disablePlugin,
  enablePlugin,
  getPluginCode,
  uninstallPlugin,
};
