import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import { injectID, OptionalID } from "../injectID.js";
import type { CreateBucketlist } from "../../kysely/index.js";

export default dataFn(function createBucketlist(
  bucketlist: OptionalID<CreateBucketlist>,
) {
  return apiDB
    .insertInto("bucketlist")
    .values(injectID(bucketlist))
    .returningAll()
    .executeTakeFirstOrThrow();
});
