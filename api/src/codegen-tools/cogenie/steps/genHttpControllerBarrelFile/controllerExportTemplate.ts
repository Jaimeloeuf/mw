import path from "path";

import { HttpControllerFile } from "../../utils/index.js";

export const controllerExportTemplate = (
  file: HttpControllerFile,
  controllerFolderPath: string,
): string =>
  `export { default as ${file.name} } from "../controllers-http/${path.relative(
    controllerFolderPath,
    file.path.replace(".ts", ".js"),
  )}";
`;
