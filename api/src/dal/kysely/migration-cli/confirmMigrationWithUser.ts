import readline from "node:readline";

import { logger } from "../../../logging/index.js";

export async function confirmMigrationWithUser(confirmationQuestion: string) {
  const isKyeselyMigrationRanInCI = process.argv.includes("--ci");

  if (isKyeselyMigrationRanInCI) {
    logger.info(
      confirmMigrationWithUser.name,
      "Skipping confirmation validation in CI environment...",
    );
    return true;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await new Promise((resolve: (answer: string) => void) =>
    rl.question(confirmationQuestion + " [y/n]: ", resolve),
  );

  rl.close();

  if (answer === "y") {
    logger.info(confirmMigrationWithUser.name, "Thank you for confirming...");
    return true;
  }

  logger.info(confirmMigrationWithUser.name, "Aborting...");
  return false;
}
