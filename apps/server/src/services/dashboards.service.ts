// services/dashboards.ts

import { DashboardState } from "@home-assistant-react/types/src";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { buildApiError } from "../helpers/buildApiError";
import {
  errDashboardAlreadyExists,
  errDashboardNotFound,
  errInvalidDashboard,
  errInvalidDashboardId,
  errMalformedDashboard,
  errMissingName,
  errUpdatingDashboard,
} from "@home-assistant-react/types/src/api/errors";
import { DASHBOARDS_PATH } from "../const";
import {
  getNewDashboardObject,
  validateDashboardObject,
} from "../helpers/dashboard";
import { sanitizeId } from "../helpers/strings";

export interface GetDashboardsFilter {}
export interface GetDashboardFilter {
  id: string;
}
export interface CreateDashboardFilter {
  name: string;
  description: string;
}
export interface DeleteDashboardFilter {
  id: string;
}

export interface UpdateDashboardInput {
  id: string;
  dashboard: DashboardState;
}

const getDashboards = async () => {
  try {
    const jsonFiles = fs
      .readdirSync(DASHBOARDS_PATH)
      .filter((f) => f.endsWith(".json"));
    return jsonFiles.map((jsonFile) => {
      const filePath = path.join(DASHBOARDS_PATH, jsonFile);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return {
        id: path.basename(jsonFile, ".json"),
        name: data.name,
        description: data.description,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });
  } catch (err) {
    throw buildApiError(
      "900d8ea9-873d-4aa0-a692-6916485097ed",
      errInvalidDashboard,
      {
        detail: "Error fetching dashboards",
        errors: err,
      },
    );
  }
};

const getDashboard = async (filters: GetDashboardFilter) => {
  const { id } = filters;
  try {
    const cleanedId = sanitizeId(id);
    const filePath = path.join(DASHBOARDS_PATH, `${cleanedId}.json`);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } else {
      throw buildApiError(
        "d82f6415-918f-4b79-8099-28e3c73e79ba",
        errDashboardNotFound,
        {
          detail: "Dashboard not found",
        },
      );
    }
  } catch (err) {
    throw buildApiError(
      "1555d8ef-214d-418a-a1b9-f04d2da31f79",
      errMalformedDashboard,
      {
        detail: "Malformed dashboard",
        errors: err,
      },
    );
  }
};

const createDashboard = async (filters: CreateDashboardFilter) => {
  const { name, description } = filters;
  if (!name) {
    throw buildApiError(
      "241ab280-c522-4c2f-bb36-ea93d4a682f2",
      errMissingName,
      {
        detail: "Name is required",
      },
    );
  }
  const id = uuidv4();
  const newDashboard = getNewDashboardObject({ id, name, description });
  const dashboardFilePath = path.join(DASHBOARDS_PATH, `${id}.json`);

  if (fs.existsSync(dashboardFilePath)) {
    throw buildApiError(
      "58c4053f-f369-4a49-a5eb-a86e5bffe2e3",
      errDashboardAlreadyExists,
      {
        detail: "Dashboard already exists",
      },
    );
  }

  if (!validateDashboardObject(newDashboard)) {
    throw buildApiError(
      "92117629-b3d8-4c51-9814-6d01a4434220",
      errMalformedDashboard,
      {
        detail: "Malformed dashboard",
      },
    );
  }

  fs.writeFileSync(dashboardFilePath, JSON.stringify(newDashboard));
  return newDashboard;
};

export const updateDashboard = async (input: UpdateDashboardInput) => {
  const { id, dashboard: updatedDashboard } = input;

  if (!id) {
    throw buildApiError(
      "9050e9bb-6b7b-479f-919f-8166ed31883a",
      errInvalidDashboardId,
      {
        detail: "Dashboard id is required",
      },
    );
  }

  const sanitizedDashboardId = sanitizeId(id);

  const dashboard = await getDashboard({ id: sanitizedDashboardId });

  if (!dashboard) {
    throw buildApiError(
      "d0a5f686-b156-4a37-905d-af4b1093f1ad",
      errDashboardNotFound,
      {
        detail: "Dashboard not found",
      },
    );
  }

  const filePath = path.join(DASHBOARDS_PATH, `${sanitizedDashboardId}.json`);

  try {
    fs.writeFileSync(filePath, JSON.stringify(updatedDashboard));
    return updatedDashboard;
  } catch (err) {
    throw buildApiError(
      "b4cb2d6b-72ae-4252-94db-162737461e41",
      errUpdatingDashboard,
      {
        detail: "Something went wrong updating the dashboard",
        errors: err,
      },
    );
  }
};

const deleteDashboard = async (filters: DeleteDashboardFilter) => {
  const { id } = filters;
  const sanitizedDashboardId = sanitizeId(id);
  const filePath = path.join(DASHBOARDS_PATH, `${sanitizedDashboardId}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  } else {
    throw buildApiError(
      "0b77c1a3-9195-496d-8df6-eb14e8abf5eb",
      errInvalidDashboard,
      {
        detail: "Dashboard not found",
        errors: "Dashboard not found",
      },
    );
  }
  return { success: true };
};

export const DashboardServices = {
  getDashboards,
  getDashboard,
  createDashboard,
  updateDashboard,
  deleteDashboard,
};
