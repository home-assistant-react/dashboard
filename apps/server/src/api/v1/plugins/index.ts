import express from "express";
import { PluginsControllers } from "../../../controllers/plugins.controller";
import { auth } from "../../../helpers/auth";

export const pluginsRoutes = express.Router();

pluginsRoutes.post(
  "/plugins/upload",
  auth(),
  ...PluginsControllers.uploadPlugin,
);

pluginsRoutes.get("/plugins", auth(), ...PluginsControllers.getPlugins);

pluginsRoutes.get(
  "/plugins/:pluginName/preview",
  auth(),
  ...PluginsControllers.getPluginPreview,
);

pluginsRoutes.patch(
  "/plugins/:pluginName/disable",
  auth(),
  ...PluginsControllers.disablePlugin,
);

pluginsRoutes.patch(
  "/plugins/:pluginName/enable",
  auth(),
  ...PluginsControllers.enablePlugin,
);

pluginsRoutes.get(
  "/plugins/:pluginName/plugin.js",
  auth(),
  ...PluginsControllers.getPluginCode,
);

pluginsRoutes.delete(
  "/plugins/:pluginName/uninstall",
  auth(),
  ...PluginsControllers.uninstallPlugin,
);
