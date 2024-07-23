import { httpController } from "../http/httpController.js";

export const healthCheck = httpController({
  method: "get",
  path: "/",
  guards: null,
  requestDataValidator: null,
  httpRequestHandler() {
    return "ok";
  },
});
