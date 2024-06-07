import { useBooleanState } from "@home-assistant-react/hooks/src/useBooleanState";
import React from "react";
import { Box, Flex } from "../../primitives/common";
import { FormWrapperProps } from "./FormWrapper.types";
import { FormWrapperProvider } from "./FormWrapperProvider";

export const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  onSubmit,
  isDisabled,
  isLoading: controlledIsLoading,
  isFormContainer = true,
  formProps,
  className,
  disableOnSubmit = true,
  ...rest
}) => {
  const isSubmitLoading = useBooleanState(false);
  const isLoading = controlledIsLoading || isSubmitLoading.state;
  const shouldDisableForm = isDisabled || isLoading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (disableOnSubmit) isSubmitLoading.true();

    if (onSubmit) {
      await onSubmit(e);
    }

    isSubmitLoading.false();
  };

  const content = (
    <fieldset disabled={shouldDisableForm}>
      <Flex className={"flex flex-col w-full gap-0.5"}>{children}</Flex>
    </fieldset>
  );

  return (
    <FormWrapperProvider isDisabled={isDisabled} isLoading={isLoading}>
      <Box
        className={[
          "w-full",
          shouldDisableForm ? "relative" : undefined,
          className,
        ]}
        {...rest}
      >
        {isFormContainer ? (
          <form noValidate onSubmit={handleSubmit} {...formProps}>
            {content}
          </form>
        ) : (
          content
        )}
        {shouldDisableForm && (
          <Box
            className={
              "absolute inset-0 z-index-overlay opacity-20 bg-primary-background rounded-md"
            }
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          />
        )}
      </Box>
    </FormWrapperProvider>
  );
};
