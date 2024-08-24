import { httpController } from "../http/index.js";

export const healthCheck = httpController({
  version: "neutral",
  method: "get",
  path: "/",
  guards: null,
  urlParamsValidator: null,
  urlQueryParamsValidator: null,
  requestBodyValidator: null,
  httpRequestHandler() {
    return "ok";
  },
});
