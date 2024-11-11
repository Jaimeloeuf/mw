/**
 * ********************* THIS IS A GENERATED FILE *****************************
 * ********************* DO NOT MODIFY OR FORMAT MANUALLY *********************
 *
 * This file is automatically generated with the module:
 * genHttpControllerTypeDefinitions
 *
 * Generated hash in hex for code after this section is:
 * sha256(e97859f6f293f5d7d7aeea8bcf31924aa64ec96cdbb4f0f768b82dc74c879f56)
 */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable perfectionist/sort-exports */
import type { z } from "zod";
import * as c from "./httpControllerBarrelFile.generated.do_not_include_in_barrel_file.js";

export type healthCheckController_QueryParams = z.infer<
  Exclude<(typeof c.healthCheck)["urlQueryParamsValidator"], null>
>;
export type healthCheckController_InputDTO = z.infer<
  Exclude<(typeof c.healthCheck)["requestBodyValidator"], null>
>;
export type healthCheckController_OutputDTO = Awaited<
  ReturnType<(typeof c.healthCheck)["httpRequestHandler"]>
>;
export type blogNewSubscriberController_QueryParams = z.infer<
  Exclude<(typeof c.blogNewSubscriber)["urlQueryParamsValidator"], null>
>;
export type blogNewSubscriberController_InputDTO = z.infer<
  Exclude<(typeof c.blogNewSubscriber)["requestBodyValidator"], null>
>;
export type blogNewSubscriberController_OutputDTO = Awaited<
  ReturnType<(typeof c.blogNewSubscriber)["httpRequestHandler"]>
>;
export type bucketlistCreateOneController_QueryParams = z.infer<
  Exclude<(typeof c.bucketlistCreateOne)["urlQueryParamsValidator"], null>
>;
export type bucketlistCreateOneController_InputDTO = z.infer<
  Exclude<(typeof c.bucketlistCreateOne)["requestBodyValidator"], null>
>;
export type bucketlistCreateOneController_OutputDTO = Awaited<
  ReturnType<(typeof c.bucketlistCreateOne)["httpRequestHandler"]>
>;
export type bucketlistGetOneController_QueryParams = z.infer<
  Exclude<(typeof c.bucketlistGetOne)["urlQueryParamsValidator"], null>
>;
export type bucketlistGetOneController_InputDTO = z.infer<
  Exclude<(typeof c.bucketlistGetOne)["requestBodyValidator"], null>
>;
export type bucketlistGetOneController_OutputDTO = Awaited<
  ReturnType<(typeof c.bucketlistGetOne)["httpRequestHandler"]>
>;
export type leetcodeCreateLeetcodeQuesController_QueryParams = z.infer<
  Exclude<
    (typeof c.leetcodeCreateLeetcodeQues)["urlQueryParamsValidator"],
    null
  >
>;
export type leetcodeCreateLeetcodeQuesController_InputDTO = z.infer<
  Exclude<(typeof c.leetcodeCreateLeetcodeQues)["requestBodyValidator"], null>
>;
export type leetcodeCreateLeetcodeQuesController_OutputDTO = Awaited<
  ReturnType<(typeof c.leetcodeCreateLeetcodeQues)["httpRequestHandler"]>
>;
export type leetcodeGetLeetcodeQuesController_QueryParams = z.infer<
  Exclude<(typeof c.leetcodeGetLeetcodeQues)["urlQueryParamsValidator"], null>
>;
export type leetcodeGetLeetcodeQuesController_InputDTO = z.infer<
  Exclude<(typeof c.leetcodeGetLeetcodeQues)["requestBodyValidator"], null>
>;
export type leetcodeGetLeetcodeQuesController_OutputDTO = Awaited<
  ReturnType<(typeof c.leetcodeGetLeetcodeQues)["httpRequestHandler"]>
>;
export type versionController_QueryParams = z.infer<
  Exclude<(typeof c.version)["urlQueryParamsValidator"], null>
>;
export type versionController_InputDTO = z.infer<
  Exclude<(typeof c.version)["requestBodyValidator"], null>
>;
export type versionController_OutputDTO = Awaited<
  ReturnType<(typeof c.version)["httpRequestHandler"]>
>;