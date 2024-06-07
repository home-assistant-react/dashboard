import { buildControllerRules } from "@home-assistant-react/helpers/src/hook-form/buildControllerRules";
import { buildErrorMessageForName } from "@home-assistant-react/helpers/src/hook-form/buildErrorMessageForName";
import { gt } from "@home-assistant-react/helpers/src/i18n/gt";
import { isValidNumber } from "@home-assistant-react/helpers/src/validators/isValidNumber";
import { HookFormNumberInputProps } from "./NumberInput.types";
import { NumberInput } from "./NumberInput";
import { FieldValues } from "react-hook-form";

export function HookFormNumberInput<T extends FieldValues>(
  props: HookFormNumberInputProps<T>,
) {
  const { form, name, rules, ...rest } = props;
  return (
    <NumberInput
      {...form.register(
        name,
        buildControllerRules({
          form,
          name,
          rules: {
            validate: (value) =>
              !value
                ? props.isRequired
                  ? gt("errorMessages.requiredField") ||
                    `${props.label} is required`
                  : undefined
                : isValidNumber(value)
                  ? undefined
                  : `${props.label} is invalid`,
            ...rules,
          },
          isRequired: props.isRequired,
        }),
      )}
      error={buildErrorMessageForName(form, name)}
      {...rest}
    />
  );
}
