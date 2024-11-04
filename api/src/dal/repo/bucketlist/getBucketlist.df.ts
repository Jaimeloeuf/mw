import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { Bucketlist } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";
import { concurrent } from "../../../utils/index.js";

export default dataFn(async function getBucketlist(
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
