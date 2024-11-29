import { config } from "../../../config/index.js";
import { wrapFunctionToProvideRunModes } from "../../../utils/wrapFunctionToProvideRunModes.js";
import { TelegramBot } from "../TelegramBot.js";

class MwBot extends TelegramBot {
  override async getToken() {
    return config.tele_adminbot_token();
  }

  /**
   * Notify mw admin using the MwTelegramBot.
   */
  readonly notifyAdmin = wrapFunctionToProvideRunModes(
    this.#notifyAdmin.bind(this),
  );
  #notifyAdmin(message: string) {
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
