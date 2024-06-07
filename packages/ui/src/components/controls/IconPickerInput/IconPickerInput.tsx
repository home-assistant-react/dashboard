import React from "react";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { useBooleanValue } from "@home-assistant-react/hooks/src";
import { IconFromSet } from "../IconPicker/IconFromSet";
import { IconPickerInputProps } from "./IconPickerInput.types";
import { FormControlWrapper } from "../../form";
import { Box, Flex } from "../../../primitives/common";
import { Button } from "../../buttons";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay";
import { IconPicker, IconValue } from "../IconPicker";

const classes = {
  FormControl: "gap-2 items-center",
  PreviewBox:
    "rounded-md border border-primary/60 border-2 h-10 w-10 items-center justify-center",
  EmptySelection: "bg-muted/60",
  PopoverContent: "bg-primary-background p-0 w-[550px]",
  PopoverArrow: "fill-muted",
};

export const IconPickerInput: React.FC<IconPickerInputProps> = ({
  value: userValue,
  onChange,
  isClearable = true,
  initialIconSet,
  ...rest
}) => {
  const [value, setValue] = React.useState<IconValue | undefined>();
  const isOpen = useBooleanValue();
  const handleSelectIcon = (icon: IconValue) => {
    setValue(icon);
    onChange?.(icon);
    isOpen.setFalse();
  };

  const handleClear = () => {
    setValue(undefined);
    onChange?.(undefined);
  };

  const iconValue = userValue || value;

  return (
    <FormControlWrapper
      className={classes.FormControl}
      variant={"unstyled"}
      {...rest}
    >
      <Popover open={isOpen.value} onOpenChange={isOpen.setValue}>
        <PopoverTrigger>
          <Box>
            <Flex
              className={[
                classes.PreviewBox,
                !iconValue ? classes.EmptySelection : undefined,
              ]}
            >
              {!iconValue && getMdiIcon("circleOffOutline", { size: 0.8 })}
              {iconValue && <IconFromSet icon={iconValue} />}
            </Flex>
          </Box>
        </PopoverTrigger>
        <PopoverContent
          arrowProps={{ className: classes.PopoverArrow }}
          className={classes.PopoverContent}
        >
          <IconPicker
            onSelect={handleSelectIcon}
            initialIconSet={iconValue?.set || initialIconSet}
          />
        </PopoverContent>
      </Popover>
      {isClearable && iconValue && (
        <Button variant={"ghost"} onClick={handleClear}>
          {getMdiIcon("close", { size: 0.8 })}
        </Button>
      )}
    </FormControlWrapper>
  );
};
