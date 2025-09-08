import path from "path";

import { DataFunctionFile } from "../../utils/index.js";

export const dataFunctionExportTemplate = (
  file: DataFunctionFile,
  dalFolderPath: string,
): string =>
  `export { default as ${file.name} } from "../dal/df/${path.relative(
    dalFolderPath,
    file.path.replace(".ts", ".js"),
  )}";
`;
