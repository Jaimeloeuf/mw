import { dalWrapper } from "../dalWrapper.js";

import { getBucketlist } from "./getBucketlist.js";
import { createBucketlist } from "./createBucketlist.js";

export const bucketlistRepo = {
  getBucketlist: dalWrapper(getBucketlist),
  createBucketlist: dalWrapper(createBucketlist),
};
