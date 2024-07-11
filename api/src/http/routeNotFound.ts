import { expressWrapper } from "./expressWrapper.js";
import { NotFoundException } from "../exceptions/index.js";

export const routeNotFound = expressWrapper(
  // Method does not matter here since this controller should be a catch all.
  "all",
  "*",
  null,
  () => {
    throw new NotFoundException("API Route not found");
  }
);
