/**
 * Type of all `AsyncJobMachine` values as a union of string literals.
 */
export type AsyncJobMachineType =
  (typeof AsyncJobMachine)[keyof typeof AsyncJobMachine];

/**
 * The type of machine that we will use to run your job on.
 *
 * For now all machine types are equal, and all jobs default to 'web', which is
 * the same machine type as the web tier server. However we will expand machine
 * types in the future to support more niche usecases like high CPU / high
 * memory / GPU / etc...
 */
export const AsyncJobMachine = {
  /**
   * Same machine type as the web tier server.
   */
  web: "web",
} as const;
