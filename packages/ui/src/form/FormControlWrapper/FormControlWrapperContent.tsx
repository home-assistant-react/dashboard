import { Flex } from "../../primitives/common";
import { cn } from "../../helpers";
import { Icon } from "../../primitives/Icon";
import { FormControlSlot } from "./FormControlSlot";
import React from "react";
import { FormControlWrapperProps } from "./FormControlWrapper.types";
import { useFormControlWrapper } from "./FormControlWrapperProvider";

interface FormControlWrapperContentProps extends FormControlWrapperProps {
  slotFocusHandler?: (event: React.MouseEvent) => void;
}

export const FormControlWrapperContent: React.FC<
  FormControlWrapperContentProps
> = (props) => {
  const {
    leftSlot,
    rightSlot,
    leftIcon,
    rightIcon,
    children,
    slotFocusHandler,
  } = props;
  const { isInvalid } = useFormControlWrapper();

  const iconClassNames = React.useMemo(
    () => cn("w-4", isInvalid ? "text-red-700" : "text-muted-foreground"),
    [isInvalid],
  );

  return (
    <>
      {(leftIcon || (Array.isArray(leftSlot) && leftSlot.length > 0)) && (
        <Flex className={"gap-2 items-center"}>
          {leftIcon && (
            <FormControlSlot onMouseDown={slotFocusHandler}>
              <Icon className={iconClassNames} name={leftIcon} />
            </FormControlSlot>
          )}
          {Array.isArray(leftSlot) &&
            leftSlot.map((slot, index) => (
              <FormControlSlot key={index}>{slot}</FormControlSlot>
            ))}
        </Flex>
      )}
      {children}
      {(rightIcon || (Array.isArray(rightSlot) && rightSlot.length > 0)) && (
        <Flex className={"gap-2 items-center"}>
          {Array.isArray(rightSlot) &&
            rightSlot.map((slot, index) => (
              <FormControlSlot key={index}>{slot}</FormControlSlot>
            ))}
          {rightIcon && (
            <FormControlSlot onMouseDown={slotFocusHandler}>
              <Icon className={iconClassNames} name={rightIcon} />
            </FormControlSlot>
          )}
        </Flex>
      )}
    </>
  );
};
