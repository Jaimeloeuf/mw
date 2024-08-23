import { httpController } from "../http/index.js";

export const healthCheck = httpController({
  version: "neutral",
  method: "get",
  path: "/",
  guards: null,
  requestDataValidator: null,
  httpRequestHandler() {
    return "ok";
  },
});
