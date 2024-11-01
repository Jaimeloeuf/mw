import { dataFn } from "../dataFn.js";

import { getBucketlist } from "./getBucketlist.df.js";
import { createBucketlist } from "./createBucketlist.df.js";

export const bucketlistRepo = {
  getBucketlist: dataFn(getBucketlist),
  createBucketlist: dataFn(createBucketlist),
};
