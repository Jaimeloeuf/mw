import { expressWrapper } from "./expressWrapper.js";
import { NotFoundException } from "../exceptions/index.js";

export const routeNotFound = expressWrapper("*", () => {
  throw new NotFoundException("API Route not found");
});
