import { ControllerFile } from "./ControllerFile.js";

const getVersionPathPrefix = (file: ControllerFile) =>
  file.version === '"neutral"'
    ? ""
    : `("/v${file.version}" satisfies typeof ${file.controllerName}.version) + `;

export const routeDefinitionTemplate = (file: ControllerFile): string =>
  `app["${file.httpMethod}" satisfies typeof ${file.controllerName}.method](
  ${getVersionPathPrefix(file)}
  ("${file.httpRoute}" satisfies typeof ${file.controllerName}.path),
  ${file.controllerName}.routeHandler
);
`;
