import { db } from "../../kysely/index.js";
import type { NewBlogSubscriber } from "../../kysely/index.js";

export async function deleteBlogSubscriber(id: NewBlogSubscriber["id"]) {
  return await db
    .deleteFrom("blog_subscriber")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
