import { RequestHandler } from "express";
import { ZodError, ZodSchema } from "zod";

export type ZodMiddleware = (schema: ZodSchema) => RequestHandler;

// Middleware to validate requests asynchronously
export const validate: ZodMiddleware = (schema) => async (req, res, next) => {
  try {
    // Validate the request body asynchronously
    await schema.parseAsync(req.body);

    // If validation is successful, call the next middleware
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      // If there's a validation error, send a 400 response with error details
      res.status(400).json({
        message: "Validation failed",
        errors: error.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    } else {
      // If another type of error occurs, forward it to the next error handler
      next(error);
    }
  }
};
