import { useDashboard } from "@home-assistant-react/api/src";
import { sanitizeDep } from "@home-assistant-react/helpers/src/ui/sanitizeDep";
import { defaultDashboardOptions } from "@home-assistant-react/types/src";
import { Box, Flex } from "@home-assistant-react/ui/src";
import React from "react";

const heightClass = "h-16";

const classes = {
  Container: heightClass,
  Wrapper: "absolute z-sticky w-full",
  BackdropSelectLine: "",
  SelectLine:
    "absolute bottom-0 left-0 w-full h-1 bg-primary pointer-events-none transition-all duration-300 w-0",
  Background: `${heightClass} relative w-full bg-primary-background/60 backdrop-blur-xl border-b border-gray-400 border-opacity-20`,
  Item: "py-2 mx-4 cursor-pointer font-bold opacity-50 text-primary select-none",
  SelectedItem: "font-bold opacity-100",
};

export const DashboardSections: React.FC = () => {
  const { selectedDashboardView, setSelectedDashboardView, views, settings } =
    useDashboard();
  const outlineSelectionRef = React.useRef<HTMLDivElement>(null);
  const outlineSelectionBackDropRef = React.useRef<HTMLDivElement>(null);

  const viewSelectorPosition =
    settings?.viewSelectorPosition ??
    defaultDashboardOptions.viewSelectorPosition ??
    "top";

  React.useEffect(() => {
    const selectedElement = document.querySelector<HTMLDivElement>(
      `[data-view-id="dashboard-section-${selectedDashboardView}"]`,
    );
    if (
      selectedElement &&
      outlineSelectionRef.current &&
      outlineSelectionBackDropRef.current
    ) {
      outlineSelectionRef.current.style.width = `${selectedElement.clientWidth}px`;
      outlineSelectionRef.current.style.transform = `translateX(${selectedElement.offsetLeft}px)`;

      outlineSelectionBackDropRef.current.style.width = `${selectedElement.clientWidth}px`;
      outlineSelectionBackDropRef.current.style.transform = `translateX(${selectedElement.offsetLeft}px)`;
    }
  }, [
    viewSelectorPosition,
    outlineSelectionRef,
    selectedDashboardView,
    outlineSelectionBackDropRef,
    sanitizeDep(views),
  ]);

  return (
    <Box className={classes.Container}>
      <Flex className={classes.Wrapper} id={"dashboard-sections-nav"}>
        <Box
          className={[classes.BackdropSelectLine, classes.SelectLine]}
          ref={outlineSelectionBackDropRef}
        />
        <Flex className={classes.Background}>
          <Flex className={"my-4 mx-3 w-full"}>
            <Box className={classes.SelectLine} ref={outlineSelectionRef} />
            {views.map((view) => (
              <Box
                className={[
                  classes.Item,
                  selectedDashboardView === view.id && classes.SelectedItem,
                ]}
                key={view.id}
                onClick={setSelectedDashboardView.bind(null, view.id)}
                data-view-id={`dashboard-section-${view.id}`}
              >
                {view.name}
              </Box>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
