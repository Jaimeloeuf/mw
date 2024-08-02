import type { Express } from "express";
import { routeNotFound } from "./routeNotFound.js";

import {
  healthCheck,
  version,
  blogNewSubscriberController,
} from "../controllers/index.js";

/**
 * A route tables sort of file, where all HTTP API routes are defined here along
 * with the controllers/route-handlers that will be used to handle requests for
 * the specified route.
 *
 * ### Why do definitions here look so weird?
 * All HTTP route handlers / controllers are defined using `expressWrapper`
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
 * The definitions are also guaranteed to be kept in sync using the `satisfies`
 * type checking operator, since both the HTTP methods and API paths are defined
 * as type literals!
 */
export function registerRoutesAndControllers(app: Express) {
  app["get" satisfies typeof healthCheck.method](
    "/" satisfies typeof healthCheck.path,
    healthCheck.routeHandler
  );

  app["get" satisfies typeof version.method](
    "/version" satisfies typeof version.path,
    version.routeHandler
  );

  app["post" satisfies typeof blogNewSubscriberController.method](
    "/blog/subscribe" satisfies typeof blogNewSubscriberController.path,
    blogNewSubscriberController.routeHandler
  );

  // Since this is the last non-error-handling route handler used, assume 404
  // as no other route handler responded.
  app.use(routeNotFound.routeHandler);
}
