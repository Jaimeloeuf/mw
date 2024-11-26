import { config } from "../../config/index.js";
import { MockEmailServiceFF } from "./MockEmailServiceFF.js";
import { ProdEmailServiceFF } from "./ProdEmailServiceFF.js";

export const EmailServiceFF =
  config.env() === "production" ? ProdEmailServiceFF : MockEmailServiceFF;
