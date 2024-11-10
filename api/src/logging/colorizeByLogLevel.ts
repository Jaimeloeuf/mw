import pc from "picocolors";

import type { LogLevel } from "./LogLevel.js";

export function colorizeByLogLevel(level: LogLevel, text: string) {
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
