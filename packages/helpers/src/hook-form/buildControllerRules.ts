import { FieldValues, Path, RegisterOptions } from "react-hook-form";
import { gt } from "../i18n/gt";
import { HookFormInputProps } from "./types";

/**
 * Constructs a set of validation rules for use with react-hook-form controllers. This function assembles
 * a set of standard validation rules based on the provided component props and any additional custom rules.
 * It supports required fields, minimum and maximum length validations, and allows for the extension of these
 * rules with custom validation logic.
 *
 * @param props - Properties from a component that uses react-hook-form, including any inherent validation requirements
 *                such as `isRequired`, `minLength`, `maxLength`, and a generic `rules` object for additional custom validations.
 * @param extraRules - Optional additional validation rules specified as `RegisterOptions`. These rules will be merged with
 *                     the standard rules derived from `props`.
 * @returns An object containing the assembled validation rules suitable for passing to the `rules` prop of react-hook-form's `Controller`.
 *
 * @template T - The type of the form field values, extending `FieldValues` from react-hook-form.
 *
 * @example
 * // Example usage in a form field component:
 * const formRules = buildControllerRules({
 *   isRequired: true,
 *   requiredErrorMessage: "This field is required",
 *   minLength: 5,
 *   maxLength: 20,
 *   rules: {
 *     pattern: {
 *       value: /^[a-zA-Z]+$/,
 *       message: "Only alphabetic characters are allowed",
 *     }
 *   }
 * });
 * // `formRules` now contains required, minLength, maxLength, and a custom pattern rule.
 */
export function buildControllerRules<T extends FieldValues>(
  props: HookFormInputProps<T>,
  extraRules?: RegisterOptions<T, Path<T>>,
) {
  return {
    required: {
      value: !!props.isRequired,
      message: props.requiredErrorMessage || gt("errorMessages.requiredField"),
    },
    minLength: props.minLength && {
      value: props.minLength,
      message: gt("errorMessages.minLength", { value: props.minLength }),
    },
    maxLength: props.maxLength && {
      value: props.maxLength,
      message: gt("errorMessages.maxLength", { value: props.maxLength }),
    },
    ...(extraRules as unknown as object),
    ...props.rules,
  };
}
