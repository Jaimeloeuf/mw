import { expressWrapper } from "../http/expressWrapper.js";

export const healthCheck = expressWrapper("get", "/", function () {
  return "ok";
});
