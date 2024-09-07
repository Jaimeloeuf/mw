import { apiDB } from "../../kysely/index.js";
import type { BlogSubscriber } from "../../kysely/index.js";

export function deleteBlogSubscriber(id: BlogSubscriber["id"]) {
  return apiDB
    .deleteFrom("blog_subscriber")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
