import { db } from "../../kysely/index.js";
import type { NewBlogSubscriber } from "../../kysely/index.js";

export function deleteBlogSubscriber(id: NewBlogSubscriber["id"]) {
  return db
    .deleteFrom("blog_subscriber")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
