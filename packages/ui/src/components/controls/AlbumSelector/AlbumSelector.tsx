import React from "react";
import { AlbumSelectorProps } from "./AlbumSelector.types";
import { AlbumValue } from "@home-assistant-react/types/src/api";
import { Box, Flex } from "../../../primitives/common";
import { Button } from "../../buttons";
import { getEmptyAlbumValue } from "./helpers";
import { AlbumSelectItem } from "./AlbumSelectItem";

export const AlbumSelector = React.forwardRef<
  HTMLDivElement,
  AlbumSelectorProps
>((props, ref) => {
  const { value: userValue, onChange } = props;
  const [values, setValues] = React.useState<AlbumValue[]>(
    userValue || [getEmptyAlbumValue()],
  );

  const updateValue = (values: AlbumValue[]) => {
    onChange?.(values);
  };

  const handleAddAlbum = React.useCallback(() => {
    setValues((prevValues) => [...prevValues, getEmptyAlbumValue()]);
  }, []);

  const handleIntegrationSelect = React.useCallback(
    (
      key: string,
      integrationName: string,
      auth_key: string,
      album_id?: string,
    ) => {
      setValues((prevValues) => {
        const newValues = [...prevValues];
        const index = newValues.findIndex((value) => value.key === key);
        newValues[index].integration = integrationName;
        newValues[index].auth_key = auth_key;
        newValues[index].album_id = album_id || "";
        updateValue(newValues);
        return newValues;
      });
    },
    [],
  );

  const handleRemoveAlbum = React.useCallback((albumKey: string) => {
    setValues((prevValues) => {
      const newValues = prevValues.filter((value) => value.key !== albumKey);
      updateValue(newValues);
      return newValues;
    });
  }, []);

  return (
    <Flex
      style={{
        flexDirection: "column",
        gap: 24,
        width: "100%",
      }}
      ref={ref}
    >
      {values.map((value) => (
        <AlbumSelectItem
          key={value.key}
          value={value}
          onSelect={handleIntegrationSelect.bind(null, value.key)}
          onDelete={handleRemoveAlbum.bind(null, value.key)}
        />
      ))}
      <Box>
        <Button onClick={handleAddAlbum} icon={"Plus"} variant={"outline"}>
          Add album
        </Button>
      </Box>
    </Flex>
  );
});

AlbumSelector.displayName = "AlbumSelector";
