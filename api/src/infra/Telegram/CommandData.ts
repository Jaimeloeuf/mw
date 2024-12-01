/**
 * Data parsed out from a telegram command
 */
export type CommandData = {
  /**
   * The command string itself without the `/` at the start.
   */
  command: string;

  /**
   * Arguments for the command.
   *
   * This is all the strings passed after the command itself, split by `' '`.
   *
   * If there is no arguments sent, this will be an empty array.
   */
  args: Array<string>;
};
