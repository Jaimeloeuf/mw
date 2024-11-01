import { apiDB } from "../../kysely/index.js";
import type { BlogSubscriber } from "../../kysely/index.js";

export async function deleteBlogSubscriber(id: BlogSubscriber["id"]) {
  await apiDB
    .deleteFrom("blog_subscriber")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
