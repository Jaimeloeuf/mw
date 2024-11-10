import type { WrappedFunction } from "./WrappedFunction.js";

import { logger } from "../logging/index.js";
import { runInParallel } from "./runInParallel.js";
import { runSequentially } from "./runSequentially.js";

/**
 * Simple Post Processing runner that runs your job functions in web tier
 * without blocking service function execution.
 */
export class SimplePostProcessingRunner {
  constructor(
    private callerName: string,
    private runType: "sequentially" | "parallelly",

    /**
     * Optionally required only for sequential executions
     */
    private continueOnFailure?: boolean,
  ) {
    if (runType === "sequentially" && continueOnFailure === undefined) {
      throw new Error(
        `${SimplePostProcessingRunner.name} requires continue option to be set for Sequential executions`,
      );
    }
  }

  #fns: Array<WrappedFunction> = [];

  /**
   * Functions added will be ran sequentially based on the sequence of addition
   *
   * ## Functions should be NAMED
   * Used for logging, especially if there are any errors.
   */
  addJob(fn: Function) {
    // Extra runtime check alongside compile time check with ESLint rule
    // 'mwEslintPlugin/require-function-name-for-addJob'
    if (fn.name === "") {
      throw new Error(
        `Functions passed to ${SimplePostProcessingRunner.name} must be named`,
      );
    }

    const wrappedFunction = async () => {
      try {
        logger.verbose(
          `${this.callerName}:${SimplePostProcessingRunner.name}`,
          `Executing: ${fn.name}`,
        );

        await fn();

        logger.verbose(
          `${this.callerName}:${SimplePostProcessingRunner.name}`,
          `Successfully executed: ${fn.name}`,
        );

        return true;
      } catch (error) {
        logger.verbose(
          `${this.callerName}:${SimplePostProcessingRunner.name}`,
          `Failed while executing: ${fn.name}`,
        );

        // @todo Create and log an error ID
        // @todo Notify devs about this error
        logger.error(
          `${this.callerName}:${SimplePostProcessingRunner.name}:${fn.name}`,
          error instanceof Error ? error.stack : error,
        );

        return false;
      }
    };

    // Reuse fn.name so that logging uses the real name
    Object.defineProperty(wrappedFunction, "name", { value: fn.name });

    this.#fns.push(wrappedFunction);

    return this;
  }

  /**
   * Complete setting of Jobs and run them in the next event loop.
   */
  async run() {
    setImmediate(async () => {
      const functionNames = this.#fns.map((fn) => fn.name).join(", ");

      logger.info(
        `${this.callerName}:${SimplePostProcessingRunner.name}`,
        `Executing these functions ${this.runType}: ${functionNames}`,
      );

      if (this.runType === "sequentially") {
        return runSequentially(
          SimplePostProcessingRunner.name,
          this.#fns,
          !!this.continueOnFailure,
        );
      }

      if (this.runType === "parallelly") {
        return runInParallel(SimplePostProcessingRunner.name, this.#fns);
      }

      // @todo
      // For both methods, if the post processing failed, we should either store
      // the job as a jlow so that it can be either automatically retried at a
      // later time or re-ran manually
      // We should enforce a at least and at most once delivery type

      throw new Error(`Unknown run type: ${this.runType}`);
    });
  }
}
