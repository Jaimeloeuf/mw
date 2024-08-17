import { dalWrapper2 } from "../dalWrapper2.js";

import { createBucketlist } from "./createBucketlist.js";

export const bucketlistRepo = {
  createBucketlist: dalWrapper2(createBucketlist),
};
