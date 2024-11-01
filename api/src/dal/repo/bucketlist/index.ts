import { dalWrapper } from "../dalWrapper.js";

import { getBucketlist } from "./getBucketlist.df.js";
import { createBucketlist } from "./createBucketlist.df.js";

export const bucketlistRepo = {
  getBucketlist: dalWrapper(getBucketlist),
  createBucketlist: dalWrapper(createBucketlist),
};
