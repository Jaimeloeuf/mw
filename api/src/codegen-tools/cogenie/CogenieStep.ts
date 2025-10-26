import { GeneratedFileTarget } from "./GeneratedFileTarget.js";

/**
 * Cogenie Step as a class
 */
export abstract class CogenieStep {
  /**
   * A map of generated file details produced by the current step
   */
  abstract getFiles(): Record<string, GeneratedFileTarget>;

  /**
   * The main codegen implementation
   *
   * @todo
   * Potentially return an array of string paths to generated files to track
   * what has been generated in the past instead of relying on reading the fs.
   */
  abstract generate(): void | Promise<void>;
}
