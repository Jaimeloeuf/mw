import express from "express";
import cors from "cors";
import { config } from "../config/index.js";
import { logger } from "../logging/index.js";

import { routeNotFound } from "./routeNotFound.js";

/**
 * Bootstraps a web server using ExpressJS to route incoming HTTP requests to
 * HTTP controllers.
 */
export function bootstrapHttpServer() {
  const app = express();

  app.use(cors());

  app
    /* Routes table */
    .get("/", (req, res) => {
      res.status(200).send("ok");
    })
    .get("/version", (req, res) => {
      res.status(200).send("-");
    })

    // Since this is the last non-error-handling route handler used, assume 404
    // as no other route handler responded.
    .use(routeNotFound);

  app.listen(config.port, () => {
    logger.info(
      bootstrapHttpServer.name,
      `Web Server now listening on port: ${config.port}`
    );
  });
}
