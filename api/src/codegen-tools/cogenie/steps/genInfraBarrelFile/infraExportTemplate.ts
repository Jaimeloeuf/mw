import path from "path";

import { InfraFile } from "../../utils/index.js";

export const infraExportTemplate = (
  file: InfraFile,
  folderPath: string,
): string =>
  `export { default as ${file.name} } from "../infra/${path.relative(
    folderPath,
    file.path.replace(".ts", ".js"),
  )}";
`;
