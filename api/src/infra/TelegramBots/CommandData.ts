/**
 * Data parsed out from a telegram command
 */
export type CommandData = {
  /**
   * Arguments for the command.
   *
   * This is all the strings passed after the command itself, split by `' '`.
   *
   * If there is no arguments sent, this will be an empty array.
   */
  args: Array<string>;
};
