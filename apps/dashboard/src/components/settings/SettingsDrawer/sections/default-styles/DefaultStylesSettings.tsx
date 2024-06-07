import { useDashboard } from "@home-assistant-react/api/src";
import { ThemeStyles } from "@home-assistant-react/types/src";
import { StyleEditorCategory } from "@home-assistant-react/types/src/style-editor";
import {
  Box,
  Button,
  cn,
  ColorPickerInput,
  Flex,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@home-assistant-react/ui/src";
import { StyleEditor } from "@home-assistant-react/ui/src/editor";
import { ThemeImportExportDropdown } from "@home-assistant-react/ui/src/editor/components/ThemeImportExportDropdown";
import { ThemeSelectInput } from "@home-assistant-react/ui/src/editor/components/ThemeSelectInput";
import { ViewSelectInput } from "@home-assistant-react/ui/src/editor/components/ViewSelectInput";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

export type DefaultStylesSettingsProps = ThemeStyles[];

const availableColors = [
  {
    key: "background",
    label: "Background",
  },
  {
    key: "alt-background",
    label: "Alt Background",
  },
  {
    key: "foreground",
    label: "Foreground",
  },
  {
    key: "card",
    label: "Card",
  },
  {
    key: "card-foreground",
    label: "Card Foreground",
  },
  {
    key: "popover",
    label: "Popover",
  },
  {
    key: "popover-foreground",
    label: "Popover Foreground",
  },
  {
    key: "primary",
    label: "Primary",
  },
  {
    key: "primary-foreground",
    label: "Primary Foreground",
  },
  {
    key: "primary-background",
    label: "Primary Background",
  },
  {
    key: "secondary",
    label: "Secondary",
  },
  {
    key: "secondary-foreground",
    label: "Secondary Foreground",
  },
  {
    key: "muted",
    label: "Muted",
  },
  {
    key: "muted-foreground",
    label: "Muted Foreground",
  },
  {
    key: "accent",
    label: "Accent",
  },
  {
    key: "accent-foreground",
    label: "Accent Foreground",
  },
  {
    key: "destructive",
    label: "Destructive",
  },
  {
    key: "destructive-foreground",
    label: "Destructive Foreground",
  },
  {
    key: "border",
    label: "Border",
  },
  {
    key: "input",
    label: "Input",
  },
  {
    key: "ring",
    label: "Ring",
  },
  {
    key: "radius",
    label: "Radius",
  },
  {
    key: "semantic-success",
    label: "Semantic Success",
  },
  {
    key: "semantic-success-foreground",
    label: "Semantic Success Foreground",
  },
  {
    key: "semantic-error",
    label: "Semantic Error",
  },
  {
    key: "semantic-error-foreground",
    label: "Semantic Error Foreground",
  },
  {
    key: "semantic-warning",
    label: "Semantic Warning",
  },
  {
    key: "semantic-warning-foreground",
    label: "Semantic Warning Foreground",
  },
];

const classes = {
  Wrapper: "w-full h-full relative flex-col px-6 mb-[100px]",
};

export const DefaultStylesSettings: React.FC = () => {
  const { updateThemeOptions, theme } = useDashboard();
  const [selectedStyleKey, setSelectedStyleKey] = React.useState("colors");
  const [customStyles, setStyles] = React.useState<DefaultStylesSettingsProps>(
    theme || [],
  );
  const [selectedTheme, setSelectedTheme] = React.useState("light");
  const [selectedView, setSelectedView] = React.useState("all");

  const handleSave = () => {
    updateThemeOptions(customStyles);
  };

  const updateStyle = (styleProp: string, styleValue: unknown) => {
    setStyles((prev) => {
      const newState = [...prev];
      const themeIndex = newState.findIndex(
        (theme) => theme.theme === selectedTheme,
      );
      const theme = newState[themeIndex] || {
        theme: selectedTheme,
        views: { all: { styles: {} } },
      };

      if (!theme.views) {
        theme.views = {};
      }

      if (!theme.views?.[selectedView]) {
        theme.views[selectedView] = { styles: {} };
      }

      if (!theme.views?.[selectedView]?.styles?.[selectedStyleKey]) {
        theme.views[selectedView].styles[selectedStyleKey] = {};
      }

      theme.views[selectedView].styles[selectedStyleKey][styleProp] =
        styleValue;

      if (themeIndex === -1) {
        newState.push(theme);
      } else {
        newState[themeIndex] = theme;
      }

      return newState;
    });
  };

  const currentTheme = customStyles?.find(
    (theme) => theme.theme === selectedTheme,
  );

  const currentStyles = currentTheme?.views?.[selectedView] || {
    styles: { all: {} },
  };

  return (
    <Flex className={classes.Wrapper}>
      <Flex className={"items-stretch"}>
        <Flex className={"w-full gap-6"}>
          <ThemeSelectInput
            value={selectedTheme}
            onChangeValue={(value) => {
              setSelectedTheme(value);
            }}
            label={"Theme to update"}
            className={"flex-grow"}
          />
          <ViewSelectInput
            value={selectedView}
            onChangeValue={(value) => {
              setSelectedView(value);
            }}
            label={"View to update"}
            className={"flex-grow"}
          />
          <ThemeImportExportDropdown
            key={"theme-import-export"}
            currentStyles={currentTheme}
            setStyles={setStyles}
            customStyles={customStyles}
          />
        </Flex>
      </Flex>
      <Tabs
        defaultValue={"colors"}
        className={"w-full h-full "}
        onValueChange={setSelectedStyleKey}
        value={selectedStyleKey}
      >
        <TabsList
          className={cn(
            "px-4 py-2 rounded-none border-b bg-muted rounded",
            "w-full justify-start",
          )}
        >
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
          <TabsTrigger value="panels">Panels</TabsTrigger>
          <TabsTrigger value="view-panels">View panels</TabsTrigger>
          <TabsTrigger value="sidebar-panels">Sidebar panels</TabsTrigger>
        </TabsList>
        <TabsContent value={"colors"} className={"flex-col w-full h-full"}>
          <Scrollbars style={{ height: "100%", flexGrow: 1 }}>
            <Box className={"w-full h-full"}>
              <Box
                className={"grid grid-cols-3 gap-4 w-full h-full py-10 px-4"}
              >
                {availableColors.map((color) => (
                  <ColorPickerInput
                    key={color.key}
                    label={color.label}
                    color={
                      currentStyles?.styles?.[selectedStyleKey]?.[color.key] ||
                      undefined
                    }
                    onChange={(colorValue) => {
                      updateStyle(color.key, colorValue);
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Scrollbars>
          <Box>
            <Button onClick={handleSave}>Save</Button>
          </Box>
        </TabsContent>
        <TabsContent value="background" className={"w-full h-full"}>
          <Scrollbars style={{ height: "100%", flexGrow: 1 }}>
            <StyleEditor
              key={selectedStyleKey}
              onPropertyChange={updateStyle}
              style={currentStyles?.styles?.[selectedStyleKey]}
              styleKey={selectedStyleKey}
              hasSelfScrollContainer={false}
              enabledCategories={[
                StyleEditorCategory.BackgroundGradient,
                StyleEditorCategory.BackgroundImage,
              ]}
            />
          </Scrollbars>
          <Box>
            <Button onClick={handleSave}>Save</Button>
          </Box>
        </TabsContent>
        <TabsContent value="panels" className={"w-full h-full"}>
          <Scrollbars style={{ height: "100%", flexGrow: 1 }}>
            <StyleEditor
              key={selectedStyleKey}
              onPropertyChange={updateStyle}
              style={currentStyles?.styles?.[selectedStyleKey]}
              styleKey={selectedStyleKey}
              hasSelfScrollContainer={false}
            />
          </Scrollbars>
          <Box>
            <Button onClick={handleSave}>Save</Button>
          </Box>
        </TabsContent>
        <TabsContent value="view-panels" className={"w-full h-full"}>
          <Scrollbars style={{ height: "100%", flexGrow: 1 }}>
            <StyleEditor
              key={selectedStyleKey}
              onPropertyChange={updateStyle}
              style={currentStyles?.styles?.[selectedStyleKey]}
              styleKey={selectedStyleKey}
              hasSelfScrollContainer={false}
            />
          </Scrollbars>
          <Box>
            <Button onClick={handleSave}>Save</Button>
          </Box>
        </TabsContent>
        <TabsContent value="sidebar-panels" className={"w-full h-full"}>
          <Scrollbars style={{ height: "100%", flexGrow: 1 }}>
            <StyleEditor
              key={selectedStyleKey}
              onPropertyChange={updateStyle}
              style={currentStyles?.styles?.[selectedStyleKey]}
              styleKey={selectedStyleKey}
              hasSelfScrollContainer={false}
            />
          </Scrollbars>
          <Box>
            <Button onClick={handleSave}>Save</Button>
          </Box>
        </TabsContent>
      </Tabs>
    </Flex>
  );
};
