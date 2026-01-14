import { simpleLogger } from "../logging/SimpleLogger.js";

export function registerGlobalUncaughtIssueHandlers() {
  process.on("unhandledRejection", (err: Error, promise: Promise<unknown>) => {
    simpleLogger.error(
      registerGlobalUncaughtIssueHandlers.name,
      `Caught unhandled Rejection: ${promise}\n` + err.stack,
    );
  });
  process.on("uncaughtException", (err: Error) => {
    simpleLogger.error(
      registerGlobalUncaughtIssueHandlers.name,
      `Caught unhandled Exception: ${err}\n` + err.stack,
    );
  });

  simpleLogger.verbose(
    registerGlobalUncaughtIssueHandlers.name,
    "Registered global handlers for uncaught promise rejections and errors",
  );
}
