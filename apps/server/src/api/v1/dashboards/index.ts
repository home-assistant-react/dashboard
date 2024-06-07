import express from "express";
import { DashboardControllers } from "../../../controllers/dashboards.controller";
import { auth } from "../../../helpers/auth";

export const dashboardRoutes = express.Router();

dashboardRoutes.get(
  "/dashboards",
  auth(),
  ...DashboardControllers.getDashboards,
);
dashboardRoutes.get(
  "/dashboards/:id",
  auth(),
  ...DashboardControllers.getDashboard,
);
dashboardRoutes.post(
  "/dashboards",
  auth(),
  ...DashboardControllers.createDashboard,
);
dashboardRoutes.patch(
  "/dashboards/:id",
  auth(),
  ...DashboardControllers.updateDashboard,
);
dashboardRoutes.delete(
  "/dashboards/:dashboardId",
  auth(),
  ...DashboardControllers.deleteDashboard,
);
