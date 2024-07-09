import express from "express";
import cors from "cors";
import { config } from "../config/index.js";
import { logger } from "../logging/index.js";

import { loggingMiddleware } from "./loggingMiddleware.js";
import { registerRoutesAndControllers } from "./registerRoutesAndControllers.js";

/**
 * Bootstraps a web server using ExpressJS to route incoming HTTP requests to
 * HTTP controllers.
 */
export function bootstrapHttpServer() {
  const app = express();

  app
    /* Register all the middlewares */
    .use(cors())
    .use(loggingMiddleware);

  registerRoutesAndControllers(app);

  app.listen(config.port, () => {
    logger.info(
      bootstrapHttpServer.name,
      `Web Server now listening on port: ${config.port}`
    );
  });
}
