import { z } from "zod";
import { httpController } from "../../http/httpController.js";
import { bucketlistService } from "../../services/index.js";

export const getBucketlistController = httpController({
  version: 1,
  method: "get",
  path: "/bucketlist/:bucketlistID",
  guards: null,
  requestDataValidator: z.object({
    bucketlistID: z.string(),
  }),
  async httpRequestHandler({ requestData }) {
    return bucketlistService.getBucketlist(requestData.bucketlistID);
  },
});
