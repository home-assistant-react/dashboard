import {
  CloudIntegration,
  CloudIntegrationData,
  StartedAuth,
} from "@home-assistant-react/types/src/api";
import fs from "node:fs";
import afs from "node:fs/promises";
import path from "path";
import { CLOUD_INTEGRATIONS_PATH } from "../const";
import { errCloudIntegrationNotFound } from "@home-assistant-react/types/src/api/errors";
import { buildApiError } from "../helpers/buildApiError";

export interface GetIntegrationsFilters {
  types?: string[];
}

const startedAuths: StartedAuth[] = [];

const isAnyAuthStarted = () => {
  if (startedAuths.length > 0) {
    return true;
  }

  return startedAuths.some((auth) => auth.started);
};

const isAuthStarted = (authId: string): boolean => {
  return startedAuths.some((auth) => auth.authId === authId && auth.started);
};

const getStartedAuth = (authId: string): StartedAuth | undefined => {
  return startedAuths.find((auth) => auth.authId === authId);
};

const startAuth = (auth: StartedAuth) => {
  startedAuths.push(auth);
  return auth;
};

const updateAuth = (authId: string, auth: Partial<StartedAuth>) => {
  const index = startedAuths.findIndex((auth) => auth.authId === authId);
  if (index === -1) {
    throw new Error("Auth not found");
  }
  startedAuths[index] = { ...startedAuths[index], ...auth };
};

const closeAuth = (authId: string) => {
  const index = startedAuths.findIndex((auth) => auth.authId === authId);
  if (index === -1) {
    throw new Error("Auth not found");
  }
  startedAuths.splice(index, 1);
};

const saveAuth = async (auth: StartedAuth, data: CloudIntegrationData) => {
  const integrationFolderPath = path.join(CLOUD_INTEGRATIONS_PATH, auth.authId);
  if (fs.existsSync(integrationFolderPath)) {
    await afs.rm(integrationFolderPath);
  }

  await afs.mkdir(integrationFolderPath);

  const integrationFilePath = path.join(
    integrationFolderPath,
    "integration.json",
  );

  await afs.writeFile(integrationFilePath, JSON.stringify(data));
};

const getIntegrations = async (options?: GetIntegrationsFilters) => {
  const integrationFolders = await afs.readdir(CLOUD_INTEGRATIONS_PATH);
  const integrations: CloudIntegration[] = [];

  for (let integrationFolder of integrationFolders) {
    const integrationFilePath = path.join(
      CLOUD_INTEGRATIONS_PATH,
      integrationFolder,
      "integration.json",
    );

    if (fs.existsSync(integrationFilePath)) {
      const integrationData = await afs.readFile(integrationFilePath, {
        encoding: "utf-8",
      });

      const info: CloudIntegrationData = JSON.parse(integrationData);

      if (
        info.authData?.type &&
        options?.types &&
        Array.isArray(options?.types)
      ) {
        if (!options.types.includes(info.authData.type)) {
          continue;
        }
      }

      integrations.push({
        integration: info.authData?.type || "",
        auth_key: info.authData?.authId || "",
        userInfo: info.userData || {},
        created_at: info.authData?.startedTime
          ? new Date(info.authData.startedTime).toISOString()
          : "",
      });
    }
  }

  return integrations;
};

const getIntegration = async (authId: string) => {
  const integrationFolderPath = path.join(CLOUD_INTEGRATIONS_PATH, authId);
  if (!fs.existsSync(integrationFolderPath)) {
    throw buildApiError(
      "21ac378b-6313-4094-97d7-607c119bff07",
      errCloudIntegrationNotFound,
      { detail: "Integration folder not found" },
    );
  }

  const integrationFilePath = path.join(
    integrationFolderPath,
    "integration.json",
  );

  if (!fs.existsSync(integrationFilePath)) {
    throw buildApiError(
      "d65ba136-f881-427f-a56b-161cd5e37eb0",
      errCloudIntegrationNotFound,
      { detail: "Integration file not found" },
    );
  }

  const integrationData = await afs.readFile(integrationFilePath, {
    encoding: "utf-8",
  });

  return JSON.parse(integrationData) as CloudIntegrationData;
};

const deleteIntegration = async (authId: string) => {
  const integrationFolderPath = path.join(CLOUD_INTEGRATIONS_PATH, authId);
  if (!fs.existsSync(integrationFolderPath)) {
    throw buildApiError(
      "ebddd17b-9d69-48f5-83f9-cdaf179d79da",
      errCloudIntegrationNotFound,
    );
  }

  await afs.rm(integrationFolderPath, { recursive: true });
};

export const IntegrationServices = {
  isAuthStarted,
  getStartedAuth,
  startAuth,
  updateAuth,
  closeAuth,
  saveAuth,
  getIntegrations,
  deleteIntegration,
  getIntegration,
  isAnyAuthStarted,
};
