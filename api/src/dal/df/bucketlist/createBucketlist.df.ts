import type { CreateBucketlist } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { injectID, OptionalID } from "../injectID.js";

export default dataFn(function bucketlistCreateBucketlist(
  bucketlist: OptionalID<CreateBucketlist>,
) {
  return apiDB
    .insertInto("bucketlist")
    .values(injectID(bucketlist))
    .returningAll()
    .executeTakeFirstOrThrow();
});
