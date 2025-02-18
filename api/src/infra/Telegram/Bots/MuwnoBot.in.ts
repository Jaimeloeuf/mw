import { config } from "../../../config/index.js";
import { TelegramBot } from "../TelegramBot.js";

class MuwnoBot extends TelegramBot {
  override async getToken() {
    return config.muwno_tele_bot_token();
  }
}

let cachedBot: $Nullable<MuwnoBot> = null;

export default function () {
  if (cachedBot === null) {
    cachedBot = new MuwnoBot();
  }
  return cachedBot;
}
