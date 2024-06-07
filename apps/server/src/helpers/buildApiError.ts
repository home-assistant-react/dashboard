import { ApiError, ApiErrorOptions } from "../config/errors/api-error";
import { ErrorDetails } from "../config/errors/base-error";

export const buildApiError = (
  id: ApiErrorOptions["id"],
  error: ErrorDetails,
  options?: Partial<ApiErrorOptions>,
  children?: ApiErrorOptions["errors"],
) => {
  return new ApiError({
    errors: children,
    ...options,
    id: id,
    error,
    detail: options?.detail || "",
  });
};
