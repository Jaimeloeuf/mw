import { db } from "../../kysely/index.js";

export function getAllBlogSubscriber() {
  return db.selectFrom("blog_subscriber").selectAll().execute();
}
