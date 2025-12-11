import fs from "fs";
import path from "path";

import { asyncJobTypeMapping } from "../../../../__generated/index.js";
import { pseudoRandomAlphanumericString } from "../../../../utils/index.js";
import {
  cogenieRunAllSteps,
  showGitStatusOfGeneratedFiles,
} from "../../../cogenie/index.js";
import { Scaffoldr } from "../../Scaffoldr.js";

export default Scaffoldr({
  inputs: [
    {
      name: "asyncJobName",
      question: "AsyncJob name in PascalCase (e.g. SendRecurringReminder)",
      validateAndTransformInput(input: string) {
        if (!new RegExp(/^[A-Z][A-Za-z0-9]*$/g).test(input)) {
          throw new Error("AsyncJob name must be PascalCase.");
        }
        return input;
      },
    },
  ],

  async generate(inputs) {
    const asyncJobsFolderPath = path.join(
      import.meta.dirname,
      `../../../../async/jobs`,
    );

    const asyncJobTemplate = fs.readFileSync(
      path.join(asyncJobsFolderPath, `__async_job_template.ts`),
      { encoding: "utf8" },
    );

    /**
     * Generate unique AsyncJobTypeID by generating a unique ID and checking
     * against all AsyncJobTypeIDs to see if it already exists, and using the
     * first unique ID generated that doesnt already exists.
     */
    let uniqueAsyncJobTypeID: $Nullable<string>;
    do {
      uniqueAsyncJobTypeID = pseudoRandomAlphanumericString(4);
    } while (asyncJobTypeMapping[uniqueAsyncJobTypeID] !== undefined);

    const generatedAsyncJobFile = asyncJobTemplate
      .replaceAll("AsyncJobTemplate", inputs.asyncJobName)
      .replace("__generated_async_job_type_id__", uniqueAsyncJobTypeID);

    const asyncJobFilePath = path.join(
      asyncJobsFolderPath,
      `${inputs.asyncJobName}.job.ts`,
    );

    return [
      {
        path: asyncJobFilePath,
        generatedCode: generatedAsyncJobFile,
      },
    ];
  },

  async onSave() {
    // Trigger codegen for the new AsyncJob
    // @todo Should only run 1 step
    await cogenieRunAllSteps();
    await showGitStatusOfGeneratedFiles();
  },
});
