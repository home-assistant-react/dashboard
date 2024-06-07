import { ENV } from "../const";

export const getApiServerUrl = () => {
  if (ENV === "development") {
    return "http://localhost";
  }
};
