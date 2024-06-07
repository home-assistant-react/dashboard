export interface DashboardsListItem {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface DashboardsListResult {
  dashboards: DashboardsListItem[];
}

export interface DashboardCreateInput {
  name: string;
  description?: string;
}
