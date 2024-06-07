import { IconValue } from "../icons";

export enum SettingSectionId {
  Settings = "settings",
  Dashboards = "dashboards",
  DefaultStyles = "default-styles",
  CloudIntegrations = "cloud-integrations",
  CustomIcons = "custom-icons",
  CustomImages = "custom-images",
  Plugins = "plugins",
  ExportImport = "export-import",
}

export interface SettingSection {
  id: SettingSectionId;
  label: string;
  icon: IconValue;
}

export type SettingSections = SettingSection[];

export const settingSections: SettingSections = [
  {
    id: SettingSectionId.Settings,
    label: "Settings",
    icon: {
      set: "mdi",
      icon: "mdiCog",
    },
  },
  {
    id: SettingSectionId.Dashboards,
    label: "Dashboards",
    icon: {
      set: "mdi",
      icon: "mdiViewDashboard",
    },
  },
  {
    id: SettingSectionId.DefaultStyles,
    label: "Default styles",
    icon: {
      set: "mdi",
      icon: "mdiPalette",
    },
  },
  {
    id: SettingSectionId.CloudIntegrations,
    label: "Cloud integrations",
    icon: {
      set: "mdi",
      icon: "mdiWebhook",
    },
  },
  {
    id: SettingSectionId.CustomIcons,
    label: "Custom icons",
    icon: {
      set: "mdi",
      icon: "mdiImageFilterVintage",
    },
  },
  {
    id: SettingSectionId.CustomImages,
    label: "Custom images",
    icon: {
      set: "mdi",
      icon: "mdiImage",
    },
  },
  {
    id: SettingSectionId.Plugins,
    label: "Plugins",
    icon: {
      set: "mdi",
      icon: "mdiPuzzle",
    },
  },
  {
    id: SettingSectionId.ExportImport,
    label: "Export / Import",
    icon: {
      set: "mdi",
      icon: "mdiSwapVerticalBold",
    },
  },
];
