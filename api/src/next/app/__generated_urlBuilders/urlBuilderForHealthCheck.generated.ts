/**
 * ********************* THIS IS A GENERATED FILE *****************************
 * ********************* DO NOT MODIFY OR FORMAT MANUALLY *********************
 *
 * This file is automatically generated with the module:
 * genStandaloneHttpControllerUrlBuilders
 *
 * Generated hash in hex for code after this section is:
 * sha256(559af375e880ecd0385f4695c8510765055b3e4d5d7494a54a28ccfc4fd7acb0)
 */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable perfectionist/sort-exports */
import type {
  healthCheckController_UrlParams,
  healthCheckController_QueryParams,
} from "../../../__generated/httpControllerTypeDefinitions.generated.js";
import type { UrlBuilderOptions } from "./UrlBuilderOptions.generated.js";

import { createUrlQueryParamsString } from "./createUrlQueryParamsString.generated";

export type {
  healthCheckController_InputDTO,
  healthCheckController_OutputDTO,
} from "../../../__generated/httpControllerTypeDefinitions.generated.js";

export const urlBuilderForHealthCheck = (
  options: UrlBuilderOptions<{
    urlParams: healthCheckController_UrlParams;
    urlQueryParams: healthCheckController_QueryParams;
  }>,
) =>
  `${process.env["BASE_URL_TO_SELF"]}/api${createUrlQueryParamsString((options as any)?.urlQueryParams)}`;