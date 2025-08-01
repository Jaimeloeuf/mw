import type { Socket } from "net";

import cors from "cors";
import express from "express";

import { registerRoutesAndControllers } from "../__generated/index.js";
import { config } from "../config/index.js";
import { httpRouteHandlerForGraphQL } from "../graphql/index.js";
import { authControllers } from "../http-auth/index.js";
import { logger } from "../logging/index.js";
import { entrypoints } from "./entrypoints.js";
import { loggingMiddleware } from "./loggingMiddleware.js";
import { routeNotFound } from "./routeNotFound.js";

/**
 * Bootstraps a web server using ExpressJS to route incoming HTTP requests to
 * HTTP controllers.
 */
export async function bootstrapHttpServer() {
  express()
    /* Register all the middlewares */
    .use(cors())
    .use(loggingMiddleware)

    // Disable this for security
    .disable("x-powered-by")

    // Using /gql instead of well known /graphql to avoid those scanning bots
    .get("/gql", httpRouteHandlerForGraphQL)
    .post("/gql", httpRouteHandlerForGraphQL)

    // Only run the request data parser middlewares after /graphql route handler
    // as it does its own parsing, so it will break if this is placed before
    // that, and this is placed right before the route handlers that needs it.
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

    // Register all the route->controller mappings with the /api prefix.
    .use("/api", registerRoutesAndControllers())

    // Register all auth related routes
    .use("/auth", authControllers())

    // Register all vue page entrypoints
    .use("/vue", entrypoints())

    // Since this is the last non-error-handling route handler used, assume 404
    // as no other route handler responded.
    .use(routeNotFound.routeHandler)

    // Start listening to network port and returns the created server instance.
    .listen(config.port(), () => {
      logger.info(
        bootstrapHttpServer.name,
        `Web Server now listening on port: ${config.port()}`,
      );

      logger.info(
        bootstrapHttpServer.name,
        `Web Server global timeout set to: ${config.server_timeout()} ms`,
      );
    })

    // Set hard timeout to ensure that execution do not hog resources for long.
    // Note that setting this does not stop any in progress controller/service/
    // post-processing execution. All it does is hangup on the socket connected
    // to the client and logs it as an error.
    .setTimeout(config.server_timeout())

    // Event handler that runs after express forces a timeout set above.
    .on("timeout", (socket: Socket) => {
      socket.destroy();

      // This is an internal API that may or may not work.
      const originalRequestUrl = (socket as any)?.parser?.incoming?.originalUrl;

      logger.error(
        bootstrapHttpServer.name,
        `Request to '${originalRequestUrl}' exceeded global timeout of ${config.server_timeout()} ms`,
      );
    });
}
