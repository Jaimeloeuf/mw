import { colorizeByLogLevel } from "./colorizeByLogLevel.js";
import type { LogLevel } from "./LogLevel.js";

/**
 * Super simple custom logger, might change to use pino/winston in the future.
 */
class Logger {
  log(level: LogLevel, label: string, ...args: Parameters<typeof console.log>) {
    const formattedLogOutput =
      `${new Date().toISOString()} ${level}: [${label}] ` +
      args.flat().join(" ");

    console.log(colorizeByLogLevel(level, formattedLogOutput));
  }

  error(label: string, ...args: Parameters<typeof console.error>) {
    this.log("Error", label, args);
  }

  info(label: string, ...args: Parameters<typeof console.log>) {
    this.log("Info", label, args);
  }

  verbose(label: string, ...args: Parameters<typeof console.log>) {
    this.log("Verbose", label, args);
  }
}

export const logger = new Logger();
