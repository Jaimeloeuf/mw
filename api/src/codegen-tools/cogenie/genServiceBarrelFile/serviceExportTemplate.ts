import path from "path";

import { ServiceFile } from "../utils/index.js";

export const serviceExportTemplate = (
  file: ServiceFile,
  folderPath: string,
): string =>
  `export { default as ${file.name} } from "../services/${path.relative(
    folderPath,
    file.path.replace(".ts", ".js"),
  )}";
`;
