// Constants for React Dashboard Integration
import path from "path";
import dotenv from "dotenv";
import yargs from "yargs";

dotenv.config({ path: "../../.env" });

const options = yargs
  .usage("Usage: $0 -data-path <name>")
  .option("data-path", {
    alias: "d",
    describe: "Data path",
    type: "string",
    demandOption: true,
  })
  .option("port", {
    alias: "p",
    describe: "Port number",
    type: "number",
    demandOption: false,
  })
  .option("env", {
    alias: "e",
    describe: "Environment",
    type: "string",
    demandOption: false,
  }).argv;

export const API_PORT = options.port || 3001;
export const ENV = options.env || "development";
export const IS_PROD = ENV === "production";
export const IS_ADDON = ENV === "addon";

export const CUR_PATH = path.dirname(__filename);
export const DATA_PATH = path.join(options["data-path"] || CUR_PATH, "data");
export const CLOUD_INTEGRATIONS_PATH = path.join(
  DATA_PATH,
  "cloud-integrations",
);
export const DASHBOARDS_PATH = path.join(DATA_PATH, "dashboards");
export const PLUGINS_PATH = path.join(DATA_PATH, "plugins");
export const PUBLIC_PATH = path.join(CUR_PATH, "public");
export const CUSTOM_ICONS_PATH = path.join(DATA_PATH, "custom_icons");
export const CUSTOM_IMAGES_PATH = path.join(DATA_PATH, "custom_images");
export const CACHE_PATH = path.join(DATA_PATH, "cache");
export const SVG_ICON_MAX_SIZE = 1024 * 1024; // 1MB
export const IMG_MAX_SIZE = 10 * 1024 * 1024; // 10MB
export const CUSTOM_IMAGES_ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
];

export const FULL_BACKUP_DIRECTORIES = [
  DASHBOARDS_PATH,
  PLUGINS_PATH,
  CLOUD_INTEGRATIONS_PATH,
  CUSTOM_ICONS_PATH,
  CUSTOM_IMAGES_PATH,
];

export const WWW_ALLOWED_FOLDERS = ["assets", "react", "icons"];
export const WWW_ALLOWED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".pdf",
  ".js",
  ".html",
  ".css",
  ".svg",
  ".woff2",
  ".json",
];
export const CUSTOM_IMAGES_THUMBNAIL_SIZE = 512;

export const REACT_DASHBOARD_BASE_URL = "/react_dashboard";

export const STORAGE_VERSION = 1;
export const AUTH_STORAGE_KEY = "react_dashboard.auth_data";
export const DOMAIN = "react_dashboard";
export const STATES_FOLDER = "react_dashboard";

export const CONF_ALBUM_ID = "album_id";
export const CONF_ALBUM_ID_FAVORITES = "FAVORITES";

export const GOOGLE_API_BASE_URL = "https://oauth2.googleapis.com/";
export const GOOGLE_API_ENDPOINT_TOKEN = "/token";
export const GOOGLE_API_PHOTO_BASE_URL =
  "https://photoslibrary.googleapis.com/v1";
export const GOOGLE_API_ENDPOINT_ALBUMS = "/albums";

export const ROUTE_AUTH_REDIRECT = "/auth/redirect";
export const ROUTE_AUTH_START = "/auth/start";
export const ROUTE_AUTH_LOGIN = "/auth/login";
export const ROUTE_AUTH_LOGOUT = "/auth/logout";
export const ROUTE_AUTH_CANCEL = "/auth/cancel";
export const OAUTH_GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/photoslibrary.readonly",
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/photoslibrary.readonly",
];
