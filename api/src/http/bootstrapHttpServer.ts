import express from "express";
import cors from "cors";
import { config } from "../config/index.js";
import { logger } from "../logging/index.js";

import { healthCheck } from "../controllers/healthCheck.js";
import { routeNotFound } from "./routeNotFound.js";
import { loggingMiddleware } from "./loggingMiddleware.js";

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

  app["get" satisfies typeof healthCheck.method](
    "/" satisfies typeof healthCheck.path,
    healthCheck.routeHandler
  )

    .get("/version", (req, res) => {
      res.status(200).send("-");
    })

    // Since this is the last non-error-handling route handler used, assume 404
    // as no other route handler responded.
    .use(routeNotFound.routeHandler);

  app.listen(config.port, () => {
    logger.info(
      bootstrapHttpServer.name,
      `Web Server now listening on port: ${config.port}`
    );
  });
}
