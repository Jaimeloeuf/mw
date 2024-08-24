import path from "path";
import type { ControllerFile } from "./ControllerFile.js";

export const controllerExportTemplate = (
  file: ControllerFile,
  controllerFolderPath: string
): string =>
  `export * from "../controllers/${path.relative(
    controllerFolderPath,
    file.path
  )}";
`.replace(".ts", ".js");
