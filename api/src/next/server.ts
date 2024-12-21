import { createServer } from "http";
import next from "next";
import { parse } from "url";

import { logger } from "../logging/index.js";

const port = 3000;
const nextJsApp = next({
  dev: process.env.NODE_ENV !== "production",
  dir: import.meta.dirname,
});
const nextJsRequestHandler = nextJsApp.getRequestHandler();

nextJsApp.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    nextJsRequestHandler(req, res, parsedUrl);
  }).listen(port);

  logger.info(
    `NextJS Server`,
    `Listening at http://localhost:${port} in '${process.env.NODE_ENV}' mode`,
  );
});
