import { SettingSectionId } from "@home-assistant-react/types/src/settings/setting-sections";
import { useLayout } from "@home-assistant-react/ui/src/components/layout/LayoutProvider";
import React from "react";
import { createPortal } from "react-dom";
import { Flex, Box } from "@home-assistant-react/ui/src";
import { SettingsDrawerProvider } from "./settings-drawer-context";
import { SettingsContent } from "./SettingsContent";
import { SettingsSidebar } from "./SettingsSidebar";

const classes = {
  Wrapper: "z-drawer fixed inset-0",
  Overlay:
    "backdrop-blur-md bg-primary-background/70 dark:bg-black/70 fixed inset-0 animate-in fade-in",
  Drawer:
    "z-drawer gap-2 shadow-xl bg-primary-background/70 dark:bg-primary-background/80 rounded-xl w-11/12 fixed bottom-0 top-0 left-0 animate-in slide-in-from-left-10 fade-in duration-500",
};

export const SettingsDrawer = React.forwardRef<HTMLDivElement>(
  (_props, ref) => {
    const { settingsDisclosure } = useLayout();

    if (!settingsDisclosure.isOpen) return null;

    return createPortal(
      <SettingsDrawerProvider
        value={{
          selectedSection: SettingSectionId.Dashboards,
          settingsDisclosure,
        }}
      >
        <Flex className={classes.Wrapper} ref={ref}>
          <Box
            className={classes.Overlay}
            onClick={settingsDisclosure.close.bind(null, undefined)}
          />
          <Flex className={classes.Drawer}>
            <SettingsSidebar />
            <SettingsContent />
          </Flex>
        </Flex>
      </SettingsDrawerProvider>,
      window.document.body,
    );
  },
);

SettingsDrawer.displayName = "SettingsDrawer";
