import { logger } from "../logging/index.js";

export function registerGlobalUncaughtIssueHandlers() {
  process.on("unhandledRejection", (err: Error, promise: Promise<unknown>) => {
    logger.error(
      registerGlobalUncaughtIssueHandlers.name,
      `Caught unhandled Rejection: ${promise}\n` + err.stack,
    );
  });
  process.on("uncaughtException", (err: Error) => {
    logger.error(
      registerGlobalUncaughtIssueHandlers.name,
      `Caught unhandled Exception: ${err}\n` + err.stack,
    );
  });

  logger.verbose(
    registerGlobalUncaughtIssueHandlers.name,
    "Registered global handlers for uncaught promise rejections and errors",
  );
}
