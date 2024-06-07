import express from "express";
import { ImportExportControllers } from "../../../controllers/import-export.controllers";
import { auth } from "../../../helpers/auth";

export const importExportRoutes = express.Router();

importExportRoutes.post(
  "/export/all",
  auth(),
  ...ImportExportControllers.exportAll,
);

importExportRoutes.post(
  "/import/all",
  auth(),
  ...ImportExportControllers.importAll,
);
