import { generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport } from "../codegenForTs/index.js";

export const routeTableTemplate = (
  routeDefinitions: string,
) => `import { Router } from "express";

import { config } from "../config/index.js";
import { logger } from "../logging/index.js";
import * as c from "./httpControllerBarrelFile${generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}";

/**
 * Utility function to only register a HTTP route if it is not disabled via the
 * config option.
 */
function registerRouteIfNotDisabled({
  route,
  registerRoute,
}: {
  route: string;
  registerRoute: () => void;
}) {
  if (config.http_disabled_paths().has(route)) {
    logger.verbose(\`HTTP Route disabled (with config.\${config.http_disabled_paths.name})\`, \`\${route}\`);
    return;
  }
  registerRoute();
  if (config.http_verbose_log_route_registration()) {
    logger.nonProdVerbose("HTTP Route registered", route);
  }
}

/**
 * A route tables sort of file, where all HTTP API routes are defined here along
 * with the controllers/route-handlers that will be used to handle requests for
 * the specified route.
 *
 * ### Why do definitions here look so weird?
 * All HTTP route handlers / controllers are defined using \`httpController\`
 * which allows them to define the (HTTP method, API paths, Route hander) all in
 * the same file.
 *
 * The HTTP methods and API paths are then redefined here again, together with
 * the route handler used to handle them for clarity sake.
 *
 * By doing this, the HTTP methods and API paths are available for developers to
 * see in both the controller file and this main routes table file, which makes
 * it easy to see in both places without having to navigate code / jump around.
 *
 * The definitions are also guaranteed to be kept in sync using the \`satisfies\`
 * type checking operator, since both the HTTP methods and API paths are defined
 * as type literals!
 */
export function registerRoutesAndControllers() {
  const r = Router();

  ${routeDefinitions}

  return r;
}
`;
