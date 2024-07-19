import { db } from "../../kysely/index.js";
import type { NewBlogSubscriber } from "../../kysely/index.js";

export async function deleteBlogSubscriber(id: NewBlogSubscriber["id"]) {
  return await db
    .deleteFrom("blogSubscriber")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
