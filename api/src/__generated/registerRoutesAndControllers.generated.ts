/**
 * ********************* THIS IS A GENERATED FILE *****************************
 * ********************* DO NOT MODIFY OR FORMAT MANUALLY *********************
 *
 * This file is automatically generated with the module:
 * genHttpRoutesTable
 *
 * Generated hash in hex for code after this section is:
 * sha256(838902fdcb55b09faa86e774d8eab28ce18c9030a149e52418eb100d9114ef92)
 */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable perfectionist/sort-exports */
import { Router } from "express";

import { config } from "../config/index.js";
import { logger } from "../logging/index.js";
import * as c from "./httpControllerBarrelFile.generated.do_not_include_in_barrel_file.js";

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
    logger.verbose(
      `HTTP Route disabled (with config.${config.http_disabled_paths.name})`,
      `${route}`,
    );
    return;
  }
  registerRoute();
  logger.nonProdVerbose("HTTP Route registered", route);
}

/**
 * A route tables sort of file, where all HTTP API routes are defined here along
 * with the controllers/route-handlers that will be used to handle requests for
 * the specified route.
 *
 * ### Why do definitions here look so weird?
 * All HTTP route handlers / controllers are defined using `httpController`
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
export function registerRoutesAndControllers() {
  const r = Router();

  registerRouteIfNotDisabled({
    route: "GET /api/",
    registerRoute: () =>
      r["get" satisfies typeof c.healthCheck.method](
        "/" satisfies typeof c.healthCheck.path,
        c.healthCheck.routeHandler,
      ),
  });

  registerRouteIfNotDisabled({
    route: "POST /api/v1/blog/subscribe",
    registerRoute: () =>
      r["post" satisfies typeof c.blogNewSubscriber.method](
        ("/v1" satisfies typeof c.blogNewSubscriber.version) +
          ("/blog/subscribe" satisfies typeof c.blogNewSubscriber.path),
        c.blogNewSubscriber.routeHandler,
      ),
  });

  registerRouteIfNotDisabled({
    route: "POST /api/v1/bucketlist",
    registerRoute: () =>
      r["post" satisfies typeof c.bucketlistCreateOne.method](
        ("/v1" satisfies typeof c.bucketlistCreateOne.version) +
          ("/bucketlist" satisfies typeof c.bucketlistCreateOne.path),
        c.bucketlistCreateOne.routeHandler,
      ),
  });

  registerRouteIfNotDisabled({
    route: "GET /api/v1/bucketlist/:bucketlistID",
    registerRoute: () =>
      r["get" satisfies typeof c.bucketlistGetOne.method](
        ("/v1" satisfies typeof c.bucketlistGetOne.version) +
          ("/bucketlist/:bucketlistID" satisfies typeof c.bucketlistGetOne.path),
        c.bucketlistGetOne.routeHandler,
      ),
  });

  registerRouteIfNotDisabled({
    route: "GET /api/v1/check/checklist/:checklistID",
    registerRoute: () =>
      r["get" satisfies typeof c.checkGetChecklist.method](
        ("/v1" satisfies typeof c.checkGetChecklist.version) +
          ("/check/checklist/:checklistID" satisfies typeof c.checkGetChecklist.path),
        c.checkGetChecklist.routeHandler,
      ),
  });

  registerRouteIfNotDisabled({
    route: "GET /api/v1/johari/:johariID",
    registerRoute: () =>
      r["get" satisfies typeof c.johariGetJohari.method](
        ("/v1" satisfies typeof c.johariGetJohari.version) +
          ("/johari/:johariID" satisfies typeof c.johariGetJohari.path),
        c.johariGetJohari.routeHandler,
      ),
  });

  registerRouteIfNotDisabled({
    route: "POST /api/v1/johari/answer",
    registerRoute: () =>
      r["post" satisfies typeof c.johariCreateJohariAnswer.method](
        ("/v1" satisfies typeof c.johariCreateJohariAnswer.version) +
          ("/johari/answer" satisfies typeof c.johariCreateJohariAnswer.path),
        c.johariCreateJohariAnswer.routeHandler,
      ),
  });

  registerRouteIfNotDisabled({
    route: "GET /api/v1/johari/answers/:johariID",
    registerRoute: () =>
      r["get" satisfies typeof c.johariGetJohariAnswers.method](
        ("/v1" satisfies typeof c.johariGetJohariAnswers.version) +
          ("/johari/answers/:johariID" satisfies typeof c.johariGetJohariAnswers.path),
        c.johariGetJohariAnswers.routeHandler,
      ),
  });

  registerRouteIfNotDisabled({
    route: "POST /api/v1/johari/create",
    registerRoute: () =>
      r["post" satisfies typeof c.johariCreateJohari.method](
        ("/v1" satisfies typeof c.johariCreateJohari.version) +
          ("/johari/create" satisfies typeof c.johariCreateJohari.path),
        c.johariCreateJohari.routeHandler,
      ),
  });

  registerRouteIfNotDisabled({
    route: "POST /api/v1/leetcode/ques",
    registerRoute: () =>
      r["post" satisfies typeof c.leetcodeCreateLeetcodeQues.method](
        ("/v1" satisfies typeof c.leetcodeCreateLeetcodeQues.version) +
          ("/leetcode/ques" satisfies typeof c.leetcodeCreateLeetcodeQues.path),
        c.leetcodeCreateLeetcodeQues.routeHandler,
      ),
  });

  registerRouteIfNotDisabled({
    route: "GET /api/v1/leetcode/ques/:leetcodeQuesID",
    registerRoute: () =>
      r["get" satisfies typeof c.leetcodeGetLeetcodeQues.method](
        ("/v1" satisfies typeof c.leetcodeGetLeetcodeQues.version) +
          ("/leetcode/ques/:leetcodeQuesID" satisfies typeof c.leetcodeGetLeetcodeQues.path),
        c.leetcodeGetLeetcodeQues.routeHandler,
      ),
  });

  registerRouteIfNotDisabled({
    route: "GET /api/version",
    registerRoute: () =>
      r["get" satisfies typeof c.version.method](
        "/version" satisfies typeof c.version.path,
        c.version.routeHandler,
      ),
  });

  registerRouteIfNotDisabled({
    route:
      "POST /api/v1/webhook/telegram/:telegramWebhookSecretPath/:telegramBotToken",
    registerRoute: () =>
      r["post" satisfies typeof c.webhookTelegram.method](
        ("/v1" satisfies typeof c.webhookTelegram.version) +
          ("/webhook/telegram/:telegramWebhookSecretPath/:telegramBotToken" satisfies typeof c.webhookTelegram.path),
        c.webhookTelegram.routeHandler,
      ),
  });

  return r;
}
