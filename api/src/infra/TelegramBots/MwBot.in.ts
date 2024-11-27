import { config } from "../../config/index.js";
import { TelegramBot } from "./TelegramBot.js";

export default class MwBot extends TelegramBot {
  override async getToken() {
    return config.tele_adminbot_token();
  }
}
