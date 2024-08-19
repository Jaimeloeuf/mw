import { db } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";
import { concurrent } from "../../../utils/index.js";

export async function getBucketlist(id: string) {
  const { bucketlist, bucketlistItems } = await concurrent({
    bucketlist: db
      .selectFrom("bucketlist")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst(),

    bucketlistItems: db
      .selectFrom("bucketlist_item")
      .selectAll()
      .where("bucketlist_id", "=", id)
      .execute(),
  });

  if (bucketlist === undefined) {
    throw new NotFoundException(`Cannot find bucketlist ${id}`);
  }

  return {
    ...bucketlist,
    items: bucketlistItems,
  };
}