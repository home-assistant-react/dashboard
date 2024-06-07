import { BaseError, BaseErrorOptions, ErrorDetails } from "./base-error";

export interface ApiErrorOptions extends BaseErrorOptions {
  error: ErrorDetails;
}

export class ApiError extends BaseError {
  constructor(options: Omit<ApiErrorOptions, keyof ErrorDetails>) {
    super({
      ...options,
      detail: options.detail,
      status: options.error.status,
      code: options.error.code,
      title: options.error.title,
    });
  }
}
