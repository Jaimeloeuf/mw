/**
 * ********************* THIS IS A GENERATED FILE *****************************
 * ********************* DO NOT MODIFY OR FORMAT MANUALLY *********************
 *
 * This file is automatically generated with the module:
 * genStandaloneHttpControllerUrlBuilders
 *
 * Generated hash in hex for code after this section is:
 * sha256(3bc35626aee545a0a7d5567b946601e1cc44d7698c2bcd3de5ba408514eea5f0)
 */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable perfectionist/sort-exports */
import type {
  versionController_UrlParams,
  versionController_QueryParams,
} from "../../../__generated/httpControllerTypeDefinitions.generated.js";
import type { UrlBuilderOptions } from "./UrlBuilderOptions.generated.js";

import { createUrlQueryParamsString } from "./createUrlQueryParamsString.generated";

export type {
  versionController_InputDTO,
  versionController_OutputDTO,
} from "../../../__generated/httpControllerTypeDefinitions.generated.js";

export const urlBuilderForVersion = (
  options: UrlBuilderOptions<{
    urlParams: versionController_UrlParams;
    urlQueryParams: versionController_QueryParams;
  }>,
) =>
  `${process.env["BASE_URL_TO_SELF"]}/api/version${createUrlQueryParamsString((options as any)?.urlQueryParams)}`;