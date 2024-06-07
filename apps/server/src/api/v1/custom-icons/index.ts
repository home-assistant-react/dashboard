import express from "express";
import { CustomIconControllers } from "../../../controllers/custom-icons.controller";
import { auth } from "../../../helpers/auth";

export const customIconRoutes = express.Router();

customIconRoutes.post(
  "/custom-icons/upload",
  auth(),
  ...CustomIconControllers.uploadIcon,
);
customIconRoutes.get(
  "/custom-icons",
  auth(),
  ...CustomIconControllers.getCustomIcons,
);
customIconRoutes.delete(
  "/custom-icons/:iconId",
  auth(),
  ...CustomIconControllers.deleteCustomIcon,
);
customIconRoutes.patch(
  "/custom-icons/:iconId/name",
  auth(),
  ...CustomIconControllers.renameCustomIcon,
);
