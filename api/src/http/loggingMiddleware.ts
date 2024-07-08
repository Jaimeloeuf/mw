import type { Request, NextFunction } from "express";
import { logger } from "../logging/index.js";

/**
 * Simple middleware to log all incoming requests at verbose/http log level
 *
 * @todo Might create http log level so that we can easily filter and find it
 */
export function loggingMiddleware(
  req: Request,
  _: unknown,
  next: NextFunction
) {
  logger.verbose("HTTP Request", `${req.method} ${req.path}`);
  next();
}
