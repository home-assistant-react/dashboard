import { DashboardState } from "@home-assistant-react/types/src";
import {
  CreateDashboardInput,
  createDashboardSchema,
  DeleteDashboardInput,
  deleteDashboardSchema,
  GetDashboardInput,
} from "@home-assistant-react/types/src/api/schemas/dashboards";
import { defineController } from "../helpers/defineController";
import { DashboardServices } from "../services/dashboards.service";
import { validate } from "../helpers/validators/validate";

const getDashboards = defineController(async () => {
  const dashboards = await DashboardServices.getDashboards();
  return { dashboards };
});

const getDashboard = defineController<GetDashboardInput>(
  async ({ request }) => {
    const { id } = request!.params;
    return await DashboardServices.getDashboard({ id });
  },
);

const createDashboard = defineController<CreateDashboardInput>(
  async ({ request }) => {
    const { name, description } = request!.body;
    return await DashboardServices.createDashboard({ name, description });
  },
  validate(createDashboardSchema),
);

const updateDashboard = defineController<CreateDashboardInput>(
  async ({ request }) => {
    return await DashboardServices.updateDashboard({
      id: request!.params.id,
      dashboard: request!.body as DashboardState,
    });
  },
);

const deleteDashboard = defineController<DeleteDashboardInput>(
  async ({ request }) => {
    const { dashboardId } = request!.params;
    return await DashboardServices.deleteDashboard({ id: dashboardId });
  },
  validate(deleteDashboardSchema),
);

export const DashboardControllers = {
  getDashboards,
  getDashboard,
  createDashboard,
  updateDashboard,
  deleteDashboard,
};
