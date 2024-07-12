import { expressWrapper } from "../http/expressWrapper.js";

export const healthCheck = expressWrapper("get", "/", null, null, function () {
  return "ok";
});
