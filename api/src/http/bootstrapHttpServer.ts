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
    .use(loggingMiddleware)
    .use(express.json())
    .use(express.urlencoded({ extended: true }));

  registerRoutesAndControllers(app);

  const server = app.listen(config.port, () => {
    logger.info(
      bootstrapHttpServer.name,
      `Web Server now listening on port: ${config.port}`
    );
  });

  server.setTimeout(config.server_timeout);
  logger.info(
    bootstrapHttpServer.name,
    `Web Server global timeout set to: ${config.server_timeout} ms`
  );
}
