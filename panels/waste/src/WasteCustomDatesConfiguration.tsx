import { SelectInput } from "@home-assistant-react/ui/src/form/SelectInput";
import React from "react";
import { CustomDate, WasteOptions } from "./types";
import { Box, Button, Flex, SelectItem } from "@home-assistant-react/ui/src";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { WasteType } from "@home-assistant-react/types/src/panels/waste-type";
import { v4 as uuid } from "uuid";
import { wasteValues } from "./defines";
import { pad } from "@home-assistant-react/helpers/src";
import { usePanelEditor } from "@home-assistant-react/api/src";
import { Panel } from "@home-assistant-react/types/src";
export const WasteCustomDatesConfiguration: React.FC<{ isDays?: boolean }> = ({
  isDays,
}) => {
  const panelEditor = usePanelEditor();
  const panel: Panel<WasteOptions> | undefined = panelEditor.panel;
  const customDates =
    (isDays ? panel?.options?.customWeekDays : panel?.options?.customDates) ||
    [];

  const setCustomDates = (callback: (sate: CustomDate[]) => CustomDate[]) => {
    panelEditor.updateOptions(
      isDays ? "customWeekDays" : "customDates",
      callback(customDates),
    );
  };

  const handleAddCustomDate = () => {
    setCustomDates((prevState) => {
      return [
        ...prevState,
        { day: "1", month: "1", type: WasteType.NoService, id: uuid() },
      ];
    });
  };

  const handleDeleteDate = (id: string) => {
    setCustomDates((prevState) => {
      return prevState.filter((customDate) => customDate.id !== id);
    });
  };

  const handleDateMonthChange = (id: string, month: string) => {
    setCustomDates((prevState) => {
      return prevState.map((customDate) => {
        if (customDate.id !== id) return customDate;
        return { ...customDate, month };
      });
    });
  };

  const handleDateDayChange = (id: string, day: string) => {
    setCustomDates((prevState) => {
      return prevState.map((customDate) => {
        if (customDate.id !== id) return customDate;
        return { ...customDate, day };
      });
    });
  };

  const handleDateTypeChange = (id: string, type: WasteType) => {
    setCustomDates((prevState) => {
      return prevState.map((customDate) => {
        if (customDate.id !== id) return customDate;
        return { ...customDate, type };
      });
    });
  };

  const handleDateWeekDayChange = (id: string, weekDay: string) => {
    setCustomDates((prevState) => {
      return prevState.map((customDate) => {
        if (customDate.id !== id) return customDate;
        return { ...customDate, weekDay };
      });
    });
  };

  return (
    <Flex style={{ flexDirection: "column", gap: 24 }}>
      {customDates.map((customDate) => (
        <Flex key={customDate.id} style={{ gap: 8 }}>
          {isDays && (
            <SelectInput
              value={customDate.weekDay || ""}
              onChangeValue={handleDateWeekDayChange.bind(null, customDate.id)}
            >
              <SelectItem value={"1"}>Monday</SelectItem>
              <SelectItem value={"2"}>Tuesday</SelectItem>
              <SelectItem value={"3"}>Wednesday</SelectItem>
              <SelectItem value={"4"}>Thursday</SelectItem>
              <SelectItem value={"5"}>Friday</SelectItem>
              <SelectItem value={"6"}>Saturday</SelectItem>
              <SelectItem value={"7"}>Sunday</SelectItem>
            </SelectInput>
          )}
          {!isDays && (
            <SelectInput
              value={customDate.day}
              onChangeValue={handleDateDayChange.bind(null, customDate.id)}
            >
              {new Array(31).fill(0).map((_, index) => (
                <SelectItem key={index} value={String(index + 1)}>
                  {pad(index + 1)}
                </SelectItem>
              ))}
            </SelectInput>
          )}
          <SelectInput
            value={customDate.month}
            onChangeValue={handleDateMonthChange.bind(null, customDate.id)}
          >
            <SelectItem value={"1"}>January</SelectItem>
            <SelectItem value={"2"}>February</SelectItem>
            <SelectItem value={"3"}>March</SelectItem>
            <SelectItem value={"4"}>April</SelectItem>
            <SelectItem value={"5"}>May</SelectItem>
            <SelectItem value={"6"}>June</SelectItem>
            <SelectItem value={"7"}>July</SelectItem>
            <SelectItem value={"8"}>August</SelectItem>
            <SelectItem value={"9"}>September</SelectItem>
            <SelectItem value={"10"}>October</SelectItem>
            <SelectItem value={"11"}>November</SelectItem>
            <SelectItem value={"12"}>December</SelectItem>
          </SelectInput>
          <SelectInput
            value={customDate.type}
            onChangeValue={handleDateTypeChange.bind(null, customDate.id)}
          >
            {wasteValues.map((option, optionKey) => (
              <SelectItem key={optionKey} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectInput>
          <Button
            onClick={handleDeleteDate.bind(null, customDate.id)}
            variant={"ghost"}
          >
            {getMdiIcon("trashCanOutline")}
          </Button>
        </Flex>
      ))}
      <Box>
        <Button onClick={handleAddCustomDate} variant={"outline"}>
          {getMdiIcon("plus", { size: 0.8 })}Add custom date
        </Button>
      </Box>
    </Flex>
  );
};
