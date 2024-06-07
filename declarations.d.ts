// declaration.d.ts
import { DashboardWindowStore } from "./packages/api/src/dashboard";
import {
  DashboardIconDictionariesName,
  DashboardWindowStoreName,
} from "./packages/api/src/defines";
import { IconDictionaries } from "./packages/types/src/icons";

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare global {
  interface Window {
    [DashboardWindowStoreName]: DashboardWindowStore;
    [DashboardIconDictionariesName]: IconDictionaries;
    __react_dashboard_api_url__: string;
  }
}
