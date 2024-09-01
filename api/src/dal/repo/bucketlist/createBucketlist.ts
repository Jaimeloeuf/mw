import { apiDB } from "../../kysely/index.js";
import type { NewBucketlist } from "../../kysely/index.js";

export function createBucketlist(bucketlist: NewBucketlist) {
  return apiDB
    .insertInto("bucketlist")
    .values(bucketlist)
    .returningAll()
    .executeTakeFirstOrThrow();
}
