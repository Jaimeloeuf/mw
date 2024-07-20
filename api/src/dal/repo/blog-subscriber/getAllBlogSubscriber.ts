import { db } from "../../kysely/index.js";

export async function getAllBlogSubscriber() {
  return await db.selectFrom("blog_subscriber").selectAll().execute();
}
