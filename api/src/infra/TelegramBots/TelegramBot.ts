import type { TelegramWebhookData } from "../Telegram/telegramWebhookDataSchema.js";
import type { CommandData } from "./CommandData.js";

import { registerTelegramWebhookUrl } from "../Telegram/registerTelegramWebhookUrl.js";
import { setCommands } from "../Telegram/setCommands.js";
import { getCommand } from "./getCommand.js";

/**
 * Telegram Bot base class for all bot implementations to extend.
 *
 * ## Override Items (required)
 * 1. `getToken` instance method
 *
 * ## Override Items (optional)
 * 1. `commands` instance variable
 * 1. `onMessage` instance method
 */
export class TelegramBot {
  /**
   * The singleton telegram bot instance for the specific TelegramBot
   * implementation. This is unique for each bot class.
   */
  static singleton?: TelegramBot;

  /**
   * Static method to load the singleton instance and create it if it doesnt
   * already exists.
   */
  static getSingleton() {
    if (this.singleton === undefined) {
      this.singleton = new this();
    }
    return this.singleton!;
  }

  /**
   * Override this method to return the bot token string.
   *
   * This is async to support all types of config loaders.
   */
  async getToken(): Promise<string> {
    throw new Error(`Unimplemented! Override '${this.getToken.name}' method`);
  }

  /**
   * ## DO NOT OVERRIDE!
   * Call this to register the telegram webhook URL for the current bot.
   */
  async registerTelegramWebhookUrl() {
    return registerTelegramWebhookUrl(
      this.constructor.name,
      await this.getToken(),
    );
  }

  /**
   * ## DO NOT OVERRIDE!
   * Call this to register the telegram commands for the current bot.
   */
  async setCommands() {
    return setCommands(await this.getToken(), this.commands);
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
    for (const { command, onCommand } of this.commands) {
      const commandData = getCommand(update, command);

      // If null means that the command is not found
      if (commandData !== null) {
        return onCommand(commandData, update);
      }
    }

    return this.onMessage(update);
  }

  /**
   * Override this to supply your list of bot commands and its callback
   * functions (which should call service functions to handle business logic).
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
}
