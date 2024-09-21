import { config } from "../../config/index.js";
import { TelegramBotFF } from "./TelegramBot.js";

const InternalAdminTelegramBot = TelegramBotFF(config.tele_adminbot_token);

export const notifyAdminWithInternalAdminTelegramBot = (message: string) =>
  InternalAdminTelegramBot(config.tele_adminbot_admin_chat_id, message);
