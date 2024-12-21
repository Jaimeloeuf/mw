import next from "next";

import { config } from "../config/index.js";

export const nextJsApp = next({
  dev: config.env() !== "production",
  dir: import.meta.dirname,
});

export const nextJsRequestHandler = nextJsApp.getRequestHandler();
