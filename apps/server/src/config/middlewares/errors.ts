import { Response, Request, NextFunction } from "express";
import httpStatus from "http-status";
import { errNotFound } from "@home-assistant-react/types/src/api/errors";
import { ENV } from "../../const";
import { ApiError } from "../errors/api-error";
import expressValidation from "express-validation";

export const errorHandler = (error: ApiError, _: Request, res: Response) => {
  const response = {
    id: error.id,
    detail: error.detail,
    code: error.status,
    meta: error.meta,
    message:
      error.message || httpStatus[error.status as keyof typeof httpStatus],
    title: error.title,
    errors: error.errors,
    stack: error.stack,
  };

  if (ENV !== "development") {
    delete response.stack;
  }

  res.status(error.status!);
  res.json(response);
};

export const handleServerErrors = (
  error: ApiError | expressValidation.ValidationError | unknown,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error instanceof expressValidation.ValidationError) {
    return errorHandler(
      new ApiError({
        id: "ac8a21d7-16a1-4b9d-ae81-1b431b6f340b",
        error: {
          title: "Validation Error",
          status: error.statusCode,
          code: "ERR_VALIDATION_ERROR",
        },
        detail: error.message,
        stack: error.stack,
      }),
      request,
      response,
    );
  } else if (error instanceof ApiError) {
    return errorHandler(error, request, response);
  } else if (error) {
    return errorHandler(
      new ApiError({
        id: "954b93f5-5da5-49dd-a3cf-e039a5cd390e",
        error: {
          title: "Internal Server Error",
          status: httpStatus.INTERNAL_SERVER_ERROR,
          code: "ERR_INTERNAL_SERVER_ERROR",
        },
        detail: String(error instanceof Error ? error.message : undefined),
        stack: error instanceof Error ? error.stack : undefined,
      }),
      request,
      response,
    );
  }

  next?.();
};

export const expressErrorNotFound = (request: Request, response: Response) => {
  return errorHandler(
    new ApiError({
      id: "7d39e79d-c766-4af7-a25a-2b92a4e3b215",
      detail: "The requested resource was not found",
      meta: { path: request.path },
      error: errNotFound,
    }),
    request,
    response,
  );
};
