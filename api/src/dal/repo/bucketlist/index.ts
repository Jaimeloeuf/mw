import { dalNoThrow } from "../dalNoThrow.js";

import { createBucketlist } from "./createBucketlist.js";

export const bucketlistRepo = {
  createBucketlist: dalNoThrow(createBucketlist),
};
