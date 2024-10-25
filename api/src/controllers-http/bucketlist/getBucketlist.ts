import { z } from "zod";
import { httpController } from "../../http/index.js";
import { bucketlistService } from "../../services/index.js";

export default httpController({
  version: 1,
  method: "get",
  path: "/bucketlist/:bucketlistID",
  guards: null,
  urlParamsValidator: z.object({
    bucketlistID: z.string(),
  }),
  urlQueryParamsValidator: null,
  requestBodyValidator: null,
  async httpRequestHandler({ urlParams }) {
    return bucketlistService.getBucketlist(urlParams.bucketlistID);
  },
});
