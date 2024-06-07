/* eslint-disable  @typescript-eslint/no-explicit-any */

// TODO - IMPROVE THIS FUNCTIONS

export function getApiErrorMessage(
  response: any,
  fallbackErrorMessage = "Something went wrong",
) {
  let errorMessage = fallbackErrorMessage;
  let errors = null;

  if (response) {
    errors =
      response.errors ||
      response.data?.errors ||
      response.response?.data?.errors ||
      response.response?.data?.error ||
      response;
  }

  if (errors) {
    // RPC Errors
    if (errors.error !== undefined) {
      errorMessage = errors.error;
    }
    // only return the first error message
    else if (errors[0] && errors[0]["detail"]) {
      errorMessage = errors[0]["detail"];
    } else if (errors[0] && errors[0]["title"]) {
      errorMessage = errors[0]["title"];
    } else if (typeof errors === "string") {
      errorMessage = errors;
    } else if (Object.prototype.toString.call(response) === "[object Error]") {
      return response.message;
    }
    // Catch all cases for error objects https://stackoverflow.com/a/61958148
  } else if (Object.prototype.toString.call(response) === "[object Error]") {
    return response.message;
  }
  return errorMessage;
}

export function getApiErrorCode(
  response: any,
  fallbackErrorMessage = "Something went wrong",
) {
  let errorMessage = fallbackErrorMessage;
  let errors = null;

  if (response) {
    errors =
      response.errors ||
      response.data?.errors ||
      response.response?.data?.errors ||
      response;
  }

  if (errors) {
    // RPC Errors
    if (errors.jsonprc !== undefined && errors.error?.message) {
      errorMessage = errors.error.message;
    }
    // only return the first error message
    else if (errors[0] && errors[0]["code"]) {
      errorMessage = errors[0]["code"];
    } else if (errors[0] && errors[0]["title"]) {
      errorMessage = errors[0]["title"];
    } else if (typeof errors === "string") {
      errorMessage = errors;
    } else if (Object.prototype.toString.call(response) === "[object Error]") {
      return response.message;
    }
    // Catch all cases for error objects https://stackoverflow.com/a/61958148
  } else if (Object.prototype.toString.call(response) === "[object Error]") {
    return response.message;
  }
  return errorMessage;
}
