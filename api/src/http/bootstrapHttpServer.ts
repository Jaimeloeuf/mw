import express from "express";
import cors from "cors";
import type { Socket } from "net";

import { config } from "../config/index.js";
import { logger } from "../logging/index.js";

import { loggingMiddleware } from "./loggingMiddleware.js";
import { registerRoutesAndControllers } from "../__generated/index.js";
import { routeNotFound } from "./routeNotFound.js";

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

  // Since this is the last non-error-handling route handler used, assume 404
  // as no other route handler responded.
  app.use(routeNotFound.routeHandler);

  const server = app.listen(config.port, () => {
    logger.info(
      bootstrapHttpServer.name,
      `Web Server now listening on port: ${config.port}`
    );
  });

  // Note that setting timeout does not stop any in progress controller/service/
  // post-processing execution. All it does is hangup on the socket connected to
  // the client and logs it as an error.
  server.setTimeout(config.server_timeout);
  server.on("timeout", (socket: Socket) => {
    socket.destroy();

    // This is an internal API that may or may not work.
    const originalRequestUrl = (socket as any)?.parser?.incoming?.originalUrl;

    logger.error(
      bootstrapHttpServer.name,
      `Request to '${originalRequestUrl}' exceeded global timeout of ${config.server_timeout} ms`
    );
  });

  logger.info(
    bootstrapHttpServer.name,
    `Web Server global timeout set to: ${config.server_timeout} ms`
  );
}
