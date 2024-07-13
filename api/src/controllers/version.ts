import { expressWrapper } from "../http/expressWrapper.js";
import { config } from "../config/index.js";

export const version = expressWrapper({
  method: "get",
  path: "/version",
  guards: null,
  requestDataValidator: null,
  httpRequestHandler() {
    return `${config.env} - ${"..."}`;
  },
});
