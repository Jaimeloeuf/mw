/**
 * ********************* THIS IS A GENERATED FILE *****************************
 * ********************* DO NOT MODIFY OR FORMAT MANUALLY *********************
 *
 * This file is automatically generated with the module:
 * genHttpControllerUrlBuilders
 *
 * Generated hash in hex for code after this section is:
 * sha256(e9a8159b80583e3dc621ee78786b35d06da09767eb0be6d3d7816d1284127df9)
 */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable perfectionist/sort-exports */
import type {
  RemoveMapKeyIfNever,
  VoidIfAllPropertiesInObjectIsVoid,
} from "../types/index.js";
import { config } from "../config/index.js";
import type * as t from "./httpControllerTypeDefinitions.generated.js";

type UrlBuilderOptions<T> = VoidIfAllPropertiesInObjectIsVoid<
  RemoveMapKeyIfNever<T>
>;

function createUrlQueryParamsString(
  urlQueryParams: undefined | null | Record<string, any>,
) {
  if (urlQueryParams == null) {
    return "";
  }

  const queryParams = new URLSearchParams();

  for (const [k, v] of Object.entries(urlQueryParams)) {
    queryParams.append(k, v?.toString() as string);
  }

  return "?" + queryParams.toString();
}

export const forHealthCheck = (
  options: UrlBuilderOptions<{
    urlParams: t.healthCheckController_UrlParams;
    urlQueryParams: t.healthCheckController_QueryParams;
  }>,
) =>
  `${config.base_url_to_self()}/api${createUrlQueryParamsString((options as any)?.urlQueryParams)}`;

export const forBlogNewSubscriber = (
  options: UrlBuilderOptions<{
    urlParams: t.blogNewSubscriberController_UrlParams;
    urlQueryParams: t.blogNewSubscriberController_QueryParams;
  }>,
) =>
  `${config.base_url_to_self()}/api/v1/blog/subscribe${createUrlQueryParamsString((options as any)?.urlQueryParams)}`;

export const forBucketlistCreateOne = (
  options: UrlBuilderOptions<{
    urlParams: t.bucketlistCreateOneController_UrlParams;
    urlQueryParams: t.bucketlistCreateOneController_QueryParams;
  }>,
) =>
  `${config.base_url_to_self()}/api/v1/bucketlist${createUrlQueryParamsString((options as any)?.urlQueryParams)}`;

export const forBucketlistGetOne = (
  options: UrlBuilderOptions<{
    urlParams: t.bucketlistGetOneController_UrlParams;
    urlQueryParams: t.bucketlistGetOneController_QueryParams;
  }>,
) =>
  `${config.base_url_to_self()}/api/v1/bucketlist/${options.urlParams.bucketlistID}${createUrlQueryParamsString((options as any)?.urlQueryParams)}`;

export const forCheckGetChecklist = (
  options: UrlBuilderOptions<{
    urlParams: t.checkGetChecklistController_UrlParams;
    urlQueryParams: t.checkGetChecklistController_QueryParams;
  }>,
) =>
  `${config.base_url_to_self()}/api/v1/check/checklist/${options.urlParams.checklistID}${createUrlQueryParamsString((options as any)?.urlQueryParams)}`;

export const forJohariCreateJohari = (
  options: UrlBuilderOptions<{
    urlParams: t.johariCreateJohariController_UrlParams;
    urlQueryParams: t.johariCreateJohariController_QueryParams;
  }>,
) =>
  `${config.base_url_to_self()}/api/v1/johari/create${createUrlQueryParamsString((options as any)?.urlQueryParams)}`;

export const forLeetcodeCreateLeetcodeQues = (
  options: UrlBuilderOptions<{
    urlParams: t.leetcodeCreateLeetcodeQuesController_UrlParams;
    urlQueryParams: t.leetcodeCreateLeetcodeQuesController_QueryParams;
  }>,
) =>
  `${config.base_url_to_self()}/api/v1/leetcode/ques${createUrlQueryParamsString((options as any)?.urlQueryParams)}`;

export const forLeetcodeGetLeetcodeQues = (
  options: UrlBuilderOptions<{
    urlParams: t.leetcodeGetLeetcodeQuesController_UrlParams;
    urlQueryParams: t.leetcodeGetLeetcodeQuesController_QueryParams;
  }>,
) =>
  `${config.base_url_to_self()}/api/v1/leetcode/ques/${options.urlParams.leetcodeQuesID}${createUrlQueryParamsString((options as any)?.urlQueryParams)}`;

export const forVersion = (
  options: UrlBuilderOptions<{
    urlParams: t.versionController_UrlParams;
    urlQueryParams: t.versionController_QueryParams;
  }>,
) =>
  `${config.base_url_to_self()}/api/version${createUrlQueryParamsString((options as any)?.urlQueryParams)}`;

export const forWebhookTelegram = (
  options: UrlBuilderOptions<{
    urlParams: t.webhookTelegramController_UrlParams;
    urlQueryParams: t.webhookTelegramController_QueryParams;
  }>,
) =>
  `${config.base_url_to_self()}/api/v1/webhook/telegram/${options.urlParams.telegramWebhookSecretPath}/${options.urlParams.telegramBotToken}${createUrlQueryParamsString((options as any)?.urlQueryParams)}`;
