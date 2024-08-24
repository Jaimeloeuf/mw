import path from "path";
import type { ControllerFile } from "./ControllerFile.js";

export const controllerImportTemplate = (
  file: ControllerFile,
  controllerFolderPath: string
): string =>
  `import { ${file.controllerName} } from "../controllers/${path.relative(
    controllerFolderPath,
    file.path
  )}";
`.replace(".ts", ".js");
