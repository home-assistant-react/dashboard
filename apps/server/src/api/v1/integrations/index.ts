import express from "express";
import { IntegrationControllers } from "../../../controllers/integrations.controllers";
import { auth } from "../../../helpers/auth";

export const integrationsRoutes = express.Router();

integrationsRoutes.post(
  "/:integrationName/auth/start",
  auth(),
  ...IntegrationControllers.authStart,
);

integrationsRoutes.get(
  "/:integrationName/auth/redirect",
  auth({ isIntegrationAuth: true }),
  ...IntegrationControllers.authRedirect,
);

integrationsRoutes.get(
  "/:integrationName/auth/login",
  auth({ isIntegrationAuth: true }),
  ...IntegrationControllers.authLogin,
);

integrationsRoutes.post(
  "/:integrationName/auth/cancel",
  auth({ isIntegrationAuth: true }),
  ...IntegrationControllers.authCancel,
);

integrationsRoutes.get(
  "/:integrationName/photos/photo",
  auth(),
  ...IntegrationControllers.getPhoto,
);

integrationsRoutes.delete(
  "/:integrationName/:authId",
  auth(),
  ...IntegrationControllers.deleteIntegration,
);

integrationsRoutes.post(
  "/:integrationName/photos",
  auth(),
  ...IntegrationControllers.getPhotosInAlbum,
);

integrationsRoutes.get(
  "/:integrationName/photos/albums",
  auth(),
  ...IntegrationControllers.getAlbums,
);

integrationsRoutes.post("/", auth(), ...IntegrationControllers.getIntegrations);
integrationsRoutes.post(
  "/photos/random",
  auth(),
  ...IntegrationControllers.getRandomPhotos,
);
