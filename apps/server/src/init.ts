import fs from "fs";
import {
  CACHE_PATH,
  CLOUD_INTEGRATIONS_PATH,
  CUSTOM_ICONS_PATH,
  CUSTOM_IMAGES_PATH,
  DASHBOARDS_PATH,
  PLUGINS_PATH,
} from "./const";

export function initServer() {
  if (!fs.existsSync(DASHBOARDS_PATH)) {
    console.log("Creating dashboards directory");
    fs.mkdirSync(DASHBOARDS_PATH, { recursive: true });
  }

  if (!fs.existsSync(PLUGINS_PATH)) {
    console.log("Creating plugins directory");
    fs.mkdirSync(PLUGINS_PATH, { recursive: true });
  }

  if (!fs.existsSync(CUSTOM_ICONS_PATH)) {
    console.log("Creating custom icons directory");
    fs.mkdirSync(CUSTOM_ICONS_PATH, { recursive: true });
  }

  if (!fs.existsSync(CUSTOM_IMAGES_PATH)) {
    console.log("Creating custom images directory");
    fs.mkdirSync(CUSTOM_IMAGES_PATH, { recursive: true });
  }

  if (!fs.existsSync(CACHE_PATH)) {
    console.log("Creating cache directory");
    fs.mkdirSync(CACHE_PATH, { recursive: true });
  }

  if (!fs.existsSync(CLOUD_INTEGRATIONS_PATH)) {
    console.log("Creating cloud integrations directory");
    fs.mkdirSync(CLOUD_INTEGRATIONS_PATH, { recursive: true });
  }
}
