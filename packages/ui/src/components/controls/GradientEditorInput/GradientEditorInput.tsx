import { logError } from "@home-assistant-react/helpers/src";
import React from "react";
import { TextInput } from "../../../form/TextInput";
import { GradientEditorInputProps } from "./GradientEditorInput.types";
import { FormControlWrapper } from "../../form";
import { GradientSlider } from "../GradientSlider";
import { ColorPickerInput } from "../ColorPickerInput";
import { Box, Flex, Grid } from "../../../primitives/common";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";
import { Knob } from "../Knob";
import {
  generateGradientString,
  GradientInfo,
  parseGradientString,
} from "@home-assistant-react/helpers/src/css/parse-gradient-string";

const classes = {
  Wrapper: "gap-6 flex-col",
  StopsContainer: "gap-6 grid-cols-2",
  OptionsContainer: "gap-6 items-center",
};

const getCompleteGradientInfo = (
  gradientInfo?: GradientInfo | null,
  angle?: string,
) => {
  return {
    type: gradientInfo?.type || "linear-gradient",
    angle: gradientInfo?.angle || angle || "90deg",
    stops: gradientInfo?.stops || [],
  };
};

export const GradientEditorInput = React.forwardRef<
  HTMLDivElement,
  GradientEditorInputProps
>((props, ref) => {
  const { value: userValue, onChange, ...rest } = props;

  const [gradientValue, setValue] = React.useState<string>(userValue || "");
  const value = userValue || gradientValue;

  const gradientInfo = value ? parseGradientString(value) : null;
  const [angle, setAngle] = React.useState<string>(
    gradientInfo?.angle || "90deg",
  );
  const numericAngle = parseInt(angle.replace("deg", ""), 10);

  const updateGradient = (gradientInfo: GradientInfo) => {
    let gradientString = "";
    try {
      gradientString = generateGradientString(gradientInfo);
    } catch (e) {
      logError(e);
    }
    setValue(gradientString);
    onChange?.(gradientString, gradientInfo);
  };

  const handleColorChange = (
    index: number,
    color: string,
    position: number,
  ) => {
    const newGradientInfo = getCompleteGradientInfo(gradientInfo, angle);
    newGradientInfo.stops[index].color = color;
    newGradientInfo.stops[index].position = position;

    updateGradient(newGradientInfo);
  };

  const handleDelete = (index: number) => {
    if (!gradientInfo) return;
    const newGradientInfo = getCompleteGradientInfo(gradientInfo, angle);
    newGradientInfo.stops.splice(index, 1);
    updateGradient(newGradientInfo);
  };

  const handleTypeChange = (value: string) => {
    if (!gradientInfo) return;
    const newGradientInfo = getCompleteGradientInfo(gradientInfo, angle);
    newGradientInfo.type = value;
    updateGradient(newGradientInfo);
  };

  const handleAngleChange = (value: number) => {
    setAngle(`${value}deg`);
    if (!gradientInfo) return;
    const newGradientInfo = getCompleteGradientInfo(gradientInfo, angle);
    newGradientInfo.angle = `${value}deg`;
    updateGradient(newGradientInfo);
  };

  return (
    <Flex className={classes.Wrapper} ref={ref}>
      <FormControlWrapper variant={"unstyled"} {...rest}>
        <GradientSlider gradient={gradientInfo} onChange={updateGradient} />
      </FormControlWrapper>
      {!!gradientInfo?.stops?.length && (
        <FormControlWrapper label={"Gradient stops"} variant={"unstyled"}>
          <Grid className={classes.StopsContainer}>
            {gradientInfo?.stops?.map((stop, stopIndex) => {
              return (
                <ColorPickerInput
                  key={`gradient-item-${stopIndex}`}
                  color={stop.color}
                  position={stop.position}
                  onChange={(color, position) =>
                    handleColorChange(stopIndex, color, position)
                  }
                  onClear={handleDelete.bind(null, stopIndex)}
                  hasPosition
                  isClearable
                />
              );
            })}
          </Grid>
        </FormControlWrapper>
      )}
      {(gradientInfo?.stops?.length || 0) > 1 && (
        <Flex className={classes.OptionsContainer}>
          <FormControlWrapper wrapperClassName={"w-fit"} label={"Type"}>
            <ToggleGroup
              type={"single"}
              value={gradientInfo?.type || "linear-gradient"}
              onValueChange={handleTypeChange}
            >
              <ToggleGroupItem value={"linear-gradient"}>
                Linear
              </ToggleGroupItem>
              <ToggleGroupItem value={"radial-gradient"}>
                Radial
              </ToggleGroupItem>
            </ToggleGroup>
          </FormControlWrapper>
          {gradientInfo?.type === "linear-gradient" && (
            <TextInput
              wrapperClassName={"max-w-40"}
              value={numericAngle}
              label={"Angle"}
              rightSlot={[
                <Box
                  key={"angle-control"}
                  style={{ marginTop: "-10px", padding: 4 }}
                >
                  <Knob
                    value={numericAngle}
                    onChange={handleAngleChange}
                    min={0}
                    max={360}
                    size={40}
                  />
                </Box>,
              ]}
            />
          )}
        </Flex>
      )}
    </Flex>
  );
});

GradientEditorInput.displayName = "GradientEditorInput";
