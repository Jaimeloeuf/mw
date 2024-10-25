import { httpController } from "../http/index.js";

export default httpController({
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
