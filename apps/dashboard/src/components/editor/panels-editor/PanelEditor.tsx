import { usePanelEditor } from "@home-assistant-react/api/src";
import React from "react";
import {
  Grid,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@home-assistant-react/ui/src";
import { Scrollbars } from "react-custom-scrollbars";
import { PanelEditorFooter } from "./PanelEditorFooter";
import { PanelStyleEditor } from "./PanelStyleEditor";
import { PanelEditorPanelOptions } from "./PanelEditorPanelOptions";
import { PanelEditorGroupOptions } from "./PanelEditorGroupOptions";

const classes = {
  Wrapper: "w-full h-full",
  Tabs: "w-full h-full flex flex-col",
  TabsList: "py-2 rounded-none border-b bg-muted",
  TabContent: "w-full h-full",
};

export const PanelEditor = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const { group } = usePanelEditor();
  return (
    <Grid
      ref={ref}
      className={classes.Wrapper}
      style={{ gridTemplateRows: "1fr auto" }}
    >
      <Tabs defaultValue="panel" className={classes.Tabs}>
        <TabsList className={classes.TabsList}>
          <TabsTrigger value="panel">Panel options</TabsTrigger>
          {!!group && <TabsTrigger value="group">Group options</TabsTrigger>}
          <TabsTrigger value="styles">Styles</TabsTrigger>
        </TabsList>
        <TabsContent value="panel" className={classes.TabContent}>
          <Scrollbars style={{ height: "100%" }}>
            <PanelEditorPanelOptions />
          </Scrollbars>
        </TabsContent>
        {!!group && (
          <TabsContent value="group" className={classes.TabContent}>
            <PanelEditorGroupOptions />
          </TabsContent>
        )}
        <TabsContent value="styles" className={classes.TabContent}>
          <PanelStyleEditor />
        </TabsContent>
      </Tabs>
      <PanelEditorFooter />
    </Grid>
  );
});

PanelEditor.displayName = "PanelEditor";
