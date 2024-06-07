import common from "@home-assistant-react/helpers/src/i18n/translations/en/common.json";

export const en = {
  common,
  onboarding: {
    helloHeading: "👋 Hello, {{name}}!",
    helloCopyWithDashboards:
      "You have not selected a dashboard yet for this instance. You already have {{count}} dashboard(s) available. If you want to create a new one, click the button below.",
    helloCopyNoDashboards:
      "You have no dashboards created yet. Create your first dashboard using the form below.",
    selectDashboardConfirmTitle: "Select {{name}} dashboard",
    selectDashboardConfirmMessage:
      "Are you sure you want to select the dashboard {{name}}? You can always change this later.",
    addNewDashboardButton: "Add new dashboard",
    createNewDashboardModalTitle: "Create new dashboard",
  },
  dashboardCreation: {
    createNewDashboardButton: "Create new dashboard",
    dashboardNameInputLabel: "Dashboard name",
    dashboardNameInputPlaceholder: "Enter a name for your dashboard",
    dashboardDescriptionInputLabel: "Description",
    dashboardDescriptionInputHelperText:
      "Enter a description for your dashboard",
  },
};
