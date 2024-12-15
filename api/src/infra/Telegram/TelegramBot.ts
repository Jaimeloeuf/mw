import type { CommandData } from "./CommandData.js";
import type { TelegramWebhookData } from "./telegramWebhookDataSchema.js";

import { urlBuilder } from "../../__generated/index.js";
import { config } from "../../config/index.js";
import { ServiceException } from "../../exceptions/index.js";
import { logger } from "../../logging/index.js";
import { json, wrapFunctionToProvideRunModes } from "../../utils/index.js";
import { getCommandIfAny } from "./getCommandIfAny.js";
import { tApi } from "./tApi.js";

/**
 * Telegram Bot base abstract class.
 */
export abstract class TelegramBot {
  /**
   * Override this method to return the bot token string.
   *
   * This is async to support all types of config loaders.
   */
  abstract getToken(): string | Promise<string>;

  /**
   * Run this to setup the telegram bot.
   *
   * Internally this just wraps and call `registerTelegramWebhookUrl` and
   * `setCommands`.
   */
  async setup() {
    await this.registerTelegramWebhookUrl();
    await this.setCommands();
  }

  /**
   * ## DO NOT OVERRIDE!
   * Call this to register the telegram webhook URL for the current bot.
   */
  async registerTelegramWebhookUrl() {
    const telegramBotToken = await this.getToken();

    // Following telegram's recommendations to use bot token as path
    const urlObject = new URL(
      urlBuilder.forWebhookTelegram({
        urlParams: {
          telegramWebhookSecretPath: config.tele_webhook_secret_path(),
          telegramBotToken,
        },
      }),
    );

    // Must be https scheme as specified in telegram bot API docs
    if (urlObject.protocol !== "https:") {
      throw new ServiceException(
        "Only HTTPS URLs are allowed for telegram bot webhooks",
      );
    }

    const setWebhookResponse = await tApi(telegramBotToken, "setWebhook", {
      url: urlObject.toString(),
    });

    if (!setWebhookResponse.ok) {
      throw new ServiceException(setWebhookResponse?.description);
    }

    logger.info(
      `${TelegramBot.name}:${this.registerTelegramWebhookUrl.name}`,
      `Successfully registered telegram webhook URL for ${this.constructor.name} to: ${urlObject.toString()}`,
    );
  }

  /**
   * ## DO NOT OVERRIDE!
   * Call this to register the telegram commands for the current bot.
   */
  async setCommands(options?: {
    /**
     * Should the new commands be merged into the list of existing commands? Or
     * should these be all the new commands by overriding all existing commands?
     */
    merge?: boolean;
  }) {
    const botToken = await this.getToken();

    // Merge existing commands and new commands into new array before setting
    // commands if user did not leave commands empty
    if (this.commands.length !== 0 && options?.merge) {
      const response = await tApi(botToken, "getMyCommands");
      if (!response.ok) {
        throw new Error("Failed to get existing commands");
      }

      return tApi(botToken, "setMyCommands", {
        commands: [...response.result, ...this.commands],
      });
    }

    return tApi(botToken, "setMyCommands", { commands: this.commands });
  }

  /**
   * ## DO NOT OVERRIDE!
   * This method should be the same for all bots, and will be used for
   * dispatching calls to command `onCommand` callbacks or the `onMessage`
   * method.
   *
   * HTTP Webhook controller should call this method when it receives a new
   * `Update` object.
   *
   * This will look for commands in the message that are also registered by the
   * bot to handle, and if found, call the command's `onCommand` callback.
   *
   * If no commands found in the message, the `onMessage` callback function will
   * be used to handle the incoming update.
   *
   * This will pass through whatever that is returned from `onCommand` or
   * `onMessage`, and it can be whatever the telegram webhook API accepts as a
   * response.
   */
  onUpdate(update: TelegramWebhookData) {
    const commandData = getCommandIfAny(update);

    // If not null means that is a command found in the message
    if (commandData !== null) {
      const registeredCommand = this.commandsObject[commandData.command];

      if (registeredCommand !== undefined) {
        return registeredCommand.onCommand(commandData, update);
      }

      // If no command handler registered for the command received, and command
      // is a /start command, do nothing by default
      if (commandData.command === "start") {
        return;
      }
    }

    return this.onMessage(update);
  }

  /**
   * Override this to supply your list of bot commands and its callback
   * functions (which should call service functions to handle business logic).
   *
   * ## /start
   * Start is a special command, since thats the command user sends to your bot
   * to get started. Ideally if your bot supports a start flow, it should define
   * a `/start` command. However unlike other commands, if /start is not defined
   * we **WILL NOT** run the fallback `onMessage` response to ensure that bots
   * without the /start command registered dont always end up sending users a
   * "Not Supported" as per the default onMessage response right at the start of
   * their onboarding flow.
   */
  commands: Array<{
    /**
     * The actual command string the user types in telegram.
     *
     * ## DO NOT INCLUDE THE STARTING '/'
     * E.g. if the command is `/start`, this should be `start`.
     */
    command: string;

    /**
     * This description string shows up in the user's telegram UI.
     */
    description: string;

    /**
     * Method to run when the bot receives a new message with this command.
     *
     * You can return anything the telegram webhook API accepts.
     */
    onCommand: (data: CommandData, update: TelegramWebhookData) => any;
  }> = [];

  #cachedCommandsAsObject: {
    [command: string]: (typeof TelegramBot)["prototype"]["commands"][number];
  } | null = null;

  /**
   * Get an object mapping of `command`->`CommandDefinition`
   */
  get commandsObject() {
    if (this.#cachedCommandsAsObject === null) {
      this.#cachedCommandsAsObject = {};

      for (const command of this.commands) {
        this.#cachedCommandsAsObject[command.command] = command;
      }
    }

    return this.#cachedCommandsAsObject;
  }

  /**
   * This method is called when there is a new message that doesnt contain any
   * of the commands pre-defined in `commands` array.
   *
   * You can return anything the telegram webhook API accepts.
   *
   * If this is not overridden, it will respond to user with a default message
   * 'Not Supported'.
   */
  onMessage(update: TelegramWebhookData): any {
    return {
      method: "sendMessage",
      chat_id: update.message.chat.id,
      text: "Not Supported",
    };
  }

  /**
   * Call this to send a message to a user and get back the API JSON response.
   */
  sendMessage = wrapFunctionToProvideRunModes(this.#sendMessage.bind(this));
  async #sendMessage(
    recipientTelegramChatID: string,

    /**
     * Notification message. This supports HTML formatting
     */
    message: string,
  ) {
    const token = await this.getToken();

    // Call sendMessage API using HTML for formating instead of MarkdownV2 due
    // to the restrictions in place for parsing markdown text. Especially when
    // trying to send user input directly to telegram API, it may crash as user
    // may use special reserved characters and cause server the crash. Thus the
    // fix to this is just use HTML formatting instead.
    // References:
    // https://core.telegram.org/bots/api#markdownv2-style
    // https://stackoverflow.com/questions/62600596/why-is-a-reserved-character-in-markdownv2-in-telegrams-bot-api
    // https://github.com/telegraf/telegraf/issues/1242
    const res = await tApi(token, "sendMessage", {
      chat_id: recipientTelegramChatID,
      text: message,
      parse_mode: "HTML",
    });

    if (!res.ok) {
      throw new ServiceException(
        `Failed to send telegram message: ${json.stringifyPretty(res)}`,
      );
    }

    return res;
  }
}
