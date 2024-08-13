import { dalWrapper } from "../dalWrapper.js";

import { createBucketlist } from "./createBucketlist.js";

export const bucketlistRepo = {
  createBucketlist: dalWrapper(createBucketlist),
};
