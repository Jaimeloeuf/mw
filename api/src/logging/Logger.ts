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
    config.env() === "production"
      ? noOp<[label: string, ...args: Parameters<typeof console.log>]>
      : (label: string, ...args: Parameters<typeof console.log>) =>
          this.log("Verbose", label, args);
}

export const logger = new Logger();
