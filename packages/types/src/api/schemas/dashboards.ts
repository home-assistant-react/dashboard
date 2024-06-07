import { z } from "zod";

export const getDashboardSchema = z.object({
  id: z.string(),
});
export const createDashboardSchema = z.object({
  name: z.string(),
  description: z.string(),
});
export const deleteDashboardSchema = z.object({
  dashboardId: z.string(),
});

export type GetDashboardInput = z.infer<typeof getDashboardSchema>;
export type CreateDashboardInput = z.infer<typeof createDashboardSchema>;
export type DeleteDashboardInput = z.infer<typeof deleteDashboardSchema>;
