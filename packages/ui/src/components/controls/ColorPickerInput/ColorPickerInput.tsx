import React from "react";
import { FormControlWrapper } from "../../../form/FormControlWrapper";
import { TextInput } from "../../../form/TextInput";
import { ColorPickerInputProps } from "./ColorPickerInput.types";
import { extractOpacityFromRGBA } from "@home-assistant-react/helpers/src/colors/get-rgba-opacity";
import {
  getRandomHex,
  hexToRgba,
  rgbaToHex,
} from "@home-assistant-react/helpers/src";
import { useBooleanValue } from "@home-assistant-react/hooks/src";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay";
import { SketchPicker } from "react-color";
import { Button } from "../../buttons";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { Box, Flex, Grid } from "../../../primitives/common";

const classes = {
  Wrapper: "gap-2",
  PreviewBox: "w-full h-full",
};

export const ColorPickerInput = React.forwardRef<
  HTMLDivElement,
  ColorPickerInputProps
>((props, ref) => {
  const {
    color,
    position,
    onChange,
    onClear,
    hasPosition = false,
    isClearable = true,
    label,
  } = props;

  const opacity = (color ? extractOpacityFromRGBA(color) : 1) * 100;

  const selectedColor = color;
  const [currentColor, setCurrentColor] = React.useState(
    selectedColor ? rgbaToHex(selectedColor, false) : "",
  );

  const [currentOpacity, setCurrentOpacity] = React.useState(String(opacity));
  const [currentPosition, setCurrentPosition] = React.useState(
    String(position),
  );

  const isPositionInputFocused = useBooleanValue();

  const handleRgbaColorChange = (rgba: string) => {
    onChange?.(rgba, position || 0);
  };

  const handlePositionBlur = () => {
    onChange?.(
      hexToRgba(currentColor, Number(currentOpacity) / 100),
      Number(currentPosition) || 0,
    );
    isPositionInputFocused.setFalse();
  };
  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    // Check if the input value is a valid number between 0 and 100
    if (
      /^\d*$/.test(String(inputValue)) &&
      inputValue >= 0 &&
      inputValue <= 100
    ) {
      setCurrentPosition(String(inputValue));
    }
  };

  React.useEffect(() => {
    setCurrentColor(selectedColor ? rgbaToHex(selectedColor, false) : "");
  }, [color]);

  React.useEffect(() => {
    setCurrentOpacity(String(opacity));
  }, [opacity]);

  React.useEffect(() => {
    setCurrentPosition(String(position));
  }, [position]);

  return (
    <FormControlWrapper variant={"unstyled"} ref={ref} label={label}>
      <Grid
        className={classes.Wrapper}
        style={{
          gridTemplateColumns: hasPosition ? "auto 1fr auto" : "auto auto 1fr",
        }}
      >
        <Box>
          <Popover>
            <PopoverTrigger>
              <FormControlWrapper
                wrapperClassName={"h-10 w-10 p-0 overflow-hidden"}
              >
                <Flex
                  className={classes.PreviewBox}
                  style={{ backgroundColor: selectedColor }}
                />
              </FormControlWrapper>
            </PopoverTrigger>
            <PopoverContent>
              <SketchPicker
                styles={{
                  default: {
                    picker: { boxShadow: "none", margin: 0, padding: 0 },
                  },
                }}
                //TODO ADD PRESET COLORS
                color={color ? rgbaToHex(color) : getRandomHex()}
                onChange={(color) =>
                  handleRgbaColorChange(
                    `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`,
                  )
                }
              />
            </PopoverContent>
          </Popover>
        </Box>
        {hasPosition && (
          <Box>
            <TextInput
              onFocus={isPositionInputFocused.setTrue}
              onChange={handlePositionChange}
              onBlur={handlePositionBlur}
              value={isPositionInputFocused.value ? currentPosition : position}
            />
          </Box>
        )}
        {isClearable && color && (
          <Button
            onClick={onClear || (() => onChange?.("", 0))}
            variant={"ghost"}
          >
            {getMdiIcon("close", { size: 0.5 })}
          </Button>
        )}
      </Grid>
    </FormControlWrapper>
  );
});

ColorPickerInput.displayName = "ColorPickerInput";
