import { Request, Response, NextFunction, RequestHandler } from "express";

interface ControllerOptions<Body> {
  request?: Request<any, {}, Body>;
  response?: Response;
  next?: NextFunction;
}

type AsyncHandler<T = any, Body = any> = (
  options: ControllerOptions<Body>,
) => Promise<T>;

/**
 * A utility function to catch asynchronous errors in Express middleware/route handlers
 * and return the resolved value as JSON if applicable.
 * @param {AsyncHandler} fn - The controller function to be wrapped
 * @param {RequestHandler} validate - An optional validation middleware
 * @returns {RequestHandler[]} An array of Express middleware functions
 */
export const defineController = <Body, T = any>(
  fn: AsyncHandler<T, Body>,
  validate?: RequestHandler,
): RequestHandler[] => {
  const middlewares = validate ? [validate] : [];

  middlewares.push(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Promise.resolve(
        fn({
          request: req,
          response: res,
          next,
        }),
      );
      if (result) {
        res.json(result);
      }
    } catch (error) {
      next(error); // If there's an error, pass it to the next middleware
    }
  });

  middlewares.push((_, res) => {
    res.status(500).json({ error: "An unexpected error occurred" });
  });

  return middlewares;
};
