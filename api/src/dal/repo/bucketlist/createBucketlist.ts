import { db } from "../../kysely/index.js";
import type { NewBucketlist } from "../../kysely/index.js";

export function createBucketlist(bucketlist: NewBucketlist) {
  return db
    .insertInto("bucketlist")
    .values(bucketlist)
    .returningAll()
    .executeTakeFirstOrThrow();
}
