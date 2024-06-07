import React from "react";
import { Button } from "../../primitives/Button";
import { useFormWrapper } from "../FormWrapper/FormWrapperProvider";
import { FormSubmitProps } from "./FormSubmit.types";

export const FormSubmit: React.FC<FormSubmitProps> = (props) => {
  const { isLoading, isDisabled } = useFormWrapper();
  return (
    <Button
      {...props}
      isLoading={props.isLoading ?? isLoading}
      isDisabled={props.isDisabled ?? isDisabled}
      type="submit"
    />
  );
};
