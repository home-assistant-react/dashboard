export const getApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (typeof error === "object" && error !== null) {
    if ("error" in error && typeof error.error === "string") {
      return error.error;
    }
  }
  return "Unknown error";
};
