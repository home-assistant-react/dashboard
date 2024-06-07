import {
  SettingSectionId,
  settingSections,
} from "@home-assistant-react/types/src/settings/setting-sections";
import { Box, Button, Flex } from "@home-assistant-react/ui/src";
import { Heading } from "@home-assistant-react/ui/src/components/data-display/Heading";
import React from "react";
import { CloudIntegrationsSettings } from "./sections/cloud-integrations/CloudIntegrationsSettings";
import { CustomIconsSettings } from "./sections/custom-icons/CustomIconsSettings";
import { CustomImagesSettings } from "./sections/custom-images/CustomImagesSettings";
import { DashboardsListSettings } from "./sections/dashboards/DashboardsListSettings";
import { DefaultStylesSettings } from "./sections/default-styles/DefaultStylesSettings";
import { GeneralSettings } from "./sections/general-settings/GeneralSettings";
import { ImportExportSettings } from "./sections/import-export/ImportExportSettings";
import { PluginsSettings } from "./sections/plugins/PluginsSettings";
import { useSettingsDrawerContext } from "./settings-drawer-context";

const classes = {
  Content: "flex-grow w-full h-full flex-col",
  ContentHeading: "px-10 py-10 flex justify-between items-center",
  HeadingTitle: "flex-grow",
};

const sectionToComponent = {
  [SettingSectionId.Settings]: GeneralSettings,
  [SettingSectionId.Dashboards]: DashboardsListSettings,
  [SettingSectionId.DefaultStyles]: DefaultStylesSettings,
  [SettingSectionId.CloudIntegrations]: CloudIntegrationsSettings,
  [SettingSectionId.CustomIcons]: CustomIconsSettings,
  [SettingSectionId.CustomImages]: CustomImagesSettings,
  [SettingSectionId.Plugins]: PluginsSettings,
  [SettingSectionId.ExportImport]: ImportExportSettings,
};

export const SettingsContent: React.FC = () => {
  const { selectedSection, settingsDisclosure } = useSettingsDrawerContext();
  const section = React.useMemo(() => {
    return settingSections.find((section) => section.id === selectedSection);
  }, [selectedSection]);

  return (
    <Flex className={classes.Content}>
      <Heading className={classes.ContentHeading}>
        <Box className={classes.HeadingTitle}>{section?.label}</Box>
        <Box>
          <Button
            iconRight={"X"}
            variant={"ghost"}
            onClick={() => {
              settingsDisclosure.close();
            }}
          />
        </Box>
      </Heading>
      {section?.id && React.createElement(sectionToComponent[section.id])}
    </Flex>
  );
};
