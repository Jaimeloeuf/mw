/**
 * ********************* THIS IS A GENERATED FILE *****************************
 * ********************* DO NOT MODIFY OR FORMAT MANUALLY *********************
 *
 * This file is automatically generated with the module:
 * genHttpDtoTypeDefinition
 *
 * Generated hash in hex for code after this section is:
 * sha256<fbeae0ffbd74b4b6c31063429bde9d99c27b93a8d36201ba58a00d290ab24df4>
 */
import type { z } from "zod";

import { healthCheck } from "../controllers/healthCheck.js";
import { blogNewSubscriberController } from "../controllers/blog/blogNewSubscriberController.js";
import { createBucketlistController } from "../controllers/bucketlist/createBucketlist.js";
import { getBucketlistController } from "../controllers/bucketlist/getBucketlist.js";
import { version } from "../controllers/version.js";

export type healthCheck_QueryParams = z.infer<
  Exclude<(typeof healthCheck)["urlQueryParamsValidator"], null>
>;
export type healthCheck_InputDTO = z.infer<
  Exclude<(typeof healthCheck)["requestBodyValidator"], null>
>;
export type healthCheck_OutputDTO = Awaited<
  ReturnType<(typeof healthCheck)["httpRequestHandler"]>
>;
export type blogNewSubscriberController_QueryParams = z.infer<
  Exclude<(typeof blogNewSubscriberController)["urlQueryParamsValidator"], null>
>;
export type blogNewSubscriberController_InputDTO = z.infer<
  Exclude<(typeof blogNewSubscriberController)["requestBodyValidator"], null>
>;
export type blogNewSubscriberController_OutputDTO = Awaited<
  ReturnType<(typeof blogNewSubscriberController)["httpRequestHandler"]>
>;
export type createBucketlistController_QueryParams = z.infer<
  Exclude<(typeof createBucketlistController)["urlQueryParamsValidator"], null>
>;
export type createBucketlistController_InputDTO = z.infer<
  Exclude<(typeof createBucketlistController)["requestBodyValidator"], null>
>;
export type createBucketlistController_OutputDTO = Awaited<
  ReturnType<(typeof createBucketlistController)["httpRequestHandler"]>
>;
export type getBucketlistController_QueryParams = z.infer<
  Exclude<(typeof getBucketlistController)["urlQueryParamsValidator"], null>
>;
export type getBucketlistController_InputDTO = z.infer<
  Exclude<(typeof getBucketlistController)["requestBodyValidator"], null>
>;
export type getBucketlistController_OutputDTO = Awaited<
  ReturnType<(typeof getBucketlistController)["httpRequestHandler"]>
>;
export type version_QueryParams = z.infer<
  Exclude<(typeof version)["urlQueryParamsValidator"], null>
>;
export type version_InputDTO = z.infer<
  Exclude<(typeof version)["requestBodyValidator"], null>
>;
export type version_OutputDTO = Awaited<
  ReturnType<(typeof version)["httpRequestHandler"]>
>;
