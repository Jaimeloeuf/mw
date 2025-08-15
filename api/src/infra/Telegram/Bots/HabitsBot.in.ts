import type { TelegramWebhookData } from "../../index.js";
import type { CommandData } from "../CommandData.js";

import { config } from "../../../config/index.js";
import { TelegramBot } from "../TelegramBot.js";

class HabitsBot extends TelegramBot {
  override async getToken() {
    return config.habits_tele_bot_token();
  }

  override commands = [
    {
      command: "habits",
      description: "See all the habits you are tracking",
      async onCommand(data: CommandData, update: TelegramWebhookData) {
        // @todo Get list of habits and generate message back
        data;

        return {
          method: "sendMessage",
          chat_id: update.message.chat.id,
          text: "",
        };
      },
    },
    {
      command: "stats",
      description: "See your current habit stats",
      async onCommand(data: CommandData, update: TelegramWebhookData) {
        // @todo Send them a link to a webpage / telegram mini app to view their stats
        data;

        return {
          method: "sendMessage",
          chat_id: update.message.chat.id,
          text: "",
        };
      },
    },
    {
      command: "track",
      description: "Track a new habit",
      async onCommand(data: CommandData, update: TelegramWebhookData) {
        // @todo Open a webview / mini app for them to key in the details, OR give buttons/native UI
        data;

        return {
          method: "sendMessage",
          chat_id: update.message.chat.id,
          text: "",
        };
      },
    },
    {
      command: "record",
      description: "Record your habit action",
      async onCommand(data: CommandData, update: TelegramWebhookData) {
        // @todo
        // Get user's location via telegram
        // Verify the location is the same as where they set it previously
        // Make sure user is performing in the cadence that they set their
        // habits to be, if they fail they will lose the money they lock in our
        // escrow, and this money will only be returned to them once it hits the
        // end date that they set. (minus a fee, plus if they fail, they have a
        // few lives, before it fully fails! they can set it to 0 too for hard
        // mode)
        data;

        return {
          method: "sendMessage",
          chat_id: update.message.chat.id,
          text: "",
        };
      },
    },
  ];
}

let cachedBot: $Nullable<HabitsBot> = null;

export default function () {
  if (cachedBot === null) {
    cachedBot = new HabitsBot();
  }
  return cachedBot;
}
