import { expressWrapper } from "../http/expressWrapper.js";

export const healthCheck = expressWrapper({
  method: "get",
  path: "/",
  guards: null,
  requestDataValidator: null,
  httpRequestHandler() {
    return "ok";
  },
});
