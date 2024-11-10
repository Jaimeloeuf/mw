import { config } from "../../config/index.js";
import { MockTelegramBotFF } from "./MockTelegramBotFF.js";
import { ProdTelegramBotFF } from "./ProdTelegramBotFF.js";

export const TelegramBotFF =
  config.env === "production" ? ProdTelegramBotFF : MockTelegramBotFF;
