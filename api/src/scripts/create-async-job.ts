import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import readline from "readline/promises";

import { logger } from "../logging/index.js";

async function createAsyncJob() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const asyncJobName = await rl.question(
    `AsyncJob name in PascalCase (e.g. SendRecurringReminder): `,
  );
  if (!new RegExp(/^[A-Z][A-Za-z0-9]*$/g).test(asyncJobName)) {
    logger.error(createAsyncJob.name, `AsyncJob name must be PascalCase.`);
    rl.close();
    return;
  }

  rl.close();

  const asyncJobsFolderPath = path.join(import.meta.dirname, `../async/jobs`);

  const asyncJobTemplate = await fs.readFile(
    path.join(asyncJobsFolderPath, `__async_job_template.ts`),
    { encoding: "utf8" },
  );

  const generatedAsyncJobFile = asyncJobTemplate
    .replaceAll("AsyncJobTemplate", asyncJobName)
    .replace(
      "__generated_async_job_type_id__",
      crypto.randomBytes(4).toString("hex").slice(0, 4).toLowerCase(),
    );

  const asyncJobFilePath = path.join(
    asyncJobsFolderPath,
    `${asyncJobName}.job.ts`,
  );

  await fs.writeFile(asyncJobFilePath, generatedAsyncJobFile);

  logger.info(createAsyncJob.name, `Created AsyncJob: ${asyncJobFilePath}`);
  logger.info(createAsyncJob.name, `Please update the AsyncJob file details.`);
}

createAsyncJob();
