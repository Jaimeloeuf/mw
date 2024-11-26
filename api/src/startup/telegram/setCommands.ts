import { tApi } from "./tApi.js";

export async function setCommands(
  /**
   * Unique bot token for this bot
   */
  botToken: string,
  commands: Array<{ command: string; description: string }>,
  options?: {
    /**
     * Should the new commands be merged into the list of existing commands? Or
     * should these be all the new commands by overriding all existing commands?
     */
    merge?: boolean;
  },
) {
  // Merge existing commands and new commands into new array before setting commands if user did not leave commands empty
  if (commands.length !== 0 && options?.merge) {
    const response = await tApi(botToken, "getMyCommands");
    if (!response.ok) {
      throw new Error("Failed to get existing commands");
    }

    commands = [...response.result, ...commands];
  }

  return tApi(botToken, "setMyCommands", { commands });
}
