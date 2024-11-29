import { config } from "../../config/index.js";
import { TelegramBot } from "./TelegramBot.js";

class MwBot extends TelegramBot {
  override async getToken() {
    return config.tele_adminbot_token();
  }

  notifyAdmin(message: string) {
    return this.sendMessage.runAndThrowOnError(
      config.tele_adminbot_admin_chat_id(),
      message,
    );
  }
}

let cachedBot: MwBot | null = null;

export default function () {
  if (cachedBot === null) {
    cachedBot = new MwBot();
  }
  return cachedBot;
}
