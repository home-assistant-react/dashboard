import { useHass, useHassGetEntitiesOnce } from "@home-assistant-react/api/src";
import { booleanDataAttr } from "@home-assistant-react/helpers/src";
import { sanitizeDep } from "@home-assistant-react/helpers/src/ui/sanitizeDep";
import {
  SettingSectionId,
  settingSections,
} from "@home-assistant-react/types/src/settings/setting-sections";
import { Avatar, Box, Flex, Grid, Span } from "@home-assistant-react/ui/src";
import { IconFromSet } from "@home-assistant-react/ui/src/components/controls/IconPicker/IconFromSet";
import { ThemeToggle } from "@home-assistant-react/ui/src/components/layout/ThemeToggle";
import React from "react";
import { useSettingsDrawerContext } from "./settings-drawer-context";

const classes = {
  Sidebar: "w-[288px] min-w-[288px] h-full bg-secondary",
  SidebarHeader: "py-6 items-center justify-center",
  Avatar: "w-14 h-14",
  MenuItem:
    "gap-2 py-2 px-4 mx-4 my-2 rounded-md text-md text-foreground/70 border border-transparent items-center cursor-pointer hover:bg-primary-background  data-[active]:bg-primary data-[active]:text-primary-foreground data-[active]:shadow-lg",
  SidebarFooter: "text-xs bg-primary text-primary-foreground p-2",
};

export const SettingsSidebar: React.FC = () => {
  const { currentUser, config } = useHass();
  const persons = useHassGetEntitiesOnce({ domain: "person" });
  const { selectedSection, updateContext } = useSettingsDrawerContext();

  const setSelectedSection = (section: SettingSectionId) => {
    updateContext({ selectedSection: section });
  };

  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    for (const entityId in persons) {
      if (persons[entityId].attributes.user_id === currentUser?.id) {
        setAvatarUrl(
          `${config.external_url}${persons[entityId].attributes.entity_picture}`,
        );
        break;
      }
    }
  }, [currentUser?.id, sanitizeDep(persons)]);

  return (
    <Grid
      className={classes.Sidebar}
      style={{ gridTemplateRows: "auto 1fr auto" }}
    >
      <Flex className={classes.SidebarHeader}>
        <Avatar
          className={classes.Avatar}
          name={currentUser?.name || ""}
          src={avatarUrl || ""}
        />
      </Flex>
      <Box>
        {settingSections.map((section) => (
          <Flex
            key={section.id}
            data-active={booleanDataAttr(selectedSection === section.id)}
            className={classes.MenuItem}
            onClick={setSelectedSection.bind(null, section.id)}
            style={{
              transition:
                "color 0.2s ease-in-out, background-color 0.2s ease-in-out",
            }}
          >
            <IconFromSet icon={section.icon} size={5} />
            {section.label}
          </Flex>
        ))}
      </Box>
      <Box>
        <ThemeToggle />
      </Box>
      <Box className={classes.SidebarFooter}>
        <a
          className={"flex w-full items-center justify-between"}
          rel={"noreferrer"}
          href={import.meta.env.DASHBOARD_PROJECT_URL}
          target="_blank"
        >
          <Span>React Dashboard Editor</Span>
          <Span>v{import.meta.env.VITE_APP_DASHBOARD_VERSION}</Span>
        </a>
      </Box>
    </Grid>
  );
};
