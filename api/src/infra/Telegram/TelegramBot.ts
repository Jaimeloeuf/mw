import { config } from "../../config/index.js";
import { ProdTelegramBotFF } from "./ProdTelegramBotFF.js";
import { MockTelegramBotFF } from "./MockTelegramBotFF.js";

export const TelegramBotFF =
  config.env === "production" ? ProdTelegramBotFF : MockTelegramBotFF;
