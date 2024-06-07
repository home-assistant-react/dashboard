import { FrontendLocaleData } from "../frontend";
import { Dict } from "../../common";

export interface HassUserDataCore {
  showAdvanced?: boolean;
}
export interface HassUserData {
  language: FrontendLocaleData;
  core: HassUserDataCore;
}

export interface HassCurrentUserData {
  name: string;
  id: string;
  is_owner: boolean;
  is_admin: boolean;
  credentials: Dict[];
  mfa_modules: Dict[];
}
