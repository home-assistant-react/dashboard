import express from "express";
import { customIconRoutes } from "./custom-icons";
import { customImageRoutes } from "./custom-images";
import { dashboardRoutes } from "./dashboards";
import { importExportRoutes } from "./import-export";
import { integrationsRoutes } from "./integrations";
import { pluginsRoutes } from "./plugins";

const router = express.Router();

router.use(dashboardRoutes);
router.use(customIconRoutes);
router.use(customImageRoutes);
router.use(pluginsRoutes);
router.use(importExportRoutes);
router.use("/integrations", integrationsRoutes);

router.get("/", (_, res) => {
  res.json({ message: "Hello, World!" });
});

export const v1 = router;
