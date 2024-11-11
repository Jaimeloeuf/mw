import type { Bucketlist } from "../../kysely/index.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { concurrent } from "../../../utils/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(async function bucketlistGetBucketlist(
  bucketlistID: Bucketlist["id"],
) {
  const { bucketlist, bucketlistItems } = await concurrent({
    bucketlist: apiDB
      .selectFrom("bucketlist")
      .selectAll()
      .where("id", "=", bucketlistID)
      .executeTakeFirst(),

    bucketlistItems: apiDB
      .selectFrom("bucketlist_item")
      .selectAll()
      .where("bucketlist_id", "=", bucketlistID)
      .execute(),
  });

  if (bucketlist === undefined) {
    throw new NotFoundException(`Cannot find bucketlist ${bucketlistID}`);
  }

  return {
    ...bucketlist,
    items: bucketlistItems,
  };
});
