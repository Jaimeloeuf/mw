import type { TelegramWebhookData } from "../index.js";
import type { CommandData } from "./CommandData.js";

import { sv } from "../../__generated/index.js";
import { TelegramBot } from "./TelegramBot.js";

export default class WhatchBot extends TelegramBot {
  override commands = [
    {
      command: "eating",
      description: "Get a random video to watch while eating",
      async onCommand(data: CommandData, update: TelegramWebhookData) {
        const videoLink = await sv.whatchGetVideoForEating(
          update.message.from.id,
          data.args,
        );

        return {
          method: "sendMessage",
          chat_id: update.message.chat.id,
          text: videoLink,
        };
      },
    },
  ];
}
