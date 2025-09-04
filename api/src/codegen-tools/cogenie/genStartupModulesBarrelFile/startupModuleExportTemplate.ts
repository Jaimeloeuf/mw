import path from "path";

import { StartupFile } from "../utils/index.js";

export const startupModuleExportTemplate = (
  file: StartupFile,
  folderPath: string,
): string =>
  `export { default as ${file.name} } from "../startup/${path.relative(
    folderPath,
    file.path.replace(".ts", ".js"),
  )}";
`;
