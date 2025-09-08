import path from "path";

import { genAndSaveGeneratedCode } from "../../../../codegen-lib/codegenForTs/index.js";
import { getAsyncJobTypeFiles } from "../../utils/index.js";

/**
 * Generate a mapping of `AsyncJobType['ID']` to `AsyncJobType`
 */
export async function genAsyncJobTypeMapping() {
  const folderPath = path.join(import.meta.dirname, `../../../../async/jobs`);

  const files = await getAsyncJobTypeFiles();

  const generatedCode = `import type { AsyncJobType } from "../async/AsyncJobType.js";

/**
 * Mapping of \`AsyncJobType['ID']\` to \`AsyncJobType\`.
 *
 * Use \`import\` function to asynchronously load the job definition module, so
 * that they are not all loaded on startup and only lazily loaded whenever they
 * are used.
 */
export const asyncJobTypeMapping: Record<
  string,
  () => Promise<{ default: AsyncJobType<any> }>
> = {
  ${files
    .map(
      (file) =>
        `"${file.id}": () => import("../async/jobs/${path.relative(
          folderPath,
          file.path.replace(".ts", ".js"),
        )}")`,
    )
    .join()}
};
`;

  const asyncJobTypeExportFileName = "asyncJobTypeMapping";

  await genAndSaveGeneratedCode(
    genAsyncJobTypeMapping,
    generatedCode,
    asyncJobTypeExportFileName,
  );
}
