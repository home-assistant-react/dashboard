import { Request } from "express";
import { IS_ADDON } from "../const";
export const getServerBaseUrl = async (
  request: Request,
  useExternal = false,
) => {
  if (IS_ADDON) {
    if (!useExternal && request?.headers?.["x-ingress-path"])
      return (
        request.headers.origin + `${request?.headers["x-ingress-path"]}/v1`
      );
    if (useExternal && request.headers.origin) {
      const url = new URL(request.headers.origin);
      return `http://${url.hostname}:8500/v1`;
    }
    return request.headers.origin + "/v1";
  }

  return "http://localhost:8099/v1";
};
