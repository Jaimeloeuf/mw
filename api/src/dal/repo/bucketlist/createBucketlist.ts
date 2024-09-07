import { apiDB } from "../../kysely/index.js";
import type { CreateBucketlist } from "../../kysely/index.js";

export function createBucketlist(bucketlist: CreateBucketlist) {
  return apiDB
    .insertInto("bucketlist")
    .values(bucketlist)
    .returningAll()
    .executeTakeFirstOrThrow();
}
