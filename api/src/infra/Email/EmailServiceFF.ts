import { config } from "../../config/index.js";
import { ProdEmailServiceFF } from "./ProdEmailServiceFF.js";
import { MockEmailServiceFF } from "./MockEmailServiceFF.js";

export const EmailServiceFF =
  config.env === "production" ? ProdEmailServiceFF : MockEmailServiceFF;
