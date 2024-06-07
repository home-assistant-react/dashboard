import {
  errNoIntegrationAuthStarted,
  errUnauthorized,
} from "@home-assistant-react/types/src/api/errors";
import axios from "axios";
import { RequestHandler } from "express";
import { IS_ADDON } from "../const";
import { IntegrationServices } from "../services/integrations.services";
import { buildApiError } from "./buildApiError";

export interface AuthMiddlewareOptions {
  isIntegrationAuth?: boolean;
}
export type AuthMiddleware = (
  options?: AuthMiddlewareOptions,
) => RequestHandler;

export const auth: AuthMiddleware = (options) => async (request, _, next) => {
  if (options?.isIntegrationAuth) {
    if (!IntegrationServices.isAnyAuthStarted()) {
      return next(
        buildApiError(
          "c9da73e7-a089-4a5e-8b9d-5986b2abcc69",
          errNoIntegrationAuthStarted,
        ),
      );
    }
    return next();
  }
  if (IS_ADDON) {
    const accessToken = request.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      return next(
        buildApiError("86d2deb0-1ba7-47ab-8b6b-c9697e258c35", errUnauthorized, {
          detail: "No auth token provided",
        }),
      );
    }

    try {
      // TODO - For now checking if /api/ response is 200, need to find a better way
      const authResponse = await axios({
        method: "get",
        url: "http:///172.30.32.1:8123/api/",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (authResponse.status !== 200) {
        throw buildApiError(
          "cb808a9c-e9dd-4bfb-985e-1958a4d4b65f",
          errUnauthorized,
          { detail: "Invalid auth token" },
        );
      }

      if (authResponse.data.message !== "API running.") {
        throw buildApiError(
          "b4af837f-3fcf-419f-acf5-0481e289caa5",
          errUnauthorized,
          { detail: authResponse.data },
        );
      }
    } catch (err) {
      return next?.(
        buildApiError("73691d5f-c80e-4353-9bfd-7b14af448557", errUnauthorized, {
          errors: err,
        }),
      );
    }
  }
  next();
};
