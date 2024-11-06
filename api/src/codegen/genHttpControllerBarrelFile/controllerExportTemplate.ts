import path from "path";
import { HttpControllerFile } from "../utils/getHttpControllerFiles/HttpControllerFile.js";

export const controllerExportTemplate = (
  file: HttpControllerFile,
  controllerFolderPath: string,
): string =>
  `export { default as ${file.controllerName} } from "../controllers-http/${path.relative(
    controllerFolderPath,
    file.path.replace(".ts", ".js"),
  )}";
`;
