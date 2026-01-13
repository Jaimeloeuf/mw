import pc from "picocolors";

import { config } from "../config/index.js";
import { noOp } from "../utils/index.js";

type LogLevel = "Error" | "Info" | "Verbose";

/**
 * Simple custom logger wrapper around `console` with support for log levels,
 * timestamp, color, conditional logging.
 *
 * Use for everything that do not require full JSON structured logging, e.g.
 * CLI tools, one off scripts, startup logs...
 */
class SimpleLogger {
  static #colorizeByLogLevel(level: LogLevel, text: string) {
    switch (level) {
      case "Error":
        return pc.red(text);
      case "Info":
        return pc.green(text);
      case "Verbose":
        return pc.gray(text);
      default:
        throw new Error("Invalid log level");
    }
  }

  static #log(
    level: LogLevel,
    label: string,
    ...args: Parameters<typeof console.log>
  ) {
    const formattedLogOutput =
      `${$DateTime.now.asIsoDateTime()} ${level}: [${label}] ` +
      args.flat().join(" ");

    // Ignore eslint rule since this is used to implement logger itself
    // eslint-disable-next-line no-console
    console.log(SimpleLogger.#colorizeByLogLevel(level, formattedLogOutput));
  }

  /**
   * Standard error log level, think of this like `console.error`
   */
  error(label: string, ...args: Parameters<typeof console.error>) {
    SimpleLogger.#log("Error", label, args);
  }

  /**
   * Standard log level, think of this like `console.log`
   */
  info(label: string, ...args: Parameters<typeof console.log>) {
    SimpleLogger.#log("Info", label, args);
  }

  /**
   * Verbose log level for none critical info, this still logs in all
   * environment, but can be easily filtered away / turned off in logs viewer.
   */
  verbose(label: string, ...args: Parameters<typeof console.log>) {
    SimpleLogger.#log("Verbose", label, args);
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
          SimpleLogger.#log("Verbose", label, args);
}

// @todo Rename to simpleLogger later
export const logger = new SimpleLogger();
