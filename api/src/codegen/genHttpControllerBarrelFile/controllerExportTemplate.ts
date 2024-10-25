import path from "path";
import { ControllerFile } from "../utils/getControllerFiles/ControllerFile.js";

export const controllerExportTemplate = (
  file: ControllerFile,
  controllerFolderPath: string,
): string =>
  `export { default as ${file.controllerName} } from "../controllers-http/${path.relative(
    controllerFolderPath,
    file.path,
  )}";
`.replace(".ts", ".js");
