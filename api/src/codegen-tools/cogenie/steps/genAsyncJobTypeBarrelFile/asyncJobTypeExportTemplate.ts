import path from "path";

import type { AsyncJobTypeFile } from "../../utils/index.js";

export const asyncJobTypeExportTemplate = (
  file: AsyncJobTypeFile,
  folderPath: string,
): string =>
  `export { default as ${file.name} } from "../async/jobs/${path.relative(
    folderPath,
    file.path.replace(".ts", ".js"),
  )}";
`;
