import { ControllerFile } from "./ControllerFile.js";

const getVersionPathPrefix = (version: string) =>
  version === '"neutral"' ? "" : `"/v${version}" + `;

export const routeDefinitionTemplate = (file: ControllerFile): string =>
  `app["${file.httpMethod}" satisfies typeof ${file.controllerName}.method](
  ${getVersionPathPrefix(file.version)}("${file.httpRoute}" satisfies typeof ${file.controllerName}.path),
  ${file.controllerName}.routeHandler
);
`;
