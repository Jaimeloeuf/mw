import type { CommandData } from "./CommandData.js";
import type { TelegramWebhookData } from "./telegramWebhookDataSchema.js";

/**
 * Utility function to parse a command from the message, returns null if given
 * command is not found in message.
 *
 * Parser treats everything behind the command as arguments for that command
 * Guard in place against non-message type updates
 * Reference used for parser https://core.telegram.org/bots/api#messageentity
 */
export function getCommand(
  update: TelegramWebhookData,

  /**
   * Command to find and parse when found
   */
  command: string,
): $Nullable<CommandData> {
  // Explicitly end and return undefined if the update does not contain a
  // message or if the message have not entities.
  if (
    update.message === undefined ||
    update.message.entities === undefined ||
    update.message.entities.length === undefined
  ) {
    return null;
  }

  for (const entity of update.message.entities) {
    if (
      entity.type === "bot_command" &&
      command ===
        update.message.text.slice(
          entity.offset + 1, // +1 to ensure removal of "/"
          entity.offset + entity.length,
        )
    ) {
      // Take everything after the command as arguments for it, assuming that
      // there cannot possibly be a second command after this command
      const argsArray = update.message.text
        // +1 to start from the next character after the command
        .slice(entity.offset + entity.length + 1)
        .trim();

      // If there are arguments, split them by spaces
      const args = argsArray.length ? argsArray.split(" ") : [];

      return {
        command,
        args,
      };
    }
  }

  return null;
}
