import { httpController } from "../http/index.js";
import { config } from "../config/index.js";

export const version = httpController({
  version: "neutral",
  method: "get",
  path: "/version",
  guards: null,
  urlParamsValidator: null,
  urlQueryParamsValidator: null,
  requestBodyValidator: null,
  httpRequestHandler() {
    return `${config.env} - ${"..."}`;
  },
});
