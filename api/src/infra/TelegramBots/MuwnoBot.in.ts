import { config } from "../../config/index.js";
import { TelegramBot } from "./TelegramBot.js";

class MuwnoBot extends TelegramBot {
  override async getToken() {
    return config.whatch_tele_bot_token();
  }
}

let cachedBot: MuwnoBot | null = null;

export default function () {
  if (cachedBot === null) {
    cachedBot = new MuwnoBot();
  }
  return cachedBot;
}
