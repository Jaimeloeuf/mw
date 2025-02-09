import type { LogLevel } from "./LogLevel.js";

import { config } from "../config/index.js";
import { noOp } from "../utils/index.js";
import { colorizeByLogLevel } from "./colorizeByLogLevel.js";

/**
 * Super simple custom logger, might change to use pino/winston in the future.
 */
class Logger {
  private log(
    level: LogLevel,
    label: string,
    ...args: Parameters<typeof console.log>
  ) {
    const formattedLogOutput =
      `${new Date().toISOString()} ${level}: [${label}] ` +
      args.flat().join(" ");

    // Ignore eslint rule since this is used to implement logger itself
    // eslint-disable-next-line no-console
    console.log(colorizeByLogLevel(level, formattedLogOutput));
  }

  /**
   * Standard error log level, think of this like `console.error`
   */
  error(label: string, ...args: Parameters<typeof console.error>) {
    this.log("Error", label, args);
  }

  /**
   * Standard log level, think of this like `console.log`
   */
  info(label: string, ...args: Parameters<typeof console.log>) {
    this.log("Info", label, args);
  }

  /**
   * Verbose log level for none critical info, this still logs in all
   * environment, but can be easily filtered away / turned off in logs viewer.
   */
  verbose(label: string, ...args: Parameters<typeof console.log>) {
    this.log("Verbose", label, args);
  }

  /**
   * Verbose log level for none critical info, that is similiar to `verbose` log
   * level, but unlike `verbose`, this only logs in none production environment.
   */
  nonProdVerbose =
    // @todo There could be a better fix for this
    // Instead of using the config directly like 'config.env() === "production"'
    // there are cases where the config object is not bootstrapped correctly and
    // ends up being undefined which causes whatever that is using it to crash.
    // Since Logger is such an integral part of so many other 'entrypoints'
    // there are many cases where this just crash because of how the entrypoint
    // trigger things without bootstrapping everything properly. Therefore this
    // simple fix is placed so that when that happens, we can fallback to using
    // the env var directly.
    (config?.env() ?? process.env["NODE_ENV"]) === "production"
      ? noOp<[label: string, ...args: Parameters<typeof console.log>]>
      : (label: string, ...args: Parameters<typeof console.log>) =>
          this.log("Verbose", label, args);
}

export const logger = new Logger();
