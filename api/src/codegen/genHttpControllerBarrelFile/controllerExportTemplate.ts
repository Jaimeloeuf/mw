import path from "path";

import { HttpControllerFile } from "../utils/getHttpControllerFiles/HttpControllerFile.js";

export const controllerExportTemplate = (
  file: HttpControllerFile,
  controllerFolderPath: string,
): string =>
  `export { default as ${file.name} } from "../controllers-http/${path.relative(
    controllerFolderPath,
    file.path.replace(".ts", ".js"),
  )}";
`;
