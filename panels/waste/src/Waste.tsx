import { useGetPanelStyleToCssStyle } from "@home-assistant-react/helpers/src/panels/useGetPanelStyleToCssStyle";
import { PanelFC } from "@home-assistant-react/types/src";
import { usePanel } from "@home-assistant-react/api/src";
import React from "react";
import { formatDateYYMMDD } from "@home-assistant-react/helpers/src/dates/formatDateYYMMDD";
import moment from "moment";
import { WasteType } from "@home-assistant-react/types/src/panels/waste-type";
import { Box, Flex } from "@home-assistant-react/ui/src";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { WasteOptions } from "./types";
import { UPDATE_TIME, wasteInfo } from "./defines";
import { findTypeByDate } from "./helpers";
import { sanitizeDep } from "@home-assistant-react/helpers/src/ui/sanitizeDep";

const classes = {
  Wrapper: "items-center justify-center w-full h-full gap-1 flex-col",
};

export const Waste: PanelFC<WasteOptions> = (props) => {
  const panelStyleToCssStyle = useGetPanelStyleToCssStyle();
  const options = props.panel.options;
  const panel = usePanel();
  const [currentDate, setCurrentDate] = React.useState(
    formatDateYYMMDD(new Date()),
  );
  const [currentType, setCurrentType] = React.useState<WasteType>();

  const updateWasteType = () => {
    const newDate = formatDateYYMMDD(
      options?.showNextDate !== false
        ? moment().add(1, "day").toDate()
        : moment().toDate(),
    );
    //const newType = options?.dates?.[newDate];
    const newType = findTypeByDate(
      {
        monday: options?.monday,
        tuesday: options?.tuesday,
        wednesday: options?.wednesday,
        thursday: options?.thursday,
        friday: options?.friday,
        saturday: options?.saturday,
        sunday: options?.sunday,
      },
      options?.customDates || [],
      options?.customWeekDays || [],
      newDate,
    );
    const info = newType
      ? wasteInfo[newType as keyof typeof wasteInfo]
      : undefined;
    setCurrentDate(newDate);
    setCurrentType(newType);
    panel.updatePanelStyle?.(() => {
      return {
        ...(info?.background ? { background: info?.background } : undefined),
        ...(info?.color ? { color: info?.color } : undefined),
        ...panelStyleToCssStyle(props.panel.styles?.[newType || "NONE"]),
      };
    });
  };

  const info = currentType
    ? wasteInfo[currentType as keyof typeof wasteInfo]
    : wasteInfo[WasteType.None];
  React.useEffect(() => {
    updateWasteType();
    const timeout = setTimeout(() => {
      updateWasteType();
    }, UPDATE_TIME);

    return () => clearTimeout(timeout);
  }, [currentDate, sanitizeDep(props.panel.styles)]);

  const hasSomethingToTrash =
    currentType !== WasteType.Empty &&
    currentType !== WasteType.NoService &&
    currentType !== WasteType.None;

  if (!info) return;

  return (
    <Flex className={classes.Wrapper}>
      {hasSomethingToTrash ? (
        <>
          <Box>To put out</Box>
          {info.icon && <info.icon width={100} height={100} />}
          <Box>{info.name}</Box>
        </>
      ) : (
        <>{getMdiIcon("recycle", { size: 2 })}Nulla da gettare</>
      )}
    </Flex>
  );
};
