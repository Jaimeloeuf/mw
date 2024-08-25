import { ControllerFile } from "./ControllerFile.js";

const getVersionPathPrefix = (file: ControllerFile) =>
  file.version === '"neutral"'
    ? ""
    : `("/v${file.version}" satisfies typeof c.${file.controllerName}.version) + `;

export const routeDefinitionTemplate = (file: ControllerFile): string =>
  `r["${file.httpMethod}" satisfies typeof c.${file.controllerName}.method](
  ${getVersionPathPrefix(file)}
  ("${file.httpRoute}" satisfies typeof c.${file.controllerName}.path),
  c.${file.controllerName}.routeHandler
);
`;
