import { Dict } from "@home-assistant-react/types/src";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

/**
 * Retrieves the error message for a specific field name from the form's error state.
 * This function navigates through nested form errors based on the provided field name path,
 * and returns the associated error message if an error is found.
 *
 * @param form - The form object returned by the `useForm` hook from react-hook-form, containing the form's state and methods.
 * @param name - The field name path for which to retrieve the error message. This can be a nested path (e.g., "user.email").
 * @returns The error message string associated with the specified field name, or `undefined` if no error is found.
 *
 * @template T - The type of the form field values, extending `FieldValues` from react-hook-form.
 *
 * @example
 * // Example usage in a React component:
 * const { formState } = useForm();
 * const errorMessage = buildErrorMessageForName(formState, 'user.email');
 * console.log(errorMessage); // Outputs the error message for 'user.email' if it exists.
 */
export function buildErrorMessageForName<T extends FieldValues>(
  form: UseFormReturn<T>,
  name: Path<T>,
) {
  const errorNames = name.split(".");

  const error = errorNames.reduce(
    (errorPath, namePath) => errorPath?.[namePath],
    form.formState.errors as Dict,
  );

  return error?.message;
}
