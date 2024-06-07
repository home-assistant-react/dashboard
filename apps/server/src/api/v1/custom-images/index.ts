import express from "express";
import { CustomImageControllers } from "../../../controllers/custom-images.controller";
import { auth } from "../../../helpers/auth";

export const customImageRoutes = express.Router();

customImageRoutes.post(
  "/custom-images/upload",
  auth(),
  ...CustomImageControllers.uploadImage,
);
customImageRoutes.get(
  "/custom-images",
  auth(),
  ...CustomImageControllers.getCustomImages,
);
customImageRoutes.delete(
  "/custom-images/:imageId",
  auth(),
  ...CustomImageControllers.deleteCustomImage,
);
customImageRoutes.patch(
  "/custom-images/:imageId/name",
  auth(),
  ...CustomImageControllers.renameCustomImage,
);
customImageRoutes.get(
  "/custom-images/:imageId/thumbnail/:fileName",
  auth(),
  ...CustomImageControllers.downloadThumbnail,
);
customImageRoutes.get(
  "/custom-images/:imageId/i/:fileName",
  auth(),
  ...CustomImageControllers.downloadImage,
);
