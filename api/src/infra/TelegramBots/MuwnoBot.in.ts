import { config } from "../../config/index.js";
import { TelegramBot } from "./TelegramBot.js";

export default class MuwnoBot extends TelegramBot {
  override async getToken() {
    return config.whatch_tele_bot_token();
  }
}
